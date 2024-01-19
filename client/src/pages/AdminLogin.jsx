import React, { useState, useEffect } from "react";
import { loginAdmin } from "../functions/admin";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { AdminReducerFunc } from "../state/admin/adminSlice";

const AdminLogin = () => {
  let initialState = {
    email: "",
    password: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [values, setValues] = useState(initialState);

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const { admin } = useSelector((state) => state.Admin);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      values.email === initialState.email ||
      values.password === initialState.password
    ) {
      alert("Please enter all fields");
    } else {
      loginAdmin(values.email, values.password)
        .then((res) => {
          if (res.data.success) {
            console.log("Admin Logged in", res.data);
            toast.success("Admin logged in", {
              theme: "dark",
            });

            setValues(initialState);
            // save admin to the redux page
            dispatch(AdminReducerFunc(res.data.admin));
            navigate("/admin/dashboard");
          } else {
            setValues(initialState);
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error(err.message);
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      {/* card */}
      <div className="h-[55vh] md:h-[45vh] w-[45vh] rounded-lg bg-[#2a2b38] text-center py-[1.9em] pl-[1.2em] pr-[1.2em]">
        <h4 class="text-[#f5f5f5] font-normal mb-4 text-[1.5em]">Log In!</h4>
        {/* form */}
        <form onSubmit={handleSubmit}>
          <div className="mt-[0.5rem] bg-[#1f2029] flex justify-center items-center gap-2 rounded-lg py-[0.5em] pl-[1em] pr-[1em] ">
            <svg
              className="fill-[#ffd180] h-10 w-10"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M207.8 20.73c-93.45 18.32-168.7 93.66-187 187.1c-27.64 140.9 68.65 266.2 199.1 285.1c19.01 2.888 36.17-12.26 36.17-31.49l.0001-.6631c0-15.74-11.44-28.88-26.84-31.24c-84.35-12.98-149.2-86.13-149.2-174.2c0-102.9 88.61-185.5 193.4-175.4c91.54 8.869 158.6 91.25 158.6 183.2l0 16.16c0 22.09-17.94 40.05-40 40.05s-40.01-17.96-40.01-40.05v-120.1c0-8.847-7.161-16.02-16.01-16.02l-31.98 .0036c-7.299 0-13.2 4.992-15.12 11.68c-24.85-12.15-54.24-16.38-86.06-5.106c-38.75 13.73-68.12 48.91-73.72 89.64c-9.483 69.01 43.81 128 110.9 128c26.44 0 50.43-9.544 69.59-24.88c24 31.3 65.23 48.69 109.4 37.49C465.2 369.3 496 324.1 495.1 277.2V256.3C495.1 107.1 361.2-9.332 207.8 20.73zM239.1 304.3c-26.47 0-48-21.56-48-48.05s21.53-48.05 48-48.05s48 21.56 48 48.05S266.5 304.3 239.1 304.3z"></path>
            </svg>

            <input
              placeholder="Email"
              className="bg-transparent border-none outline-none w-full color-[#d3d3d3] focus:placeholder:opacity-0 transition-all text-slate-50"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
            ></input>
          </div>

          <div class="mt-[0.5rem] bg-[#1f2029] flex justify-center items-center gap-2 rounded-lg py-[0.5em] pl-[1em] pr-[1em] ">
            <svg
              className="fill-[#ffd180] h-10 w-10"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M80 192V144C80 64.47 144.5 0 224 0C303.5 0 368 64.47 368 144V192H384C419.3 192 448 220.7 448 256V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V256C0 220.7 28.65 192 64 192H80zM144 192H304V144C304 99.82 268.2 64 224 64C179.8 64 144 99.82 144 144V192z"></path>
            </svg>
            <input
              placeholder="Password"
              className="bg-transparent border-none outline-none w-full color-[#d3d3d3] focus:placeholder:opacity-0 transition-all text-slate-50"
              name="password"
              type="password"
              value={values.password}
              onChange={handleChange}
            />
          </div>

          <button
            className="m-4 border-none rounded-lg bg-[#ffd180] font-bold text-xl text-[#5e6681] py-[0.6em] pl-[1.2em] pr-[1.2em] uppercase hover:bg-[#5e6681] hover:text-[#ffeba7]"
            style={{
              boxShadow: "0 8px 24px 0 rgb(255 235 167 / 20%)",
              transition: "all .3s ease-in-out",
            }}
            type="submit"
          >
            Login
          </button>
          <div
            className="text-[#f5f5f5] block text-[1em] hover:text-[#ffd180] bg-transparent hover:underline text-center cursor-pointer"
            style={{
              transition: "color .3s ease-out",
            }}
          >
            Forgot your password?
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
