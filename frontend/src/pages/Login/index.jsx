import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

import "./Login.scss";
import { setAccessToken, setLogin, setUser } from "@/slide/AuthSlide";
import { backendUrl } from "@/global";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken, refreshToken, user } = useSelector(
    (state) => state.auth
  );

  const changeInput = (e) => {
    if (e.target.value != "") {
      e.target.parentElement.classList.remove("blank");
    } else {
      e.target.parentElement.classList.add("blank");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = e.target[0].value;
    const password = e.target[1].value;
    if (username == "") {
      e.target[0].classList.add("wrong");
      e.target[0].parentElement.classList.add("blank");
    }
    if (password == "") {
      e.target[1].classList.add("wrong");
      e.target[1].parentElement.classList.add("blank");
    }
    if (username != "" && password != "") {
      const data = {
        username,
        password,
      };

      axios
        .post(`${backendUrl}/auth/login`, data)
        .then((res) => {
          const { accessToken, user } = res.data;
          dispatch(setLogin(true));
          dispatch(setAccessToken(accessToken));
          dispatch(setUser(user));
          navigate("/");
        })
        .catch((err) => {
          if (err.status == 404) {
            document
              .querySelector(".form-login__email input")
              .classList.add("wrong");
            document.querySelector(
              ".form-login__email .text-exists"
            ).style.display = "block";
            return;
          } else {
            document
              .querySelectorAll(".form-login input")
              .forEach((input) => input.classList.add("wrong"));
            document.querySelector(".form-login__wrong").style.display =
              "block";
          }
        });
    }
  };
  return (
    <>
      <div className="login">
        <form onSubmit={handleSubmit} className="form-login">
          <h2 className="form-login__title">Log in with your account</h2>
          <div className="form-login__attr form-login__email">
            <p className="text-blank">*This item cannot be left blank</p>
            <p className="text-exists">*Username not exists</p>
            <input
              className="username"
              type="test"
              placeholder="Username"
              onChange={changeInput}
            />
          </div>
          <div className="form-login__attr form-login__password">
            <p className="text-blank">*This item cannot be left blank</p>
            <input
              className="password"
              type="password"
              placeholder="Password"
              onChange={changeInput}
            />
          </div>
          <div className="form-login__wrong">* Username or password wrong.</div>
          <button className="form-login__submit" type="submit">
            Log in
          </button>
          <div className="form-login__signup">
            <p>---- or ----</p>
            <NavLink to="/signup">
              <button>Sign Up</button>
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
