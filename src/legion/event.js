'use strict';

define(['legion/class'], function(Class) {
  var Event = Class.extend({
    _events: null,
    _queue: null,

    init: function(properties) {
      this.parent(properties);

      this._events = {};
      this._queue = [];
    },

    /*
      on(event, callback) subscribes a callback to a particular event.
    */
    on: function(event, callback) {
      this._initializeEvent(event);
      this._events[event].push(callback);
    },

    /*
      trigger(event) triggers an event and adds all the callbacks to a queue
      to be processed at the end of the current frame.
    */
    trigger: function(event) {
      this._initializeEvent(event);
      this._queue = this._queue.concat(this._events[event]);
    },

    /*
      _resolveEventQueue() resolves all the outstanding events in the queue.
    */
    _resolveEventQueue: function() {
      // Transfer to a temp queue and process that so new events triggered will
      // be resolved next frame.
      var tempQueue = this._queue;
      this._queue = [];
      while (tempQueue.length > 0) {
        tempQueue.pop()();
      }
    },

    /*
      _initialzeEvent(event) creates an entry for the event in the _events
      object if it doesn't already exist.
    */
    _initializeEvent: function(event) {
      if (!(event in this._events)) {
        this._events[event] = [];
      }
    }
  });

  return Event;
});