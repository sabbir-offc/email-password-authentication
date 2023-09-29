import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { Link } from "react-router-dom";
import auth from "../firebase/firebase";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const SignIn = () => {
  const [loginError, setLoginError] = useState(null);
  const [loginUser, setLoginUser] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const emailRef = useRef(null);
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const loggedUser = result.user;
        setLoginUser(loggedUser);
        if (!loggedUser.emailVerified) {
          return Swal.fire(
            "Error!",
            `Before login you need to verify you email.`,
            "error"
          );
        }
        return Swal.fire("Success!", `Sign in Successfull.`, "success");
      })
      .catch((error) => {
        setLoginError(error);
        return Swal.fire(
          "Error!",
          `Sign In Failed. error: ${loginError.message} `,
          "error"
        );
      });
  };

  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      return Swal.fire("Error!", `Please Provide an Email.`, "error");
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email)) {
      return Swal.fire("Error!", `Please Provide an valid Email`, "error");
    }

    //send reset link
    sendPasswordResetEmail(auth, email)
      .then(() => {
        return Swal.fire(
          "Success!",
          `Password Reset Link send successfull.`,
          "success"
        );
      })
      .catch((error) => {
        console.log(error);
        return Swal.fire(
          "Failed!",
          `Too many attempts, Please try again later.`,
          "warning"
        );
      });
  };

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          {loginUser && (
            <div>
              <p className="text-xl text-white font-medium">
                Name: {loginUser.displayName}
              </p>
              <p className="text-xl text-white font-medium">
                Email: {loginUser.email}
              </p>
            </div>
          )}
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  ref={emailRef}
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <div className="relative">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type={showPass ? "text" : "password"}
                    name="password"
                    placeholder="password"
                    className="input input-bordered w-full pr-10"
                  />
                  <span
                    className="absolute bottom-3 text-2xl right-2 cursor-pointer"
                    onClick={() => setShowPass(!showPass)}
                  >
                    {showPass ? (
                      <BiSolidHide></BiSolidHide>
                    ) : (
                      <BiSolidShow></BiSolidShow>
                    )}
                  </span>
                </div>

                <label className="label">
                  <a
                    href="#"
                    onClick={handleForgotPassword}
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  type="submit"
                  value="Sign In"
                  className="btn btn-primary"
                />
              </div>
            </form>
            <p>
              New here?{" "}
              <Link to="/sign-up" className="text-sky-500">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
