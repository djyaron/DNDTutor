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
var ConstantNode = node.ConstantNode;
var BlockNode = node.BlockNode;

var CHANGE_EVENT = 'change';

var UNDEF = new ConstantNode(undefined);
var exprTree = new BlockNode([{node:UNDEF,visible:true}, {node:UNDEF,visible:true}]);
exprTree.UnitTop = [];
exprTree.UnitBot = [];
exprTree.number = getOpenBoxNum();

var heldExpr = null;
var TYPE = "TYPE";
var PROPS = "PROPS";

function dropHelp(expt, number, props, type) {
  for (var key in expt.args) {
    var obj = expt.args[key];
    if (!obj.isOperatorNode) {
      if (obj.number === number) {
        if (type === ItemTypes.EXPR) {
          expt.args[key] = math.parse(props.ExpA+" "+props.ExpType+" "+props.ExpB);
          expt.args[key].args[0] = new BlockNode([{node:UNDEF,visible:true}, {node:UNDEF,visible:true}]);
          expt.args[key].args[0].UnitTop = [];
          expt.args[key].args[0].UnitBot = [];
          expt.args[key].args[0].number = getOpenBoxNum();
          expt.args[key].args[1] = new BlockNode([{node:UNDEF,visible:true}, {node:UNDEF,visible:true}]);
          expt.args[key].args[1].UnitTop = [];
          expt.args[key].args[1].UnitBot = [];
          expt.args[key].args[1].number = getOpenBoxNum();
        } else {
          if (props.ValueTop === undefined && props.ValueBot === undefined) {
            return;
          }
          var TopNode = new ConstantNode(props.ValueTop);
          var BotNode = new ConstantNode(props.ValueBot);
          expt.args[key] = new BlockNode([
            {node: TopNode, visible: true},
            {node: BotNode, visible: true}
          ]);
          expt.args[key].UnitTop = props.UnitTop;
          expt.args[key].UnitBot = props.UnitBot;
          expt.args[key].number = getOpenBoxNum();
        }
      }
    } else {
      expt.args[key] = dropHelp(expt.args[key], number, props, type);
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
    if (!exprTree.isOperatorNode) {
      if (type === ItemTypes.EXPR) {
        exprTree = math.parse(props.ExpA+" "+props.ExpType+" "+props.ExpB);
        exprTree.args[0] = new BlockNode([{node:UNDEF,visible:true}, {node:UNDEF,visible:true}]);
        exprTree.args[0].UnitTop = [];
        exprTree.args[0].UnitBot = [];
        exprTree.args[0].number = getOpenBoxNum();
        exprTree.args[1] = new BlockNode([{node:UNDEF,visible:true}, {node:UNDEF,visible:true}]);
        exprTree.args[1].UnitTop = [];
        exprTree.args[1].UnitBot = [];
        exprTree.args[1].number = getOpenBoxNum();
      } else {
        if (props.ValueTop === undefined && props.ValueBot === undefined) {
          return;
        }
        var TopNode = new ConstantNode(props.ValueTop);
        var BotNode = new ConstantNode(props.ValueBot);
        exprTree = new BlockNode([
          {node: TopNode, visible: true},
          {node: BotNode, visible: true}
        ]);
        exprTree.UnitTop = props.UnitTop;
        exprTree.UnitBot = props.UnitBot;
        exprTree.number = getOpenBoxNum();
      }
    } else {
      exprTree = dropHelp(exprTree, number, props, type);
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