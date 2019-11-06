import $ from 'jquery';
import api from './api';
import 'normalize.css';
import './index.css';
import STORE from './store.js';
import bookmarks from './bookmarks.js'


// api.createBookmark('google','5','http://www.google.com','somethings',false)
// const createBookmark = function(title,rating,url,description,expanded)

const main = function () {
  //console.log(STORE)
  bookmarks.bindEventListeners();
  bookmarks.render();
  //api.getBookmarks();
  
};

$(main);
