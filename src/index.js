import $ from 'jquery';
import api from './api';
import 'normalize.css';
import './index.css';
import STORE from './store.js';
import bookmarks from './bookmarks.js'


// api.createBookmark('google','5','http://www.google.com','somethings',false)
// const createBookmark = function(title,rating,url,description,expanded)

const main = function () {
  api.getBookmarks()
  // Once bookmarks are retrieved (bookmark structure => [{bookmark}, {bookmark}, {bookmark}] )
    .then(res => res.json())
    .then(res => {
      console.log(res)
      res.forEach(bookmark => STORE.addBookmark(bookmark))
    })
      
      // render the page
      bookmarks.render();
    console.log('should be obj in bookmarks:', STORE.bookmarks)
  bookmarks.bindEventListeners();
  bookmarks.render();
  //api.getBookmarks();
  
};

$(main);
