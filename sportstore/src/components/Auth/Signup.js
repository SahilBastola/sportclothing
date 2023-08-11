import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [valid, setValid] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const navigate = useNavigate();
  let matched = false;

  useEffect(() => {
    // Validate if passwords match
    const passwordsMatch = password === confirmPassword;
    setIsPasswordValid(passwordsMatch);

    // Password requirements
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+{}\[\]:;<>,.?~\-/\\]/.test(password);

    const meetsRequirements =
      password.length >= 8 &&
      password.length <= 12 &&
      hasUpperCase &&
      hasLowerCase &&
      hasNumbers &&
      hasSpecialChars &&
      !password.toLowerCase().includes(username) &&
      !password.includes("123456") &&
      !password.includes("password");

    setIsPasswordValid(meetsRequirements);

    if (!passwordsMatch) {
      setMessage("Passwords don't match");
      setValid(false);
    } else if (!meetsRequirements) {
      setMessage("Please follow password requirements: 8-12 characters, uppercase, lowercase, numbers, and special characters.");
      setValid(false);
    } else {
      setMessage("");
      setValid(true);
    }
  }, [confirmPassword, password, username]);

  const handleRegister = () => {
    if (password === "" || confirmPassword === "") {
      setMessage("Please enter a password and confirm it.");
      return;
    }

    if (!isPasswordValid) {
      setMessage("Please fix password issues.");
      return;
    }

    axios
      .post("http://localhost:4000/auth/registeruser", {
        username,
        password,
        email,
      })
      .then((response) => {
        const { _id, username, email, pic } = response.data;
        console.log("Successful:", response.data);
        setMessage("Registration successful");
        setValid("is-valid");
        navigate("/login");
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          const errorMessages = error.response.data.errors.join(", ");
          setMessage(`Invalid user data: ${errorMessages}`);
        } else {
          setMessage("Registration failed. Please try again later.");
        }
        setValid("is-invalid");
        console.log("Error:", error);
      });
  };
  return (
    <section id="register-form">
    <div className="container rounded text-center">
      <div className="row">
        <div className="col-md-6  order-md-2">
          <img
            src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/7f5e418601c747cebcd98c320235d53b_9366/Z.N.E._Premium_Pants_White_IN5105_HM3.jpg"
            alt=""
            height={500}
            width={450}
            className="mt-5"
          />
        </div>

        <div className="col-md-6  order-md-1">
          <h1 className="text-left" style={{ fontFamily: 'verdana', fontSize: '50px', color: 'dodgerblue' }}>Sign Up</h1>
          <p style={{ color: 'gray' }}>Create an account</p>
          <div className="card">
              <div className="card-body homeit">
                <form autoComplete="off">
                  <div className="form-floating ">
                    <input
                      type="text"
                      className="form-control"
                      name="username"
                      placeholder="UserName"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInputGroup1">Username</label>
                  </div>

                  <div className="form-floating mt-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInputGroup1">Email</label>
                  </div>

                  <div className="form-floating mt-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingInputGroup1">Password</label>
                  </div>

                  <div className="form-floating mt-3">
                    <input
                      className={`form-control ${valid}`}
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                    <label htmlFor="floatingInputGroup1">Confirm Password</label>
                  </div>

                  <div>
                    
                  {message && (
  <div className={`alert ${matched ? 'alert-danger' : 'alert-success'} mt-3`} role="alert">
    {message}
  </div>
)}
                  </div>

                  <div className="col">
                    <button
                      className="btn btn-warning text-center mt-4 fw-bold fs-5"
                      onClick={handleRegister}
                      type="button"
                      style={{
                        width: "120px",
                        backgroundColor: "black",
                        color: "white",
                      }}
                    >
                      Signup
                    </button>
                    <a href="/login" className="text-button ms-4 mt-4">
                      Already have an account? Login
                    </a>
                  </div>
                </form>
              </div>
              //////
            </div>
          </div>
        </div>
      </div>
    </section>
  );
                 
                    };

export default Register;
