import {useState, useEffect} from 'react';
import {model} from '../../model/model';
import {message} from '../../model/message';

const Panel = (props) => {
  const [rooms, setRooms] = useState(model.getRooms());
  const [isWatching, setWatch] = useState(false);
  const {content, setHelp, setLanguage} = props;
  const user = model.getUser();
  const langs = model.getLanguages();

  useEffect(() => {
    message.register("panel", listener);

    function unregister() {
      message.unregister("panel");
    }

    return unregister;
  });

  function listener(type, msg) {
    switch (type) {
      case "rooms":
        setRooms(model.getRooms());
        break;
      default:
        break;
    }
  }

  function enableHelp(ev) {
    setHelp(true);
  }

  function setRoom(ev) {
    message.send("grid", ["roomChange", ev.target.value]);
  }

  function setLang(ev) {
    model.setLanguage(ev.target.value);
    setLanguage(ev.target.value);
  }

  function watch(ev) {
    if (!model.getRoom()) {
      message.send("feedback", ["mustconfigure", "Grid must be configured before watching."]);
      return;
    }

    if (model.getSession()) {
      message.send("grid", ["watch"]);
      setWatch(true);
      return;
    }

    try {
      model.watch().then(res => {
        if (res.status === 200) {
          res.json().then(data => {
            model.setSession(data.id);
            model.setActive(true);
            message.send("feedback", ["successwatch", "Watching session registered successfully, will update periodically."]);
            message.send("grid", ["watch"]);
            setWatch(true);

            model.updateStatus().then(res => {
              if (res.status === 200) {

              }
            }).catch(err => {

            });
          });
        } else {
          message.send("feedback", ["unablewatch", "Unable to watch room, if using predefined grid try to create a custom one."]);
        }
        
      }).catch(err => {
        message.send("feedback", ["unablewatch", "Unable to watch room, if using predefined grid try to create a custom one."]);
      });
    } catch (err) {
      message.send("feedback", ["unableonestudent", err.message]);
    }
    
  }

  function unwatch(ev) {
    model.setActive(false);
    message.send("grid", ["pause"]);
    setWatch(false);
  }

  return (
    <div className="header-row">
      <div className="header-box">
        <div className="header-control">
        <h1>{content.panel.greeting} {user.username}</h1>
        </div>
      </div>
      <div className="header-box">
        <div className="header-ctrl">
          <a className="button" onClick={enableHelp}>{content.panel.helpButton}</a>
        </div>
        <div className="header-ctrl">
          {!isWatching ?
          <a className="button" onClick={watch} >{content.panel.watchButton}</a> :
          <a className="button" onClick={unwatch} >{content.panel.unwatchButton}</a>}
        </div>
      </div>
      <div className="header-box">
        <div className="header-ctrl">
          <select onChange={setLang} className="dropdown" defaultValue={0}>
            <option value={0} key={0} disabled>choose language</option>
            {langs && langs.length &&
              langs.map(lang => <option value={lang.id} key={lang.id}>{lang.language}</option>)}
          </select>
        </div>
        <div className="header-ctrl">
          <select onChange={setRoom} className="dropdown" defaultValue={0} disabled={isWatching ? true : false}>
            <option value={0} key={0} disabled>set classroom</option>
            {rooms && rooms.length &&
              rooms.map(room => <option value={room.id} key={room.id}>{room.name}</option>)}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Panel;