export class BetterDoctor {
  constructor(inputName){
    this.inputName = inputName;
  }

  filterDoctorData (doctorResults) {
    let doctorArray = [];
    doctorResults.doctors.forEach(function(doctor){
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

  getDoctors(displayResults){
    let filteredDoctors;
    let results;
    let url= `https://api.betterdoctor.com/2016-03-01/doctors`;
    $.get(url).then((results) =>{
      filteredDoctors = this.filterDoctorData(results);
      displayResults(filteredDoctors);
    })
    .fail ( () => {
      console.log("Oops something wrong!!!!");
      filteredDoctors =[];
    });
  }
}
