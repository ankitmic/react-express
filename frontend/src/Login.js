import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
 import { ToastContainer, toast } from "react-toastify";
 import "react-toastify/dist/ReactToastify.css";
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(true);
  const [errMessage, setErrMessage] = useState('');
  const navigate = useNavigate();

 const diffToast = () => {
 
 };

  // const resp = JSON.parse(localStorage.getItem("user-info"));
  // console.log(resp);

 async function submit() {
   let item = { email, password };
   let result = await fetch("http://localhost:3000/login", {
     method: "POST",
     headers: {
       "Accept": "application/json",
       "Content-Type": "application/json",
     },
     body: JSON.stringify(item),
   })
   result = await result.json();
   localStorage.setItem('user-info', JSON.stringify(result));
   if(result.status == 1) {
    //  alert(result.message)
    // setErrMessage(result.message);
      toast.success(result.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
     setTimeout(() => {
        navigate("/home");
     }, 2000);
   } else {
    //  alert(result.message);
     toast.warning(result.message, {
       position: "top-right",
       autoClose: 2000,
       hideProgressBar: false,
       closeOnClick: true,
       pauseOnHover: true,
       draggable: true,
       progress: undefined,
     });
   }
  //  .then((result) => {
  //    result.json().then((resp) => {
  //      console.log("resp", resp);
  //      if (resp.status == 1) {
  //        setTimeout(() => {
  //          navigate("/home");
  //        }, 2000);
  //      } else {
  //        console.log(resp.message);
  //      }
  //    });
  //  });

  



 }

  return (
    <div>
      <div className="global-container">
        <div className="card login-form">
          <div className="card-body">
            <h3 className="card-title text-center">Log In</h3>

            <div className="card-text">
              {/* {showAlert && <p>{errMessage}</p>} */}
              {/* <div className="alert alert-danger alert-dismissible fade show" role="alert">Incorrect username or password.</div> */}
              {/* <button
                type="button"
                onClick={diffToast}
                className="btn btn-primary btn-block"
              >
                Sign in
              </button> */}
              <ToastContainer  />

              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input
                    type="email"
                    className="form-control form-control-sm mt-2"
                    id="exampleInputEmail1"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    aria-describedby="emailHelp"
                  />
                </div>
                <div className="form-group mt-3">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <Link to="#" className="float-end">
                    Forgot password?
                  </Link>
                  <input
                    type="password"
                    className="form-control form-control-sm mt-2"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <button
                  type="button"
                  onClick={submit}
                  className="btn btn-primary btn-block"
                >
                  Sign in
                </button>

                <div className="sign-up">
                  Don't have an account? <Link to="/signup">Create One</Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
