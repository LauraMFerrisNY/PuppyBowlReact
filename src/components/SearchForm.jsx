import { useState } from "react"
import fetchAllPlayers from "../API/fetchAllPlayers";

const cohortName = "2410-FTB-ET-WEB-PT";
const API_URL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}`;

function SearchForm({setPlayers}) {
    const [playerName, setPlayerName] = useState('');
    const [error, setError] = useState(null);
    let playerMatch = [];

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            if (playerName !== "") {
                const allPlayers = await gatherPlayers();
                allPlayers.map((player) => {
                    if (player.name.toLowerCase() === playerName.toLowerCase()) {
                        playerMatch.push(player);
                    }
                })
                setError(null);
                setPlayers(playerMatch);
            } else {
                const allPlayers = await gatherPlayers();
                setError(null);
                setPlayers(allPlayers);
            }
        } catch (error) {
            setError(error);
        }
    }

    async function gatherPlayers() {
        const allPlayers = await fetchAllPlayers();
        return allPlayers;
    }

    return (
        <>
            <form className='search_form' onSubmit={handleSubmit}>
                <label className="playerNameSearch">
                    Player Name Search: 
                    <input type="text" value ={playerName} onChange={(e) => setPlayerName(e.target.value)} />
                </label>
                <label className='search_button'>
                    <button>Search</button>
                </label>
            </form>
            {error && <p className='submission_error'>{error}</p>}
        </>
    )
}

export default SearchForm