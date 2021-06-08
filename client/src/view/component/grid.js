import {useState, useEffect} from 'react';
import {model} from '../../model/model';
import {message} from '../../model/message';
import GridControl from './gridControl';

const Grid = (props) => {
  const [grid, setGrid] = useState(null);
  const [gridId, setGridId] = useState(null);
  const [active, setActive] = useState([null, null]);
  const [watch, setWatch] = useState(false);
  const {content, interval} = props;

  useEffect(() => {
    message.register("grid", listener);

    function unregister() {
      message.unregister("grid");
    }

    return unregister;
  });

  useEffect(() => {
    if (watch) {
      const id = setInterval(() => {
        model.fetchSession().then(res => {
          if (res.status === 200) {
            res.json().then(data => {
              model.updateClients(data, setGrid);
              message.send("feedback", ["updatesuccess", "Session updated successfully."]);
            });
          } else {
            message.send("feedback", ["updatefailed", "Session update failed."]);
          }
        }).catch(err => {
          message.send("feedback", ["updatefailed", "Session update failed."]);
        });
      }, interval * 1000);

      function abort() {
        clearInterval(id);
      }

      return abort;
    }
  });

  function selectSeat(ev) {
    if (ev === null) {
      setActive(null);
      return;
    }

    if (ev.target.classList.contains("id-input") || ev.target.classList.contains("seat-button")) {
      return;
    }

    if (ev.target.attributes.["seat-id"]) {
      const row = ev.target.attributes["seat-id"].value[0];
      const col = ev.target.attributes["seat-id"].value[2];

      setActive([row, col]);
      return;
    }

    if (active !== null) {
      setActive(null);
      return;
    }    
  }

  function setId(ev) {
    if (ev.keyCode === 27) {
      selectSeat(null);
      return;
    }

    if (ev.keyCode === 13 || (ev.type === "click" && 
      (ev.target.value === "Submit" || ev.target.value === "Reset" || ev.target.value === "Deactivate" || ev.target.value === "Activate"))) {
      const id = ev.target.value === "Deactivate" || ev.target.value === "Activate" ? "done" : (ev.target.value === "Reset" ? "" : 
        (ev.target.value === "Submit" ? ev.target.parentElement.parentElement.children[0].children[0].value : ev.target.value));

      if (!(/^([0-9]{1,4}|done)$/).test(id) && (id === "" && ev.target.value === "Submit")) {
        message.broadcast("grid", ["gridbadid", "Bad ID (" + id + "), only numbers 1-9999 allowed."]);
        return;
      }

      const row = ev.target.parentElement.parentElement.parentElement.attributes["seat-id"].value[0];
      const col = ev.target.parentElement.parentElement.parentElement.attributes["seat-id"].value[2];

      if (!model.isWatching()) {
        if (/^[0-9]+$/.test(id) && model.has(id)) {
          message.send("feedback", ["duplicateclient", "Duplicate USB-client of same ID not allowed."]);
        } else {
          model.setClient(row, col, id, setGrid);
          selectSeat(null);
        }
        
        return;
      }

      const current = model.getClient(row, col);

      if (/^[0-9]+$/.test(id)) {
        const data = {usbId: Number(id), pos: [Number(row), Number(col)]};
        if (!current) {
          model.addUsbToSession(data).then(res => {
            if (res.status === 200) {
              model.setClient(row, col, id, setGrid);
              message.send("feedback", ["addclient", "USB-client added to session successfully."]);
            } else {
              message.send("feedback", ["addclientfailed", "Attempt to add USB-client to session failed."]);
            }
          }).catch(err => {
            message.send("feedback", ["addclientfailed", "Attempt to add USB-client to session failed."]);
          }).finally(() => selectSeat(null));
        } else {
          model.deleteUsbFromSession(current.id).then(res => {
          }).then(() => {
            return model.addUsbToSession(data).then(res => {
              if (res.status === 200) {
                model.setClient(row, col, id, setGrid);
                message.send("feedback", ["addclient", "New USB-client added to session successfully."]);
              } else {
                message.send("feedback", ["addclientfailed", "Attempt to add USB-client to session failed."]);
              }
            });
          }).catch(err => {
            message.send("feedback", ["addclientfailed", "Attempt to add USB-client to session failed."]);
          }).finally(() => selectSeat(null));
        } 
      } else if (id === "") {
        if (current) {
          model.deleteUsbFromSession(current.id).then(res => {
            if (res.status === 200) {
              model.setClient(row, col, "", setGrid);
              message.send("feedback", ["deleteclient", "USB-client deleted from session successfully."]);
            } else {
              message.send("feedback", ["deleteclientfailed", "Attempt to delete USB-client from session failed."]);
            }
          }).catch(err => {
            message.send("feedback", ["deleteclientfailed", "Attempt to delete USB-client from session failed."]);
          }).finally(() => selectSeat(null));
        }
      } else {
        if (current) {
          model.updateUsbInSession(current.id, current.status === 2 ? 1 : 2).then(res => {
            if (res.status === 200) {
              model.setClient(row, col, id, setGrid);
              message.send("feedback", ["updateclient", "USB-client status updated successfully."]);
            } else {
              message.send("feedback", ["updateclientfailed", "Attempt to update USB-client status failed."]);
            }
          }).catch(err => {
            message.send("feedback", ["updateclientfailed", "Attempt to update USB-client status failed."]);
          }).finally(() => selectSeat(null));
        }
      }
    }
  }

  function listener(type, msg) {
    switch (type) {
      case "roomChange":
        setGridId(Number(msg));
        model.setRoom(msg, setGrid);
        model.setSession(null);
        break;
      case "hidectrl":
        setGridId(null);
        break;
      case "watch":
        setWatch(true);
        break;
      case "pause":
        setWatch(false);
        break;
      case "restore":
        model.fetchActiveSessionUsers().then(res => {
          if (res.status === 200) {
            res.json().then(data => {
              model.storeActiveUsers(data);
              setGridId(null);
              model.setRoom(null, setGrid);
            });
          }
        }).catch(err => {

        });
        break;
      default:
      break;
    }
    
  }

  return (
    <main className="main" onClick={selectSeat}>
      {gridId === 0 &&
        <GridControl setGrid={setGrid} />}
      {grid && grid.length && 
        grid.map((row, i) => {
          let map = [];
          
          row.forEach((seat, j) => {
            let status = seat === null ? " available" : (seat.status === 0 ? " offline" : 
              (seat.status === 1 ? " online" : (seat.status === 2 ? " finished" : " onoffline")));
            let cont = active && active[0] == i && active[1] == j ? 
              <div className="main-box">
                <div className="main-sub-box"><input className="id-input" type="text" placeholder="id" onKeyDown={setId} autoFocus /></div>
                <div className="main-sub-box">
                  <input className="seat-button" type="button" value="Submit" onClick={setId} />
                  <input className="seat-button" type="button" value="Reset" onClick={setId} />
                  <input className="seat-button" type="button" value={seat && seat.status !== 2 ? "Deactivate" : "Activate"} onClick={setId} />
                </div>
              </div> : 
              (seat === null ? content.grid.available : seat.id);
            map.push(<div className={"main-box" + status} seat-id={[i, j]} key={j}>{cont}</div>);
          });

          return <div className="main-row" key={i}>{map.map(seat => {
            return seat;
          })}
          </div>;
      })}
    </main>
  )
}

export default Grid;