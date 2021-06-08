const _PORT_ = 3001;

class Model {
  constructor() {
    this.languages = [];
    this.rooms = [];
    this.language = 2;
    this.room = null;
    this.grid = null;
    this.user = {id: null, username: null};
    this.session = null;
    this.cache = null;
    this.active = false;
    this.init();
  }

  init() {
    this.languages.push({id: 1, language: "swedish"});
    this.languages.push({id: 2, language: "english"});
    this.rooms.push({id: 0, name: "_custom_", rows: null, cols: null});
  }

  getLanguages() {
    return this.languages;
  }

  getRooms() {
    return this.rooms;
  }

  getRoom() {
    return this.room;
  }

  getUser() {
    return this.user;
  }

  getSession() {
    return this.session;
  }

  isWatching() {
    return this.active;
  }

  setSession(id) {
    this.session = id;
  }

  setActive(status) {
    this.active = status;
  }

  setLanguage(id) {
    this.language = Number(id);
  }

  setUser(user) {
    const {id, username} = user;
    this.user = {id, username};
  }

  storeActive(grid) {
    this.cache = grid;
  }

  storeActiveUsers(users) {
    this.cache.users = users;
  }

  has(id) {
    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] && this.grid[i][j].id === id) {
          return true;
        }
      }
    }

    return false;
  }

  createGrid(id) {
    let room;

    for (let i = 0; i < this.rooms.length; i++) {
      if (this.rooms[i].id === id) {
        room = this.rooms[i];
        break;
      }
    }

    this.grid = [];

    if (id === null) {
      room = {rows: this.cache.grid[0], cols: this.cache.grid[1]};
    }

    for (let i = 0; i < room.rows; i++) {
      this.grid.push([]);

      for (let j = 0; j < room.cols; j++) {
        this.grid[i].push(null);
      }
    }

    if (id === null) {
      this.room = 1;
      this.cache.users.forEach(user => {
        this.grid[user.position[0]][user.position[1]] = {id: "" + user.usbId, status: user.statusId};
      });
    }
  }

  /**
   * Generates an object of the usb-client and its corresponding position.
   * @returns an object describing the specified usb-client and its position.
   */

