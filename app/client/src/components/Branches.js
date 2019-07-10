import React from "react"
import Branch from "./Branch";

import "./branches.css"

const Branches = () => {

    const branches = [
    {
        name: "Komitas",
        id: "111111111",
        screen: 3
    },
    {
        name: "Erebuni",
        id: "222222222",
        screen: 1
    },
    {
        name: "Kentron",
        id: "44444444",
        screen: 3
    },
    {
        name: "Komitas",
        id: "111111111",
        screen: 3
    },
    {
        name: "Erebuni",
        id: "222222222",
        screen: 1
    },
    {
        name: "Kentron",
        id: "44444444",
        screen: 3
    }
    ];
    return branches.length > 0 && ( 
    <div className="allBranchesContainer">
       {
           branches.map((el,i) => <Branch key={i} branch={el} />)
       }
    </div>  
    );

};

export default Branches;