import * as classNames from "classnames";
import { DOM } from "react";

export interface OnClickProps {
    microflow: string;
    guid: string;
    applyto: string;
}

export interface ProgressBarProps {
    barType: string;
    label: string;
    bootstrapStyle?: string;
    microflowProps?: OnClickProps;
    colorSwitch: number;
    progressAttributeValue: number;
}

const progressClass = (bootstrapStyle: string, barType: string) => {
    return classNames("progress-bar",
        {
            "progress-bar-info": bootstrapStyle === "info",
            "progress-bar-danger": bootstrapStyle === "danger",
            "progress-bar-warning": bootstrapStyle === "warning",
            "progress-bar-success": bootstrapStyle === "success",
            "progress-bar-striped": barType === "striped",
            "progress-bar-striped active": barType === "animated"
        }
    );
};

const progressValue = (progressAttributeValue: number) => {
    const maximumValue = 100;
    const minimumValue = 0;

    if (progressAttributeValue > maximumValue) {
        return maximumValue;
    } else if (progressAttributeValue < minimumValue) {
        return minimumValue;
    }

    return progressAttributeValue;
};

export const ProgressBar = (props: ProgressBarProps) =>
    DOM.div({
        className: classNames("progress",
            { "mx-progressbar-text-contrast": progressValue(props.progressAttributeValue) < props.colorSwitch })
    },
        DOM.div(
            {
                className: progressClass(props.bootstrapStyle, props.barType),
                onClick: () => executeMicroflow(props.microflowProps.microflow, props.microflowProps.guid),
                style: { width: progressValue(props.progressAttributeValue) + "%" }
            },
            progressValue(props.progressAttributeValue) + "% " + props.label)
    );

const executeMicroflow = (actionname: string, guids: string) => {
    if (actionname) {
        mx.data.action({
            error: (error) => {
                mx.ui.error(`Error while executing MicroFlow: ${actionname}: ${error.message}`);
            },
            params: {
                actionname,
                applyto: "selection",
                guids: [ guids ]
            }
        });
    }
};