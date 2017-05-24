var Dispatcher = function(EventsLiteners){
    /**
     * {
     *     "eventName": [] // array of listeners
     * }
     */
    this.events = EventsLiteners || {};
};

/**
 * fire event and dispatch all it's listeners in Order
 * @param  {String}        eventName [the event name]
 * @param  {Array<String>} args      [array of any arguments that we need to pass to all listeners]
 * @return {Promise}
 */
Dispatcher.prototype.fire = function(eventName, ...args){
    var self = this;
    return new Promise(function(resolve, reject){
        if (self.events[eventName]) {
            var listenersLength = self.countListeners(eventName);
            if (listenersLength > -1) {

                // loop for all listeners and excute them
                function repeater(i, repeaterData) {
                    if( i < listenersLength ) {
                        var listenerPromise = self.fireListener(eventName, self.events[eventName][i], args);
                        listenerPromise.then(function success(data){

                            // start excution for next listener or return resolve(args);
                            repeater( i + 1, data );
                        }, function failed(err){

                            // stop excution and return reject(err);
                            reject(err);
                        });
                    } else {
                        resolve(repeaterData);
                    }
                }
                repeater(0);

            } else {
                // if no listeners at all
                resolve(args);
            }
        } else {
            // if event doesn't exist
            resolve(args);
        }
    });
};

/**
 * fire specific listener with it's name
 * @param  {String} eventName    [event name that contain the listener]
 * @param  {String} listenerName [listener name]
 * @param  {Array}  args         [array of any other arguments that we need to pass to listener]
 * @return {Promise}             [promise with resolve or reject function]
 */
Dispatcher.prototype.fireListener = function(eventName, listenerName, args){
    var self = this;
    // create Promise to return
    return new Promise(function(resolve, reject) {

        // hold listener Object after Requiring 
        var Events = self.events[eventName],

        // require the listener
        listener = require('../../../' + Events[ Events.indexOf(listenerName) ]);

        // next, stop, array of args
        listener.handle(function next(data){
            resolve(data);
        }, function stop(err){
            reject(err);
        }, args);
    });
};

/**
 * add array of listeners to event
 * @param  {String}        eventName     [the name of the event]
 * @param  {Array<String>} eventHandlers [array of strings represent the listeners that we need to add]
 * @return {Boolean}                     [false if the eventHandlers is NOT array]
 */
Dispatcher.prototype.addListeners = function(eventName, eventHandlers){
    if (Array.isArray(eventHandlers)) {
        for (var i = 0; i < eventHandlers.length; i++) {
            this.addListener(eventName, eventHandlers[i]);
        }
        return true;
    } else {
        return false;
    }
};

/**
 * add new listener to event OR create new event with this listener
 * @param  {String} eventName    [the name of the event]
 * @param  {String} eventHandler [the name of the listener]
 * @return {Boolean}             [always true]
 */
Dispatcher.prototype.addListener = function(eventName, eventHandler){
    if (this.events[eventName]) {
        this.events[eventName].push(eventHandler);
    } else {
        this.events[eventName] = [eventHandler];
    }
    return true;
};

/**
 * delete specific listener for specific Event
 * @param  {String} eventName    [the event name]
 * @param  {String} eventHandler [the listener name]
 * @return {Boolean}             [false if event OR listener doesn't exist]
 */
Dispatcher.prototype.removeListener = function(eventName, eventHandler){
    // check if event exist
    if(this.events[eventName]) {
        // get the index of the handler
        var index = this.events[eventName].indexOf(eventHandler);

        // if the handler exist
        if (index > -1) {
            // remove the handler
            // var removedItem = this.events[eventName].splice(index, 1);

            return this.events[eventName].splice(index, 1)[0];
        } else {
            return false;
        };
    } else {
        return false;
    }
};

/**
 * empty event array
 * @param  {String} eventName [the event name that we need to clear all it's listeners]
 * @return {Boolean}          [false if event doesn't exist]
 */
Dispatcher.prototype.removeAllListeners = function(eventName){
    if(this.events[eventName]) {
        this.events[eventName] = [];
        return true;
    } else {
        return false;
    };
};

/**
 * Alias for removeAlllisteners
 */
Dispatcher.prototype.stop = function(eventName){
    return this.removeAllListeners(eventName);
};

/**
 * grab all listeners list for specific Event
 * @param  {String}               eventName [the event name that we need to grab it's listeners]
 * @return {Arry<String>|Boolean}           [Array when the event exist (may be empty array) OR False if the event doesn't exist]
 */
Dispatcher.prototype.getListeners = function(eventName){
    return (this.events[eventName]) ? this.events[eventName] : false;
};

/**
 * get the Number of listeners for specific Event
 * @param  {String} eventName [the event name that we need to count it's listeners]
 * @return {Number}           [if the event exist (may be 0 if no listeners at all) AND -1 if Event doesn't exist]
 */
Dispatcher.prototype.countListeners = function(eventName){
    return (this.events[eventName]) ? this.events[eventName].length : -1;
};

exports = module.exports = Dispatcher;
