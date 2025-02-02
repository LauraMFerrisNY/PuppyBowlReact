import fetchAllPlayers from "../API/fetchAllPlayers.js"
import NewPlayerForm from "./NewPlayerForm.jsx";
import SearchForm from "./SearchForm.jsx";
import deletePlayer from "../API/deletePlayer.js";
import { useState, useEffect } from "react"
import {useNavigate} from "react-router-dom";

function AllPlayers() {
    const [players, setPlayers] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        try {
            async function gatherPlayers() {
                const allPlayers = await fetchAllPlayers();
                setPlayers(allPlayers);
            }
            gatherPlayers();
        } catch (e) {
            console.log("Unable to gather puppies");
        }
    },[])

    async function removePlayer(playerId) {
        await deletePlayer(playerId);
        const allPlayers = await fetchAllPlayers();
        setPlayers(allPlayers);
    }

    return (
        <>
            <NewPlayerForm setPlayers={setPlayers}/>
            <div className="current_player_header">
                <h2>Current Players</h2>
                <SearchForm setPlayers= {setPlayers} />
            </div>
            <div className="player_content">
                {
                    players.map((player)=>{
                        return (
                            <div key={player.id} className="player_card">
                                <img src={player.imageUrl} alt={player.name} />
                                <div className="player_card_info">
                                    <h3>{player.name}</h3>
                                    <h4>Player Id: {player.id}</h4>
                                    <div className="player_card_buttons">
                                        <button id={`${player.id}details`} onClick={()=> navigate(`/players/${player.id}`)}>See Details</button>
                                        <button id={`${player.id}remove`} onClick={()=> removePlayer(player.id)}>Remove Player</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default AllPlayers