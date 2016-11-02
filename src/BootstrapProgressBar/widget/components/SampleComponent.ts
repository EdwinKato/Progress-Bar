import { Component, DOM, Props } from "react";

export interface SampleComponentProps extends Props<SampleComponent> {
    name?: string;
}

interface SampleComponentState {
    isLoaded: boolean;
}

export class SampleComponent extends Component<SampleComponentProps, SampleComponentState> {
    constructor(props: SampleComponentProps) {
        super(props);

        this.state = {
            isLoaded: false
        };
    }

 render() {
     return DOM.div({ className: "sample-component" }, this.props.name);
 }
}
