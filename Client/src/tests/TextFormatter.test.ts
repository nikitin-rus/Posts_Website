import { describe, expect, test } from '@jest/globals';
import { TextFormatter } from '../helpers/TextFormatter';
import { SelectionInfoError } from '../errors/SelectionInfoError';

describe(`Класс ${TextFormatter.name}`, () => {
    test(`Выбрасывает ${SelectionInfoError.name}, если переданы неверные данные о выделении текста`, () => {
        expect(() => {
            new TextFormatter("bold",
                {
                    text: "abc",
                    selectionStart: -1,
                    selectionEnd: 0
                }
            )
        }).toThrowError(SelectionInfoError);

        expect(() => {
            new TextFormatter("bold",
                {
                    text: "abc",
                    selectionStart: 0,
                    selectionEnd: -1
                }
            )
        }).toThrowError(SelectionInfoError);

        expect(() => {
            new TextFormatter("bold",
                {
                    text: "abc",
                    selectionStart: -1,
                    selectionEnd: -1
                }
            )
        }).toThrowError(SelectionInfoError);

        expect(() => {
            new TextFormatter("bold",
                {
                    text: "abc",
                    selectionStart: 4,
                    selectionEnd: 0
                }
            )
        }).toThrowError(SelectionInfoError);

        expect(() => {
            new TextFormatter("bold",
                {
                    text: "abc",
                    selectionStart: 0,
                    selectionEnd: 4
                }
            )
        }).toThrowError(SelectionInfoError);

        expect(() => {
            new TextFormatter("bold",
                {
                    text: "abc",
                    selectionStart: 4,
                    selectionEnd: 4
                }
            )
        }).toThrowError(SelectionInfoError);

        expect(() => {
            new TextFormatter("bold",
                {
                    text: "abc",
                    selectionStart: 3,
                    selectionEnd: 0
                }
            )
        }).toThrowError(SelectionInfoError);
    });

    describe(`Метод ${TextFormatter.prototype.findSelectedText.name}`, () => {
        test(`Возвращает null, если строка пустая`, () => {
            expect(
                new TextFormatter("bold",
                    {
                        text: "",
                        selectionStart: 0,
                        selectionEnd: 0
                    }
                ).findSelectedText()
            ).toBe(null);
        });

        test(`Возвращает null, если начальная позиция выделения равна длине строки`, () => {
            expect(
                new TextFormatter("bold",
                    {
                        text: "abc",
                        selectionStart: 3,
                        selectionEnd: 3
                    }
                ).findSelectedText()
            ).toBe(null);
        });

        test(`Возвращает null, если начальная позиция выделения указывает на пробельный символ`, () => {
            expect(
                new TextFormatter("bold",
                    {
                        text: "abc abc",
                        selectionStart: 3,
                        selectionEnd: 3
                    }
                ).findSelectedText()
            ).toBe(null);

            expect(
                new TextFormatter("bold",
                    {
                        text: "abc\nabc",
                        selectionStart: 3,
                        selectionEnd: 3
                    }
                ).findSelectedText()
            ).toBe(null);

            expect(
                new TextFormatter("bold",
                    {
                        text: "abc\tabc",
                        selectionStart: 3,
                        selectionEnd: 3
                    }
                ).findSelectedText()
            ).toBe(null);
        });

        test(`Возвращает null, если начальная позиция выделения указывает на пробельный символ`, () => {
            expect(
                new TextFormatter("bold",
                    {
                        text: "abc abc abc",
                        selectionStart: 0,
                        selectionEnd: 0
                    }
                ).findSelectedText()
            ).toEqual({ left: "", selected: "abc", right: " abc abc" });

            expect(
                new TextFormatter("bold",
                    {
                        text: "abc\nabc\nabc",
                        selectionStart: 4,
                        selectionEnd: 6
                    }
                ).findSelectedText()
            ).toEqual({ left: "abc\n", selected: "abc", right: "\nabc" });
        });
    });
});