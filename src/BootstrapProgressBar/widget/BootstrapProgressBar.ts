// import dependent modules
import * as dojoDeclare from "dojo/_base/declare";
import * as WidgetBase from "mxui/widget/_WidgetBase";
import { createElement } from "react";
import { render } from "react-dom";

import { BarType, OnClickProps, ProgressBarComponent } from "./components/ProgressBarComponent";


class BootstrapProgressBar extends WidgetBase {

    // Parameters configured in the Modeler
    private progressAtt: string;
    private bootstrapStyleAtt: string;
    private barType: string;
    private description: string;
    private textColorSwitch: number;
    private onclickMf: string;

    // Internal variables. Non-primitives created in the prototype are shared between all widget instances.
    private contextObj: mendix.lib.MxObject;
    private handles: any[];
    private value: number;

    /* 
    The TypeScript Constructor, not the dojo constructor, 
    move constructor work into widget prototype at bottom of the page. 
    */
    constructor(args?: Object, elem?: HTMLElement) {
        // Do not add any default value here... it wil not run in dojo!     
        super() ;
        return new dojoBootstrapProgressBar(args, elem);
    }
    // dijit._WidgetBase.postCreate is called after constructing the widget. Implement to do extra setup work.
    public postCreate() {
        logger.debug(this.id + ".postCreate");
        this.handles = [];
        this.updateRendering();
    }
    /*
    mxui.widget._WidgetBase.update is called when context is changed or initialized.
    Implement to re-render and / or fetch data.
    */
    public update(obj: mendix.lib.MxObject, callback?: Function) {
        logger.debug(this.id + ".update");
        this.contextObj = obj;
        this.updateRendering(callback);
        this._resetSubscriptions();
    }

    // Set color value, could trigger a re render the interface.
    private updateRendering (callback?: Function) {
        logger.debug(this.id + ".updateRendering");

        // Update the progress bar and set the bootstrap type and value
        if (this.contextObj) {
            this.value = Math.round(parseInt(this.contextObj.get(this.progressAtt).toString(), 10));
            // Correct value if need be to a sensible value
            let defaultValue = 100;
            let clsName: string;
            if (this.value > defaultValue){
                this.value = defaultValue;
            }
            if (this.value < 0) {
                this.value = 0;
            }
            if (this.value < this.textColorSwitch) { // Switch contrast colour
                clsName = "progressbar-text-contract";
            } else {
                clsName = "";
            }

            let renderedBarType: BarType;
            let barstyle: string;
            let progressBarLabel: string = this.value + "%" + this.description;

            if (this.barType === "striped") {
                renderedBarType = BarType.striped;
            } else if (this.barType === "animated") {
                renderedBarType = BarType.animated;
            }
            if (this.contextObj.get(this.bootstrapStyleAtt)) {
                barstyle = (this.contextObj.get(this.bootstrapStyleAtt)).toString();
                render(createElement(ProgressBarComponent, {
                    barType: renderedBarType,
                    bootstrapStyle: barstyle,
                    className: clsName,
                    label: progressBarLabel,
                    val: this.value
                }), this.domNode);
            } else {
                render(createElement(ProgressBarComponent, {
                    barType: renderedBarType,
                    className: clsName,
                    label: progressBarLabel,
                    onclickMF: this.createOnClickProps(),
                    val: this.value
                }), this.domNode);
            }
        }
        // The callback, coming from update, needs to be executed, to let the page know it finished rendering
        if (typeof callback === "function"){
            callback();
        }

        // mxLang.nullExec(callback);
    }
    // Remove subscriptions
    private _unsubscribe () {
        if (this.handles) {
            for (let handle of this.handles) {
                mx.data.unsubscribe(handle);
            }
            this.handles = [];
        }
    }
    // Reset subscriptions.
    private _resetSubscriptions () {
        logger.debug(this.id + "._resetSubscriptions");
        // Release handles on previous object, if any.
        this._unsubscribe();
        // When a mendix object exists create subscriptions.
        if (this.contextObj) {
            this.handles.push( mx.data.subscribe({
                // callback: this.updateRendering.bind(this),
                callback: (guid) => this.updateRendering(),
                guid: this.contextObj.getGuid()
            }));
            this.handles.push( mx.data.subscribe({
                // callback: this.updateRendering.bind(this),
                attr: this.progressAtt,
                callback: (guid, attr, attrValue) => this.updateRendering(),
                guid: this.contextObj.getGuid()
            }));

            this.handles.push( mx.data.subscribe({
                // callback: this.updateRendering.bind(this),
                attr: this.bootstrapStyleAtt,
                callback: (guid, attr, attrValue) => this.updateRendering(),
                guid: this.contextObj.getGuid()
            }));
        }
    }

    public createOnClickProps(): OnClickProps{
        return(
            {
                applyto: "selection",
                guid: this.contextObj.getGuid(),
                microflow: this.onclickMf,
                widgetId: this.id
            }
        );
    }
}

// Declare widget's prototype the Dojo way
// Thanks to https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/dojo/README.md
let dojoBootstrapProgressBar = dojoDeclare(
    "BootstrapProgressBar.widget.BootstrapProgressBar",
    [ WidgetBase ],
    ( function (Source: any) {
    let result: any = {};
    for (let i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
} (BootstrapProgressBar)));
