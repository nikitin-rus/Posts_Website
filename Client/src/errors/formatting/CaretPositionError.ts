import { MyError } from "../MyError";

export class CaretPositionError extends MyError {
    constructor(reason: string) {
        super("Передана некорректная позиция курсора в строке. " + reason);
    }
}