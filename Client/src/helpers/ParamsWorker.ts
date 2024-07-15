import { isNonNegativeInteger } from "./isNonNegativeInteger";

export class ParamsWorker {
    static getNonNegativeInteger(
        params: URLSearchParams,
        key: string,
        defaultValue: number
    ): number {
        const value = params.get(key);

        if (value && isNonNegativeInteger(value)) {
            return +value;
        }

        return defaultValue;
    }
}