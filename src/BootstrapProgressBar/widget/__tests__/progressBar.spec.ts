import { DOM, createElement } from "react";
import { shallow } from "enzyme";
import { ProgressBar, ProgressBarProps } from "./../components/ProgressBar";

describe("progressBar", () => {
    const renderWidget = (props: ProgressBarProps) => shallow(createElement(ProgressBar));
    it("should render as div", () => {
        const bar = renderWidget({});
        expect(bar).toMatchStructure(
            DOM.div({})
        );
    });

    it("renders children when passed in", () => {
        //
    });

    it("render with class", () => {
        //   expect(renderWidget).toHaveClass("progress");
    });

    it("simulates click events", () => {
        //
    });
});
