## he-event-system
##### @licence MIT
##### the initial version

### Install
`npm install he-event-system --save`

###quick How to use

`

    var DispatcherCore = require('Dispatcher');

    var Dispatcher     = new DispatcherCore;

`


add more than listener at once

all listeners paths must be relative to the root path of the project

there is an example for listener Module the this folder

`

    Dispatcher.addListeners('EventName', [

        './ListenerModuleOne',

        './ListenerModuleTwo'

    ]);

`


add listeners one by one

`Dispatcher.addListener('EventName', 'ListenerModuleThree');`


remove one listener

`Dispatcher.removeListener('EventName', 'ListenerModuleThree');`


remove all listeners.

`Dispatcher.removeAllListeners('EventName');`


alias for removeAllListeners()

`Dispatcher.stop('EventName');`


grab all listeners

`Dispatcher.getListeners('EventName');`


get the number of listeners for an event

`Dispatcher.countListeners('EventName');`


dispatch an event

this will dispatch all listerners registerd with this event in Order

every listener can modify the next one or stop the loop

the final data returned is the data that all listeners modify it

the err is the first err accured by any listener

`

    Dispatcher.fire('EventName', 'argOne', 'argTwo', 'argThree').then(function success(data){

        console.log('success -> ' + data);

    }, function fail(err){

        console.log('err -> ' + err);

    });

`

the main object that contains all events with listeners

`Dispatcher.events;`

I'm Welcoming with any comment or advise

### Todo List

1. separate the Listeners Object in it's Module
2. add Support for Logging and Logging Level (errors, warnings, successes)
3. reStructure some code in DispatcherCore
