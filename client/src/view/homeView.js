import {useState, useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import HeaderView from './headerView';
import MainView from './mainView';
import {model} from '../model/model';
import {message} from '../model/message';

const HomeView = props => {
  const [isAuth, setAuth] = useState(sessionStorage.getItem("token") ? true : false)
  const {language, setLanguage, location} = props;
  const {panel, help, grid} = props.content;

  useEffect(() => {
    if (isAuth) {
      message.register("home", null);
      const user = JSON.parse(sessionStorage.getItem("user"));
      model.setUser(user);

      model.fetchResources().then(res => {
        res[0].json().then(data => {
          if (res[0].status === 200) {
            model.setRooms(data);
            message.send("panel", ["rooms"]);
          }
        });

        res[1].json().then(data => {
          if (res[1].status === 200) {
            if (data) {
              message.send("feedback", ["activesession", "{click here to restore existing active session}"]);
              model.storeActive(data);
            }
          }
        });

      }).catch(err => {
        console.error(err);
      });

      function abort() {
        message.unregister("home");
      }

      return abort;
    }
  }, [isAuth]);

  return (
    /^\/client\/?$/.test(location.pathname) && isAuth ?
    <div className="container">
      <HeaderView content={{panel, help}} language={language} setLanguage={setLanguage} />
      <MainView content={{grid}} />
    </div>
    : (isAuth ? <Redirect to="/client" /> : <Redirect to="/" />)
  )
}

export default HomeView;