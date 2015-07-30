import TutPageDispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';
import assign from 'object-assign';

var CHANGE_EVENT = 'change';

var selectedExpression = null;

var ExprTreeStore = assign({}, EventEmitter.prototype, {

  getExprTree: function() {
    return [];
  },

  updateHeldExpr: function(type, props) {
    selectedExpression = {};
    selectedExpression["type"] = type;
    selectedExpression["props"] = props;
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

ExprTreeStore.dispatchToken = TutPageDispatcher.register(function(action) {

  switch(action.type) {

    case ActionTypes.HOLD_EPROPS:
      var ExprType = "EXPR";
      ExprTreeStore.updateHeldExpr(action.type, action.props);
      console.log(selectedExpression);
      break;

    default:
      console.log("nani");
      // do nothing
  }

});

export default ExprTreeStore;