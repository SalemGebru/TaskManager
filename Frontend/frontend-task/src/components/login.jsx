import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { setUsername, setPassword, setValidUsername, setValidPassword, setUsernameFocus, setPasswordFocus, login } from "../features/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, password, validUsername, validPassword, usernameFocus, passwordFocus,  logged } = useSelector((state) => state.user);

  const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
  const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;


  useEffect(() => {
    if (logged) {
      navigate('/tasks');
    }
  }, [logged, navigate]);

  useEffect(() => {
    dispatch(setValidUsername(USERNAME_REGEX.test(username)));
  }, [username, dispatch]);

  useEffect(() => {
    dispatch(setValidPassword(PASSWORD_REGEX.test(password)));
  }, [password, dispatch]);

  const handleUsernameFocus = () => dispatch(setUsernameFocus(true));
  const handleUsernameBlur = () => dispatch(setUsernameFocus(false));

  const handlePasswordFocus = () => dispatch(setPasswordFocus(true));
  const handlePasswordBlur = () => dispatch(setPasswordFocus(false));

  const handleLogin = async (e) => {
    e.preventDefault();

    
    if (!validUsername || !validPassword) {
      alert('Please fill out the required fields correctly');
      return;
    }

    dispatch(login({ username, password }));
  
  };

  return (
    <div className="loginPage">
      <div className="loginform">
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
          
          <label htmlFor="username">Username<span className={usernameFocus && !validUsername ? undefined : "hide"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <span className={usernameFocus && validUsername ? undefined : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span></label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => dispatch(setUsername(e.target.value))}
            onFocus={handleUsernameFocus}
            onBlur={handleUsernameBlur}
          />
          <p className={usernameFocus && !validUsername ? undefined : "hide"}>
            Must begin with a letter.<br />
            Letters, numbers, underscores, and hyphens are allowed.
          </p>

          
          <label htmlFor="password">Password<span className={passwordFocus && !validPassword ? undefined : "hide"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
          <span className={passwordFocus && validPassword ? undefined : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span></label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => dispatch(setPassword(e.target.value))}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
          />
          <p className={passwordFocus && !validPassword ? undefined : "hide"}>
            Must include uppercase and lowercase letters, a number, and a special character.
          </p>
          <button type="submit">Log in</button>
        </form>
      </div>
    </div>
  );
}
