import $ from 'jquery';
import api from './api';
import 'normalize.css';
import './index.css';

import shoppingList from './shopping-list';

const main = function () {
  api.getItems()
    .then(res => console.log(res));
  console.log(api.BASE_URL);
  shoppingList.bindEventListeners();
  shoppingList.render();
};

$(main);
