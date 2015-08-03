import TutPageDispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';

var currentCollection = "TEMPLATES";

var CollectionPaneStore = assign({}, EventEmitter.prototype, {

  getCurrentCollection: function() {
    return currentCollection;
  },

  selectCollection: function(collection) {
    currentCollection = collection
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }

});

CollectionPaneStore.dispatchToken = TutPageDispatcher.register(function(payload) {

  switch(payload.type) {

    case ActionTypes.SELECT_COLL:
      CollectionPaneStore.selectCollection(payload.collection);
      CollectionPaneStore.emitChange();
      break;

    default:
      // do nothing
  }

});

export default CollectionPaneStore;