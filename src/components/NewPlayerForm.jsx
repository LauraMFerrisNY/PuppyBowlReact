import fetchPlayerTeams from "../API/fetchPlayerTeams";
import { useState } from "react"
import fetchAllPlayers from "../API/fetchAllPlayers";

const cohortName = "2410-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

function NewPlayerForm({setPlayers}) {
     const [playerName, setPlayerName] = useState('');
     const [playerBreed, setPlayerBreed] = useState('');
     const [playerStatus, setPlayerStatus] = useState('');
     const [playerImgLink, setPlayerImgLink] = useState('');
     const [playerTeamId, setPlayerTeamId] = useState('');
     const [error, setError] = useState(null);
     const activeTeams = pullactiveTeams();

     async function handleSubmit(event) {
        event.preventDefault();
        try {
            if (playerName.length < 1){
                setError("Please enter a name.");
            } else if (playerBreed.length < 1){
                setError("Please enter a breed.");
            } else if (playerStatus.length < 1){
                setError("Please enter the player's status: bench or field.");
            } else if (playerImgLink.length < 1){
                setError("Please submit a link to a picture of the player.");
             } else if (playerTeamId.length !== 0 && !(await activeTeams).includes(parseInt(playerTeamId))){
                 setError(`Please choose a valid team: ${await activeTeams} or leave this option blank if the player has not been assigned a team.`);
            } else {
                const response = await fetch(`${API_URL}/players`, {
                    method: 'POST',
                    headers: { 
                        "Content-Type": "application/json" 
                    },
                    body: JSON.stringify({
                        name: playerName, 
                        breed: playerBreed, 
                        status: playerStatus, 
                        imageUrl: playerImgLink, 
                        teamId: parseInt(playerTeamId)}),
                });
                const result = await response.json();
                console.log(result); 
                setError(null);
                await gatherPlayers();
                clearForm();
            }
        } catch (error) {
            setError(error);
        }
    }

    async function pullactiveTeams() { 
        const teams = [];
        const playerTeams = await fetchPlayerTeams();
        playerTeams.map((currentTeam) => {
            teams.push(currentTeam.id);
        });
        return teams;
    }

    async function gatherPlayers() {
        const allPlayers = await fetchAllPlayers();
        setPlayers(allPlayers);
    }

    function clearForm() {
        setPlayerName('');
        setPlayerBreed('');
        setPlayerStatus('');
        setPlayerImgLink('');
        setPlayerTeamId('');
    }

    return (
        <>
            <form className='new_player_form' onSubmit={handleSubmit}>
                <h3>Add a New Player: </h3>

                <label className="playerName">
                    Name: 
                    <input type="text" value ={playerName} onChange={(e) => setPlayerName(e.target.value)} />
                </label>
                <label className="playerBreed">
                    Breed: 
                    <input type="text"  value ={playerBreed} onChange={(e) => setPlayerBreed(e.target.value)} />
                </label>
                <label className="playerStatus">
                    Status: 
                    <input type="text" value ={playerStatus} onChange={(e) => setPlayerStatus(e.target.value)} />
                </label>
                <label className="playerImage">
                    Link to Image: 
                    <input type="text" value ={playerImgLink} onChange={(e) => setPlayerImgLink(e.target.value)} />
                </label>
                <label className="playerTeam">
                    Team Id: 
                    <input type="text" value ={playerTeamId} onChange={(e) => setPlayerTeamId(e.target.value)} />
                </label>
                <label className='submit_button'>
                    <button >Submit</button>
                </label>
            </form>
            {error && <p className='submission_error'>{error}</p>}
        </>
    )
}

export default NewPlayerForm