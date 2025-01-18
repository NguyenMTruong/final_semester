import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./SignUp.scss";
import { setAccessToken, setLogin, setUser } from "@/slide/AuthSlide";
import { backendUrl } from "@/global";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handle = (e) => {
    if (e.target.value) {
      e.target.classList.remove("wrong");
      e.target.parentElement.querySelector(
        ".form-signup__attr .text-blank"
      ).style.display = "none";
    } else {
      e.target.classList.add("wrong");
      e.target.parentElement.querySelector(
        ".form-signup__attr .text-blank"
      ).style.display = "block";
    }
  };

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };
  const handleEmail = (e) => {
    if (e.target.value)
      document.querySelector(".form-signup__email .text-blank").style.display =
        "none";
    else
      document.querySelector(".form-signup__email .text-blank").style.display =
        "block";

    if (isValidEmail(e.target.value))
      document.querySelector(".form-signup__email .email-init").style.display =
        "none";
    else
      document.querySelector(".form-signup__email .email-init").style.display =
        "block";

    if (e.target.value && isValidEmail(e.target.value))
      e.target.classList.remove("wrong");
    else e.target.classList.add("wrong");
  };

  const checkPassword = (str) => {
    const regex =
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])/;
    return regex.test(str);
  };
  const handlePass = (e) => {
    e.preventDefault();
    if (e.target.value)
      document.querySelector(
        ".form-signup__password .text-blank"
      ).style.display = "none";
    else
      document.querySelector(
        ".form-signup__password .text-blank"
      ).style.display = "block";

    if (checkPassword(e.target.value))
      document.querySelector(
        ".form-signup__password .pass-init"
      ).style.display = "none";
    else
      document.querySelector(
        ".form-signup__password .pass-init"
      ).style.display = "block";

    if (e.target.value && checkPassword(e.target.value))
      e.target.classList.remove("wrong");
    else e.target.classList.add("wrong");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const fullname = e.target[0].value;
    const username = e.target[1].value;
    const email = e.target[2].value;
    const password = e.target[3].value;

    if (
      fullname &&
      username &&
      email &&
      isValidEmail(email) &&
      password &&
      checkPassword(password)
    ) {
      const data = {
        fullname,
        username,
        email,
        password,
      };
      axios
        .post(`${backendUrl}/auth/register`, data)
        .then((res) => {
          document
            .querySelectorAll(".form-login input")
            .forEach((e) => (e.value = ""));
          const { accessToken, refreshToken, user } = res;
          dispatch(setLogin(true));
          dispatch(setAccessToken(accessToken));
          dispatch(setUser(user));
          navigate("/");
        })
        .catch((err) => {
          if (err.status == 409) {
            document
              .querySelector(".form-signup__userName input")
              .classList.add("wrong");
            document.querySelector(
              ".form-signup__userName .text-conflict"
            ).style.display = "block";
          }
        });
      return;
    }
    if (!fullname) {
      e.target[0].classList.add("wrong");
      e.target[0].parentElement.classList.add("blank");
    }
    if (!username) {
      e.target[1].classList.add("wrong");
      e.target[1].parentElement.classList.add("blank");
    }
    if (!email) {
      e.target[2].classList.add("wrong");
      e.target[2].parentElement.classList.add("blank");
    }
    if (!isValidEmail(email)) {
      e.target[2].classList.add("wrong");
      document.querySelector(".form-signup__email .email-init").style.display =
        "block";
    }
    if (!password) {
      e.target[3].classList.add("wrong");
      e.target[3].parentElement.classList.add("blank");
    }
    if (!checkPassword(password)) {
      e.target[3].classList.add("wrong");
      document.querySelector(
        ".form-signup__password .pass-init"
      ).style.display = "block";
    }
  };

  return (
    <div className="signup">
      <form className="form-signup" onSubmit={handleSubmit}>
        <h2 className="form-signup__title">Create a new account</h2>
        <div className="form-signup__attr form-signup__fullName">
          <p className="text-blank">*This item cannot be left blank</p>
          <input
            type="fullname"
            placeholder="Fullname"
            onFocus={handle}
            onChange={handle}
          />
        </div>
        <div className="form-signup__attr form-signup__userName">
          <p className="text-blank">*This item cannot be left blank</p>
          <p className="text-conflict">Username already exists</p>
          <input
            type="username"
            placeholder="Username"
            onFocus={handle}
            onChange={handle}
          />
        </div>
        <div className="form-signup__attr form-signup__email">
          <p className="text-blank">*This item cannot be left blank</p>
          <input
            type="email"
            placeholder="Email"
            onChange={handleEmail}
            onFocus={handleEmail}
          />
          <p className="email-init">This item requires email entry</p>
        </div>
        <div className="form-signup__attr form-signup__password">
          <p className="text-blank">*This item cannot be left blank</p>
          <input
            type="password"
            placeholder="Password"
            onFocus={handlePass}
            onChange={handlePass}
          />
          <p className="pass-init">
            Passwords must contain lowercase letters, uppercase letters, numbers
            and special characters
          </p>
        </div>

        <button className="form-signup__submit" type="submit">
          Sign Up
        </button>

        <div className="form-signup__login">
          <p>---- or ----</p>
          <NavLink to="/login">
            <button>Login</button>
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
