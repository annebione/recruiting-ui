export const booksSorter = (books, sortingCriteria) => {
  if (!books) {
    return [];
  }

  return books.sort(
    ({ [sortingCriteria]: firstItem }, { [sortingCriteria]: secondItem }) => {
      if (firstItem < secondItem) {
        return -1;
      }
      if (firstItem > secondItem) {
        return 1;
      }
      return 0;
    }
  );
};

export default booksSorter;
