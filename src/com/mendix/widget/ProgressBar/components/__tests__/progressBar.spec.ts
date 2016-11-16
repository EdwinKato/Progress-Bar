import { ShallowWrapper, shallow } from "enzyme";
import { DOM, createElement } from "react";

import { ProgressBar, ProgressBarProps } from "../ProgressBar";

describe("ProgressBar", () => {

    let progressBarWrapper: ShallowWrapper<ProgressBarProps, any>;
    let progressBar: ShallowWrapper<ProgressBarProps, any>;
    let clickCount: number;
    const onClick = () => clickCount++;

    beforeEach(() => {
        clickCount = 0;
        progressBarWrapper = shallow(
            createElement(ProgressBar, {
                barType: "animated",
                bootstrapStyle: "",
                colorSwitch: 50,
                label: "progress",
                progressAttributeValue: 23
            }));
        progressBar = progressBarWrapper.childAt(0);
    });

    it("should have the class progress", () => {
        expect(progressBarWrapper.hasClass("progress")).toBe(true);
    });

    it("should render the progress label", () => {
        expect(progressBar.text()).toEqual("23% progress");
    });

    // tobeElement
    it("should have structure for a progress bar", () => {
        expect(progressBarWrapper).toMatchStructure(
            DOM.div({})
        );
    });

    // implementation detail
    it("has inner div element with class progress-bar", () => {
        expect(progressBarWrapper.childAt(0)).toMatchStructure(
            DOM.div({ className: "progress-bar" })
        );
    });

    describe("label color ", () => {

        it("should not be black after a threshold", () => {
            progressBarWrapper.setProps({ colorSwitch: 78, progressAttributeValue: 89 });
            console.log(progressBar.debug());
            expect(progressBar.hasClass("progressbar-text-contrast")).toBe(false);
        });

        it("should be black before a threshold", () => {
            progressBarWrapper.setProps({ colorSwitch: 78, progressAttributeValue: 60 });
            expect(progressBar.hasClass("progressbar-text-contrast")).toBe(true);
        });

    });

    describe("striped ", () => {

        it("should have bar style striped", () => {
            progressBarWrapper.setProps({ colorSwitch: 78, progressAttributeValue: 89, barType: "striped" });
            expect(progressBar.hasClass("progress-bar-striped")).toBe(true);
        });

        it("should not have bar style striped", () => {
            progressBarWrapper.setProps({ colorSwitch: 78, progressAttributeValue: 89, barType: "" });
            expect(progressBar.hasClass("progress-bar-striped")).toBe(false);
        });

    });

    describe("animated ", () => {

        it("should have bar style animated", () => {
            expect(progressBar.hasClass("active")).toBe(true);
        });

        it("should not have bar style animated", () => {
            expect(progressBar.hasClass("active")).toBe(false);
        });

    });

    describe("success ", () => {

        it("Should have contextual class success", () => {
            progressBarWrapper.setProps({ bootstrapStyle: "success", colorSwitch: 78, progressAttributeValue: 89 });
            expect(progressBar.hasClass("progress-bar-success")).toBe(true);
        });

        it("Should not have contextual class success", () => {
            progressBarWrapper.setProps({ bootstrapStyle: "", colorSwitch: 78, progressAttributeValue: 89 });
            expect(progressBar.hasClass("progress-bar-success")).toBe(false);
        });

    });


    describe("info ", () => {

        it("Should have contextual class info", () => {
            progressBarWrapper.setProps({ bootstrapStyle: "info", colorSwitch: 78, progressAttributeValue: 89 });
            expect(progressBar.hasClass("progress-bar-info")).toBe(true);
        });

        it("Should not have contextual class info", () => {
            progressBarWrapper.setProps({ bootstrapStyle: "", colorSwitch: 78, progressAttributeValue: 89 });
            expect(progressBar.hasClass("progress-bar-info")).toBe(false);
        });

    });

    describe("warning ", () => {

        it("Should have contextual class warning", () => {
            progressBarWrapper.setProps({ bootstrapStyle: "warning", colorSwitch: 78, progressAttributeValue: 89 });
            expect(progressBar.hasClass("progress-bar-warning")).toBe(true);
        });

        it("Should not have contextual class warning", () => {
            progressBarWrapper.setProps({ bootstrapStyle: "", colorSwitch: 78, progressAttributeValue: 89 });
            expect(progressBar.hasClass("progress-bar-warning")).toBe(false);
        });

    });

    describe("danger ", () => {

        it("Should have contextual class danger", () => {
            progressBarWrapper.setProps({ bootstrapStyle: "danger", colorSwitch: 78, progressAttributeValue: 89 });
            expect(progressBar.hasClass("progress-bar-danger")).toBe(true);
        });

        it("Should not have contextual class danger", () => {
            progressBarWrapper.setProps({ bootstrapStyle: "", colorSwitch: 78, progressAttributeValue: 89 });
            expect(progressBar.hasClass("progress-bar-danger")).toBe(false);
        });

    });

    it("should respond to click event", () => {
        let childElement = shallow(DOM.div({ onClick }));
        expect(clickCount).toBe(0);
        childElement.simulate("click");
        expect(clickCount).toBe(1);
    });


});
