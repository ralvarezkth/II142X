import {useEffect} from 'react';
import {model} from '../../model/model';
import {message} from '../../model/message';

const GridControl = (props) => {
  const {setGrid} = props;

  useEffect(() => {
    message.register("gridControl", listener);

    function unregister() {
      message.unregister("gridControl");
    }

    return unregister;
  });

  function build(ev) {
    const row = ev.target.children[0].children[1].value;
    const col = ev.target.children[2].children[1].value;

    ev.preventDefault();

    const pattern = /^[0-9]{1,2}$/;

    if (!(pattern.test(row) && pattern.test(col))) {
      message.send("feedback", ["badnum", "Erronous input, specified number of rows and columns must be numeric values in range 1-99."]);
      return;
    }

    model.buildCustom(row, col, setGrid);
    message.send("grid", ["hidectrl"]);
  }

  function listener(type, msg) {

  }

  return (
    <div className="control-row">
      <form onSubmit={build}>
        <div className="control-box">
          <label htmlFor="control-rows">Rows</label>
          <input id="control-rows" name="control-rows" className="control-input" placeholder="rows" type="text" autoFocus />
        </div>
        <div className="control-box">
          x
        </div>
        <div className="control-box">
          <label htmlFor="control-cols">Columns</label>
          <input id="control-cols" name="control-cols" className="control-input" placeholder="cols" type="text" />
        </div>
        <div className="control-box">
          <input className="control-button" type="submit" value="submit" />
        </div>
      </form>
    </div>
  )
}

export default GridControl;