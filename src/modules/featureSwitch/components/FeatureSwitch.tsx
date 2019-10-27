import * as React from "react";
import { checkFeatureSwitch } from "../utilities";
import { FeatureSwitches } from "../definitions";

export interface FeatureSwitchProps {
    name: string;
    switches: FeatureSwitches; 
    test?: boolean;
}

export class FeatureSwitch extends React.PureComponent<FeatureSwitchProps> {
    protected componentShouldRender = (): boolean => {
        if (process.env.NODE_ENV === "test" && !this.props.test) {
            return true;
        }
        return checkFeatureSwitch(this.props.name, this.props.switches);
    }
    public render() {
        const { children } = this.props;
        if (this.componentShouldRender()) {
            return [children];
        } else {
            return null;
        }
    }
}