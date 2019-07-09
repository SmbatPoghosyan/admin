import React from "react"
import Branch from "./Branch";

const Branches = () => {

    const branches = ["1","2","3"];
    return branches.length > 0 && ( <div>
       {
           branches.map((el,i) => <Branch key={i} value={el} />)
       }
      </div>  
    );

};

export default Branches;