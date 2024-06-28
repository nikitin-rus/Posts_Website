import { SelectionInfoError } from "../errors/SelectionInfoError";

export type FormatType =
    "title"
    | "bold"
    | "italic"
    | "strikethrough"
    | "link"
    | "code"
    | "quote";

interface FormatSymbols {
    leftSymbols: string,
    rightSymbols: string
}

type TypesToFormatSymbols = {
    [type in FormatType]: FormatSymbols
}

interface SelectionInfo {
    text: string
    selectionStart: number,
    selectionEnd: number
}

interface PartsOfText {
    left: string,
    selected: string,
    right: string
}

export class TextFormatter {
    private _selectionInfo: SelectionInfo = {
        text: "",
        selectionStart: 0,
        selectionEnd: 0,
    };

    formatType: FormatType;

    private typesToFormatSymbols: TypesToFormatSymbols = {
        "title": {
            leftSymbols: "### ",
            rightSymbols: "",
        },
        "bold": {
            leftSymbols: "**",
            rightSymbols: "**",
        },
        "italic": {
            leftSymbols: "_",
            rightSymbols: "_",
        },
        "strikethrough": {
            leftSymbols: "~~",
            rightSymbols: "~~",
        },
        "link": {
            leftSymbols: "[",
            rightSymbols: "](url)",
        },
        "code": {
            leftSymbols: "`",
            rightSymbols: "`"
        },
        "quote": {
            leftSymbols: "> ",
            rightSymbols: ""
        }
    };

    constructor(formatType: FormatType, selectionInfo: SelectionInfo) {
        this.selectionInfo = selectionInfo;
        this.formatType = formatType;
    }

    public get selectionInfo(): SelectionInfo {
        return this._selectionInfo;
    }

    public set selectionInfo(selectionInfo: SelectionInfo) {
        const { text, selectionStart, selectionEnd } = selectionInfo;

        if (
            selectionStart < 0
            || selectionEnd < 0
        ) {
            throw new SelectionInfoError(
                "Начальный или конечный индекс выделения не может быть меньше нуля."
            );
        }

        if (
            selectionStart > text.length
            || selectionEnd > text.length
        ) {
            throw new SelectionInfoError(
                "Начальный или конечный индекс выделения не может быть больше длины строки."
            );
        }

        if (selectionStart > selectionEnd) {
            throw new SelectionInfoError(
                "Начальный индекс выделения не может быть больше конечного."
            );
        }

        this._selectionInfo = selectionInfo;
    }

    format(): string {
        const parts = this.chopString();
        return this.createString(parts);
    }

    private chopString(): PartsOfText {
        const { text, selectionStart, selectionEnd } = this.selectionInfo;
        const parts = {
            left: text.slice(0, selectionStart),
            selected: text.slice(selectionStart, selectionEnd),
            right: text.slice(selectionEnd),
        };

        // Если ничего не выделено, но каретка стоит перед буквой в слове, то 
        // ищем границы этого слова и воспринимаем его как выделенный текст
        if (!parts.selected) {
            const result = this.findSelectedText();
            if (result) return result;
        }

        return parts;
    }

    private createString(parts: PartsOfText): string {
        const formatSymbols = this.typesToFormatSymbols[this.formatType];
        return (
            parts.left
            + formatSymbols.leftSymbols
            + parts.selected
            + formatSymbols.rightSymbols
            + parts.right
        );
    }

    public findSelectedText(): PartsOfText | null {
        const { text, selectionStart } = this.selectionInfo;
        const regExp = /\s/;

        if (
            !text.length
            || selectionStart === text.length
            || regExp.test(text[selectionStart])
        ) {
            return null
        }

        let i = selectionStart;
        while (i > 0) {
            if (regExp.test(text[i])) {
                i++;
                break;
            }
            i--;
        }

        let j = selectionStart;
        while (j < text.length - 1) {
            if (regExp.test(text[j])) {
                j--;
                break;
            }
            j++;
        }

        return {
            left: text.slice(0, i),
            selected: text.slice(i, j + 1),
            right: text.slice(j + 1),
        };
    }
}