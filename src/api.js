const BASE_URL = 'https://thinkful-list-api.herokuapp.com/javier-michael';

const getItems = function () {
  return fetch(`${BASE_URL}/items`);
  //return Promise.resolve('A successful response!');
};

const createItem = function(name){
  let newItem = JSON.stringify({name: name});
 
  return fetch(`${BASE_URL}/items`, {
    method: 'POST',
    headers: {'Content-type': 'application/json'},
    body: newItem
  });
};

const updateItem = function(id, updateData){
  let json = JSON.stringify(updateData);
  return fetch(`${BASE_URL}/items/${id}`,{
    method: 'PATCH',
    headers: {'Content-type': 'application/json'},
    body: json
  });
};

export default {
  getItems,
  createItem,
  updateItem
};