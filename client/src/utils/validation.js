const isNotEmpty = (fieldValue) => fieldValue.length > 0;

const isValid = (fieldName, fieldValue) => {
  switch (fieldName) {
    case 'email':
      return isNotEmpty(fieldValue) && /\w+@\w+\.\w/.test(fieldValue);
    default:
      return isNotEmpty(fieldValue);
  }
};

export default isValid;
