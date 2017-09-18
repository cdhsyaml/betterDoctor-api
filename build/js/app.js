(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.apiKey = "4aac0a8c2cfc49f5ff9a9ada39850603";

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var apiKey = require('./../.env').apiKey;

var BetterDoctor = exports.BetterDoctor = function () {
  function BetterDoctor(inputName, inputCondition, specialty) {
    _classCallCheck(this, BetterDoctor);

    this.inputName = inputName;
    this.inputCondition = inputCondition;
    this.specialty = specialty;
  }

  _createClass(BetterDoctor, [{
    key: "filterDoctorData",
    value: function filterDoctorData(doctorResults) {
      var doctorArray = [];
      var doctors = [];
      doctorResults.data.forEach(function (doctor) {
        doctors.push({
          "uid": doctor.uid,
          "first_name": doctor.profile.first_name,
          "lastName": doctor.profile.last_name,
          "title": doctor.profile.title,
          "website": doctor.website
        });
        doctorArray.push(doctor);
      });
      return doctorArray;
    }
  }, {
    key: "getDoctors",
    value: function getDoctors(doctorName) {
      var _this = this;

      var filteredDoctors = void 0;
      var results = void 0;
      var url = "https://api.betterdoctor.com/2016-03-01/doctors?user_key=4aac0a8c2cfc49f5ff9a9ada39850603" + "&name=" + this.inputName + "&limit=20";
      $.get(url).then(function (data) {
        filteredDoctors = _this.filterDoctorData(data);
        doctorName(filteredDoctors);
      }).fail(function () {
        console.log("Oops something went wrong!!!!");
        filteredDoctors = [];
      });
    }
  }, {
    key: "getSpecialties",
    value: function getSpecialties(displayResults) {
      var _this2 = this;

      var filterSpecialties = void 0;
      var results = void 0;
      var uid = void 0;
      var filteredDoctors = void 0;
      var url = "https://api.betterdoctor.com/2016-03-01/specialties?user_key=4aac0a8c2cfc49f5ff9a9ada39850603&fields=uid,name";

      $.get(url).then(function (data) {
        filterSpecialties = _this2.getSpecialityUid(data, _this2.inputCondition);
        displayResults(filterSpecialties);
      }).fail(function () {
        console.log("Oops something went wrong!!!!");
        filterSpecialties = [];
      });
    }
  }, {
    key: "getDoctorsBySpecialties",
    value: function getDoctorsBySpecialties(filterSpecialties) {
      var _this3 = this;

      var filteredDoctors = void 0;
      if (this.specialty != null) {
        var url = "https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=" + this.specialty + "&location=45.55%2C-122.63%2C10&user_location=45.55%2C-122.63&skip=0&limit=20&user_key=4aac0a8c2cfc49f5ff9a9ada39850603";
        $.get(url).then(function (data) {
          filteredDoctors = _this3.filterDoctorData(data);
          filterSpecialties(filteredDoctors);
        }).fail(function () {
          console.log("Oops something went wrong!!!!");
          filteredDoctors = [];
        });
      } else {
        console.log("Specialyst not found!");
      }
    }
  }, {
    key: "getSpecialityUid",
    value: function getSpecialityUid(filterSpecialties, inputCondition) {
      var uid = void 0;
      var specialysts = [];
      filterSpecialties.data.forEach(function (filterSpecialty) {
        if (filterSpecialty.name.includes(inputCondition)) {
          uid = filterSpecialty.uid;
          specialysts.push({
            "uid": filterSpecialty.uid,
            "specialyst_name": filterSpecialty.name });
        }
      });
      return specialysts;
    }
  }]);

  return BetterDoctor;
}();

},{"./../.env":1}],3:[function(require,module,exports){
'use strict';

var _doctor = require('./../js/doctor.js');

var apiKey = require('./../.env').apiKey;

$(document).ready(function () {

  var displayResults = function displayResults(doctors) {

    var isDoctorFound = false;
    doctors.forEach(function (doctor) {
      isDoctorFound = true;
      $('#doctor-list').append(' <span class="doctors">\n        </br>\n        <b>Title:</b> ' + doctor.profile.title + ' </br>\n        <b>First Name:</b> ' + doctor.profile.first_name + ' </br>\n        <b>Last Name:</b> ' + doctor.profile.last_name + ' </br>');

      //display doctor description
      if (doctor.specialties[0] != null && doctor.specialties[0].description != null) {
        $('#doctor-list').append('\n        <b>Description:</b> ' + doctor.specialties[0].description + '</br>');
      } else {
        $('#doctor-list').append(' <b>Description:</b> Description is unavailable');
      }
      //display doctor visit_address
      if (doctor.practices[0] != null && doctor.practices[0].visit_address != null) {
        $('#doctor-list').append('\n          <b>City:</b> ' + doctor.practices[0].visit_address.city + '</span> </br>\n          <b>State:</b> ' + doctor.practices[0].visit_address.state + '</span> </br>\n          <b>Zip:</b> ' + doctor.practices[0].visit_address.zip + '</span> </br>');
      } else {
        $('#doctor-list').append(' <b>City:</b> <span class="doctors"> City is unavailable</span></br>');
      }
      //display if doctor accepts accepts_new_patients
      if (doctor.practices[0] != null && doctor.practices[0].accepts_new_patients != null) {
        $('#doctor-list').append('\n            <b>Accepting New Patients:</b> Yes </span> </br>');
      } else {
        $('#doctor-list').append(' <b>Accepting New Patients:</b> No </span> </br>');
      }
      // display doctor phones

      if (doctor.practices[0] != null && doctor.practices[0].phones != null) {

        doctor.practices[0].phones.forEach(function (phone) {
          $('#doctor-list').append('\n      <b>Phone # ' + phone.type + ' :</b> ' + phone.number + '</span> </br>');
        });
      } else {

        $('#doctor-list').append('\n      <b>Phone #:</b> Phone Number is unavailable</span>  </br>');
      }

      // display doctor website
      if (doctor.practices[0] != null) {
        var isWebSiteAvailable = false;
        doctor.practices.forEach(function (practice) {
          if (practice.website != null) {
            $('#doctor-list').append('\n        <b>website :</b> ' + practice.website + '</span> </br>');
            isWebSiteAvailable = true;
          }
        });
        if (!isWebSiteAvailable) {
          $('#doctor-list').append('\n          <b>website :</b> website is unavailable</span>  </br></br>');
        }
        $('#doctor-list').append('</br>');
      }
    });

    if (!isDoctorFound) {
      $('#doctor-list').append('<li> <span> No doctors meet the criteria</span> </li>');
    }
  };

  var displaySpecialyst = function displaySpecialyst(specialysts) {

    specialysts.forEach(function (specialyst) {
      $('#specialty-list').append('<li class=\'selected\' id=' + specialyst.uid + '><a href="#">\n    ' + specialyst.specialyst_name + '</li> </br></br>');
    });
  };

  $('#specialty-list').click(function () {

    var id = $('#specialty-list li.selected').attr('id');

    var betterDoctor = new _doctor.BetterDoctor(null, null, id);
    betterDoctor.getDoctorsBySpecialties(displayResults);
    console.log($(this).text());
  });
  $('#doctorSearch').submit(function (event) {
    event.preventDefault();
    var inputName = $('#inputName').val();
    var inputCondition = $('#inputCondition').val();
    $('#inputName').val("");
    $('#inputCondition').val("");
    var betterDoctor = new _doctor.BetterDoctor(inputName, inputCondition);

    if (inputName != null && inputName.length > 0) {
      betterDoctor.getDoctors(displayResults);
    } else if (inputCondition != null && inputCondition.length > 0) {
      betterDoctor.getSpecialties(displaySpecialyst);
    } else {
      $('#doctor-list').append(' <span> Invalid input! </span>');
    }
    $("#doctor-list").last().on('click', '.doctors', function () {
      $(".show-doctor").show();
      $(".show-doctor p").text("textone");
    });
  });
});

},{"./../.env":1,"./../js/doctor.js":2}]},{},[3]);
