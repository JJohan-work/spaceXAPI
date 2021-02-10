import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import {SpaceX} from './js/getspacex';


function main(){
  $('#infoBox').hide();
  $('#latestLaunch').on("click", function(){
    $('#selectBox').hide();
    $('#infoBox').show();
  });
  $('#upcomingLaunch').on("click", function(){
    $('#selectBox').hide();
    $('#infoBox').show();
  });
  $('#pastLaunch').on("click", function(){
    $('#selectBox').hide();
    $('#infoBox').show();
  });
  $('#rockets').on("click", function(){
    $('#selectBox').hide();
    $('#infoBox').show();
  });
  $('#sat').on("click", function(){
    $('#selectBox').hide();
    $('#infoBox').show();
  });
  $('#about').on("click", function(){
    $('#selectBox').hide();
    $('#infoBox').show();
  });
  $('#hist').on("click", function(){
    $('#selectBox').hide();
    $('#infoBox').show();
  });
  //Grab user inputs
  // pass to the api
  console.log(SpaceX.getSpaceX());
}

main();