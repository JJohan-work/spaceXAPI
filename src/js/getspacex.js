/* eslint-disable */
export class SpaceX {
  static async getSpaceX(info, pastLaunch, upcomingLaunch, latestLaunch, history, rockets){
    try {
      const response = await fetch(`https://api.spacexdata.com/v4/rockets`);
      if(!response.ok){ 
        throw Error(response.statusText);
      }
      return response.json();
    } catch(error) {
      return error.message;
    }
  }
}
/* eslint-disable */

// get company info      - https://api.spacexdata.com/v4/company
// get past launches     - https://api.spacexdata.com/v4/launches/past
// get upcoming launches - https://api.spacexdata.com/v4/launches/upcoming
// get latest launch     - https://api.spacexdata.com/v4/launches/latest
// get all starlink sats - https://api.spacexdata.com/v4/starlink/
// get one starlink sat  - https://api.spacexdata.com/v4/starlink/5eed770f096e59000698560d
// get historical events - https://api.spacexdata.com/v4/history
// get rockets           - https://api.spacexdata.com/v4/rockets/