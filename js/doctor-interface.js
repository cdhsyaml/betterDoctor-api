import { Bike } from './../js/bike.js';
const moment = require('moment');

$(document).ready(function() {
  let displayOutput = function(bikes){
    bikes.forEach(function(bike){
      console.log(bike);
      let stolenDate = moment(bike.date_stolen).format('MM-DD-YYYY');
    //  $('#bikeDetails').append(`<li> <span class = "bikes"> ${bike.title} ${stolenDate} ${bike.serial} <span> </li>` )
    $('#bike-list').append(`<li> <span class="bikes"> ${bike.title} ${stolenDate} ${bike.serial} </span> </li>`);
    });
  };

  $('#bikeSearch').submit(function(event){
    event.preventDefault();
    let inputZip = $('zip').val();
    $('#zip').val("");

    let bike = new Bike(inputZip);
      bike.getBikes(displayOutput);
      $("#bike-list").last().on('click', '.bikes',function(){
      console.log(`Bike details ${bike.title}`);
      $(".show-bike").show();
      $(".show-bike p").text("textone");
    });
  });
});
