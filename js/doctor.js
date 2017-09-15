export class BetterDoctor {
  constructor(medicalIssue, inputName){
    this.medicalIssue = medicalIssue;
    this.inputName = inputName;
  }

  filterDoctorData (doctorResults) {
    let doctorArray = [];
    doctorResults.doctors.forEach(function(doctor){
      doctorArray.push({
        "firstName": doctor.firstName,
        "lastName": doctor.lastName,
        "address": doctor.address,
        "phone": doctor.phone,
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
    let url= `https://bikeindex.org:443/api/v3/search?stolenness=stolen`;
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
