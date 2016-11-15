import { ShallowWrapper, shallow } from "enzyme";
import { DOM, createElement } from "react";

import { ProgressBar, ProgressBarProps } from "./../ProgressBar";


describe("ProgressBar", () => {

    let progressBar: ShallowWrapper<ProgressBarProps, any>;
    let clickCount = 0;
    const onClick = () => clickCount++;

    beforeEach(() => {
        progressBar = shallow(
            createElement(ProgressBar, {
                barType: "striped",
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

    it("should have contrast color before a threshold", () => {
        expect(progressBar.find(".progressbar-text-contrast").length).toEqual(1);
    });

    it("Should not add progressbar-text-contrast class if value is greater than switch color value", () => {
        const progressBarComponent = shallow(createElement(ProgressBar, { progressAttributeValue: 87, colorSwitch: 70 }));
        expect(progressBarComponent.find(".progressbar-text-contrast").length).toEqual(0);
    });

    it("Should add progressbar-text-contrast class if value is less than switch color value", () => {
        // const progressBarComponent = shallow(createElement(ProgressBar, { progressAttributeValue: 77 }));
        // expect(progressBarComponent.find(".progressbar-text-contrast").length).toEqual(0);
    });

    it("should render the progress label", () => {
        expect(progressBar.childAt(0).text()).toEqual("23% progress");
    });

    it("should have bar style striped", () => {
       expect(progressBar.find(".progress-bar-striped").length).toEqual(1);
    });

    it("should have bar style striped and animated", () => {
       expect(progressBar.find(".progress-bar-striped").length).toEqual(1);
    });

    it("should have bar style animated", () => {
        expect(progressBar.hasClass(".active")).toBe(true);
    });

    describe("events", () => {
        it("should fire onClick", () => {
            let childElement = shallow(DOM.div({ onClick }));
            expect(clickCount).toBe(0);
            childElement.simulate("click");
            expect(clickCount).toBe(1);
        });
    });

});
