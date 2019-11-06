let bookmarks = []
let adding = false
let error = null
let filter = false

const addBookmark = function (bookmark) {
  // adds expand locally
  for(let i = 0; i < bookmarks.length; i++){
    if(bookmarks[i]){
      bookmarks[i].expand = false;
    }
  }
  // bookmarks.forEach(bookmarkInd => (bookmarkInd.expand = false));

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