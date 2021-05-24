import {useState} from 'react';
import {model} from '../model/model';

const LoginView = (props) => {
  const [feedback, setFeedback] = useState(0);
  const [timer, setTimer] = useState(null);
  const {history, setAuth} = props;

  function doLogin(ev) {
    const uname = "Invigilator1"//ev.target.children[0].children[1].value;
    const passwd = "tenta1"//ev.target.children[1].children[1].value;
    const pattern = /^[^\\s\\S]{3,25}$/;
    let error = "";

    ev.preventDefault();

    if (!pattern.test(uname)) {
      error = "Invalid username.";
    }

    if (!pattern.test(passwd)) {
      error = error ? "Invalid username and password." : "Invalid password.";
    }

    if (error) {
      setError(error);
      return;
    }

    fetch("http://localhost:3001/api/login?username=" + uname + "&password=" + passwd).then(res => {
      res.json().then(data => {
        if (res.status === 200) {
          const user = {id: data.user.id, username: data.user.username};
          model.setUser(user);
          sessionStorage.setItem("token", data.token);
          sessionStorage.setItem("user", JSON.stringify(user));
          setAuth(true);
          history.push("/client");
        } else {
          setError("Invalid credentials, please try again.");
        }
      });
      
    }).catch(err => {
      setError("Technical issues, please try again later.");
    });
  }

  function setError(error) {
    setFeedback(error);

    if (timer) {
      clearTimeout(timer);
    }

    const id = setTimeout(() => {
      setFeedback(0);
      setTimer(null);
    }, 5000);

    setTimer(id);
  }

  return (
    <main className="login">
      <div className="login-box">
        <div className="login-ctrl">
          <h1>Login</h1>
        </div>
        <div className={"login-ctrl" + (feedback ? " login-failed" : " login-hidden")}>
          {feedback}
        </div>
        <form onSubmit={doLogin}>
          <div className="login-ctrl">
            <label className="login-label" htmlFor="username">Username</label>
            <input className="login-input" id="username" name="username" type="text" placeholder="username" autoFocus />
          </div>
          <div className="login-ctrl">
            <label htmlFor="password">Password</label>
            <input className="login-input" id="password" name="password" type="password" placeholder="password" />
          </div>
          <div className="login-ctrl">
            <input className="login-button" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </main>
  )
}

export default LoginView;