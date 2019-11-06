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
  // adds bookmark to store
  bookmarks.push(bookmark);
  // toggles adding state
  adding = false;
};

const expandBookmark = function(id){
  //find id to expand
  let expandedBookmark = bookmarks.find(bookmark => bookmark.id === id)
  //toggle expand value
  if(expandedBookmark.expand){
    expandedBookmark.expand = false;
  } else {
    expandedBookmark.expand = true
  }
}

const deleteBookmark = function(id){
 this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
}

const setAdding = function(param){
  this.adding = param
}

export default {
  bookmarks,
  adding,
  error,
  filter,
  addBookmark,
  expandBookmark,
  deleteBookmark,
  setAdding,
}