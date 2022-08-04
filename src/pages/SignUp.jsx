import { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {doc,setDoc,serverTimestamp} from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import OAuth from "../components/OAuth";

import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {

        const auth = getAuth();

        const userCredential = await createUserWithEmailAndPassword(auth,email,password);
        const user = userCredential.user;
        updateProfile(auth.currentUser,{displayName:name});

        const formDataCopy = {...formData};
        delete formDataCopy.password;
        formDataCopy.timestamp = serverTimestamp();

        await setDoc(doc(db, 'users', user.uid),formDataCopy);

        navigate('/');

        
    } catch (error) {
        toast.error("Something went wrong!");
        
    }

  };

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome!</p>
        </header>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            className="nameInput"
            placeholder="Name"
            id="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            name="email"
            className="emailInput"
            placeholder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              className="passwordInput"
              value={password}
              id="password"
              onChange={onChange}
            ></input>

            <img
              src={visibilityIcon}
              alt="show Password"
              className="showPassword"
              onClick={() => {
                setShowPassword((prevState) => !prevState);
              }}
            />
          </div>

          <Link to="/forgot-password" className="forgotPasswordLink">
            Forgot Password
          </Link>

          <div className="signUpBar">
            <p className="signUpText">Sign Up</p>
            <button className="signUpButton">
              <ArrowRightIcon fill="#fffff3" height="34px" width="34px" />
            </button>
          </div>
        </form>

        <Outlet/>

        <Link className="registerLink" to="/sign-in">
          Already Logged In? then Sign In
        </Link>
      </div>
    </>
  );
}

export default SignUp;
