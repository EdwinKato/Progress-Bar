import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import { createElement } from "react";
import { render } from "react-dom";

import { OnClickProps, ProgressBar as ProgressBarComponent } from "./components/ProgressBar";

class ProgressBar extends WidgetBase {

    // Parameters configured from modeler
    private progressAttribute: string;
    private bootstrapStyleAttribute: string;
    private barType: string;
    private description: string;
    private textColorSwitch: number;
    private onclickMicroflow: string;

    // Internal variables
    private contextObject: mendix.lib.MxObject;
    private handles: number[];
    private value: number = 0;

    postCreate() {
        this.handles = [];
        this.updateRendering();
    }

    update(object: mendix.lib.MxObject, callback?: Function) {
        this.contextObject = object;
        this._resetSubscriptions();
        this.updateRendering();

        if (callback) {
            callback();
        }
    }

    unsubscribe() {
        if (this.handles) {
            for (let handle of this.handles) {
                mx.data.unsubscribe(handle);
            }
            this.handles = [];
        }
    }

    createOnClickProps(): OnClickProps {
        return ({
            applyto: "selection",
            guid: (this.contextObject) ? this.contextObject.getGuid() : "",
            microflow: this.onclickMicroflow
        });
    }

    private updateRendering() {
        this.value = (this.contextObject) ?
            Math.round(parseInt(this.contextObject.get(this.progressAttribute).toString(), 10)) : 0;
        let barstyle: string = (this.contextObject && this.bootstrapStyleAttribute) ?
            (this.contextObject.get(this.bootstrapStyleAttribute)).toString() : "";

        render(createElement(ProgressBarComponent, {
            barType: this.barType,
            bootstrapStyle: barstyle,
            colorSwitch: this.textColorSwitch,
            label: this.description,
            microflowProps: this.createOnClickProps(),
            progressAttributeValue: (this.value) ? this.value : 0
        }), this.domNode);
    }

    private _resetSubscriptions() {
        this.unsubscribe();
        if (this.contextObject) {
            this.handles.push(mx.data.subscribe({
                callback: (guid) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            }));
            this.handles.push(mx.data.subscribe({
                attr: this.progressAttribute,
                callback: (guid, attr, attrValue) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            }));

            this.handles.push(mx.data.subscribe({
                attr: this.bootstrapStyleAttribute,
                callback: (guid, attr, attrValue) => this.updateRendering(),
                guid: this.contextObject.getGuid()
            }));
        }
    }
}

dojoDeclare(
    "ProgressBar.widget.ProgressBar", [ WidgetBase ],
    (function (Source: any) {
        let result: any = {};
        for (let i in Source.prototype) {
            if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
                result[i] = Source.prototype[i];
            }
        }
        return result;
    } (ProgressBar))
);
