import { Component, Props, createElement } from "react";
import { ProgressBar } from "react-bootstrap";

export enum BarType {
    striped,
    animated,
}

export interface OnClickProps {
    microflow?: string;
    guid?: string;
    applyto?: string;
    caller?: string;
    widgetId?: string;
    mxform?: string;
}

export interface ProgressBarProps extends Props<ProgressBarComponent> {
    label?: string;
    val?: number;
    barType?: BarType;
    bootstrapStyle?: string;
    className?:string;
    onclickMF?: OnClickProps; // onclickMF is of type : onClickProps
}

export class ProgressBarComponent extends Component<ProgressBarProps, any[]> {
    bsStyleString: string;

    constructor(props: ProgressBarProps) {
        super(props);
    }

    render() {
        return createElement(ProgressBar, {
            active: this.props.barType === BarType.animated ? true : false,
            bsStyle: this.props.bootstrapStyle,
            className: this.props.className,
            label: this.props.label,
            now: this.props.val,
            onClick: this.onClick.bind(this, this.props.onclickMF),
            striped: this.props.barType === BarType.striped ? true : false
        });
    }

    // Attach events to HTML dom elements
    onClick(props: OnClickProps) {
        // If a microflow has been set execute the microflow on a click.
        if (props.microflow !== "") {
            mx.data.action({
                callback: (obj) => {
                    logger.debug(props.widgetId + ": Microflow executed successfully");
                },
                error: (error) => {
                    logger.error(props.widgetId + ": An error occurred while executing microflow: ", error);
                    mx.ui.error("Error while executing MicroFlow: " + props.microflow + " : " + error.message);
                },
                params: {
                    actionname: props.microflow,
                    applyto: "selection",
                    guids: [ props.guid ]
                }
            }, this);
        }
    }
}
