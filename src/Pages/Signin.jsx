import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../Config/axiosConfig";
import Bcard from "../components/warningCards/Bcard";

const Signin = () => {
  const navigate = useNavigate();

  const [logindata, setlogindata] = useState({
    Email: "",
    Password: "",
  });

  const [loginError, setError] = useState({
    EmailError: "",
    PasswordError: "",
  });

  const [response, setresponse] = useState("");

  const handlechange = (event) => {
    const { name, value } = event.target;

    setlogindata((prevdata) => ({
      ...prevdata,
      [name]: value,
    }));

    setError((prevError) => ({
      ...prevError,
      [`${name}Error`]: "",
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    const { Email, Password } = logindata;
    const newError = {
      EmailError: "",
      PasswordError: "",
    };

    if (!Email.trim()) {
      newError.EmailError = "Email ID is required";
      valid = false;
    } else if (
      !/^([a-zA-Z0-9\.-_]+)@([a-zA-Z0-9-_]+)\.([a-zA-Z]{2,10})$/.test(Email)
    ) {
      newError.EmailError = "Invalid email format";
      valid = false;
    }

    setError(newError);

    if (!Password.trim()) {
      newError.PasswordError = "Password required";
      valid = false;
    }

    if (valid) {
      axiosInstance({
        url: "/signin",
        method: "POST",
        data: logindata,
      })
        .then((res) => {
    

          setresponse(res.data.message);
          setlogindata({
            Email: "",
            Password: "",
          });
          localStorage.setItem("token", res.data.token);
          // Only navigate if signup is successful
          setTimeout(() => {
            setresponse(""); // Clear response after a short duration
            navigate("/");
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
      <div className="flex relative w-full h-screen lg:grid grid-cols-2 overflow-clip">
        <div className="w-full h-screen ">
          <img
            src="images/High Size/2151732243.jpg"
            alt=""
            className="w-full h-screen block object-cover"
          />
        </div>
        <Bcard
          logindata={response}
          
          className={response ? "slide-in" : "slide-out"}
        />
        <div className="h-screen w-full flex justify-center items-center absolute md:relative ">
          <div className="flex flex-col drop-shadow-xl border-2 p-5 rounded-2xl w-[90%] backdrop-blur-lg  md:w-[70%] lg:w-[70%] xl:w-[50%]  ">
            <h1 className="font-poppins font-bold text-[2rem] my-5 text-white md:text-black ">
              Welcome To <br />
              Anim World
            </h1>
            <label
              htmlFor="mail"
              className="text-white mb-2 font-poppins text-[0.9rem] md:text-gray-600 "
            >
              Email
            </label>
            <input
              type="text"
              id="mail"
              value={logindata.Email}
              name="Email"
              onChange={handlechange}
              className={`bg-transparent border rounded-full h-[2rem] outline-none px-4 mb-2 font-poppins text-white md:text-black ${
                loginError.EmailError ? "border-red-500" : ""
              }`}
            />

            <div className="flex justify-end text-red-500">
              <p>{loginError.EmailError}</p>
            </div>

            <label
              htmlFor="password"
              className="text-white mb-2 font-poppins text-[0.9rem] md:text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={logindata.Password}
              name="Password"
              onChange={handlechange}
              className={`bg-transparent border rounded-full h-[2rem] outline-none px-4 mb-2 font-poppins text-white md:text-black ${
                loginError.PasswordError ? "border-red-500" : ""
              }`}
            />

            <div className="flex justify-end text-red-500">
              <p>{loginError.PasswordError}</p>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white font-poppins py-2 rounded-full my-4 "
            >
              Login In
            </button>
            <div className="flex justify-center mb-5">
              <p className="text-white font-poppins md:text-black">
                Don't Have An Account ?{" "}
                <Link to="/signup">
                  <span className="text-blue-600 underline">Sign Up</span>
                </Link>
              </p>
            </div>
            {/* <div className="flex items-center gap-4 w-full justify-center">
                <span className="border-2 flex w-[5rem] h-1"></span>
                <div>or</div>
                <span className="border-2 flex w-[5rem] h-1"></span>
                
              </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
