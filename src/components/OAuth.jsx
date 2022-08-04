import {useLocation,useNavigate} from 'react-router-dom';
import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {doc,getDoc,setDoc, serverTimestamp} from "firebase/firestore";
import {db} from "../firebase.config";
import {toast} from "react-toastify";
import googleIcon from "../assets/svg/googleIcon.svg";

function OAuth() {

    const location = useLocation();
    const navigate = useNavigate();


    const handleGoogleClick = async () => {

        try {

            const auth = getAuth();
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth,provider);
            
            // Check for user
            const user = result.user;
            const docRef = doc(db,'users',user.uid);
            const docSnapshot = await getDoc(docRef);
 
            // If user does not exist, create user
            if(!(docSnapshot.exists())){
                await setDoc(doc(db,'users',user.uid),{
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp()
                });
                
            }
            navigate("/");
            
        } catch (error) {
            toast.error("Error signing in with Google");
            
        }
    }

    return (
      <div className="socialLogin">
        <p>Sign {location.pathname === "/sign-in" ? "In" : "Up"} with</p>
        <button className="socialIconDiv" onClick={handleGoogleClick}>
            <img className="socialIconImg" src={googleIcon} alt="Google" />
        </button>
      </div>
    );
}

export default OAuth