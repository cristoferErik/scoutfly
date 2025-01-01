package com.scoutfly.com.scoutfly.util.helpers;

import java.time.LocalDate;

public class Converters {
    public static LocalDate convertToLocalDate(String value) {
        if (value != null && !value.isEmpty()) {
            return LocalDate.parse(value);
        }
        return null;
    }
    public static  <T extends Enum<T>> T convertToEnum(Class<T> enumClass, String value) {
        if (value != null && !value.isEmpty()) {
            try {
                return Enum.valueOf(enumClass, value.toUpperCase());
            } catch (IllegalArgumentException e) {
                return null;  // O manejar el error de alguna otra forma
            }
        }
        return null;
    }
    public static<T> String valueToStringIsEmpty(T value) {
        return value == null ? "" : value.toString();
    }
}
