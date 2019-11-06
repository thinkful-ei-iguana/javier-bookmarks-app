import $ from 'jquery';
import api from './api';
import STORE from './store';

const generateBookMarkHtml = function(bookmark){
    const bookmarkExpand = !bookmarkExpand.expand ? 'bookmark-hide': '';
    // const bookmarkRating = generateStarRating(bookmarkInd);
    //${bookmarkRating}
    return `
      <div class="bookmark-condensed-container js-bookmark-condensed-container" data-item-id="${bookmark.id}">
        <button class="expand-button js-expand-button">...</button>  
        <h2 class="bookmark-name js-bookmark-name">${bookmark.title}</h2>
        <div class="bookmark-rating js-bookmark-rating">
          <!--bookmarkRating here -->
        </div>
        <div class="bookmark-expand js-bookmark-expand-container ${bookmarkExpand}">
          <p>Description: ${bookmark.desc}</p>
          <div class="actions">
            <a class="bookmark-URL js-bookmark-URL" href=${bookmark.url} target="_blank">Visit Site!</a>
            <button class="delete-button js-delete-button">Delete</button>
          </div>
        </div>
      </div>
    `;

}
//loop through bookmarks and display
const generateBookMarksHtml = function(bookmarks){
   console.log('bookmarks?',bookmarks)

    const bookmarksHtml = bookmarks.map(bookmark => generateBookMarkHtml(bookmark));

  console.log('bookmarkshtml:',bookmarksHtml)
    return bookmarksHtml;
}

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
    

const generateBookMarkAddHtml = function(){
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

  //change on click adding: false => adding: true
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
        let jsonObj = serializeJson(formElement);
        
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
    // render bookmark form if adding: true
    if(STORE.adding){
        $('.user-controls').toggleClass('bookmark-hide');
        $('.js-error-container-main').toggleClass('bookmark-hide');
        $('.js-bookmark-container').html(generateBookMarkAddHtml());
        //renderError();
        bindEventListeners();
        STORE.adding = false
        //render bookmarks if any
    } else if(!STORE.adding) {
        let bookmarksCopy = [...STORE.bookmarks]
        console.log('copy?',bookmarksCopy)
        console.log('objs in store?',STORE.bookmarks)
        // send bookmarks object to generate html
        const bookmarkHtml = generateBookMarksHtml(STORE.bookmarks)
        // add the html to the bookmark container
        $('.js-bookmark-container').html(bookmarkHtml);
        bindEventListeners();
    }
     //renderError();
}

const bindEventListeners = function(){
    handleBookMarkAdd();
    handleBookmarkSubmit();
}

export default{
   bindEventListeners,
   render,
}