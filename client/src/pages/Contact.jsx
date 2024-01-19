import React from "react";
import Navbar from "../components/nav/Navbar";
import { useTheme } from "@mui/material";
import conImg from "../assets/contact.jpg";
import Footer from "../components/nav/Footer";

const Contact = () => {
  const theme = useTheme();
  return (
    <div className="w-full h-screen">
      <Navbar />
      <div
        className="p-3 w-full flex flex-col items-center justify-center"
        style={{
          margin: "0 auto",
        }}
      >
        <p className="text-6xl font-bold text-[#ff3d00] text-center mb-12">
          Contact us
        </p>
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-start gap-4 h-full "
          style={{
            margin: "0 auto",
          }}
        >
          <img
            src={conImg}
            alt={"Name"}
            className="object-cover min-h-[50vh] lg:max-w-[40vw] lg:min-h-[80vh] rounded-lg"
          />
          <div className="flex flex-col items-start justify-start h-full px-2">
            <p className="text-4xl font-bold text-slate-50">
              Lorem, ipsum dolor.
            </p>
            <p className="text-lg text-slate-400">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veniam,
              illum.
            </p>
            <form className="space-y-5 mt-4 h-full">
              <div class="form__group field">
                <input
                  type="input"
                  className="form__field"
                  placeholder="Name"
                  required=""
                />
                <label for="name" class="form__label">
                  Name
                </label>
              </div>

              <div class="form__group field">
                <input
                  type="email"
                  className="form__field"
                  placeholder="Email"
                  required=""
                />
                <label for="name" class="form__label">
                  Email
                </label>
              </div>

              <div class="form__group field">
                <textarea
                  type="input"
                  className="form__field"
                  placeholder="message"
                  required=""
                />
                <label for="name" class="form__label">
                  Message
                </label>
              </div>

              <button className="text-xl font-medium text-slate-50 bg-[#ff3d00] py-2 px-5 rounded-xl">
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
