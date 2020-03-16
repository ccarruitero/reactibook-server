const isNotEmpty = (fieldValue) => {
  return fieldValue.length > 0;
}

export const isValid = (fieldName, fieldValue) => {
  switch (fieldName) {
    case 'email':
      return isNotEmpty(fieldValue) && /\w+@\w+\.\w/.test(fieldValue);
    default:
      return isNotEmpty(fieldValue);
  }
};
