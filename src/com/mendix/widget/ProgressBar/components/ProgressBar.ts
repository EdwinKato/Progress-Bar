import { DOM } from "react";
import * as classNames from "classnames";

export interface MicroFlowProps {
    actionname: string;
    guid: string;
}

export interface ProgressBarProps {
    barType?: string;
    label?: string;
    bootstrapStyle?: string;
    microflowProps?: MicroFlowProps;
    colorSwitch: number;
    percentage: number;
    width?: number;
}

export const ProgressBar = (props: ProgressBarProps) =>
    DOM.div(
        {
            className: widgetClasses(props.percentage, props.colorSwitch, props.microflowProps.actionname),
            onClick: () => executeMicroflow(props.microflowProps.actionname, props.microflowProps.guid),
            style: { width: props.width !== 0 ? props.width : null }
        },
        DOM.div(
            {
                className: progressClasses(props.bootstrapStyle, props.barType),
                style: { width: progressValue(props.percentage) + "%" }
            },
            progressLabel(props.label, progressValue(props.percentage))
        )
    );

const widgetClasses = (percentage: number, colorSwitch: number, actionName: string) =>
    classNames(
        "progress",
        "widget-progressbar", {
            "widget-progressbar-text-contrast": progressValue(percentage) < colorSwitch,
            "widget-progressbar-clickable": actionName !== ""
        }
    );

const progressClasses = (bootstrapStyle: string, barType: string) =>
    classNames("progress-bar", {
        "progress-bar-info": bootstrapStyle === "info",
        "progress-bar-danger": bootstrapStyle === "danger",
        "progress-bar-warning": bootstrapStyle === "warning",
        "progress-bar-success": bootstrapStyle === "success",
        "progress-bar-striped": barType === "striped",
        "progress-bar-striped active": barType === "animated"
    });

const progressValue = (progressAttributeValue: number) => {
    const maximumValue = 100;
    const minimumValue = 0;

    if (progressAttributeValue > maximumValue) {
        window.logger.warn("Progress value passed to progress bar exceeds 100%");
        return maximumValue;
    } else if (!progressAttributeValue || progressAttributeValue < minimumValue) {
        window.logger.warn("Progress value passed to progress bar is below 0%");
        return minimumValue;
    }

    return progressAttributeValue;
};

const executeMicroflow = (actionname: string, guid: string) => {
    if (actionname && guid) {
        window.mx.data.action({
            error: (error: Error) => {
                window.mx.ui.error(`Error while executing microflow: ${actionname}: ${error.message}`);
            },
            params: {
                actionname,
                applyto: "selection",
                guids: [ guid ]
            }
        });
    }
};

const progressLabel = (label: string, value: number) => {
    if (label) {
        return progressValue(value) + "% " + label;
    }
    return "";
};
