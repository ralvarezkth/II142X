import '../App.css';
import Grid from './component/grid';

const MainView = (props) => {
  const {content} = props;

  return (
    <Grid content={content} interval={7} />
  )
}

export default MainView;