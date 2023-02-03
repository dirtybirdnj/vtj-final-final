  // Returns all dates in the same string
  export const getDateString = (date) => {
    const postDate = new Date(date);

    return postDate.toLocaleString([], {dateStyle: 'short'});
  }