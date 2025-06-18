import { useState } from "react";
import { Link } from "react-router";

const Signup = () => {
  let [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    geolocation: "",
  });
  let handleSubmit = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:3000/api/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.geolocation,
      }),
    });
    let json = await response.json();
    if (json.success) {
      setCredentials({
        name: "",
        email: "",
        password: "",
        geolocation: "",
      });
    } else {
      alert("Enter valid credentials");
    }
  };

  let onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label text-white">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={credentials.name}
            onChange={onChange}
            className="form-control bg-transparent text-white"
            id="exampleInputName"
          />
        </div>
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
        <div className="mb-3 text-white">
          <label htmlFor="exampleInputLocation" className="form-label">
            Address
          </label>
          <input
            type="text"
            value={credentials.geolocation}
            name="geolocation"
            onChange={onChange}
            className="form-control bg-transparent text-white"
            id="exampleInputLocation"
          />
        </div>
        <button type="submit" className="btn btn-primary mx-3">
          Submit
        </button>
        <Link to="/login" className="btn btn-danger">
          Already a user
        </Link>
      </form>
    </div>
  );
};

export default Signup;
