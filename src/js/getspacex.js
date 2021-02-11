
export default class SpaceX {
  static async getSpaceX(firstpart, secondpart){
    try {
      const response = await fetch(`https://api.spacexdata.com/v4/${firstpart}/${secondpart}`);
      if(!response.ok){
        throw Error(response.status);
      }
      return response.json();
    } catch(error) {
      return error; 
    }
  }
}


// get past launches     - https://api.spacexdata.com/v4/launches/past - ID's
// get upcoming launches - https://api.spacexdata.com/v4/launches/upcoming - ID's
// get all starlink sats - https://api.spacexdata.com/v4/starlink/ - ID's
// get one starlink sat  - https://api.spacexdata.com/v4/starlink/5eed770f096e59000698560d
// get historical events - https://api.spacexdata.com/v4/history -ID's