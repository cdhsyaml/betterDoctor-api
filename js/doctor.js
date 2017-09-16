var apiKey = require('./../.env').apiKey;

export class BetterDoctor {
  constructor(inputName){
    this.inputName = inputName;
    this.getDoctors(this.inputName);
  }



  filterDoctorData (doctorResults) {
    let doctorArray = [];
    doctorResults.data.forEach(function(doctor){
      doctorArray.push({
        "uid": doctor.uid,
        "firstName": doctor.firstName,
        "lastName": doctor.lastName,
        "title": doctor.title,
        "visit_address": doctor.visit_address,
        "phones": doctor.phone,
        "website": doctor.website ,
        "email": doctor.email,
        "description": doctor.description
      });
    });
    return doctorArray;
  }

  getDoctors(doctorName){
    let filteredDoctors;
    let results;

    let url= `https://api.betterdoctor.com/2016-03-01/doctors?user_key=4aac0a8c2cfc49f5ff9a9ada39850603` + "&name=" + doctorName + "&limit=2";
    $.get(url).then((data) =>{
        filteredDoctors = this.filterDoctorData(data);
    //  displayResults(filteredDoctors);
    })
    .fail ( () => {
      console.log("Oops something went wrong!!!!");
      filteredDoctors =[];
    });
  }
}
