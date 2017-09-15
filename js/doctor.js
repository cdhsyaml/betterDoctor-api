export class BetterDoctor {
  constructor(zipCode){
    this.zipCode = zipCode;
  }

  getAll (bikeResults) {
    let bikeArray = [];
    bikeResults.bikes.forEach(function(bike){
      bikeArray.push({
        "id": bike.id,
        "title": bike.title ,
        "serial": bike.serial,
        "year": bike.year,
        "date_stolen": bike.date_stolen ,
        "stolen_location":bike.stolen_location
      });
    });
    return bikeArray;
  }

  getBikes(displayResults){
    let filteredBikes;
    let results;
    let url= `https://bikeindex.org:443/api/v3/search?stolenness=stolen`;
    $.get(url).then((results) =>{
      filteredBikes = this.getAll(results);
      displayResults(filteredBikes);
    })
    .fail ( () => {
      console.log("Oops something wrong!!!!");
      filteredBikes =[];
    });
  }
}
