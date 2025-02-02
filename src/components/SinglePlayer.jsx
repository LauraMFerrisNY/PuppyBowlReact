import fetchSinglePlayer from "../API/fetchSinglePlayer";
import AssignPlayerTeam from "./AssignPlayerTeam";
import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom";
function SinglePlayer() {
    let { id } = useParams();
    const [player, setPlayer] = useState([])
    const navigate = useNavigate()

    useEffect(()=>{
        try {
            async function gatherPlayer() {
                const myPlayer = await fetchSinglePlayer(id);
                setPlayer(myPlayer);
            }
            gatherPlayer();
        } catch (e) {
            console.log("Unable to gather puppies");
        }
    },[])

    return (
        <>
            <h1 className="puppy_header">{player.name}</h1>
            <div className="single_player_content">
                <img src={player.imageUrl} alt={player.name} />
                <div className="single_player_info">
                    <h3>Player Id: {player.id}</h3>
                    <h3>Breed: {player.breed}</h3>
                    <AssignPlayerTeam teamId={player.teamId} />
                    <button id="return"  onClick={()=> navigate(`/`)}>Back to all players</button>
                </div>
            </div>
        </>
    )
}

export default SinglePlayer