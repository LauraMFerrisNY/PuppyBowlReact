const cohortName = "2410-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const fetchAllPlayers = async () => {
    try {
      const response = await fetch(`${API_URL}/players`);
      const json = await response.json();
      const myPuppies = json.data["players"];
      return myPuppies;
    } catch (err) {
      console.error("Uh oh, trouble fetching players!", err);
    }
  };
export default fetchAllPlayers;