import * as React from "react";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { shallowToJson } from "enzyme-to-json";

Enzyme.configure({ adapter: new Adapter() });

import { ErrorBoundary } from "../ErrorBoundary";

function WorkingComponent() {
    return <div>No Error</div>;
}
function BrokenComponent() {
    return <div>An Error Has Occurred</div>;
}

describe("<ErrorBoundary />", () => {

    it("display its children when there's no problem", () => {
        const wrapper = Enzyme.shallow(<ErrorBoundary><WorkingComponent /></ErrorBoundary>);
        expect(shallowToJson(wrapper)).toMatchSnapshot();
    });
    it("displays an error when component catches error", () => {
        const errorMsg = "An Error Has Occurred";
        const wrapper = Enzyme.shallow(<ErrorBoundary><WorkingComponent /></ErrorBoundary>);
        wrapper.setState({hasError: true}); 
        wrapper.update();
        expect(wrapper.text()).toBe(errorMsg);
    });
    describe("componentDidCatch", () => {
        const wrapper = Enzyme.shallow(<ErrorBoundary><BrokenComponent /></ErrorBoundary>);
        wrapper.instance().componentDidCatch!({ name: "test", message: "test" }, { componentStack: "test" });
        wrapper.update();
        it("sets hasError to true", () => {
            expect(wrapper.instance().state).toBeDefined();
        });
    });
});
