var apiKey = require('./../.env').apiKey;

import {
  BetterDoctor
} from './../js/doctor.js';

$(document).ready(function() {

  let displayResults = function(doctors) {

  let isDoctorFound =false;
    doctors.forEach(function(doctor) {
      isDoctorFound = true;
      $('#doctor-list').append(` <span class="doctors">
        </br>
        <b>Title:</b> ${doctor.profile.title} </br>
        <b>First Name:</b> ${doctor.profile.first_name} </br>
        <b>Last Name:</b> ${doctor.profile.last_name} </br>`);

      //display doctor description
      if (doctor.specialties[0] != null && doctor.specialties[0].description != null) {
        $('#doctor-list').append(`
        <b>Description:</b> ${doctor.specialties[0].description}</br>`)

      } else {
        $('#doctor-list').append(` <b>Description:</b> Description is unavailable`);
      }
      //display doctor visit_address
      if (doctor.practices[0] != null && doctor.practices[0].visit_address != null) {
        $('#doctor-list').append(`
          <b>City:</b> ${doctor.practices[0].visit_address.city}</span> </br>
          <b>State:</b> ${doctor.practices[0].visit_address.state}</span> </br>
          <b>Zip:</b> ${doctor.practices[0].visit_address.zip}</span> </br>`);
      } else {
        $('#doctor-list').append(` <b>City:</b> <span class="doctors"> City is unavailable</span></br>`);
      }
      //display if doctor accepts accepts_new_patients
      if (doctor.practices[0] != null && doctor.practices[0].accepts_new_patients != null) {
        $('#doctor-list').append(`
            <b>Accepting New Patients:</b> Yes </span> </br>`);
      } else {
        $('#doctor-list').append(` <b>Accepting New Patients:</b> No </span> </br>`);
      }
      // display doctor phones

      if (doctor.practices[0] != null && doctor.practices[0].phones != null) {

        doctor.practices[0].phones.forEach(function(phone) {
          $('#doctor-list').append(`
      <b>Phone # ${phone.type} :</b> ${phone.number}</span> </br>`);
        })

      } else {

        $('#doctor-list').append(`
      <b>Phone #:</b> Phone Number is unavailable</span>  </br>`);

      }

      // display doctor website
      if (doctor.practices[0] != null) {
        let isWebSiteAvailable = false;
        doctor.practices.forEach(function(practice) {
          if (practice.website != null) {
            $('#doctor-list').append(`
        <b>website :</b> ${practice.website}</span> </br>`);
            isWebSiteAvailable = true;
          }
        });
        if (!isWebSiteAvailable) {
          $('#doctor-list').append(`
          <b>website :</b> website is unavailable</span>  </br></br>`);
        }
        $('#doctor-list').append(`</br>`);
      }
    });

  if(!isDoctorFound) {
      $('#doctor-list').append(`<li> <span> No doctors meet the criteria</span> </li>`);
  }
  };

  let displaySpecialyst = function(specialysts) {

      specialysts.forEach(function(specialyst) {
    $('#specialty-list').append(`<li class='selected' id=${specialyst.uid}><a href="#">
    ${specialyst.specialyst_name}</li> </br></br>`)
  });

  };

$('#specialty-list').click(function() {

  var id = $('#specialty-list li.selected').attr('id');
  //alert(id);
 //alert($('ul#specialty-list > li.selected a').text());
  let betterDoctor = new BetterDoctor(null, null, id);
  betterDoctor.getDoctorsBySpecialties(displayResults);
  console.log( $(this ).text() );
});
  $('#doctorSearch').submit(function(event) {

    event.preventDefault();
    $("#specialty-list").empty();
    $( '#doctor-list' ).empty();
      let inputName = $('#inputName').val();
    let inputCondition = $('#inputCondition').val();
    $('#inputName').val("");
    $('#inputCondition').val("");

    let betterDoctor = new BetterDoctor(inputName, inputCondition);

    if (inputName != null && inputName.length > 0) {
      betterDoctor.getDoctors(displayResults);
    } else if (inputCondition != null && inputCondition.length > 0)  {
      betterDoctor.getSpecialties(displaySpecialyst);
    }
    else{
      $('#doctor-list').append(` <span> Invalid input! </span>`);
    }
    $("#doctor-list").last().on('click', '.doctors', function() {
      $(".show-doctor").show();
      $(".show-doctor p").text("textone");
    });
  });

});
