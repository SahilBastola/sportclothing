import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '../../services/loginService';
import '../../style/login.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [failedAttempts, setFailedAttempts] = useState(0); // Track failed attempts
  const navigate = useNavigate();

  // Timer for automatic logout after 2 minutes
  let logoutTimer;

  useEffect(() => {
    logoutTimer = setTimeout(() => {
      localStorage.clear();
      navigate('/');
      console.log('User automatically logged out after 2 minutes');
    }, 2 * 60 * 1000); // 2 minutes in milliseconds

    return () => {
      clearTimeout(logoutTimer);
    };
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    userService
      .login({ username, password })
      .then((res) => {
        // Successful login
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userid', res.data.userId);
        localStorage.setItem('username', res.data.username);
        localStorage.setItem('admin', res.data.isAdmin);

        // Reset the automatic logout timer
        clearTimeout(logoutTimer);

        if (res.data.isAdmin === 'true' && res.data.token !== null) {
          navigate('/AdminproductPage');
        } else {
          navigate('/products');
        }
      })
      .catch(() => {
        // Failed login attempt
        setErrorMessage('Incorrect username or password');
        setFailedAttempts((prevAttempts) => prevAttempts + 1); // Increment failed attempts

        if (failedAttempts >= 2) {
          setErrorMessage('Too many failed login attempts. Your account is temporarily blocked.');
        }
      });
  };

  return (
    <section id="login-form">
      <div className="container rounded text-center">
        <div className="row">
          <div className="col-md-6 mt-5 order-md-2">
            <img
              src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/38b1616c23744dacb23c69296eb81ee3_9366/Z.N.E._Premium_Full-Zip_Hooded_Track_Jacket_White_IN5092_HM4.jpg"
              alt=""
              className="mt-5 img-fluid full-height"
              style={{ height: "400px" }}
            />
          </div>

          <div className="col-md-6 mt-5 order-md-1">
            <h1 className="text-left" style={{ fontFamily: 'verdana', fontSize: '50px', color: 'dodgerblue' }}>Login</h1>
            <p style={{ color: 'gray' }}>Welcome back!</p>
            <div className="card mt-3">
              <div className="card-body homeit">
                <form onSubmit={handleLogin} autoComplete="off">
                  <div className="form-floating mt-3">
                    <input
                      className="form-control"
                      name="username"
                      placeholder="Username"
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInputGroup1">Username</label>
                  </div>

                  <div className="form-floating mt-3">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <label htmlFor="floatingInputGroup1">Password</label>
                  </div>
                  <div className="col">
                    <button
                      className="btn btn-warning text-center mt-4 fw-bold fs-5"
                      type="submit"
                      style={{
                        width: "100px",
                        backgroundColor: "black",
                        color: "white"
                      }}
                    >
                      Login
                    </button>
                    <a href="/register" className="text-button ms-4 mt-4" style={{ color: 'dodgerblue' }}>
                      Don't have an account? Sign up for free
                    </a>
                  </div>
                </form>
              </div>
            </div>
            <div id="login-message" className={`message ${errorMessage ? 'failure' : ''}`}>
              {errorMessage}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;

