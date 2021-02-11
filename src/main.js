import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import './css/history.css';
import SpaceX from './js/getspacex';

async function apiCall(firstpart, secondPart){
  let response = await SpaceX.getSpaceX(firstpart, secondPart);
  return response;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
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
    $('#infoBox').hide();
    $('#selectBox, #error').show();
    $('#error').html(`<p>There was an error: ${response}</p>`);
  }
}

function generateLatestLaunch(response){
  const randomIndex = Math.floor(Math.random() * response.links.flickr.original.length);
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
  } else {
    $('#infoBox').hide();
    $('#selectBox, #error').show();
    $('#error').html(`<p>There was an error: ${response}</p>`);
  }
} 

function generateRockets(response){
  if(response[0]){
    $('#infoBox').html(`
    <div class="menu">
      <button id="rocket1">${response[0].name}</button>
      <button id="rocket2">${response[1].name}</button>
      <button id="rocket3">${response[2].name}</button>
      <button id="rocket4">${response[3].name}</button>
    </div>
    `);
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
      } else {
        $('#infoBox').hide();
        $('#selectBox, #error').show();
        $('#error').html(`<p>There was an error: ${response}</p>`);
      }
      $('#infoBox').html(`
        <h1>${activeRocket.name}</h1>
        <div class="infoSplit">
          <div>
            <p class="textBlack">${activeRocket.description}</p>
            <p class="textBlack">Is active: ${activeRocket.active ? "Yes": "No"}</p>
            <p class="textBlack">Height: ${activeRocket.height.meters}m / ${activeRocket.height.feet}ft</p>
            <p class="textBlack">Diameter: ${activeRocket.diameter.meters}m / ${activeRocket.diameter.feet}ft</p>
            <p class="textBlack">Mass: ${activeRocket.mass.kg}kgs / ${activeRocket.mass.lb}lbs</p>
            <p class="textBlack">Country: ${activeRocket.country}</p>
          </div>
          <div>
          <p class="textBlack">First Flight: ${activeRocket.first_flight}</p>
          <p class="textBlack"># of stages: ${activeRocket.stages}</p>
          <p class="textBlack"># of engines: ${activeRocket.first_stage.engines + activeRocket.second_stage.engines}</p>
          <ul class="textBlack"><li>First Stage is ${activeRocket.first_stage.reusable ? "": "not"} reusable</li><li>Second Stage is ${activeRocket.second_stage.reusable ? "": "not"} reusable</li></ul>
          <ul class="textBlack"><p>Payload Capabilities:</p><li>Can Carry ${numberWithCommas(activeRocket.payload_weights[0].lb)} lb to Low Earth Orbit</li>${activeRocket.payload_weights[1] ? `<li>Can Carry ${numberWithCommas(activeRocket.payload_weights[1].lb)} lb to Geostationary Transfer Orbit</li>` : ""}${activeRocket.payload_weights[2] ? `<li>Can Carry ${numberWithCommas(activeRocket.payload_weights[2].lb)} lb to Mars Orbit</li>`  : ""}</ul>
          <p class="textBlack">Cost Per Launch: $${numberWithCommas(activeRocket.cost_per_launch)}</p>
          </div>
        </div>
        <div class="linkbox">
          <a href="${activeRocket.wikipedia}">Wikipedia</a>
        </div>`
        );
      $('#infoBox').css("background-image", `url(${activeRocket.flickr_images[1]})`);
    });
  }
}
function generateHistory(response) {
  if(response[0]){
    let newsFeed = '<div id="timeline">';
    for(let i = response.length-1;i >= 0; i--) {
      let article = response[i];
      newsFeed += `
      <div class="timeline-movement">
        <div class="timeline-badge">
          <span class="timeline-day">${article.event_date_utc.slice(0,4)}</span>
        </div>
        <div class="timelineBox">
          <h3>${article.title}</h3>
          <p>${article.details}</p>
          ${article.links.article ? `<a href="${article.links.article}">More Details</a>` : ""}
          <p class="date">${article.event_date_utc.slice(0,10)}</p>
        </div>
      </div>
      `
    }
    newsFeed += "</div>";

    $('#infoBox').html(newsFeed);
  } else {
    $('#infoBox').hide();
    $('#selectBox, #error').show();
    $('#error').html(`<p>There was an error: ${response}</p>`);
  }
}
// link
// title
// date 
// details

function main(){
  $('#infoBox').hide();

  $('#return').on('click', function(){
    $('#selectBox').show();
    $('#infoBox').hide();
    $('#return').hide(); 
    $('#infoBox').css("background-image", "var(--defaultBackground)");
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
      let response = await apiCall('histry', "");
      generateHistory(response);
    } 
  });
  
}

main();

