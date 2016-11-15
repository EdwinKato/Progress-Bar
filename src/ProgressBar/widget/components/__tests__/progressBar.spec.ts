import { DOM, createElement } from "react";

import { ProgressBar, ProgressBarProps } from "./../ProgressBar";
import { ShallowWrapper, shallow } from "enzyme";

describe("ProgressBar Component", () => {

    let progressBar: ShallowWrapper<ProgressBarProps, any>;
    let clickCount = 0;
    let onClick = () => clickCount++;

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

    // Structural tests
    it("has a class progress", () => {
        expect(progressBar.hasClass("progress")).toBe(true);
    });

    it("renders out as a div element", () => {
        console.log(progressBar.debug());
        expect(progressBar).toMatchStructure(
            DOM.div({})
        );
    });

    it("has inner div element with class progress-bar", () => {
        expect(progressBar.childAt(0)).toMatchStructure(
            DOM.div({ className: "progress-bar" })
        );
    });

    it("has a class progressbar-text-contrast added if value is less than switch color value", () => {
        expect(progressBar.find(".progressbar-text-contrast").length).toEqual(1);
    });

    it("progressbar-text-contrast is not added if value is less than switch color value", () => {
        const progressBarComponent = shallow(createElement(ProgressBar, { progressAttributeValue: 23 }));
        expect(progressBarComponent.find(".progressbar-text-contrast").length).toEqual(0);
    });

    it("renders the progress label", () => {
        expect(progressBar.childAt(0).text()).toEqual("23%progress");
    });

    // Behavioral tests
    it("fires the onclick event", () => {
        let childElement = shallow(DOM.div({ onClick }));
        expect(clickCount).toBe(0);
        childElement.simulate("click");
        expect(clickCount).toBe(1);
    });

});
