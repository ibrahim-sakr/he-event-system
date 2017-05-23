/**
 * example for Listener Module
 *
 * the must thing here is handle Method that must be exist
 */
var ListenerModule = function (next, args){

    /**
     * this method do the main magic, it must be exist in any listener module
     * @param  {Function}   next [call the next step]
     * @param  {Function}   stop [stop the rest of the loop and return to the caller]
     * @param  {Array<Any>} args [array of any arguments we need to pass the listener]
     * @return {Callback}        [description]
     */
    this.handle = function(next, stop, args){

        /**
         * the listener can contain any Async operations
         * if we need to hold the loop until the async operation finishs just call next() in success block of the async operation
         * if we need to make the listener Async (that mains it will continue working even if the code doesn't finish)
         * we just need to call next() outside the Async block
         */
        setTimeout(function(){
            if (true) {
                // we can modify the args Array that will pass to the next listener
                args.push("ListenerModule arg");

                // Sync
                // here the Dispatcher will hold excution untill the Async code is finished
                // call next() to continue to the next listener or return back to where the event fired with success message
                next(args);
            } else {

                // stop any other listeners and return back to where the event fired with error message
                stop('ListenerModule Stopped');
            }
        }, '1000');

        // if we can need to continue working without the code above finishs
        // we just call next() outside the code
        // next('any arguments');
    };

};

// export the ListenerModule
module.exports = new ListenerModule;
