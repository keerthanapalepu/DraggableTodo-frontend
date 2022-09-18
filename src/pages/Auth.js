import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { signin, signup } from "../actions/auth";

const initialState = { name: "", email: "", password: "" };

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialState);
  const [checked, setChecked] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState("");

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleChecked = () => {
    setChecked((prevChecked) => !prevChecked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate, checked)).then((data)=> { data?._id ? setError("") : setError("User already exists")});
    } else {
      dispatch(signin(formData, navigate, checked)).then((data)=> { data?._id ? setError("") : setError("Email/Password Invalid")});
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  return (
    <div className="w-screen h-screen flex items-center p-10 justify-center gap-5">
      <div class="w-[40%] mr-12 flex flex-col items-center">
        <h2 class="text-[40px]  font-bold text-[#329C89] tracking-[3px]">
          Amikus Project
        </h2>
        <img src="/assets/amikus.svg" className="w-[50%] h-[50%]" alt="logo" />
      </div>
      <div className="w-[35%] rounded-[70px] border border-gray-300 p-10">
        <div className="flex gap-4 mb-10">
          <div>
            <span
              className={`${
                isSignup && "text-gray-200"
              } text-2xl  cursor-pointer`}
              onClick={() => switchMode(true)}
            >
              Login
            </span>
            <div
              className={`  ${
                !isSignup ? "block" : "hidden"
              } w-3 h-1 bg-gray-600`}
            ></div>
          </div>
          <div>
            <span
              className={`text-2xl ${
                !isSignup && "text-gray-200"
              }  cursor-pointer`}
              onClick={() => switchMode(false)}
            >
              Sign Up
            </span>
            <div
              className={`${isSignup ? "block" : "hidden"} w-3 h-1 bg-gray-600`}
            ></div>
          </div>
        </div>

        <form className="p-4 flex flex-col gap-8" onSubmit={handleSubmit}>
          <Toaster
            position="top-center"
            toastOptions={{
              success: {
                style: {
                  background: "#329C89",
                  color: "white",
                },
              },
            }}
          />
          <hr />
          <div>
            <h1 className="text-xl ">To Continue</h1>
            <span className="text-sm font-light text-gray-300">
              We need your Name and Email{" "}
            </span>
          </div>
          {isSignup && (
            <>
              <input
                type="text"
                className="w-[100%] py-2 px-3 text-sm placeholder:text-gray-300 outline-none border border-gray-200 rounded-md"
                placeholder="Full Name"
                name="name"
                onChange={handleChange}
              />
            </>
          )}
          <input
            type="email"
            className="w-[100%] py-2 px-3 text-sm placeholder:text-gray-300 outline-none border border-gray-200 rounded-md"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              className="w-[100%] py-2 px-3 text-sm placeholder:text-gray-300 outline-none border border-gray-200 rounded-md"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />
            {
              <div
                className="absolute right-[20px] top-[35%] cursor-pointer "
                onClick={handleShowPassword}
              >
                {showPassword ? (
                  <AiFillEye color="gray" />
                ) : (
                  <AiFillEyeInvisible color="gray" />
                )}
              </div>
            }
          </div>
          <div className="w-[100%] relative ">

        {error && (
          <div className="absolute -top-[30px]  text-red-600 p-2 text-[11px] w-[100%] grid place-content-center">
            &#9888;&nbsp;{error}
          </div>
        )}
            <button
              className="py-2 px-3 font-semibold w-[100%] text-white rounded-md bg-[#329C89]"
              onClick={handleSubmit}
            >
              {isSignup ? "Sign Up" : "Log In"}
            </button>
          </div>
        </form>

        <div className="flex gap-1 text-[10px] p-4">
          <input
            type="checkbox"
            name="rememberMe"
            checked={checked}
            onChange={handleChecked}
          />
          <label htmlFor="rememberMe">Remember Me</label>
        </div>
      </div>
    </div>
  );
};

export default Auth;
