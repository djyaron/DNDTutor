import TutPageDispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import EventEmitter from 'eventemitter3';
import assign from 'object-assign';
import math from 'mathjs';

import { ItemTypes } from '../constants/ItemTypes';

var boxNum = 0;
function getOpenBoxNum() {
  var numToReturn = boxNum;
  boxNum++;
  return numToReturn;
}

var node = math.expression.node;
var SymbolNode = node.SymbolNode;
var ConstantNode = node.ConstantNode;

var CHANGE_EVENT = 'change';

var EMPTY_NODE = "Empty";
var ExprTree = "_EXPR_TREE";
var exprTree = new SymbolNode(EMPTY_NODE);
exprTree.number = getOpenBoxNum();

var heldExpr = null;
var TYPE = "TYPE";
var PROPS = "PROPS";

function searchArgs(expt, number, props, type) {
  for (var key in expt.args) {
    var obj = expt.args[key];
    if (!obj.isOperatorNode) {
      if (obj.number === number) {
        if (type === ItemTypes.EXPR) {
          expt.args[key] = math.parse(props.ExpA + " " + props.ExpType + " " + props.ExpB);
          expt.args[key].args[0].number = getOpenBoxNum();
          expt.args[key].args[1].number = getOpenBoxNum();
        } else {
          expt.args[key] = new ConstantNode(props.TermValue);
          expt.args[key].name = props.TermUnit;
          expt.args[key].number = getOpenBoxNum();
        }
      }
    } else {
      expt.args[key] = searchArgs(expt.args[key], number, props, type);
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

  holdTerm: function(props) {
    heldExpr = {};
    heldExpr[TYPE] = ItemTypes.TERM;
    heldExpr[PROPS] = props;
  },

  dropHeldExpression: function(number) {
    var type = heldExpr.TYPE;
    var props = heldExpr.PROPS;
    if (exprTree.isConstantNode || exprTree.isSymbolNode) {
      if (type === ItemTypes.EXPR) {
        exprTree = math.parse(props.ExpA + " " + props.ExpType + " " + props.ExpB);
        exprTree.args[0].number = getOpenBoxNum();
        exprTree.args[1].number = getOpenBoxNum();
      } else {
        exprTree = new ConstantNode(props.TermValue);
        exprTree.name = props.TermUnit;
        exprTree.number = getOpenBoxNum();
      }
    } else {
      exprTree = searchArgs(exprTree, number, props, type);
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

    case ActionTypes.HOLD_TPROPS:
      ExprTreeStore.holdTerm(payload.props);
      break;

    case ActionTypes.DROP_PROPS:
      ExprTreeStore.dropHeldExpression(payload.number);
      ExprTreeStore.emitChange();
    default:
      // do nothing
  }

});

export default ExprTreeStore;