import { describe, expect, test } from '@jest/globals';
import { TextFormatter } from '../helpers/TextFormatter';
import { SelectionInfoError } from '../errors/SelectionInfoError';

describe(`Класс ${TextFormatter.name}`, () => {
    test(`Выбрасывает ${SelectionInfoError.name}, если переданы неверные данные о выделении текста`, () => {
        expect(() => {
            new TextFormatter("abc",
                {
                    selectionStart: -1,
                    selectionEnd: 0
                },
                "bold"
            )
        }).toThrowError(SelectionInfoError);

        expect(() => {
            new TextFormatter("abc",
                {
                    selectionStart: 0,
                    selectionEnd: -1
                },
                "bold"
            )
        }).toThrowError(SelectionInfoError);

        expect(() => {
            new TextFormatter("abc",
                {
                    selectionStart: -1,
                    selectionEnd: -1
                },
                "bold"
            )
        }).toThrowError(SelectionInfoError);

        expect(() => {
            new TextFormatter("abc",
                {
                    selectionStart: 4,
                    selectionEnd: 0
                },
                "bold"
            )
        }).toThrowError(SelectionInfoError);

        expect(() => {
            new TextFormatter("abc",
                {
                    selectionStart: 0,
                    selectionEnd: 4
                },
                "bold"
            )
        }).toThrowError(SelectionInfoError);

        expect(() => {
            new TextFormatter("abc",
                {
                    selectionStart: 4,
                    selectionEnd: 4
                },
                "bold"
            )
        }).toThrowError(SelectionInfoError);

        expect(() => {
            new TextFormatter("abc",
                {
                    selectionStart: 3,
                    selectionEnd: 0
                },
                "bold"
            )
        }).toThrowError(SelectionInfoError);
    });

    describe(`Метод ${TextFormatter.expandSelection.name}`, () => {
        test(`Возвращает корректный результат`, () => {
            expect(
                TextFormatter.expandSelection("", {
                    selectionStart: 0,
                    selectionEnd: 0
                })
            ).toEqual({ selectionStart: 0, selectionEnd: 0 });

            expect(
                TextFormatter.expandSelection("abc", {
                    selectionStart: 3,
                    selectionEnd: 3
                })
            ).toEqual({ selectionStart: 0, selectionEnd: 3 });

            expect(
                TextFormatter.expandSelection("abc abc", {
                    selectionStart: 3,
                    selectionEnd: 3
                })
            ).toEqual({ selectionStart: 0, selectionEnd: 3 });

            expect(
                TextFormatter.expandSelection("abc abc", {
                    selectionStart: 3,
                    selectionEnd: 3
                })
            ).toEqual({ selectionStart: 0, selectionEnd: 3 });

            expect(
                TextFormatter.expandSelection("abc\nabc", {
                    selectionStart: 3,
                    selectionEnd: 3
                })
            ).toEqual({ selectionStart: 0, selectionEnd: 3 });

            expect(
                TextFormatter.expandSelection("abc\nabc", {
                    selectionStart: 3,
                    selectionEnd: 3
                })
            ).toEqual({ selectionStart: 0, selectionEnd: 3 });

            expect(
                TextFormatter.expandSelection("abc\nabc\nabc", {
                    selectionStart: 4,
                    selectionEnd: 7
                })
            ).toEqual({ selectionStart: 4, selectionEnd: 7 });

            expect(
                TextFormatter.expandSelection("abc\nabc\nabc", {
                    selectionStart: 2,
                    selectionEnd: 8
                })
            ).toEqual({ selectionStart: 0, selectionEnd: 11 });
        });
    });
});