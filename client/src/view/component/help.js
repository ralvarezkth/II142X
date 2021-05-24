import {useState, useEffect} from 'react';
import {message} from '../../model/message';

const Help = (props) => {
  const [slide, setSlide] = useState(0);
  const {duration, setHelp, content} = props;
  let id;

  useEffect(() => {
    id = setTimer();

    return abort;
  });

  useEffect(() => {
    message.register("help", listener);
    message.send("feedback", ["helpinit", "{" + content.help.abort + " " + (slide + 1) + "/" + slides.length + "}"]);

    function unregister() {
      message.unregister("help");
    }

    return unregister;
  });

  function listener(type, msg) {
    switch (type) {
      case "toggle":
        if (id) {
          clearTimeout(id);
          id = null;
          message.send("feedback", ["helpinit", "{" + content.help.paused + " " + (slide + 1) + "/" + slides.length + "}"]);
        } else {
          id = setTimer();
          message.send("feedback", ["helpinit", "{" + content.help.abort + " " + (slide + 1) + "/" + slides.length + "}"]);
        } 
        break;
      default:
        break;
    }
  }

  function setTimer() {
    return setTimeout(() => {
      if (slide < slides.length - 1) {
        setSlide(slide + 1);
      } else {
        setHelp(false);

        if (slide === slides.length - 1) {
          message.broadcast("help", ["helpclear", ""]);
        }
      }
    }, duration * 1000);
  }

  function abort() {
    clearTimeout(id);
  }

  const slides = content.help.slides.map((slide, i) => <div key={i}>{slide}</div>);

  return (
    <div className="header-row">
      <div className="header-box">
        {slides[slide]}
      </div>
    </div>
  )
}

export default Help;