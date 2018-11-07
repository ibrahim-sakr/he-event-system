class Dispatcher {

  constructor(EventsListeners) {
    /**
     * {
     *     "eventName": [] // array of listeners
     * }
     */
    this.events = EventsListeners || {};
  }

  /**
   * fire event and dispatch all it's listeners in Order
   * @param  {String}     eventPath [the event path]
   * @param  {Array<Any>} args      [array of any arguments that we need to pass to Event Instance]
   * @return {Promise}
   */
  async fire(eventPath, ...args) {
    const rootPath = '../../';

    // create Event Instance
    /**
     * @TODO optimize
     */
    const event = new (require(rootPath + eventPath))(...args);

    // grab listeners
    const listeners = this.events[eventPath] || [];

    // loop over listeners and run them all
    for (const listenerPath of listeners) {
      // create Event Instance
      const listener = new (require(rootPath + listenerPath))(event);

      try {
        await this.runListener(event, listener);
      } catch (e) {
        throw e;
      }
    }

    return event;
  }

  /**
   * fire specific listener with it's Instance
   * @param  {Object} event    [Event Instance]
   * @param  {Object} listener [Listener Instance]
   * @return {Promise}
   */
  runListener(event, listener) {
    return listener.handler(event);
  }

  /**
   * add array of listeners to event
   * @param  {String}        event     [path of the event class]
   * @param  {Array<String>} listeners [array of paths of the listeners classes]
   * @return {Void}
   */
  addListeners(event, listeners) {
    if (!Array.isArray(listeners)) {
      throw Error('listeners must be array of listeners instances');
    }

    for (let i = 0; i < listeners.length; i++) {
      this.addListener(event, listeners[i]);
    }
  }

  /**
   * add new listener to event OR create new event with this listener
   * @param  {String} event    [path of the event class]
   * @param  {String} listener [path of the listener class]
   * @return {Void}
   */
  addListener(event, listener) {
    if (this.events[event]) {
      this.events[event].push(listener);
    } else {
      this.events[event] = [listener];
    }
  }

  /**
   * empty event array
   * @param  {String} event  [path of the event class]
   * @return {Array<String>} [paths of the removed listeners]
   */
  removeListeners(event) {
    if (!this.events[event]) {
      throw Error(`Event ${event.split('/').pop()} doesn't found`);
    }

    const listeners = this.events[event];

    this.events[event] = [];

    return listeners;
  }

  /**
   * delete specific listener for specific Event
   * @param  {String} event    [the event path]
   * @param  {String} listener [the listener path]
   * @return {String}          [the removed lister path]
   */
  removeListener(event, listener) {
    // check if event NOT exist
    if (!this.events[event]) {
      throw Error(`Event "${event.split('/').pop()}" Not Found`);
    }

    // get the index of the handler
    const index = this.events[event].indexOf(listener);

    // if the handler Does not exist
    if (index === -1) {
      throw Error(`Listener "${listener.split('/').pop()}" Not Found in Event ${event.split('/').pop()}`);
    }

    // remove the handler and return it
    return this.events[event].splice(index, 1)[0];
  }

  /**
   * Alias for removeAllListeners
   */
  stop(event) {
    return this.removeListeners(event);
  }

  /**
   * grab all listeners list for specific Event
   * @param  {String}        event [the event path]
   * @return {Array<Object>}       [Array of listeners paths]
   */
  getListeners(event) {
    if (!this.events[event]) {
      throw Error(`Event ${event.split('/').pop()} not found`);
    }

    return this.events[event];
  }

  /**
   * get the Number of listeners for specific Event
   * @param  {String} event [the event path]
   * @return {Number}       [number of listeners]
   */
  countListeners(event) {
    if (!this.events[event]) {
      throw Error(`Event ${event.split('/').pop()} not found`);
    }

    return this.events[event].length;
  }

}

exports = module.exports = Dispatcher;
