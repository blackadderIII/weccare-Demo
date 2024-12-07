import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// style
import "../css/signin.css";

// components
import { LoadingBtnComponent } from "../components/loading";

// utils
import { color } from "../utils/color";
import Toast, { errorToast, warnToast } from "../components/toastComponent";
import { admin } from "../lib/fakeCareCards";

import bcrypt from "bcryptjs";

export default function SignIn() {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light";
  });
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    applyTheme(theme);
  }, [theme]);

  const applyTheme = (theme) => {
    document.body.classList.remove("dark", "light");
    document.body.classList.add(theme);

    const components = document.querySelectorAll(".theme");
    const textComponents = document.querySelectorAll(".text-theme");

    if (theme === "dark") {
      document.body.style.backgroundColor = color.backgrounddark;
    } else {
      document.body.style.backgroundColor = color.backgroundlight;
    }

    components.forEach((component) => {
      if (theme === "dark") {
        component.style.backgroundColor = color.darkComponent;
      } else {
        component.style.backgroundColor = color.lightComponent;
      }
    });

    textComponents.forEach((text) => {
      if (theme === "dark") {
        text.style.color = "#ffffff";
      } else {
        text.style.color = "#2a2c41";
      }
    });
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const login = async () => {
    if (!email || !password) {
      warnToast("Fields can't be empty");
      return;
    }

    setIsLoading(true);
    setIsDisabled(true);

    try {
      if (
        email === admin.email &&
        bcrypt.compareSync(password, admin.password)
      ) {
        setIsLoading(false), setIsDisabled(false);
        localStorage.setItem("admin", JSON.stringify(admin));
        navigate("/");
        return;
      } else {
        errorToast("Invalid credentials");
        setIsLoading(false);
        return;
      }
    } catch (error) {
      setIsLoading(false);
      setIsDisabled(false);
      console.log("error logging in", error);
      errorToast("An error occured. Please try again later.");
      return;
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && email && password) {
      login();
    }
  };

  return (
    <main className="signin-container">
      <Toast />
      <div className="signin-modal theme">
        <img src="logo.png" />

        <div className="top">
          <h1 className="text-theme">Login</h1>
        </div>

        {/* email */}
        <div className="field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>

        {/* password */}
        <div className="field">
          <label>Password</label>
          <div className="password-field">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.currentTarget.value)}
              onKeyPress={(e) => handleKeyPress(e)}
            />
            <i
              className={passwordVisible ? "fal fa-eye-slash" : "fal fa-eye"}
              onClick={() => setPasswordVisible(!passwordVisible)}
            ></i>
          </div>
        </div>

        <button disabled={isDisabled} onClick={() => login()}>
          {isLoading ? <LoadingBtnComponent /> : <h3>Login</h3>}
        </button>
      </div>

      <div
        className="forgot-bar theme"
        onClick={() => navigate("/forgotPassword")}
      >
        <p>Forgot Password?</p>
      </div>
    </main>
  );
}
