import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();



async function signup() {
    let item = { firstname, lastname, email, password }
    let result = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    })
     result = await result.json();
     console.log(result)
     localStorage.setItem("user-info", JSON.stringify(result));
      setTimeout(() => {
           navigate("/");
      }, 2000);
    // .then((result) => {
    //   result.json().then((resp) => {
    //     console.log("resp", resp);
    //     setTimeout(() => {
    //       navigate("/");
    //     }, 2000);
    //   });
    // });
}
   
  return (
    <div>
      <div className="container py-3">
        <div className="row">
          <div className="col-md-12">
            <div className="row justify-content-center">
              <div className="col-md-6">
                <span className="anchor" id="formRegister"></span>
                <div className="card card-outline-secondary">
                  <div className="card-header">
                    <h3 className="mb-0">Sign Up</h3>
                  </div>
                  <div className="card-body">
                    <form autoComplete="off" className="form" role="form">
                      <div className="form-group">
                        <label htmlFor="inputName">First Name</label>
                        <input
                          className="form-control mt-2"
                          id="firstname"
                          placeholder="First name"
                          type="text"
                          name="firstname"
                          value={firstname}
                          onChange={(e) => {
                            setFirstname(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="inputName">Last Name</label>
                        <input
                          className="form-control mt-2"
                          id="lastname"
                          placeholder="Last name"
                          type="text"
                          name="lastname"
                          value={lastname}
                          onChange={(e) => {
                            setLastname(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="inputEmail3">Email</label>
                        <input
                          className="form-control mt-2"
                          id="email"
                          placeholder="Email"
                          required=""
                          type="email"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group mt-3">
                        <label htmlFor="inputPassword3">Password</label>
                        <input
                          className="form-control mt-2"
                          id="password"
                          placeholder="Password"
                          required=""
                          type="password"
                          name="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                      <div className="form-group">
                        <button
                          type="button"
                          onClick={signup}
                          className="btn btn-success btn-lg"
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
