import { findWordAroundCaret } from "./findWordAroundCaret";

export type FormatType = "title" | "bold";

// TODO: Валидация входных значений
// Пример: text[selectionStart] !== undefined

type TypesToFormatters = {
    [type in FormatType]: (parts: PartsOfText) => string;
}

interface SelectionInfo {
    selectionStart: number,
    selectionEnd: number
}

interface PartsOfText {
    left: string,
    selected: string,
    right: string
}

export class TextFormatter {
    text: string;
    selectionInfo: SelectionInfo;
    formatType: FormatType;

    private typesToFormatters: TypesToFormatters = {
        "title": this.formatTitle,
        "bold": this.formatBold,
    }

    constructor(text: string, formatType: FormatType, selectionInfo: SelectionInfo) {
        this.text = text;
        this.selectionInfo = selectionInfo;
        this.formatType = formatType;
    }

    format(): string {
        const text = this.text;
        const { selectionStart, selectionEnd } = this.selectionInfo;
        let parts = {
            left: text.slice(0, selectionStart),
            selected: text.slice(selectionStart, selectionEnd),
            right: text.slice(selectionEnd),
        };
        const { left, selected, right } = parts;

        /**
         * Разбиваем текст на три части:
         * 1. Если что-то выделено, то текст делится на три части выделенной подстрокой
         * 2. Если ничего не выделено, но каретка стоит перед буквой в слове, то 
         * ищем границы этого слова и воспринимаем его как выделенный
         * 3. Иначе считаем, что ничего не выделено и помещаем весь текст в левую часть
        */
        if (selected) {
            parts = {
                left: left,
                selected: selected,
                right: right,
            };
        } else if (text[selectionStart] !== " ") {
            try {
                const positions = findWordAroundCaret(text, selectionStart);

                if (positions) {
                    const [posLeft, posRight] = positions;
                    parts = {
                        left: text.slice(0, posLeft),
                        selected: text.slice(posLeft, posRight + 1),
                        right: text.slice(posRight + 1),
                    };
                } else {
                    parts = {
                        left: left + selected + right,
                        selected: "",
                        right: "",
                    };
                }
            } catch (e) {
                // TODO: Обработка исключений из findWordAroundCaret
                throw e;
            }
        } else {
            parts = {
                left: left + selected + right,
                selected: "",
                right: "",
            };
        }

        return this.typesToFormatters[this.formatType](parts);
    };

    private formatTitle(parts: PartsOfText): string {
        return `${parts.left}### ${parts.selected}${parts.right}`;
    }

    private formatBold(parts: PartsOfText): string {
        return `${parts.left}**${parts.selected}**${parts.right}`;
    }
}