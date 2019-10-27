import { FeatureFilter, FeatureSwitches } from "./definitions";

export const checkSwitchArray = (method: "include" | "exclude", locales: string[], selected: string): boolean => {
    const exists = locales.indexOf(selected) > -1;

    return method === "include" ? exists : !exists;
};

export function checkSwitch(
    sw: FeatureFilter,
    featureSwitches: FeatureSwitches,
    checkFeatureSwitches: boolean = false,
    fallback: boolean = true,
    selected: string = ""
): boolean {
    if (sw.type === "boolean") {
        return !sw.value === false;
    }
    if (sw.type === "group" && sw.filter) {
        return checkSwitchArray(sw.filter, sw.value as string[], selected);
    }
    if (sw.type === "featureSwitch" && checkFeatureSwitches) {
        return checkAdditionalSwitches(sw.value as string[], featureSwitches, fallback);
    }
    return fallback;
}

export function checkAdditionalSwitches(
    values: string[], 
    featureSwitches: FeatureSwitches, 
    fallback: boolean = true
    ): boolean {

    const switchArr: boolean[] = [];
    values.forEach((name: string) => {
        const featureSwitch = featureSwitches[name] as FeatureFilter[];
        if (!featureSwitch) {
            switchArr.push(fallback);
        } else if (featureSwitch.length) {
            featureSwitch.forEach((sw: FeatureFilter) => {
                switchArr.push(checkSwitch(sw, featureSwitches, false, fallback));
            });
        }
    });
    return switchArr.every((val: boolean) => val === true);
}

export function checkFeatureSwitch(
    name: string, 
    featureSwitches: FeatureSwitches, 
    fallback: boolean = true
    ): boolean {

    const featureSwitch = featureSwitches[name] as FeatureFilter[];
    if (featureSwitch === undefined) {
        return fallback;
    }
    const switchArr: boolean[] = [];
    featureSwitch.forEach((sw: FeatureFilter) => {
        switchArr.push(checkSwitch(sw, featureSwitches, true, fallback));
    });
    return switchArr.every((val: boolean) => val === true);
}