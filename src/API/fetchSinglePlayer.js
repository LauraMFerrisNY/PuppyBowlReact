const cohortName = "2410-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const fetchSinglePlayer = async (playerId) => {
    try {
      const response = await fetch(`${API_URL}/players/${playerId}`);
      const puppy = await response.json();
      const myPuppy = puppy.data["player"];
      return myPuppy;
    } catch (err) {
      console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
  };
export default fetchSinglePlayer;