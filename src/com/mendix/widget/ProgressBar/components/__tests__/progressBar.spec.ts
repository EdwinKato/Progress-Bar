import { ShallowWrapper, shallow } from "enzyme";
import { DOM, createElement } from "react";

import { ProgressBar, ProgressBarProps } from "../ProgressBar";

describe("Progress bar", () => {

    let progressBarWrapper: ShallowWrapper<ProgressBarProps, any>;
    let progressBar: ShallowWrapper<ProgressBarProps, any>;
    let clickCount: number;

    const onClick = () => clickCount++;

    beforeEach(() => {
        clickCount = 0;
        progressBarWrapper = shallow(
            createElement(ProgressBar, {
                barType: "animated",
                bootstrapStyle: "success",
                colorSwitch: 50,
                label: "progress",
                percentage: 23
            }));
        progressBar = progressBarWrapper.childAt(0);
    });

    it("wrapper should have the class progress", () => {
        expect(progressBarWrapper.hasClass("progress")).toBe(true);
    });

    it("should render the progress label", () => {
        expect(progressBar.text()).toEqual("23% progress");
    });

    it("has class progress-bar", () => {
        expect(progressBarWrapper.childAt(0)).toMatchStructure(
            DOM.div({ className: "progress-bar" })
        );
    });


    describe("label color", () => {

        it("should be black before a threshold", () => {
            expect(progressBarWrapper.hasClass("mx-progressbar-text-contrast")).toBe(true);
        });

        it("should not be black after a threshold", () => {
            progressBarWrapper.setProps({ colorSwitch: 78, percentage: 89 });
            progressBar = progressBarWrapper.childAt(0);
            expect(progressBarWrapper.hasClass("mx-progressbar-text-contrast")).toBe(false);
        });

    });

    describe("bootstrap class", () => {

        it("should be success if set style is success", () => {
            expect(progressBar.hasClass("progress-bar-success")).toBe(true);
        });

        it("should not be success if set style is not success", () => {
            progressBarWrapper.setProps({ bootstrapStyle: "", colorSwitch: 78, percentage: 89 });
            progressBar = progressBarWrapper.childAt(0);
            expect(progressBar.hasClass("progress-bar-success")).toBe(false);
        });

        it("should be info if set style is info", () => {
            progressBarWrapper.setProps({ bootstrapStyle: "info", colorSwitch: 78, percentage: 89 });
            progressBar = progressBarWrapper.childAt(0);
            expect(progressBar.hasClass("progress-bar-info")).toBe(true);
        });

        it("should not be info if set style is not info", () => {
            expect(progressBar.hasClass("progress-bar-info")).toBe(false);
        });

        it("should be warning if set style is warning", () => {
            progressBarWrapper.setProps({ bootstrapStyle: "warning", colorSwitch: 78, percentage: 89 });
            progressBar = progressBarWrapper.childAt(0);
            expect(progressBar.hasClass("progress-bar-warning")).toBe(true);
        });

        it("should not be warning if set style is not warning", () => {
            expect(progressBar.hasClass("progress-bar-warning")).toBe(false);
        });

        it("should be danger if set style is danger", () => {
            progressBarWrapper.setProps({ bootstrapStyle: "danger", colorSwitch: 78, percentage: 89 });
            progressBar = progressBarWrapper.childAt(0);
            expect(progressBar.hasClass("progress-bar-danger")).toBe(true);
        });

        it("should not be danger if set style is not danger", () => {
            expect(progressBar.hasClass("progress-bar-danger")).toBe(false);
        });

    });

    describe("type", () => {

        it("should be striped if set type is striped", () => {
            progressBarWrapper.setProps({ barType: "striped", colorSwitch: 78, percentage: 89 });
            progressBar = progressBarWrapper.childAt(0);
            expect(progressBar.hasClass("progress-bar-striped")).toBe(true);
        });

        it("should not be striped if set type is not striped", () => {
            progressBarWrapper.setProps({ barType: "", colorSwitch: 78, percentage: 89 });
            progressBar = progressBarWrapper.childAt(0);
            expect(progressBar.hasClass("progress-bar-striped")).toBe(false);
        });

        it("should be animated if set type is animated", () => {
            expect(progressBar.hasClass("progress-bar-striped")).toBe(true);
            expect(progressBar.hasClass("active")).toBe(true);
        });

        it("should be not be animated if set type is not animated", () => {
            progressBarWrapper.setProps({ barType: "", colorSwitch: 78, percentage: 89 });
            progressBar = progressBarWrapper.childAt(0);
            expect(progressBar.hasClass("active")).toBe(false);
        });

    });

    it("should respond to click event", () => {
        let childElement = shallow(DOM.div({ onClick }));
        expect(clickCount).toBe(0);
        childElement.simulate("click");
        expect(clickCount).toBe(1);
    });

});
