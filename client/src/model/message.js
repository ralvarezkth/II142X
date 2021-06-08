class Message {
  constructor() {
    this.components = {};
    this.listenCache = {};
  }

  register(name, callback) {
    if (this.components[name]) {
      console.error("Component " + name + " exists, overwriting.");
    }

    let c = {name, callback};
    c.observers = this.listenCache[name] ? this.listenCache[name] : [];
    this.components[name] = c;
    this.listenCache[name] = null;
  }

  unregister(name) {
    if (this.components[name]) {
      this.listenCache[name] = this.components[name].observers;
      this.components[name] = null;
    }
  }

  listen(name, listenTo) {
    if (!this.components[name]) {
      return;
    }

    if (this.components[listenTo]) {
      if (this.components[listenTo].observers.indexOf(name) === -1) {
        this.components[listenTo].observers.push(name);
      }
    } else {
      if (this.listenCache[listenTo]) {
        if (this.listenCache[listenTo].indexOf(name) === -1) {
          this.listenCache[listenTo].push(name);
        }
      } else {
        this.listenCache[listenTo] = [];
        this.listenCache[listenTo].push(name);
      }
    }
  }

  broadcast(name, args) {
    if (this.components[name]) {
      this.components[name].observers.forEach(obs => {
        if (this.components[obs]) {
          this.components[obs].callback.apply(null, args);
        }
      });
    }
  }

  send(name, args) {
    if (!this.components[name]) {
      return;
    }

    this.components[name].callback.apply(null, args);
  }

  list() {
    return Object.keys(this.components);
  }

  has(name) {
    return this.components[name] ? true : false;
  }
}

export const message = new Message();