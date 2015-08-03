import TutPageDispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';
import assign from 'object-assign';
import math from 'mathjs';

import { ItemTypes } from '../constants/ItemTypes';

var node = math.expression.node;

var CHANGE_EVENT = 'change';

var CONSTANT_NODE = "ConstantNode";
var EMPTY_NODE = "Empty";
var ExprTree = "_EXPR_TREE";
var exprTree = new node.ConstantNode(EMPTY_NODE);

var heldExpr = null;
var boxNum = 0;
var TYPE = "TYPE";
var PROPS = "PROPS";

function getOpenBoxNum() {
  var numToReturn = boxNum;
  boxNum++;
  return numToReturn;
}

function searchArgs(expt, number, props) {
  for (var key in expt.args) {
    var obj = expt.args[key];
    if (!obj.isOperatorNode) {
      if (obj.number === number) {
        expt.args[key] = math.parse(props.ExpA + " " + props.ExpType + " " + props.ExpB);
        expt.args[key].args[0].number = getOpenBoxNum();
        expt.args[key].args[1].number = getOpenBoxNum();
      }
    } else {
      expt.args[key] = searchArgs(expt.args[key], number, props);
    }
  }
  return expt;
}

var ExprTreeStore = assign({}, EventEmitter.prototype, {

  getExprTree: function() {
    return exprTree;
  },

  holdExpr: function(props) {
    heldExpr = {};
    heldExpr[TYPE] = ItemTypes.EXPR;
    heldExpr[PROPS] = props;
  },

  dropHeldExpression: function(number) {
    if (exprTree.type === CONSTANT_NODE &&
        exprTree.value === EMPTY_NODE) {
      var props = heldExpr.PROPS;
      exprTree = math.parse(props.ExpA + " " + props.ExpType + " " + props.ExpB);
      exprTree.args[0].number = getOpenBoxNum();
      exprTree.args[1].number = getOpenBoxNum();
    } else {
      var props = heldExpr.PROPS;
      exprTree = searchArgs(exprTree, number, props);
    }
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

ExprTreeStore.dispatchToken = TutPageDispatcher.register(function(payload) {

  switch(payload.type) {

    case ActionTypes.HOLD_EPROPS:
      ExprTreeStore.holdExpr(payload.props);
      break;

    case ActionTypes.DROP_PROPS:
      ExprTreeStore.dropHeldExpression(payload.number);
      ExprTreeStore.emitChange();
    default:
      // do nothing
  }

});

export default ExprTreeStore;