import { MyError } from "./MyError";

export class SelectionInfoError extends MyError {
    constructor(reason: string) {
        super("Переданы некорректные данные о выделении текста. " + reason);
    }
}