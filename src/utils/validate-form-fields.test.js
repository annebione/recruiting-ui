import { validateFormFields } from './validate-form-fields';

describe('validateFormFields function', () => {
  it('should return a valid form state', () => {
    const formFields = {
      title: 'Test title',
      author: 'Test author',
      book_image: 'https://covers.openlibrary.org/b/id/8010154-L.jpg',
    };

    const formState = validateFormFields(formFields);

    expect(formState.errors).toStrictEqual({});
    expect(formState.isValid).toStrictEqual(true);
  });

  it('should return an invalid form state', () => {
    const formFields = {
      title: 'Test title',
      author: '',
      book_image: '',
    };

    const formState = validateFormFields(formFields);

    expect(formState.errors).toStrictEqual({
      author: 'Please provide a value for author',
      book_image: 'Please provide an image URL',
    });
    expect(formState.isValid).toStrictEqual(false);
  });
});
