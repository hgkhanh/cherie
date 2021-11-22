import React from "react";
import renderer from "react-test-renderer";
import HowItWork from "../HowItWork";
describe("HowItWork", () => {
    it("renders correctly", () => {
        const tree = renderer.create(<HowItWork />).toJSON();
        expect(tree).toMatchSnapshot();
    })
})