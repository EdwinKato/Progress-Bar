import { DOM } from "react";
import classNames = require("classnames");

export interface OnClickProps {
    microflow: string;
    guid: string;
    applyto: string;
}

export interface ProgressBarProps {
    barType?: string;
    label?: string;
    bootstrapStyle?: string;
    microflowProps?: OnClickProps;
    colorSwitch?: number;
    progressAttributeValue?: number;
}

export function ProgressBar(props: ProgressBarProps) {
    let maximumValue = 100;
    let minimumValue = 0;
    let progressValue = props.progressAttributeValue > maximumValue
        ? maximumValue
        : (props.progressAttributeValue < minimumValue)
            ? minimumValue
            : props.progressAttributeValue;
    let progressClass = classNames([
        { "progress-bar": true },
        { "progress-bar-info": (props.bootstrapStyle === "info") },
        { "progress-bar-danger": (props.bootstrapStyle === "danger") },
        { "progress-bar-warning": (props.bootstrapStyle === "warning") },
        { "progress-bar-success": (props.bootstrapStyle === "success") },
        { "progress-bar-striped": (props.barType === "striped") },
        { "progress-bar-striped active": (props.barType === "animated") }
    ]);

    return (
        DOM.div({
            className: classNames({ progress: true, "progressbar-text-contrast": progressValue < props.colorSwitch })},
            DOM.div({
                className: progressClass,
                onClick: () => {
                    executeMicroflow(props.microflowProps);
                },
                style: { width: progressValue + "%" }
            }, progressValue + "% " + props.label)
        )
    );
}

function executeMicroflow(microflowProperties: OnClickProps) {
    if (microflowProperties.microflow !== "") {
        mx.data.action({
            error: (error) => {
                mx.ui.error(`Error while executing MicroFlow: ${microflowProperties.microflow}: ${error.message}`);
            },
            params: {
                actionname: microflowProperties.microflow,
                applyto: "selection",
                guids: [ microflowProperties.guid ]
            }
        });
    }
}
