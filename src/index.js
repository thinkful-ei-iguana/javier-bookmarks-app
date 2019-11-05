import $ from 'jquery';
import api from './api';
import 'normalize.css';
import './index.css';
import store from './store.js';
import bookmarks from './bookmarks.js'





const main = function () {

  //bookmarks.bindEventListeners();
  bookmarks.render();
  
};

$(main);
