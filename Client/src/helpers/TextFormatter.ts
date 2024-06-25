import { findWordAroundCaret } from "./findWordAroundCaret";

export type FormatType = "title" | "bold";

type TypesToMethods = {
    [type in FormatType]: () => string;
}

interface SelectionInfo {
    text: string,
    selectionStart: number,
    selectionEnd: number
}

interface PartsOfText {
    left: string,
    selected: string,
    right: string
}

export class TextFormatter {
    selectionInfo: SelectionInfo;
    formatType: FormatType

    public get partsOfText(): PartsOfText {
        const text = this.selectionInfo.text;
        const selStart = this.selectionInfo.selectionStart;
        const selEnd = this.selectionInfo.selectionEnd;

        return {
            left: text.slice(0, selStart),
            selected: text.slice(selStart, selEnd),
            right: text.slice(selEnd),
        };
    }

    private typesToMethods: TypesToMethods = {
        "title": this.formatTitle,
        "bold": this.formatBold
    }

    constructor(info: SelectionInfo, formatType: FormatType) {
        this.selectionInfo = info;
        this.formatType = formatType;
    }

    format = () => this.typesToMethods[this.formatType].call(this);

    private formatTitle(): string {
        const formatSymbols = "###";

        const { text, selectionStart } = this.selectionInfo;
        const { left, selected, right } = this.partsOfText;

        let result = this.selectionInfo.text;

        /**
         * Если что-то выделено, то перед выделением ставим ###
         * 
         * Если ничего не выделено, но каретка стоит перед буквой в слове, то
         * ставим ### перед этим словом
         * 
         * Иначе просто добавляем ### в конец
        */
        if (selected) {
            result = left + formatSymbols + " " + selected + right;
        } else if (
            text[selectionStart] !== " "
            && text[selectionStart] !== undefined
        ) {
            const pos = findWordAroundCaret(text, selectionStart);

            if (pos) {
                const [i, j] = pos;
                result = (
                    text.slice(0, i)
                    + formatSymbols
                    + " "
                    + text.slice(i, j + 1)
                    + text.slice(j + 1)
                );
            }
        } else {
            result = left + right + formatSymbols + " ";
        }

        return result;
    }

    private formatBold(): string {
        const formatSymbols = "**";

        console.log(formatSymbols);

        return "";
    }
}