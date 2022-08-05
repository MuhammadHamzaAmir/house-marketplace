import {getAuth, updateProfile} from "firebase/auth";
import { useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import {updateDoc,doc} from "firebase/firestore";
import {db} from "../firebase.config"
import {toast} from "react-toastify";
import arrowRightIcon from '../assets/svg/keyboardArrowRightIcon.svg';
import homeIcon from "../assets/svg/homeIcon.svg";


function Profile() {
    
    const auth = getAuth();
    
    const [changeDetails, setChangeDetails] = useState(false);

    const [formData, setFormData] = useState({

        name: auth.currentUser.displayName,
        email: auth.currentUser.email
    });

    const {name,email} = formData;

    const navigate = useNavigate()


    const handleLogout = () => {
        auth.signOut();
        navigate('/')
    }
    
    const onSubmit = async() => {
        
        try {

            if(auth.currentUser.displayName !== name){
                // update in firebase
                await updateProfile(auth.currentUser,{displayName: name});

                // Update in firestore database
                const userRef = doc(db,'users',auth.currentUser.uid);
                await updateDoc(userRef,{name});

            }
        } catch (error) {
            toast.error("Something went wrong with Updating your profile");            
        }
    }

    const onChange = (e) =>{
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value
            }));
    }

    return (
        <div className="profile">
            <header className="profileHeader">
                <p className="pageHeader">
                    User Profile
                </p>
                <button type="button" onClick={handleLogout} className="logOut">Log Out</button>
            </header>
            <main>
                <div className="profileDetailsHeader">
                    <p className="personalDetailsText">Personal Details</p>
                    <p className="changePersonalDetails" onClick={() => {
                        changeDetails && onSubmit()
                        setChangeDetails((prevState) => !prevState)
                    }}>
                        {changeDetails ? "Save Changes" : "Change Personal Details"}
                    </p>
                </div>
            

                <div className="profileCard">
                    <form>
                        <input type="text" name="name" id="name" value={name} onChange={onChange} className={!changeDetails ? 'profileName' : 'profileNameActive'} disabled={!changeDetails}/>
                        <input type="text" name="email" id="email" value={email} onChange={onChange} className={!changeDetails ? 'profileEmail' : 'profileEmailActive'} disabled={true}/>
                    </form>
                </div>
                <Link to="/create-Listing" className="createListing">
                    <img alt="Home" src={homeIcon}/>
                    <p>Create Listing for selling or renting a home</p>
                    <img alt="Arrow right" src={arrowRightIcon}/>
                </Link>
            </main>
        </div>
    )
}

export default Profile