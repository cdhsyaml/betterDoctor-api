var apiKey = require('./../.env').apiKey;

export class BetterDoctor {
  constructor(inputName){
    this.inputName = inputName;
  }

  filterDoctorData (doctorResults) {
    let doctorArray = [];
    let doctors = [];
    doctorResults.data.forEach(function(doctor){

      doctors.push({
        "uid": doctor.uid,
        "first_name": doctor.profile.first_name,
        "lastName": doctor.profile.last_name,
        "title": doctor.profile.title,

        
// doctor.phones.forEach(phone){
//         "phones": phone
//       },
        "website": doctor.website ,
        "description": doctor.specialties[0].description

      });
      doctorArray.push(doctor);
    });
    return doctorArray;
  }

  getDoctors(doctorName){
    let filteredDoctors;
    let results;
    let url= `https://api.betterdoctor.com/2016-03-01/doctors?user_key=4aac0a8c2cfc49f5ff9a9ada39850603` + "&name=" + this.inputName + "&limit=10";
    $.get(url).then((data) =>{
        filteredDoctors = this.filterDoctorData(data);


      doctorName(filteredDoctors);
    })
    .fail ( () => {
      console.log("Oops something went wrong!!!!");
      filteredDoctors =[];
    });
  }
}
