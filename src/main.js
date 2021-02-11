import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import SpaceX from './js/getspacex';

async function apiCall(firstpart, secondPart){
  let response = await SpaceX.getSpaceX(firstpart, secondPart);
  return response;
}

function  generateCompany(response) {
  if(response.links) {
    const linkKeys = Object.keys(response.links);
    let htmlLink = ``;
    linkKeys.forEach(name => {
      htmlLink += `<a href="${response.links[name]}">${name}</a>`;
    });
    $('#infoBox').html(`<h1>SpaceX</h1>
    <p>${response.summary}</p>
    <div class="infoSplit"><div><h3>Founder</h3><p>${response.founder}</p>
    <h3>Current C.E.O.</h3><p>${response.ceo}</p><h3>Current C.O.O.</h3>
    <p>${response.coo}</p></div><div><h3>Founded</h3>
    <p>${response.founded}</p><h3>Employees</h3><p>${response.employees}</p>
    <h3>Company Worth</h3><p>$${response.valuation}</p></div></div><div class="linkbox">${htmlLink}</div>`);
  } else {
    console.log(response);
    $('#infoBox').hide();
    $('#selectBox, #error').show();
    $('#error').html(`<p>There was an error: ${response}</p>`);
  }
}

function generateLatestLaunch(response){
  const randomIndex = Math.floor(Math.random() * response.links.flickr.original.length)
  const image = response.links.flickr.original[randomIndex];
  
  if(response.fairings){
    $('#infoBox').html(
      `<h1>Latest Launch</h1>
      <p>${response.name}</p>
      <div class="infoSplit">
        <div>
          <h3>Details</h3>
          <p>${response.details}</p>
          <h3>Status</h3>
          <p>${response.success ? "Success" : "Failed"}</p>
          <h3>Flight Number</h3>
          <p>${response.flight_number}</p>
        </div>
        <div>
          <h3>Mission Patch</h3>
          <img src="${response.links.patch.small}" alt="latest launch mission patch"/>
        </div>
      </div>
      <div class="linkbox">
        <a href="${response.links.webcast}">WebCast</a>
        <a href="${response.links.wikipedia}">Wikipedia</a>
      </div>`
    );
    $('#infoBox').css("background-image", `url(${image})`);
  }
} 

function generateRockets(response){
  if(response[0]){
    $('#infoBox').html(`
    <div class="menu">
      <button id="rocket1">Rocket 1</button>
      <button id="rocket2">Rocket 2</button>
      <button id="rocket3">Rocket 3</button>
      <button id="rocket4">Rocket 4</button>
    </div>
    `)
    $('#infoBox>.menu>button').on("click", function() {
      const clicked = $(this).attr("id");
      let activeRocket;
      if (clicked === "rocket1") {
        activeRocket = response[0];
      }
      else if (clicked === "rocket2") {
        activeRocket = response[1];
      }
      else if (clicked === "rocket3") {
        activeRocket = response[2];
      }
      else if (clicked === "rocket4") {
        activeRocket = response[3];
      }
      $('#infoBox').html(`
        <h1>${activeRocket.name}</h1>
        <div class="infoSplit">
          <div>
            <p class="textBlack">${activeRocket.description}</p>
          </div>
        </div>`
        );
      $('#infoBox').css("background-image", `url(${activeRocket.flickr_images[1]})`)
      //name
      //description
      //active
      //first flight
      //country
      
      //height
      //diameter
      //mass
      //stages
      //number of engines
      //reusability
      //payload capabilities
      //cost per launch
      
      //links

    });
  }
}

function main(){
  $('#infoBox').hide();

  $('#return').on('click', function(){
    $('#selectBox').show();
    $('#infoBox').hide();
    $('#return').hide(); 
    $(`#infoBox`).css("background-image", "var(--defaultBackground)");
  });
  $('#selectBox button').on("click",async function() {
    $('#selectBox').hide();
    $('#infoBox').show();
    $('#return').show();      
    const clicked = $(this).attr("id");
    if (clicked === "company") {
      let response = await apiCall('company', "");
      generateCompany(response);
    }
    else if (clicked === "latestLaunch"){
      let response = await apiCall('launches', "latest");
      generateLatestLaunch(response);
    } 
    else if (clicked === "rockets"){
      let response = await apiCall('rockets', "");
      generateRockets(response);
    } else if (clicked === "pastLaunch"){
      // let response = await apiCall('company', "");
      // generateCompany(response)
      $('#infoBox').html("");
    } else if (clicked === "starLink"){
      // let response = await apiCall('company', "");
      // generateCompany(response)
      $('#infoBox').html("");
    } else if (clicked === "upcomingLaunch") {
      // let response = await apiCall('company', "");
      // generateCompany(response)
      $('#infoBox').html("");
    } else if (clicked === "history"){
      // let response = await apiCall('company', "");
      // generateCompany(response)
      $('#infoBox').html("");
    } 
  });
  
}

main();

