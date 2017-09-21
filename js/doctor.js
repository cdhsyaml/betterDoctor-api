var apiKey = require('./../.env').apiKey;

export class BetterDoctor {
  constructor(inputName, inputCondition, specialty) {
    this.inputName = inputName;
    this.inputCondition = inputCondition;
    this.specialty = specialty;
  }

  filterDoctorData(doctorResults) {
    let doctorArray = [];
    let doctors = [];
    doctorResults.data.forEach(function(doctor) {
    doctors.push({
        "uid": doctor.uid,
        "first_name": doctor.profile.first_name,
        "lastName": doctor.profile.last_name,
        "title": doctor.profile.title,
        "website": doctor.website,
      });
      doctorArray.push(doctor);
    });
    return doctorArray;
  }

  getDoctors(doctorName) {
    let filteredDoctors;
    let results;
    let url = `https://api.betterdoctor.com/2016-03-01/doctors?user_key=4aac0a8c2cfc49f5ff9a9ada39850603` + "&name=" + this.inputName + "&limit=20";
    $.get(url).then((data) => {
        filteredDoctors = this.filterDoctorData(data);
        doctorName(filteredDoctors);
      })
      .fail(() => {
        console.log("Oops something went wrong!!!!");
        filteredDoctors = [];
      });
  }

  getSpecialties(displayResults) {
    let filterSpecialties;
    let results;
    let uid;
    let filteredDoctors;
    let url = `https://api.betterdoctor.com/2016-03-01/specialties?user_key=4aac0a8c2cfc49f5ff9a9ada39850603&fields=uid,name`;

    $.get(url).then((data) => {
        filterSpecialties = this.getSpecialityUid(data, this.inputCondition);
        displayResults(filterSpecialties);
      })
      .fail(() => {
        console.log("Oops something went wrong!!!!");
        filterSpecialties = [];
      });

  }

  getDoctorsBySpecialties(filterSpecialties) {
    let filteredDoctors;
    if (this.specialty != null) {
      let url = `https://api.betterdoctor.com/2016-03-01/doctors?specialty_uid=${this.specialty}&location=45.55%2C-122.63%2C10&user_location=47.6095%2C-122.32793&skip=0&limit=20&user_key=4aac0a8c2cfc49f5ff9a9ada39850603`;
      $.get(url).then((data) => {
          filteredDoctors = this.filterDoctorData(data);
          filterSpecialties(filteredDoctors);
        })
        .fail(() => {
          console.log("Oops something went wrong!!!!");
          filteredDoctors = [];
        });
    } else {
      console.log("Specialyst not found!");

    }

  }
  getSpecialityUid(filterSpecialties, inputCondition) {
    let uid;
    let specialysts = [];
    filterSpecialties.data.forEach(function(filterSpecialty) {
      if (filterSpecialty.name.includes(inputCondition)) {
        uid = filterSpecialty.uid;
        specialysts.push({
          "uid": filterSpecialty.uid,
        "specialyst_name": filterSpecialty.name });
      }
    });
    return specialysts;
  }

}
