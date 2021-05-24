import {useState, useEffect} from 'react';
import {message} from '../../model/message';

const Feedback = (props) => {
  const {duration, help, setHelp} = props;
  const [status, setStatus] = useState([null, ""]);
  const [activeSession, setActiveSession] = useState(false);
  const [time, setTime] = useState((new Date()).getTime() - 1000);
  const cl = status[0] === null ? "" : (status[0] ? " status-success" : " status-failure");
  let id;

  useEffect(() => {
    if (status[0] !== null && !help) {
      id = setTimer(duration * 1000);
      
      return abort;
    }
  }, [status]);

  useEffect(() => {
    message.register("feedback", listener);
    message.listen("feedback", "help");
    message.listen("feedback", "grid");

    function unregister() {
      message.unregister("feedback");
    }

    return unregister;
  });

  function act(ev) {
    if (help) {
      const passed = ((new Date()).getTime() - time) / 1000;  

      if (passed < 1) {
        setStatus([null, ""]);
        setHelp(false);
      } else {
        message.send("help", ["toggle"]);
      }
    }

    if (activeSession) {
      message.send("grid", ["restore"])
      setActiveSession(false);
    }

    setTime((new Date()).getTime());
  }

  function setTimer(delay) {
    return setTimeout(() => {
      if (activeSession) {
        setActiveSession(false);
      }

      setStatus([null, ""]);
    }, delay);
  }

  function abort(id) {
    return function() {
      clearTimeout(id);

      if (activeSession) {
        setActiveSession(false);
      }
    }
  }

  function listener(type, msg) {
    switch (type) {
      case "helpinit":
        setStatus([true, msg]);
        break;
      case "helpclear":
        setStatus([null, msg]);
        break;
      case "gridbadid":
        setStatus([false, msg]);
        break;
      case "badnum":
        setStatus([false, msg]);
        break;
      case "unablewatch":
        setStatus([false, msg]);
        break;
      case "unableonestudent":
        setStatus([false, msg]);
        break;
      case "successwatch":
        setStatus([true, msg]);
        break;
      case "updatesuccess":
        setStatus([true, msg]);
        break;
      case "updatefailed":
        setStatus([false, msg]);
        break;
      case "activesession":
        setActiveSession(true);
        setStatus([true, msg]);
        break;
      case "mustconfigure":
        setStatus([false, msg]);
        break;
      case "addclient":
        setStatus([true, msg]);
        break;
      case "addclientfailed":
        setStatus([false, msg]);
        break;
      case "deleteclient":
        setStatus([true, msg]);
        break;
      case "deleteclientfailed":
        setStatus([false, msg]);
        break;
      case "duplicateclient":
        setStatus([false, msg]);
        break;
      default:
        break;
    }
  }

  return (
    <div className={"header-feedback" + cl} onClick={act}>
      {status[1]}
    </div>
  )
}

export default Feedback;