import React, { useState, useEffect } from 'react';

export default function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(
      () => {
        // Выставить debouncedValue равным value (переданное значение)
        // после заданной задержки
        const handler = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);

        return () => {
          clearTimeout(handler);
        };
      },
      [value]
  );

  return debouncedValue;
}