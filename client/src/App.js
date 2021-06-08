import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import HomeView from './view/homeView';
import LoginView from './view/loginView';
import {content} from './model/content';

function App() {
  const [language, setLanguage] = useState(2);
  const [isAuth, setAuth] = useState(false);
  const cont = content.get(language);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      setAuth(true);
    }
  });

  return (
    <Router className="App">
      <Switch>
        <Route path="/" exact render={props => <LoginView {...props} setAuth={setAuth} />} />
        <Route path="/client" render={props => <HomeView {...props} setAuth={setAuth} content={cont} language={language} setLanguage={setLanguage} />} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;