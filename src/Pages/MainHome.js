import React from 'react';
import { withRouter} from "react-router";

const MainHome = function(){
    return(
        <div>
            <h1>Welcome</h1>
            <img className = " circle-img" 
            src="https://yt3.ggpht.com/a/AGF-l7-61EW872ibIIy92N7DLPaFfDgeMvyb5-aOcw=s900-c-k-c0xffffffff-no-rj-mo"
            alt="avatar_img" /><br></br>
            <button>Edit</button><br></br>
            <textarea></textarea><br></br>
            <button>Skip</button>
            <button>Save and Continue</button>
        </div>
    )
}

export default withRouter(MainHome);