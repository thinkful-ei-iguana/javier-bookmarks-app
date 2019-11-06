import $ from 'jquery';
import api from './api';
import STORE from './store';



const generateHeaderUserControls = function() {
    $('#main').html(`
    <!-- BOOKMARKS HEADER -->
    <header role="banner">
    <h1>Bookmark This</h1>
  </header>
<!-- BOOKMARKS CONTROLS-->
  <div class="main-container" role="main">
    <div class="flex-container">
      <section class="user-controls">
        <button class="button-add js-button-add">+Add</button>
        <div class="filter-container">
          <label for="star-rating-filter">Filter by:</label>
          <select name="star-rating" id="star-rating-filter">
            <option value="0">minimum rating</option>
            <option value="5">5 stars</option>
            <option value="4">4 stars+</option>
            <option value="3">3 stars+</option>
            <option value="2">2 stars+</option>
            <option value="1">See All</option>
          </div>
        </select>
      </section>
  <!-- BOOKMARKS DISPLAY -->
      <section class="bookmark-container js-bookmark-container">
      </section>
    </div>
  </div>`)
  };
    

const generateBookMakrHtml = function(){
   return `
<div class="add-bookmark-container">
<form class="add-bookmark-form"> 
  <fieldset role="group">
    <legend class="form">Bookmark Information</legend>
    <label class="form" for="title">Title:</label><br>
    <input type="text" id="title" name="title" ><br>
    <div class"bookmark-hide" role="radiogroup" aria-labelledby="rating">
      <label class="form" id="rating">Rating:</label><br>
      <label class="bookmark-hide" for="rating5">5 stars</label>
      <input type="radio" name="rating" id="rating5" value="5" checked>5 stars
      <label class="bookmark-hide" for="rating4">4 stars</label>
      <input type="radio" name="rating" id="rating4" value="4">4 stars
      <label class="bookmark-hide" for="rating3">3 stars</label>
      <input type="radio" name="rating" id="rating3" value="3">3 stars
      <label class="bookmark-hide" for="rating2">2 stars</label>
      <input type="radio" name="rating" id="rating2" value="2">2 stars
      <label class="bookmark-hide" for="rating1">1 star</label>
      <input type="radio" name="rating" id="rating1" value="1">1 star<br>
    </div>
    <lable class="form">Description:<br>
      <textarea name="desc" id="bookmark-description" cols="100" rows="10" ></textarea>
    </lable><br>
    <label class="form" for="url">Bookmark URL:</label><br>
    <input type="url" name="url" id="url" ><br>
    <div class="url-warning-container">
      <p class="url-warning"> URL must include HTTP/HTTPS</p>
    </div>
    <div class="actions">
      <input type="submit" value="Submit">
      <input type="reset" value="Reset"> 
      <input type="button" value="Cancel" class="js-cancel-button">
    </div>
  </fieldset>
</form>
</div>
`;
}

const serializeJson = function(form) {
    const formData = new FormData(form);
    const o = {};
    formData.forEach((val, name) => o[name] = val);
    return JSON.stringify(o);
  };

const handleBookMarkAdd = function(){
    $('#main').on('click','.js-button-add',function() {
        //console.log('add button was clicked')
        if(!STORE.adding){
            STORE.adding = true;
        }
        render();
    })
}

const handleBookmarkSubmit = function(){
    $('.add-bookmark-form').submit(function(event){
        event.preventDefault();
       
        let formElement = $('.add-bookmark-form')[0];
        console.log('this is the formElement',formElement);
        let jsonObj = serializeJson(formElement);
        console.log('logged jsonObj:',jsonObj);

        api.createBookmark(jsonObj)
            .then(newBookMark => {
                STORE.addBookmark(newBookMark);
                render();
            })
        render();
    })
}

const render = function(){
    $('#main').html(generateHeaderUserControls())
    
    if(STORE.adding){
        $('.user-controls').toggleClass('bookmark-hide');
        $('.js-error-container-main').toggleClass('bookmark-hide');
        $('.js-bookmark-container').html(generateBookMakrHtml());
       // renderError();
       bindEventListeners();
    }


}

const bindEventListeners = function(){
    handleBookMarkAdd();
    handleBookmarkSubmit();
}

export default{
   bindEventListeners,
   render,
}