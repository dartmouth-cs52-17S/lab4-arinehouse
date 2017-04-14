import $ from 'jquery';
import './style.scss';

$('#main').html('You\'ve been on this page for 1 second.');

let num = 1;

setInterval(() => {
  num += 1;
  if (num >= 60) {
    $('#main').html(`You've been on this page for ${Math.floor(num / 60)} minutes and ${num % 60} seconds.`);
  } else {
    $('#main').html(`You've been on this page for ${num} seconds.`);
  }
}, 1000);
