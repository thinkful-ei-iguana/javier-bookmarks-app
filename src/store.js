let bookmarks = []
let adding = false
let error = null
let filter = null

const addBookmark = function (bookmark) {
  // adds expand tracking locally
  bookmarks.forEach(bookmarkInd => (bookmarkInd.expand = false));

  // adds bookmark to store
  bookmarks.push(bookmark);
  // toggles adding state
  adding = false;
};

export default {
  bookmarks,
  adding,
  error,
  filter,
  addBookmark,
}