import { booksSorter } from './books-sorter';

describe('booksSorter function', () => {
  it('should order books array alphabetically', () => {
    const booksArray = [
      {
        title: 'High Stakes',
        author: 'Danielle Steel',
      },
      {
        title: 'House Of Sky And Breath',
        author: 'Sarah J. Maas',
      },
      {
        title: 'One Italian Summer',
        author: 'Rebecca Serle',
      },
    ];

    const sortedArrayByAuthor = booksSorter(booksArray, 'author');

    expect(sortedArrayByAuthor[0].author).toBe('Danielle Steel');
    expect(sortedArrayByAuthor[1].author).toBe('Rebecca Serle');
    expect(sortedArrayByAuthor[2].author).toBe('Sarah J. Maas');
  });

  it('should return an empty array', () => {
    const booksArray = undefined;
    const sortedArray = booksSorter(booksArray, 'title');

    expect(sortedArray).toStrictEqual([]);
  });
});
