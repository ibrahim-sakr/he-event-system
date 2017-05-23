/**
 * he-event-system
 * @licience MIT
 *
 * this is a quick explain to How to use
 *
 * var DispatcherCore = require('Dispatcher');
 * var Dispatcher     = new DispatcherCore;
 *
 * add more than listener at once
 * all listeners paths must be relative to the root path of the project
 * there is an example for listener Module the this folder
 * Dispatcher.addListeners('hema', [
 *     './Events/UserDelete',
 *     './Events/UserEmail'
 * ]);
 *
 * add listeners one by one
 * Dispatcher.addListener('hema', 'UserWasDeleted');
 *
 * remove one listener
 * Dispatcher.removeListener('hema', 'UserWasDeleted');
 *
 * remove all listeners.
 * Dispatcher.removeAllListeners('hema');
 *
 * alias for removeAllListeners()
 * Dispatcher.stop('hema');
 *
 * grab all listeners
 * Dispatcher.getListeners('hema');
 *
 * get the number of listeners for an event
 * Dispatcher.countListeners('hema');
 * 
 * dispatch an event
 * this will dispatch all listerners registerd with this event in Order
 * every listener can modify the next one or stop the loop
 * the final data returned is the data that all listeners modify it
 * the err is the first err accured by any listener
 * Dispatcher.fire('hema', 'ahmed', 'mohamed', 'yahya').then(function success(data){}, function fail(err){});
 * 
 * the main object that contains all events with listeners
 * Dispatcher.events;
 */
module.exports = require("./core/dispatcher.js");
