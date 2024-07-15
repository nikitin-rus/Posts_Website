import { SelectionInfoError } from "../errors/SelectionInfoError";

export type InlineFormatType = "title" | "bold" | "italic" | "strikethrough" | "link" | "code" | "quote";
export type ListFormatType = "unordered-list" | "numbered-list";

export type FormatType = InlineFormatType | ListFormatType;

interface InlineFormatSymbols {
    leftSymbols: string,
    rightSymbols: string
}

type TypesToInlineFormatSymbols = {
    [type in InlineFormatType]: InlineFormatSymbols
}

interface SelectionInfo {
    selectionStart: number,
    selectionEnd: number
}

export class TextFormatter {
    readonly text: string;

    readonly selectionInfo: SelectionInfo = {
        selectionStart: 0,
        selectionEnd: 0,
    };

    readonly formatType: FormatType;

    private typesToInlineFormatSymbols: TypesToInlineFormatSymbols = {
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

    constructor(text: string, selectionInfo: SelectionInfo, formatType: FormatType) {
        TextFormatter.validateSelectionInfo(text, selectionInfo);

        this.text = text;
        this.selectionInfo = selectionInfo;
        this.formatType = formatType;
    }

    format(): string {
        const text = this.text;
        const { selectionStart, selectionEnd } = this.selectionInfo;

        if (
            this.formatType === "numbered-list"
            || this.formatType === "unordered-list"
        ) {
            const {
                selectionStart: expandedSelectionStart,
                selectionEnd: expandedSelectionEnd
            } = TextFormatter.expandSelection(this.text, this.selectionInfo);

            const parts = {
                left: text.slice(0, expandedSelectionStart),
                selected: text.slice(expandedSelectionStart, expandedSelectionEnd),
                right: text.slice(expandedSelectionEnd),
            };

            const lines = parts.selected.split("\n");

            let result = lines[0];

            if (this.formatType === "numbered-list") {
                result = `1. ${result}`;

                for (let i = 1; i < lines.length; i++) {
                    result += `\n${i + 1}. ${lines[i]}`;
                }
            } else if (this.formatType === "unordered-list") {
                result = `- ${result}`;

                for (let i = 1; i < lines.length; i++) {
                    result += `\n- ${lines[i]}`;
                }
            }

            return (
                parts.left
                + result
                + parts.right
            );
        } else {
            const parts = {
                left: text.slice(0, selectionStart),
                selected: text.slice(selectionStart, selectionEnd),
                right: text.slice(selectionEnd),
            };

            // Если ничего не выделено, но каретка стоит перед буквой в слове, то 
            // ищем границы этого слова и воспринимаем его как выделенный текст
            if (!parts.selected) {
                const {
                    selectionStart: expandedSelectionStart,
                    selectionEnd: expandedSelectionEnd
                } = TextFormatter.expandSelection(this.text, this.selectionInfo);

                parts.left = text.slice(0, expandedSelectionStart);
                parts.selected = text.slice(expandedSelectionStart, expandedSelectionEnd);
                parts.right = text.slice(expandedSelectionEnd);
            }

            const formatSymbols = this.typesToInlineFormatSymbols[this.formatType];

            return (
                parts.left
                + formatSymbols.leftSymbols
                + parts.selected
                + formatSymbols.rightSymbols
                + parts.right
            );
        }
    }

    static expandSelection(text: string, selectionInfo: SelectionInfo): SelectionInfo {
        const { selectionStart, selectionEnd } = selectionInfo;

        TextFormatter.validateSelectionInfo(text, selectionInfo);

        const regExp = /\s/;

        let i = selectionStart;
        while (i > 0) {
            if (i === selectionStart) {
                i--;
                continue;
            };
            if (regExp.test(text[i])) {
                i++;
                break;
            }
            i--;
        }

        let j = selectionEnd;
        while (j < text.length) {
            if (regExp.test(text[j])) {
                break;
            }
            j++;
        }

        return {
            selectionStart: i,
            selectionEnd: j,
        };
    }

    static validateSelectionInfo(text: string, selectionInfo: SelectionInfo): void {
        const { selectionStart, selectionEnd } = selectionInfo;

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
    }
}