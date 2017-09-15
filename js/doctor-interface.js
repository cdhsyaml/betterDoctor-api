import { BetterDoctor } from './../js/doctor.js';
var apiKey = require('./../.env').apiKey;

const moment = require('moment');

$(document).ready(function() {
  let displayOutput = function(doctors){
    doctors.forEach(function(doctor){
      console.log(doctor);
    //  let stolenDate = moment(bike.date_stolen).format('MM-DD-YYYY');

    $('#doctor-list').append(`<li> <span class="doctors"> ${doctor.title} ${doctor.firstName} ${doctor.lastName} </span> </li>`);
    });
  };

  $('#doctorSearch').submit(function(event){
    event.preventDefault();
    let inputName = $('#inputName').val();
    $('#inputName').val("");
    let inputMedicalIssue = $('#med-issue');
    $('#med-issue').val("");

    let betterDoctor = new BetterDoctor(inputMedicalIssue, inputName);
      doctor.getDoctors(displayOutput);
      $("#doctor-list").last().on('click', '.doctors',function(){
      console.log(`doctor details ${doctor.title}`);
      $(".show-doctor").show();
      $(".show-doctor p").text("textone");
    });
  });
});
