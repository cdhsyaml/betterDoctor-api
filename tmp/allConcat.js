var apiKey = require('./../.env').apiKey;


import { BetterDoctor } from './../js/doctor.js';

const moment = require('moment');

$(document).ready(function() {
  let displayResults = function(doctors){
      doctors.forEach(function(doctor){

    $('#doctor-list').append(` <span class="doctors">
    </br>
    <b>Title:</b> ${doctor.profile.title} </br>
    <b>First Name:</b> ${doctor.profile.first_name} </br>
    <b>Last Name:</b> ${doctor.profile.last_name} </br>
    <b>Description:</b> ${doctor.specialties[0].description}</br>`);

  if(doctor.practices[0] !=null && doctor.practices[0].visit_address != null)
  {
  $('#doctor-list').append(`
  <b>City:</b> ${doctor.practices[0].visit_address.city}</span> </br>
  <b>State:</b> ${doctor.practices[0].visit_address.state}</span> </br>
  <b>Zip:</b> ${doctor.practices[0].visit_address.zip}</span> </br>`);
  }
  else
  {
      $('#doctor-list').append(` <b>City:</b> <span class="doctors"> City is unavailable</span></br>`);
  }
// phones

  if(doctor.practices[0] !=null && doctor.practices[0].phones != null)
  {

    doctor.practices[0].phones.forEach(function(phone){
      $('#doctor-list').append(`
      <b>Phone # ${phone.type} :</b> ${phone.number}</span> </br>`);
    })
  
  }
  else
  {

      $('#doctor-list').append(`
      <b>Phone #:</b> Phone Number is unavailable</span>  </br>`);

  }

  if(doctor.practices[0] != null)
  {
let isWebSiteAvailable = false;
    doctor.practices.forEach(function(practice){


      if(practice.website != null )
      {
        $('#doctor-list').append(`
        <b>website :</b> ${practice.website}</span> </br>`);
        isWebSiteAvailable = true;
      }

    })
    if(!isWebSiteAvailable)
      {

          $('#doctor-list').append(`
          <b>website :</b> website is unavailable</span>  </br></br>`);

      }

    $('#doctor-list').append(`</br>`);
  }




    });
  };


  $('#doctorSearch').submit(function(event){
    event.preventDefault();
    let inputName = $('#inputName').val();
    $('#inputName').val("");
    let inputMedicalIssue = $('#med-issue');
    $('#med-issue').val("");

    let betterDoctor = new BetterDoctor(inputName);
      betterDoctor.getDoctors(displayResults);

      $("#doctor-list").last().on('click', '.doctors',function(){

      $(".show-doctor").show();
      $(".show-doctor p").text("textone");
    });
  });
});
