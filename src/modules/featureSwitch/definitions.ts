export interface FeatureFilter {
    type: "group" | "featureSwitch" | "boolean";
    value: string[] | boolean;
    filter?: "include" | "exclude";
}

export interface FeatureSwitches {
    // TODO: Investigate why not including 'any' breaks the store
    [name: string]: FeatureFilter[];
}
