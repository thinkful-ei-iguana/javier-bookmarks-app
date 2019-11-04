import $ from 'jquery';
import api from './api';
import 'normalize.css';
import './index.css';
import store from './store.js';

import shoppingList from './shopping-list';
// api.createItem('Pears');

api.getItems()
  .then(res => res.json())
  .then((items) => {
    console.log(items)
    items.forEach((item) => store.addItem(item));
    shoppingList.render();
  });



const main = function () {
  api.getItems()
  .then(res => res.json())
  .then(items => {
    items.forEach(item => store.addItem(item));
    shoppingList.render();


  // api.getItems()
  // .then(res => res.json())
  // .then((items) => {
  //   console.log(api.BASE_URL);
  //   store.items = items;
  //   const item = store.items[1];
  //   console.log(item);
  //   console.log("current name: " + item.name);
  //   store.findAndUpdate(item.id, { name: "foobar" });
  //   console.log("new name: " + item.name);
  // })
  //.then(res => res.json()) breaking code
  // .then(() => console.log('updated!'));
  

  
  shoppingList.bindEventListeners();
  shoppingList.render();
  });
};

$(main);
