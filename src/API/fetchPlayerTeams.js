const cohortName = "2410-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const fetchPlayerTeams = async () => {
    try {
      const response = await fetch(`${API_URL}/teams`);
      const json = await response.json();
      const myTeams = json.data["teams"];
      return myTeams;
    } catch (err) {
      console.error(`Oh no, trouble fetching teams!`, err);
    }
  };
export default fetchPlayerTeams;