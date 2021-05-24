// import '../App.css'
import {useState, useEffect} from 'react';
import Feedback from './component/feedback';
import Panel from './component/panel';
import Help from './component/help';

const HeaderView = (props) => {
  const {content} = props;
  const [help, setHelp] = useState(false);

  return (
      <header className="header">
        <Feedback duration={5} help={help} setHelp={setHelp} />
        {!help ? <Panel {...props} setHelp={setHelp} /> : 
          <Help duration={5} content={content} setHelp={setHelp} />}
      </header>
  )
}

export default HeaderView;