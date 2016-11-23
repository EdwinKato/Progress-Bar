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
}

export const ProgressBar = (props: ProgressBarProps) =>
    DOM.div(
        {
            className: classNames("progress", {
                "widget-progressbar-text-contrast": progressValue(props.percentage) < props.colorSwitch
            })
        },
        DOM.div(
            {
                className: progressClass(props.bootstrapStyle, props.barType),
                onClick: () => executeMicroflow(props.microflowProps.actionname, props.microflowProps.guid),
                style: { width: progressValue(props.percentage) + "%" }
            },
            (() => progressLabel(props.label, progressValue(props.percentage)))()
        )
    );

const progressClass = (bootstrapStyle: string, barType: string) => {
    return classNames("progress-bar", {
        "progress-bar-info": bootstrapStyle === "info",
        "progress-bar-danger": bootstrapStyle === "danger",
        "progress-bar-warning": bootstrapStyle === "warning",
        "progress-bar-success": bootstrapStyle === "success",
        "progress-bar-striped": barType === "striped",
        "progress-bar-striped active": barType === "animated"
    });
};

const progressValue = (progressAttributeValue: number) => {
    const maximumValue = 100;
    const minimumValue = 0;

    if (progressAttributeValue > maximumValue) {
        return maximumValue;
    } else if (!progressAttributeValue || progressAttributeValue < minimumValue) {
        return minimumValue;
    }

    return progressAttributeValue;
};

const executeMicroflow = (actionname: string, guids: string) => {
    if (actionname) {
        window.mx.data.action({
            error: (error: Error) => {
                window.mx.ui.error(`Error while executing microflow: ${actionname}: ${error.message}`);
            },
            params: {
                actionname,
                applyto: "selection",
                guids: [ guids ]
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
