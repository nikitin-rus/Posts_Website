import { CaretPositionError } from "../errors/formatting/CaretPositionError";
import { findWordAroundCaret as func } from "../helpers/findWordAroundCaret";
import { describe, expect, test } from '@jest/globals';

describe(`Функция ${func.name}`, () => {
    test(`Возвращает ${CaretPositionError.name}, если позиция каретки < 0`, () => {
        expect(() => func("", -1)).toThrowError(CaretPositionError);
        expect(() => func("text text text", -1)).toThrowError(CaretPositionError);
        expect(() => func("", -100)).toThrowError(CaretPositionError);
        expect(() => func("text text text", -100)).toThrowError(CaretPositionError);
    });

    test(`Возвращает ${CaretPositionError.name}, если позиция каретки > длины строки`, () => {
        expect(() => func("", 1)).toThrowError(CaretPositionError);
        expect(() => func("text text text", 100)).toThrowError(CaretPositionError);
    });

    test(`Возвращает null, если строка пустая и позиция каретки корректна`, () => {
        expect(func("", 0)).toBe(null);
    });

    test(`Возвращает null, если позиция каретки указывает на конец строки (она равна длине строки)`, () => {
        expect(func("text ", 5)).toBe(null);
    });

    test(`Возвращает null, если позиция каретки указывает на пробельный символ`, () => {
        expect(func("text ", 4)).toBe(null);
        expect(func("text text text", 9)).toBe(null);
        expect(func("text\ntext text", 4)).toBe(null);
        expect(func("text text\ttext", 9)).toBe(null);
    });

    test(`Возвращает массив с корректными индексами подстроки`, () => {
        expect(func("text text text", 1)).toEqual([0, 3]);
        expect(func("text text text", 0)).toEqual([0, 3]);
        expect(func("text\ntext\ntext", 7)).toEqual([5, 8]);
    });
});