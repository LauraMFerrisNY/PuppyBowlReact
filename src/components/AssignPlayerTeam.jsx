import fetchPlayerTeams from "../API/fetchPlayerTeams";
import { useState, useEffect } from "react";

function AssignPlayerTeam({teamId}) { 
    const [team, setTeam] = useState('')

    useEffect(()=>{
        try {
            async function assignTeam() {
                if (teamId != null) {
                    const playerTeams = await fetchPlayerTeams();
                    let teamName = "";
                    playerTeams.map((myTeam) => {
                        if(teamId === myTeam.id) {
                        teamName = myTeam.name;
                        }
                    });
                    setTeam(teamName);
                } else if (teamId === null){
                    setTeam("Unassigned");
                } 
            }
            assignTeam();
        } catch (e) {
            console.log("Unable to gather puppies");
        }
    },[teamId])

    return (
        <>
            <h3>Team: {team}</h3>
        </>
    )
}
export default AssignPlayerTeam