import React, { useState } from "react";
import Acard from "../components/warningCards/Acard";
import { axiosInstance } from "../Config/axiosConfig";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [formdata, setformdata] = useState({
    userName: "",
    Email: "",
    Password: "",
    correctPassword: "",
  });

  const [validation, setvalidation] = useState({
    userNameError: "",
    EmailError: "",
    PasswordError: "",
    correctPasswordError: "",
  });

  const [resposne, setresponse] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setformdata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));

    setvalidation((prevError) => ({
      ...prevError,
      [`${name}Error`]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const { userName, Email, Password, correctPassword } = formdata;
    const newerror = {
      userNameError: "",
      EmailError: "",
      PasswordError: "",
      correctPasswordError: "",
    };

    if (!userName.trim()) {
      newerror.userNameError = "User Name is required";
      valid = false;
    }

    if (!Email.trim()) {
      newerror.EmailError = "Email ID is required";
      valid = false;
    } else if (
      !/^([a-zA-Z0-9\.-_]+)@([a-zA-Z0-9-_]+)\.([a-zA-Z]{2,10})$/.test(Email)
    ) {
      newerror.EmailError = "Invalid email format";
      valid = false;
    }

    if (!Password.trim()) {
      newerror.PasswordError = "Password required";
      valid = false;
    }

    if (!correctPassword.trim()) {
      newerror.correctPasswordError = "Password required";
      valid = false;
    } else if (Password !== correctPassword) {
      newerror.correctPasswordError = "Password mismatch";
      valid = false;
    }
    setvalidation(newerror);

    if (valid) {
      axiosInstance({
        url: "/signup",
        method: "POST",
        data: formdata,
      })
        .then((res) => {
          setresponse(res.data);
          setformdata({
            userName: "",
            Email: "",
            Password: "",
            correctPassword: "",
          });
          // Only navigate if signup is successful
          setTimeout(() => {
            setresponse(""); // Clear response after a short duration
            navigate("/signin");
          }, 1000);
        })
        .catch((error) => {
          if (error.response) {
            setresponse(error.response.data); // Error message from server
          } else {
            setresponse("An unexpected error occurred.");
          }
          setTimeout(() => {
            setresponse("");
          }, 1500);
        });
    }
  };

  return (
    <section>
      <div className=" relative flex justify-center items-center h-screen ">
        <div className="w-full h-screen">
          <img
            src="/images/High Size/2151732238.jpg"
            alt=""
            className="w-full h-full block object-cover"
          />
        </div>
        <Acard
          data={resposne}
          className={resposne ? "slide-in" : "slide-out"}
        />
        <div className="signupContainer flex flex-col p-5 py-[3rem] absolute backdrop-blur-md rounded-2xl h-auto w-[85%] sm:w-[85%] md:w-[400px] md:right-0 mx-5">
          <h1 className="font-poppins font-bold text-white  text-[1.5rem] md:text-[2.3rem]">
            Dive into the Anime Adventure
          </h1>
          <h3 className="mb-8 font-poppins text-blue-100">
            Join the Anime Community!
          </h3>
          <label
            htmlFor="name"
            className="text-white mb-2 font-poppins text-[0.9rem]"
          >
            User Name
          </label>
          <input
            type="text"
            name="userName"
            id="name"
            value={formdata.userName}
            onChange={handleChange}
            className={`bg-transparent border rounded-full h-[2rem] outline-none px-4 mb-2 font-poppins text-white ${
              validation.userNameError ? "border-red-500" : ""
            }`}
          />

          <div className="flex justify-end text-red-200">
            <p>{validation.userNameError}</p>
          </div>

          <label
            htmlFor="mail"
            className="text-white mb-2 font-poppins text-[0.9rem]"
          >
            Email
          </label>
          <input
            type="text"
            name="Email"
            id="mail"
            value={formdata.Email}
            onChange={handleChange}
            className={`bg-transparent border rounded-full h-[2rem] outline-none px-4 mb-2 font-poppins text-white ${
              validation.EmailError ? "border-red-500" : ""
            }`}
          />
          <div className="flex justify-end text-red-200">
            <p>{validation.EmailError}</p>
          </div>

          <label
            htmlFor="Password"
            className="text-white mb-2 font-poppins text-[0.9rem]"
          >
            Password
          </label>
          <input
            type="password"
            name="Password"
            id="Password"
            value={formdata.Password}
            onChange={handleChange}
            className={`bg-transparent border rounded-full h-[2rem] outline-none px-4 mb-2 font-poppins text-white ${
              validation.PasswordError ? "border-red-500" : ""
            }`}
          />
          <div className="flex justify-end text-red-200">
            <p>{validation.PasswordError}</p>
          </div>

          <label
            htmlFor="correctPassword"
            className="text-white mb-2 font-poppins text-[0.9rem]"
          >
            Correct Password
          </label>
          <input
            type="text"
            id="correctPassword"
            name="correctPassword"
            value={formdata.correctPassword}
            onChange={handleChange}
            className={`bg-transparent border rounded-full h-[2rem] outline-none px-4 mb-2 font-poppins text-white ${
              validation.correctPasswordError ? "border-red-500" : ""
            }`}
          />
          <div className="flex justify-end text-red-200">
            <p>{validation.correctPasswordError}</p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white font-poppins py-2 rounded-full my-4 "
          >
            Sign In
          </button>

          <div className="flex justify-center">
            <p className="text-white font-poppins">
              Already Have An Account ? <Link to="/signin"><span className="text-blue-600 underline">Sign In</span></Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
