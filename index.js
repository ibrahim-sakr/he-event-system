/**
 * he-event-system
 * @licence GPL v3
 *
 * this is a quick explain to How to use
 *
 * var DispatcherCore = require('Dispatcher');
 * var Dispatcher     = new DispatcherCore;
 *
 * add more than listener at once
 * all listeners paths must be relative to the root path of the project
 * there is an example for listener Module the this folder
 * Dispatcher.addListeners('islam', [
 *     './Events/UserDelete',
 *     './Events/UserEmail'
 * ]);
 *
 * add listeners one by one
 * Dispatcher.addListener('islam', 'UserWasDeleted');
 *
 * remove one listener
 * Dispatcher.removeListener('islam', 'UserWasDeleted');
 *
 * remove all listeners.
 * Dispatcher.removeAllListeners('islam');
 *
 * alias for removeAllListeners()
 * Dispatcher.stop('islam');
 *
 * grab all listeners
 * Dispatcher.getListeners('islam');
 *
 * get the number of listeners for an event
 * Dispatcher.countListeners('islam');
 * 
 * dispatch an event
 *
 * this will dispatch all listeners registered with this event in Order
 * every listener can modify the next one or stop the loop
 * the final data returned is the data that all listeners modify it
 * the err is the first err returned by any listener
 *
 * Dispatcher.fire('islam', 'ahmed', 'mohamed', 'ali').then((data) => {}, (err) => {});
 * 
 * the main object that contains all events with listeners
 *
 * Dispatcher.events;
 */
module.exports = require("./core/dispatcher");
