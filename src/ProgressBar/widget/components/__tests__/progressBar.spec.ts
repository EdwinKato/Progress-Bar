import { ShallowWrapper, shallow } from "enzyme";
import { DOM, createElement } from "react";

import { ProgressBar, ProgressBarProps } from "./../ProgressBar";


describe("ProgressBar", () => {

    let progressBar: ShallowWrapper<ProgressBarProps, any>;
    let clickCount: number;
    const onClick = () => clickCount++;

    beforeEach(() => {
        clickCount = 0;
        progressBar = shallow(
            createElement(ProgressBar, {
                barType: "animated",
                bootstrapStyle: "",
                colorSwitch: 50,
                label: "progress",
                progressAttributeValue: 23
            }));
    });

    it("Should have class progress", () => {
        expect(progressBar.hasClass("progress")).toBe(true);
    });

    it("should have structure for a progress bar", () => {
        expect(progressBar).toMatchStructure(
            DOM.div({})
        );
    });

    it("has inner div element with class progress-bar", () => {
        expect(progressBar.childAt(0)).toMatchStructure(
            DOM.div({ className: "progress-bar" })
        );
    });

    it("should not have contrast color after a threshold", () => {
        progressBar = shallow(
            createElement(ProgressBar, { colorSwitch: 70, progressAttributeValue: 87 }));
        expect(progressBar.hasClass("progressbar-text-contrast")).toBe(false);
    });

    it("should have contrast color before a threshold", () => {
        progressBar = shallow(
            createElement(ProgressBar, { colorSwitch: 70, progressAttributeValue: 50 }));
        expect(progressBar.hasClass("progressbar-text-contrast")).toBe(true);
    });

    it("should render the progress label", () => {
        expect(progressBar.childAt(0).text()).toEqual("23% progress");
    });

    it("should have bar style striped", () => {
        progressBar = shallow(
            createElement(ProgressBar, { barType: "striped", progressAttributeValue: 50 }));
        expect(progressBar.childAt(0).hasClass("progress-bar-striped")).toBe(true);
    });

    it("should not have bar style striped", () => {
        progressBar = shallow(
            createElement(ProgressBar, { barType: "", progressAttributeValue: 50 }));
        expect(progressBar.childAt(0).hasClass("progress-bar-striped")).toBe(false);
    });

    it("should have bar style animated", () => {
        expect(progressBar.childAt(0).hasClass("active")).toBe(true);
    });

    it("should not have bar style animated", () => {
        expect(progressBar.childAt(0).hasClass("active")).toBe(true);
    });

    it("Should have contextual class success", () => {
        progressBar = shallow(
            createElement(ProgressBar, { bootstrapStyle: "success", progressAttributeValue: 50 }));
        expect(progressBar.childAt(0).hasClass("progress-bar-success")).toBe(true);
    });

    it("Should not have contextual class success", () => {
        progressBar = shallow(
            createElement(ProgressBar, { bootstrapStyle: "", progressAttributeValue: 50 }));
        expect(progressBar.childAt(0).hasClass("progress-bar-success")).toBe(false);
    });

    it("Should have contextual class info", () => {
        progressBar = shallow(
            createElement(ProgressBar, { bootstrapStyle: "info", progressAttributeValue: 50 }));
        expect(progressBar.childAt(0).hasClass("progress-bar-info")).toBe(true);
    });

    it("Should not have contextual class info", () => {
        progressBar = shallow(
            createElement(ProgressBar, { bootstrapStyle: "", progressAttributeValue: 50 }));
        expect(progressBar.childAt(0).hasClass("progress-bar-info")).toBe(false);
    });

    it("Should have contextual class warning", () => {
        progressBar = shallow(
            createElement(ProgressBar, { bootstrapStyle: "warning", progressAttributeValue: 50 }));
        expect(progressBar.childAt(0).hasClass("progress-bar-warning")).toBe(true);
    });

    it("Should not have contextual class warning", () => {
        progressBar = shallow(
            createElement(ProgressBar, { bootstrapStyle: "", progressAttributeValue: 50 }));
        expect(progressBar.childAt(0).hasClass("progress-bar-warning")).toBe(false);
    });

    it("Should have contextual class danger", () => {
        progressBar = shallow(
            createElement(ProgressBar, { bootstrapStyle: "danger", progressAttributeValue: 50 }));
        expect(progressBar.childAt(0).hasClass("progress-bar-danger")).toBe(true);
    });

    it("Should not have contextual class danger", () => {
        progressBar = shallow(
            createElement(ProgressBar, { bootstrapStyle: "", progressAttributeValue: 50 }));
        expect(progressBar.childAt(0).hasClass("progress-bar-danger")).toBe(false);
    });

    describe("events", () => {
        it("should fire onClick", () => {
            let childElement = shallow(DOM.div({ onClick }));
            expect(clickCount).toBe(0);
            childElement.simulate("click");
            expect(clickCount).toBe(1);
        });

        it("should fire onClick again", () => {
            let childElement = shallow(DOM.div({ onClick }));
            expect(clickCount).toBe(0);
            childElement.simulate("click");
            expect(clickCount).toBe(1);
        });

    });

});
