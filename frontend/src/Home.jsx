import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from './Header';

function Home() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    getList();
  }, []);

  function getList() {
    fetch("http://localhost:3000/user").then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        setData(resp);
      });
    });
  }

  function deleteProduct(id) {
    fetch(`http://localhost:3000/user/${id}`, {
      method: "DELETE",
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        getList();
      });
    });
  }

  function selectUser(id) {
    // console.log("function called", id);
    fetch(`http://localhost:3000/user/${id}`).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        setFirstname(resp.firstname);
        setLastname(resp.lastname);
        setEmail(resp.email);
        setPassword(resp.password);
        setUserId(resp._id);
      });
    });
  }

  function updateUser() {
   let data = {firstname, lastname, email, password, userId}
    fetch(`http://localhost:3000/user/${userId}`, {
      method: "PUT",
      headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
      body: JSON.stringify(data),
    }).then((result) => {
      result.json().then((resp) => {
        console.log(resp);
        getList();
      });
    });
  }


  return (
    <div>
      <Header />
      <div className="container-fluid py-3">
        <div className="row">
          <div className="col-md-4">
            <span className="anchor" id="formRegister"></span>
            <div className="card card-outline-secondary">
              <div className="card-header">
                <h3 className="mb-0">Edit Form</h3>
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
                      onClick={() => updateUser(userId)}
                      type="button"
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

        {/* <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Email</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.firstname}</td>
                <td>{item.lastname}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>
                  <button
                    onClick={() => selectUser(item._id)}
                    className="btn btn-success"
                    type="button"
                  >
                    Edit
                  </button>
                  &nbsp;
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteProduct(item._id)}
                    type="button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table> */}

        <div className="row">
          {data.map((item) => (
            <div className="col-md-4">
              <div className="card p-3">
                <img
                  className="card-img-top"
                  src="https://i.picsum.photos/id/1050/309/200.jpg?hmac=ucrndIDqUegho8h6Y0tK-j9tn4wBIGlJ_yPCZXzfhOM"
                  alt="Card image cap"
                />
                <div className="card-block mt-2">
                  <h4 className="card-title">
                    {item.firstname} {item.lastname}
                  </h4>
                  <p className="card-text">{item.email}</p>
                  <a
                    href="#"
                    onClick={() => selectUser(item._id)}
                    className="btn btn-primary"
                  >
                    Edit
                  </a>
                  &nbsp;&nbsp;
                  <a
                    href="#"
                    onClick={() => deleteProduct(item._id)}
                    className="btn btn-danger ml-3"
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                  >
                    Delete
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* <div className="container mt-3">
          <button type="button" className="btn btn-primary">
            Open modal
          </button>
        </div>

        <div className="modal" id="myModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Modal Heading</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                ></button>
              </div>

              <div className="modal-body">Are you sure you want to delete ?</div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-success"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-bs-dismiss="modal"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default Home;
