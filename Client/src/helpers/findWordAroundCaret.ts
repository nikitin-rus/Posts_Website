import { CaretPositionError } from "../errors/formatting/CaretPositionError";

export function findWordAroundCaret(text: string, caretPosition: number) {
    const regExp = /\s/;

    if (caretPosition < 0) {
        throw new CaretPositionError("CaretPosition < 0");
    } else if (caretPosition > text.length) {
        throw new CaretPositionError("CaretPosition > длины строки");
    }

    if (
        !text.length
        || caretPosition === text.length
        || regExp.test(text[caretPosition])
    ) {
        return null;
    }

    let i = caretPosition;
    while (i > 0) {
        if (regExp.test(text[i])) {
            i++;
            break;
        }
        i--;
    }

    let j = caretPosition;
    while (j < text.length - 1) {
        if (regExp.test(text[j])) {
            j--;
            break;
        }
        j++;
    }

    return [i, j];
}