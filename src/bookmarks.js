import $ from 'jquery';
import api from './api';
import store from './store';



const bookMarkHtml = function(){
$('#main').html(`
<h1>hello</h1>
`)
}

const render = function(){
    return bookMarkHtml()
}

export default{
    render,
}