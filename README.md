## he-event-system
##### @licence GPL.v3

### * v2 *
this version is a completely recreated lib so most of APIs changed

please be careful when upgrading.

### Install
`npm install he-event-system --save`

### quick How to use

**@notice all paths must be relative to the root path of the project**

first you should define an Event class like this

    ./path/to/Event.js

    class Event {
      /**
       * @desc  the event class is a holder to all information that listeners need to accomplish thier tasks
       *        and may be contain any required methods or params.
       * @param {Array<Any>} args [array of any arguments passed to the event instance]
       */
      constructor(arg1, arg2, arg3) {
        // any setup for the event
        this.args = args;
      }
    }
    module.exports = Event;

then you should define at least one Listener Class to this event
  
    ./path/to/listener.js

    class Listener {
      /**
       * any pre setup before running handler()
       */
      constructor() {}
      
      /**
       * @desc   the main method that hold logic for the listener, it may be
       *         contain any methods or proberties that needed.
       * @param  {Object} event [the event Instance of the Event class]
       * @return {Promise<Any>}
       */
      handler(event) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            console.log('hello from listener one');
          });

          /**
           * here we called resolve outside the setTimeout
           * so the listener will run Async
           * if we need the listeners to run in order, just change
           * the place of resolve() and put it inside the Async operation.
           */
          resolve();
        });
      }
    }
    module.exports = Listener;

finally we start creating the Dispatcher Instance

    const DispatcherCore = require('he-event-system');
    
    const EventsListeners = [
        "./path/to/Event": [
          "./path/to/listener1",
          "./path/to/listener2",
          ...
        ],
        "./path/to/Event2": [
          "./path/to/listener1",
          "./path/to/listener2",
          ...
        ]
    ];

    /**
     * create new instance of DispatcherCore
     * @param {Object} EventsListeners [optional -> you can pass object contains all your events and listeners instead of passing them individually]
     */
    const Dispatcher = new DispatcherCore(EventsListeners);


add more than listener at once

    Dispatcher.addListeners('./path/to/event', [
        './path/to/listener1',
        './path/to/listener2'
    ]);


add listeners one by one
`Dispatcher.addListener('./path/to/event', './path/to/listener');`


remove one listener
`Dispatcher.removeListener('./path/to/event', './path/to/listener');`


remove all listeners.
`Dispatcher.removeListeners('./path/to/event');`


alias for removeListeners()
`Dispatcher.stop('./path/to/event');`


grab all listeners
`Dispatcher.getListeners('./path/to/event');`


get the number of listeners for an event
`Dispatcher.countListeners('./path/to/event');`


### dispatch an event
this will dispatch all listeners registered with this event in Order
every listener can modify the next one (if it runs sync) or stop the loop
the final data returned is the data that all listeners modify it (if listeners run sync)
the err is the first err returned by any listener

    Dispatcher.fire('./path/to/event', 'argOne', 'argTwo', 'argThree').then((data) => {

        console.log('success -> ' + data);

    }, (err) => {

        console.log('err -> ' + err);

    });

the main object that contains all events with listeners
`Dispatcher.events;`

I'm Welcoming with any comment or advise or you can open new issue on [github](https://github.com/ibrahim-sakr/he-event-system/issues)

### Todo List

1. add Support for Logging and Logging Level (errors, warnings, successes)
