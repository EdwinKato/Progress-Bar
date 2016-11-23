import { shallow } from "enzyme";
import { DOM, createElement } from "react";

import { MicroFlowProps, ProgressBar, ProgressBarProps } from "../ProgressBar";

import { MxMock, MxDataMock, MxUiMock } from "../../../../../../../tests/mocks/Mendix";

describe("Progress bar", () => {
    const renderProgressBar = (props: ProgressBarProps) => shallow(createElement(ProgressBar, props));
    const colorSwitch = 50;
    const percentage = 23;
    const progressBarWrapper = renderProgressBar({ colorSwitch, percentage });
    const progressBar = progressBarWrapper.childAt(0);
    let mxOriginal: mx.mx;

    beforeAll(() => {
        mxOriginal = window.mx;
        window.mx = MxMock.prototype;
        window.mx.ui = MxUiMock.prototype;
        window.mx.data = MxDataMock.prototype;
    });

    it("has progress bar structure", () => {
        expect(progressBarWrapper).toMatchStructure(
            DOM.div({ className: "progress" },
                DOM.div({ className: "progress-bar" })
            )
        );
    });

    it("should render the progress label", () => {
        const bar = renderProgressBar({ percentage, colorSwitch, label: "progress" });

        expect(bar.text()).toEqual("23% progress");
    });

    it("should render the progress label 0% when percentage is negative", () => {
        const bar = renderProgressBar({ colorSwitch, label: "progress", percentage: -10 }).childAt(0);

        expect(bar.text()).toEqual("0% progress");
    });

    it("should render the progress label 100% when percentage is over 100", () => {
        const bar = renderProgressBar({ colorSwitch, label: "progress", percentage: 200 }).childAt(0);

        expect(bar.text()).toEqual("100% progress");
    });

    it("should render with the set width", () => {
        const barWrapper = renderProgressBar({ colorSwitch, label: "progress", percentage: 200, width: 120 });

        expect(barWrapper).toMatchStructure(
            DOM.div({ className: "progress" , style: { width: "120px" } }
            )
        );
    });

    it("should render with 100% width if passed width is equal to zero", () => {
        const barWrapper = renderProgressBar({ colorSwitch, label: "progress", percentage: 200, width: 0 });

        expect(barWrapper).toMatchStructure(
            DOM.div({ className: "progress" , style: { width: "100%" } }
            )
        );
    });

    describe("label color", () => {
        it("should be black before a threshold", () => {
            expect(progressBarWrapper.hasClass("widget-progressbar-text-contrast")).toBe(true);
        });

        it("should not be black after a threshold", () => {
            progressBarWrapper.setProps({ colorSwitch: 78, percentage: 89 });

            expect(progressBarWrapper.hasClass("widget-progressbar-text-contrast")).toBe(false);
        });
    });

    describe("bootstrap class", () => {
        it("should be success if set style is success", () => {
            const bar = renderProgressBar({ bootstrapStyle: "success", percentage, colorSwitch }).childAt(0);

            expect(bar.hasClass("progress-bar-success")).toBe(true);
        });

        it("should not be success if set style is not success", () => {
            const bar = renderProgressBar({ bootstrapStyle: "", percentage, colorSwitch }).childAt(0);

            expect(bar.hasClass("progress-bar-success")).toBe(false);
        });

        it("should be info if set style is info", () => {
            const bar = renderProgressBar({ bootstrapStyle: "info", percentage, colorSwitch }).childAt(0);

            expect(bar.hasClass("progress-bar-info")).toBe(true);
        });

        it("should not be info if set style is not info", () => {
            expect(progressBar.hasClass("progress-bar-info")).toBe(false);
        });

        it("should be warning if set style is warning", () => {
            const bar = renderProgressBar({ bootstrapStyle: "warning", percentage, colorSwitch }).childAt(0);

            expect(bar.hasClass("progress-bar-warning")).toBe(true);
        });

        it("should not be warning if set style is not warning", () => {
            expect(progressBar.hasClass("progress-bar-warning")).toBe(false);
        });

        it("should be danger if set style is danger", () => {
            const bar = renderProgressBar({ bootstrapStyle: "danger", percentage, colorSwitch }).childAt(0);

            expect(bar.hasClass("progress-bar-danger")).toBe(true);
        });

        it("should not be danger if set style is not danger", () => {
            expect(progressBar.hasClass("progress-bar-danger")).toBe(false);
        });
    });

    describe("type", () => {
        it("should be striped if set type is striped", () => {
            const bar = renderProgressBar({ barType: "striped", percentage, colorSwitch }).childAt(0);

            expect(bar.hasClass("progress-bar-striped")).toBe(true);
        });

        it("should not be striped if set type is not striped", () => {
            expect(progressBar.hasClass("progress-bar-striped")).toBe(false);
        });

        it("should be animated if set type is animated", () => {
            const bar = renderProgressBar({ barType: "animated", percentage, colorSwitch }).childAt(0);

            expect(bar.hasClass("progress-bar-striped")).toBe(true);
            expect(bar.hasClass("active")).toBe(true);
        });

        it("should be not be animated if set type is not animated", () => {
            expect(progressBar.hasClass("progress-bar-striped")).not.toBe(true);
            expect(progressBar.hasClass("active")).toBe(false);
        });
    });

    it("should respond to click event", () => {
        spyOn(window.mx.data, "action").and.callThrough();
        const microflowProps: MicroFlowProps = { actionname: "m", guid: "1" };
        const barWrapper = renderProgressBar({ percentage, colorSwitch, microflowProps });
        const bar = barWrapper.childAt(0);

        bar.props().onClick();

        expect(window.mx.data.action).toHaveBeenCalled();
        expect(window.mx.data.action).toHaveBeenCalledWith({ error: jasmine.any(Function), params: {
            actionname: microflowProps.actionname,
            applyto: "selection",
            guids: [ microflowProps.guid ]
        } });
    });

    it("should not run onclick event if action name is empty", () => {
        spyOn(window.mx.data, "action").and.callThrough();
        const microflowProps: MicroFlowProps = { actionname: "", guid: "1" };
        const barWrapper = renderProgressBar({ percentage, colorSwitch, microflowProps });
        const bar = barWrapper.childAt(0);

        bar.props().onClick();

        expect(window.mx.data.action).not.toHaveBeenCalled();
    });

    it("should show error to click event", () => {
        spyOn(window.mx.data, "action").and.callThrough();
        spyOn(window.mx.ui, "error").and.callThrough();
        const microflowProps: MicroFlowProps = { actionname: "no_microflow", guid: "1" };
        const barWrapper = renderProgressBar({ percentage, colorSwitch, microflowProps });
        const bar = barWrapper.childAt(0);

        bar.props().onClick();

        expect(window.mx.data.action).toHaveBeenCalled();
        expect(window.mx.ui.error).toHaveBeenCalledWith(
            "Error while executing microflow: no_microflow: microflow does not exist"
        );
    });

    afterAll(() => {
        window.mx = mxOriginal;
    });
});
