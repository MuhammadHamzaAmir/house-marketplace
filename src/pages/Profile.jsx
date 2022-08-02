import {getAuth} from "firebase/auth";
import {useEffect, useState} from "react";

function Profile() {

    const [user, setUser] = useState(null);


    const auth = getAuth();
    
    useEffect(() => {
        setUser(auth.currentUser);
    }
    , [auth.currentUser]);

    return ( user ? <div>
        <h2>{user.displayName}</h2>
        </div> : <div><h2> User not Logged In</h2></div>
    )
}

export default Profile