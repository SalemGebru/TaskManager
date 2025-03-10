import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck,faTimes } from "@fortawesome/free-solid-svg-icons";
import task from '../images/task2.png';
import { useNavigate } from "react-router";

export default function Register(props){
    const navigate=useNavigate();
    const{setUsername,validUsername,setEmail,validEmail, setPassword,validPassword, setConfPassword,validConfPassword,
        usernameFocus,handleUsernameFocus,handleUsernameBlur, emailFocus,handleEmailFocus,handleEmailBlur,passwordFocus,handlePasswordFocus,handlePasswordBlur, confPasswordFocus,handleConfPasswordFocus,
        handleConfPasswordBlur,handleSignUp,}=props;
    return(
        <div className="homepage">
            <div className="homepage-logo">
                <h1>Plan Pal
                    <img src={task} width={150} height={150}/>
                </h1>
                <h3>Unleash Your Productivity</h3>
            </div>
            <div className="signupform">
                <h1>Sign Up</h1>
                <form onSubmit={handleSignUp}>
                    <span className={usernameFocus&&!validUsername?undefined:"hide"}>
                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    </span>
                    <span className={usernameFocus&&validUsername?undefined:"hide"}>
                        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                    </span>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" onChange={(e)=>setUsername(e.target.value)} onFocus={handleUsernameFocus} onBlur={handleUsernameBlur}/>
                    <p className={usernameFocus&&!validUsername?undefined:"hide"}>
                    Must begin with a letter.<br/>
                    Letters, numbers,underscores and hyphens are allowed.
                    </p>

                    <span className={emailFocus&&!validEmail?undefined:"hide"}>
                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    </span>
                    <span className={emailFocus&&validEmail?undefined:"hide"}>
                        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                    </span>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={(e)=>setEmail(e.target.value)} onFocus={handleEmailFocus} onBlur={handleEmailBlur}/>
                    <p className={emailFocus&&!validEmail?undefined:"hide"}>Please enter a valid email address</p>

                    <span className={passwordFocus&&!validPassword?undefined:"hide"}>
                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    </span>
                    <span className={passwordFocus&&validPassword?undefined:"hide"}>
                        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                    </span>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" onChange={(e)=>setPassword(e.target.value)} onFocus={handlePasswordFocus} onBlur={handlePasswordBlur}/>
                    <p className={passwordFocus&&!validPassword?undefined:"hide"}>Must include uppercase and lowercase letters, a number and a special character.</p>

                    <span className={confPasswordFocus&&!validConfPassword?undefined:"hide"}>
                        <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
                    </span>
                    <span className={confPasswordFocus&&validConfPassword?undefined:"hide"}>
                        <FontAwesomeIcon icon={faCheck}></FontAwesomeIcon>
                    </span>
                    <label htmlFor="confpassword">Confirm Password</label>
                    <input type="password" id="confpassword" onChange={(e)=>setConfPassword(e.target.value)} onFocus={handleConfPasswordFocus} onBlur={handleConfPasswordBlur}/>
                    <p className={confPasswordFocus&&!validConfPassword?undefined:"hide"}>Passwords must match</p>

                    <button type="submit">Sign Up</button>
                </form>
                <p>Already have an account?<a href="/login">Log in</a></p>
                
            </div>
            
        </div>
    )
}