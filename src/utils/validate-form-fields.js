const isEmpty = str => str.trim().length === 0;

export const validateFormFields = values => {
  const IS_IMAGE_URL = /^(http(s?):)([\s\w./|-])*\.+(?:jpg|gif|png)+$/;
  const fields = Object.keys(values);
  const Errors = {};

  fields.forEach(item => {
    if (isEmpty(values[item]) && !item.includes('image')) {
      Errors[item] = `Please provide a value for ${item}`;
    }
    if (item.includes('image') && !IS_IMAGE_URL.test(values[item])) {
      Errors[item] = `Please provide an image URL`;
    }
  });

  return {
    isValid: Object.keys(Errors).length === 0,
    errors: { ...Errors },
  };
};

export default validateFormFields;
