// Write your helper functions here!
// window.addEventListener("load", function() {
//     let form = document.querySelector("form");
//     form.addEventListener("submit", function(event) {
        
      

require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   //Here is the HTML formatting for our mission target div.
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
                    <h2>Mission Destination</h2>
                    <ol>
                        <li>Name: ${name}</li>
                        <li>Diameter: ${diameter}</li>
                        <li>Star: ${star}</li>
                        <li>Distance from Earth: ${distance}</li>
                        <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
    `

}

function validateInput(testInput) {
    if (testInput === "" || testInput === null || testInput === 0) {
        return 'Empty'
        
    } else if (!isNaN(Number(testInput)))  {
       return 'Is a Number'
    } 
    else {}
        return 'Not a Number'
   
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");
   if(validateInput(pilot) === 'Empty' || validateInput(copilot) === 'Empty'  || validateInput(fuelLevel) === 'Empty' || validateInput(cargoLevel) === 'Empty') {
        alert('Fill all fields please');
        //cargo & fuel need to be numbers
    } else if (validateInput(fuelLevel) === 'Not a Number'  || validateInput(cargoLevel) === 'Not a Number') {
        alert('Must be a number');
        //pilot & copilot need to be strings
    } else if (validateInput(pilot) === 'Is a Number' || validateInput(copilot) === 'Is a Number') {
        alert('No numbers please');
    } else {
        pilotStatus.innerHTML = `The Pilot ${pilot} is ready`;
        copilotStatus.innerHTML = `The Co-pilot ${copilot} is ready`;
        list.style.visibility = 'hidden';
        let launchStatus = document.getElementById("launchStatus");
        if (fuelLevel < 10000) {
            fuelStatus.innerHTML = 'There is not enough fuel for the journey';
            list.style.visibility = 'visible';
            launchStatus.innerHTML = 'Shuttle not ready for launch';
            launchStatus.style.color = 'red';
        } else if (cargoLevel > 10000) {
            cargoStatus.innerHTML = 'Cargo mass low enough for launch';
            list.style.visibility = 'visible';
            launchStatus.innerHTML = 'Shuttle not ready for launch';
            launchStatus.style.color = 'red';  
        } else if (cargoLevel < 10000 && fuelLevel > 10000) {
            fuelStatus.innerHTML = 'Fuel level high enough for launch';
            cargoStatus.innerHTML = 'Cargo mass low enough for launch';
            list.style.visibility = 'visible';
            launchStatus.style.color = 'green';
        }
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json")
    .then( function(response) {
        return response.json();        
    });

     return planetsReturned;
}

//need to check for valid info for these fields here


function pickPlanet(planets) {
    let randomSelectedPlanet = Math.floor(Math.random() * planets.length);
    return planets[randomSelectedPlanet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
