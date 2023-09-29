import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase";
import Swal from "sweetalert2";
import { useState } from "react";
import { Link } from "react-router-dom";
import { BiSolidHide, BiSolidShow } from "react-icons/bi";

const SignUp = () => {
  const [createdUser, setCreatedUser] = useState(null);
  const [registerError, setRegisterError] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const handleCreateUser = (e) => {
    e.preventDefault();
    //get value from input field
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;
    if (password.length < 6) {
      return Swal.fire(
        "Warning!",
        "Password must be 6 characters or long",
        "warning"
      );
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])[A-Za-z]+$/.test(password)) {
      return Swal.fire(
        "Warning!",
        "Password Should have Uppercase, Lowecase, numbers and symble.",
        "warning"
      );
    }
    //creating user

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        const createdUser = result.user;
        setCreatedUser(createdUser);
        sendEmailVerification(createdUser)
          .then()
          .catch((error) => console.log(error));
        updateProfile(createdUser, { displayName: name }).then().catch();
        return Swal.fire("Successful", "Sign up successfull.", "success");
      })
      .catch((error) => {
        setRegisterError(error.message);
        return Swal.fire(
          "Error!",
          `Sign up Failed. error: ${registerError}`,
          "error"
        );
      });
  };
  //   console.log(createdUser);
  //   console.log(registerError);
  return (
    <div className="w-3/5 mx-auto">
      <form onSubmit={handleCreateUser}>
        <div className="mb-6">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            type="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@xyz.com"
            required
          />
        </div>
        <div className="mb-6 relative">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your password
          </label>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Password."
            required
          />
          <span
            className="absolute bottom-2.5 text-2xl right-2 cursor-pointer"
            onClick={() => setShowPass(!showPass)}
          >
            {showPass ? (
              <BiSolidHide></BiSolidHide>
            ) : (
              <BiSolidShow> </BiSolidShow>
            )}
          </span>
        </div>

        <div className="text-center">
          <input
            type="submit"
            className="text-white w-full mx-auto bg-blue-700 hover:bg-blue-800 focus:ring-4 cursor-pointer focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            value="Sign Up"
          />
        </div>
      </form>
      <p>
        Already have an account ?{" "}
        <Link to="/sign-in" className="text-sky-500 text-center mt-2">
          Sign In
        </Link>
      </p>
      {createdUser && <p>Email: {createdUser.email}</p>}
    </div>
  );
};

export default SignUp;