/*  getGridId(id) { BORT
    let ids;

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j] && this.grid[i][j].id === id) {
          ids = {usbId: Number(this.grid[i][j].id), pos: [i, j]};
        }
      }
    }

    return ids;
  } */

  /**
   * Generates a collection of the usb-clients with their corresponding position.
   * @returns an array of objects describing the existing usb-clients and their position.
   */

  getGridIds() {
    let ids = [];

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        if (this.grid[i][j]) {
          ids.push({usbId: Number(this.grid[i][j].id), pos: [i, j]});
        }
      }
    }

    return ids;
  }

  buildCustom(rows, cols, setGrid) {
    this.room = 1;
    this.rooms[0].rows = Number(rows);
    this.rooms[0].cols = Number(cols);

    this.createGrid(0);
    setGrid(this.grid);
  }

  setRoom(id, setGrid) {
    id = id === null ? null : Number(id);
    this.room = id;

    if (id === 0) {
      this.grid = null;
    } else {
      this.rooms[0].rows = null;
      this.rooms[0].cols = null;
      this.createGrid(id);
    }

    setGrid(this.grid);
  }

  setRooms(rooms) {
    if (rooms) {
      let arr = [this.rooms[0]];

      for (let i = 0; i < rooms.length; i++) {
        arr.push({id: rooms[i].id, name: rooms[i].name, rows: rooms[i].grid[0], cols: rooms[i].grid[1]});
      }

      this.rooms = arr;
    } 
  }

  /**
   * Gets a specific usb-client in the grid.
   * @returns the specific usb-client.
   */

  getClient(row, col) {
    return this.grid[row][col];
  }

  /**
   * Sets the status of a specific position in the grid.
   * @param row the specified row number.
   * @param col the specified column number.
   * @param id the usb-client id or "done" for activation/deactivation and "" for reset.
   * @param callback to finalize configuration.
   */

  setClient(row, col, id, setGrid) {
    const status = this.grid[row][col] && this.grid[row][col].status !== 2 && id === "done" ? 2 : 1;

    if (id === "done") {
      if (!this.grid[row][col]) {
        return;
      }

      id = this.grid[row][col].id;
    }
    
    this.grid[row][col] = id === "" ? null : {id, status};
    setGrid(this.grid);
  }

  updateClients(data, setGrid) {
    const now = (new Date()).getTime();
    let obj = {};
    let change = false;

    for (let i = 0; i < data.length; i++) {
      let date = new Date(data[i].updatedAt);
      obj["" + data[i].usbId] = (now - date.getTime()) / 1000;
    }

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        let seat = this.grid[i][j];

        if (seat && seat.status !== 2) {
          if (obj["" + seat.id] > 30) {
            if (seat.status !== 0) {
              change = true;
            }

            seat.status = 0;
            continue;
          }

          if (obj["" + seat.id] > 15) {
            if (seat.status !== 3) {
              change = true;
            }

            seat.status = 3;
            continue;
          }

          if (obj["" + seat.id] < 15) {
            if (seat.status !== 1) {
              change = true;
            }

            seat.status = 1;
          }
        }
      }
    }

    if (change) {
      setGrid(null);
      setGrid(this.grid);
    }
  }

  url(path, params) {
    const pattern = /^(\/\w+|\/:\w+)+\/?$/;
    const param = /(:\w+)/;
    const host = "http://localhost:" + _PORT_;

    if (!pattern.test(path)) {
      return host + path;
    }

    if (params) {
      for (let i = 0; param.test(path) && i < params.length; i++) {
        const match = param.exec(path)[1];
        path = path.slice(0, path.indexOf(match)) + params[i] + path.slice(path.indexOf(match) + match.length);
      }
    }

    return host + path;
  }

  requestOptions(method, body) {
    const methods = ["GET", "POST", "PUT", "DELETE", "HEAD"];

    if (methods.indexOf(method.toUpperCase()) === -1) {
      return null;
    }

    let opts = {method, headers: {"Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token")}};

    if (method.toUpperCase() === "POST" || method.toUpperCase() === "PUT" && body) {
      opts.body = body;
    }

    return opts;
  }

  /**
   * Fetches initial data in available preconfigured rooms and a potential previously configured session.
   * @returns the promises of the HTTP requests.
   */

  fetchResources() {
    let all = [];

    let rooms = this.fetchRooms();
    let activeSession = this.fetchActiveSession();

    all.push(rooms);
    all.push(activeSession);

    return Promise.all(all);
  }

  /**
   * Fetches preconfigured classrooms.
   * @returns the prmise of the HTTP request.
   */

  fetchRooms() {
    const opts = this.requestOptions("GET");
    const url = this.url("/api/guard/rooms");

    return fetch(url, opts);
  }

  /**
   * Fetches a potential previously configured session.
   * @returns the promise of the HTTP request.
   */

  fetchActiveSession() {
    const opts = this.requestOptions("GET");
    const url = this.url("/api/guard/:userId/session", [this.user.id]);

    return fetch(url, opts);
  }

  fetchActiveSessionUsers() {
    const opts = this.requestOptions("GET");
    const url = this.url("/api/guard/sessions/:cacheId/students", [this.cache.id]);

    return fetch(url, opts);
  }

  addUsbToSession(data) {
    const body = JSON.stringify({student: data});
    const opts = this.requestOptions("POST", body);
    const url = this.url("/api/guard/sessions/:sessionId/students", [this.session]);

    return fetch(url, opts);
  }

  updateUsbInSession(usbId, status) {
    const opts = this.requestOptions("PUT");
    const url = this.url("/api/guard/sessions/:sessionId/students/:usbId/status/:statusId", [this.session, usbId, status]);

    return fetch(url, opts);
  }

  deleteUsbFromSession(usbId) {
    const opts = this.requestOptions("DELETE");
    const url = this.url("/api/guard/sessions/:sessionId/students/:usbId", [this.session, usbId]);

    return fetch(url, opts);
  }

  /**
   * Fetches the current state of the currently configured session.
   * @returns the Promise of the HTTP request.
   */

  fetchSession() {
    const opts = {method: "GET", headers: {"Content-Type": "application/json", Authorization: "Bearer " + sessionStorage.getItem("token")}};
    const url = this.url("/api/guard/sessions/:sessionId/students", [this.session]);

    return fetch(url, opts);
  }

  /**
   * Sends a registration request to the server.
   * @param data the body to be included in the HTTP request.
   * @returns the Promise of the HTTP request.
   */

  addSession(data) {
    const body = JSON.stringify(data);
    const opts = this.requestOptions("POST", body);
    const url = this.url("/api/guard/:userId/session", [this.user.id]);

    return fetch(url, opts);
  }

  /**
   * Attempts to register a new session.
   * @throws Error if there are no students to watch.
   * @returns A Promise of the registration request attempt.
   */

  watch() {
    let students = this.getGridIds();

    if (!students.length) {
      throw new Error("At least one student must be present to watch.");
    }

    let data = {session: {grid: {rows: this.grid.length, cols: this.grid[0].length}, students}};
    return this.addSession(data);
  }

  /**
   * Iterates through entire grid and updates status of local clients having been marked
   * inactive on server making changes that occured prior to the session having been created permanent.
   * @returns a Promise of the potential HTTP requests.
   */

  updateStatus() {
    let all = [];

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < this.grid[i].length; j++) {
        const seat = this.grid[i][j];

        if (seat && seat.status === 2) {
          all.push(this.updateUsbInSession(seat.id, 2));
        }
      }
    }

    return Promise.all(all);
  }
}

export const model = new Model();