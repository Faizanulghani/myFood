import { useState } from "react";
import { Link, useNavigate } from "react-router";

const Login = () => {
  let [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  let navigate = useNavigate()
  let handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    let json = await response.json();
    if (!json.success) {
      alert("Enter valid creadentials");
    }else{
      localStorage.setItem("userEmail",credentials.email)
      localStorage.setItem("authToken",json.authToken)
      navigate("/")
    }
  };

  let onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="container text-white">
       <form onSubmit={handleSubmit}>
        <div className="mb-3 text-white">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            className="form-control bg-transparent text-white"
            id="exampleInputEmail1"
          />
          <div id="emailHelp" className="form-text text-white">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3 text-white">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control bg-transparent text-white"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary mx-3">
          Submit
        </button>
        <Link to="/signup" className="btn btn-danger">
          I'm new user
        </Link>
      </form>
    </div>
  );
};

export default Login;
