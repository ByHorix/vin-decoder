function containsSpecialChars(str) {
  const specialChars =
      /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  return specialChars.test(str);
}

export const isValid = (value) => value.length === 17 && !containsSpecialChars(value);