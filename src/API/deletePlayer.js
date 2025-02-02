const cohortName = "2410-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

const deletePlayer = async (playerId) => {
    try {
      await fetch(`${API_URL}/players/${playerId}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error(`Whoops, trouble removing player #${playerId} from the roster!`, err);
    }
  };

export default deletePlayer