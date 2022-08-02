import {useState} from 'react';
import {Link,useNavigate} from 'react-router-dom';
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
import { toast } from 'react-toastify';

import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

function SignIn() {

    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const {email,password} = formData

    const navigate = useNavigate();

    const onChange = e => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            if (userCredential.user) {
                navigate("/");
            }

        } catch (error) {
            toast.error("Invalid Username or Password!");           
        }


    }


    return (
      <>
        <div className="pageContainer">
          <header>
            <p className="pageHeader">Welcome Back!</p>
          </header>

          <form onSubmit={handleSubmit}>
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

            <div className="signInBar">
              <p className="signInText">Sign In</p>
              <button className="signInButton">
                <ArrowRightIcon fill="#fffff3" height="34px" width="34px" />
              </button>
            </div>
          </form>

          <Link className="registerLink" to="/sign-up">
            New User? then Sign Up
          </Link>
        </div>
      </>
    );
}

export default SignIn