export const isNotEmpty = (fieldValue) => fieldValue.length > 0;

const isValid = (fieldName, fieldValue, valuesObj = {}) => {
  switch (fieldName) {
    case 'email':
      return isNotEmpty(fieldValue) && /\w+@\w+\.\w/.test(fieldValue);
    case 'passwordConfirmation':
      return isNotEmpty(fieldValue) && valuesObj.password === fieldValue;
    default:
      return isNotEmpty(fieldValue);
  }
};

export default isValid;
