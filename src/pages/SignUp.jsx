import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as ArrowRightIcon } from "../assets/svg/keyboardArrowRightIcon.svg";
import visibilityIcon from "../assets/svg/visibilityIcon.svg";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name:'',
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

  return (
    <>
      <div className="pageContainer">
        <header>
          <p className="pageHeader">Welcome!</p>
        </header>

        <form>
          <input
            type="text"
            name="name"
            className="nameInput"
            placeHolder="Name"
            id="name"
            value={name}
            onChange={onChange}
          />
          <input
            type="email"
            name="email"
            className="emailInput"
            placeHolder="Email"
            id="email"
            value={email}
            onChange={onChange}
          />

          <div className="passwordInputDiv">
            <input
              type={showPassword ? "text" : "password"}
              placeHolder="Password"
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

        <Link className="registerLink" to="/sign-in">
          Already Logged In? then Sign In
        </Link>
      </div>
    </>
  );
}

export default SignUp;
