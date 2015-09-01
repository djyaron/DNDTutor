import React, { PropTypes } from 'react';
import styles from './WorkSpace.css';
import withStyles from '../../decorators/withStyles';

import ExprTreeStore from '../../stores/ExprTreeStore';

import WorkSpaceBox from '../WorkSpaceBox';
import WorkSpaceExpr from '../WorkSpaceExpr';
import math from 'mathjs';

var node = math.expression.node;
var ConstantNode = node.ConstantNode;
var BlockNode = node.BlockNode;

var PLUS = "+";
var MINUS = "-";
var MULTIPLY = "*";
var DIVIDE = "/";

function getStateFromStores() {
  return {
    exprTree: ExprTreeStore.getExprTree()
  };
}

function ArrayEq(FirstArray, SecondArray) {
  if (FirstArray === null ||
      SecondArray === null ||
      FirstArray === undefined ||
      SecondArray === undefined) { return false; }
  if (FirstArray.length !== SecondArray.length) { return false; }

  var FirstArrayCopy = FirstArray.slice();
  var SecondArrayCopy = SecondArray.slice();
  var FirstSorted = FirstArrayCopy.sort();
  var SecondSorted = SecondArrayCopy.sort();
  for (var i = 0; i < FirstSorted.length; i++) {
    if (FirstSorted[i] !== SecondSorted[i]) { return false; }
  }
  return true;
}

function euclidGCD(num, denom) {
  if (num === 0 || denom === 0 ||
      num === undefined || denom === undefined ||
      denom === undefined || denom === null) { return; }

  var gcdCheck = num % denom;
  if (gcdCheck === 0) {
    return denom;
  } else {
    return euclidGCD(denom, gcdCheck);
  }
}

function SimpFraction(fraction) {
  if (fraction === null ||
      fraction === undefined ||
      fraction.length !== 2) { return; }

  var numerator = fraction[0];
  var denominator = fraction[1];
  if (numerator === undefined || denominator === undefined) { return fraction; }
  var gcd = euclidGCD(numerator, denominator);
  return [Math.floor(numerator/gcd), Math.floor(denominator/gcd)];
}

function compileTreeHelp(tree) {
  if (!tree.isOperatorNode) { return; }

  var ArgZero = tree.args[0];
  if (ArgZero.isOperatorNode) {
    ArgZero = compileTreeHelp(ArgZero);
  }
  if (ArgZero === undefined ||
      !ArgZero.isBlockNode) { return; }

  var ArgOne = tree.args[1];
  if (ArgOne.isOperatorNode) {
    ArgOne = compileTreeHelp(ArgOne);
  }
  if (ArgOne === undefined ||
      !ArgOne.isBlockNode) { return; }

  var FracZero = SimpFraction(ArgZero.eval().entries);
  var FracOne = SimpFraction(ArgOne.eval().entries);
  var FracResult, FracTop, FracBot, UnitTop, UnitBot, res;
  if (FracZero[1] === 0 || FracOne[1] === 0) { return; }
  switch(tree.op) {
    case PLUS:
      if (!ArrayEq(ArgZero.UnitTop, ArgOne.UnitTop) ||
          !ArrayEq(ArgZero.UnitBot, ArgOne.UnitBot)) {
        return;
      }
      // assume units are the same
      if (FracZero[0] !== undefined || FracOne[0] !== undefined) {
        if (FracZero[1] === FracOne[1]) {
          res = [FracZero[0] + FracOne[0], FracZero[1]];
        } else if (FracZero[1] === undefined) {
          res = SimpFraction([(FracZero[0] * FracOne[1]) + FracOne[0], FracOne[1]]);       
        } else if (FracOne[1] === undefined) {
          res = SimpFraction([FracZero[0] + (FracOne[0] * FracZero[1]), FracZero[1]]);       
        } else {
          if (FracZero[1] === undefined || FracOne[1] === undefined) { return; }
          res = SimpFraction([(FracZero[0] * FracOne[1]) + (FracZero[1] * FracOne[0]), FracZero[1] * FracOne[1]]);
        }
      }
      UnitTop = ArgZero.UnitTop;
      UnitBot = ArgZero.UnitBot;
      break;

    case MINUS:
      if (!ArrayEq(ArgZero.UnitTop, ArgOne.UnitTop) ||
          !ArrayEq(ArgZero.UnitBot, ArgOne.UnitBot)) {
        return;
      }
      // assume units are the same
      if (FracZero[0] !== undefined || FracOne[0] !== undefined) {
        if (FracZero[1] === FracOne[1]) {
          res = [FracZero[0] - FracOne[0], FracZero[1]];
        } else if (FracZero[1] === undefined) {
          res = SimpFraction([(FracZero[0] * FracOne[1]) - FracOne[0], FracOne[1]]);       
        } else if (FracOne[1] === undefined) {
          res = SimpFraction([FracZero[0] - (FracOne[0] * FracZero[1]), FracZero[1]]);        
        } else {
          if (FracZero[1] === undefined || FracOne[1] === undefined) { return; }
          res = SimpFraction([(FracZero[0] * FracOne[1]) - (FracZero[1] * FracOne[0]), FracZero[1] * FracOne[1]]);
        }
      }
      UnitTop = ArgZero.UnitTop;
      UnitBot = ArgZero.UnitBot;
      break;

    case MULTIPLY:
      if (FracZero[1] === undefined && FracOne[1] === undefined) {
        res = [FracZero[0] * FracOne[0], undefined];
      } else if (FracZero[1] === undefined) {
        res = SimpFraction([FracZero[0] * FracOne[0], FracOne[1]]);
      } else if (FracOne[1] === undefined) {
        res = SimpFraction([FracZero[0] * FracOne[0], FracZero[1]])
      } else {
        res = SimpFraction([FracZero[0] * FracOne[0], FracZero[1] * FracOne[1]]);
      }
      UnitTop = ArgZero.UnitTop.filter(function(unit) {
        return ArgOne.UnitBot.indexOf(unit) == -1;
      }).concat(ArgOne.UnitTop.filter(function(unit) {
        return ArgZero.UnitBot.indexOf(unit) == -1;
      }));
      UnitBot = ArgZero.UnitBot.filter(function(unit) {
        return ArgOne.UnitTop.indexOf(unit) == -1;
      }).concat(ArgOne.UnitBot.filter(function(unit) {
        return ArgZero.UnitTop.indexOf(unit) == -1;
      }));
      break;

    case DIVIDE:
      if (FracOne[0] === 0) { return; }
      if (FracZero[1] === undefined && FracOne[1] === undefined) {
        res = [FracZero[0], FracOne[0]];
      } else if (FracZero[1] === undefined) {
        res = SimpFraction([FracZero[0] * FracOne[1], FracOne[0]]);
      } else if (FracOne[1] === undefined) {
        res = SimpFraction([FracZero[0], FracZero[1] * FracOne[0]])
      } else {
        res = SimpFraction([FracZero[0] * FracOne[1], FracZero[1] * FracOne[0]]);
      }
      UnitTop = ArgZero.UnitTop.filter(function(unit) {
        return ArgOne.UnitTop.indexOf(unit) == -1;
      }).concat(ArgOne.UnitBot.filter(function(unit) {
        return ArgZero.UnitBot.indexOf(unit) == -1;
      }));
      UnitBot = ArgZero.UnitBot.filter(function(unit) {
        return ArgOne.UnitBot.indexOf(unit) == -1;
      }).concat(ArgOne.UnitTop.filter(function(unit) {
        return ArgZero.UnitTop.indexOf(unit) == -1;
      }));
      break;

    default:
      return;
  }
  FracTop = new ConstantNode(res[0]);
  FracBot = new ConstantNode(res[1]);
  FracResult = new BlockNode([
    {node: FracTop, visible: true},
    {node: FracBot, visible: true}
  ]);
  FracResult.UnitTop = UnitTop;
  FracResult.UnitBot = UnitBot;
  return FracResult;
}

function compileTree(tree) {
  if (tree === undefined ||
      !tree.isNode) { return; }

  var CompiledTree = tree;
  if (tree.isOperatorNode) {
    CompiledTree = compileTreeHelp(tree);
  }
  if (CompiledTree === undefined ||
      !CompiledTree.isBlockNode) { return; }

  var ResultSet = CompiledTree.eval();
  var Entries = ResultSet.entries;
  if (Entries.length !== 2) { return; }

  var FracTop = Entries[0] === undefined ? CompiledTree.UnitTop.join(" ") : Entries[0].toString().concat(CompiledTree.UnitTop.join(" "));
  var FracBot = Entries[1] === undefined ? CompiledTree.UnitBot.join(" ") : Entries[1].toString().concat(CompiledTree.UnitBot.join(" "));
  return [FracTop, FracBot];
}

@withStyles(styles)
class WorkSpace extends React.Component {
  static propTypes = {
    solution: PropTypes.arrayOf(PropTypes.string).isRequired
  };

  constructor(props) {
    super(props);
    this.state = getStateFromStores();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    ExprTreeStore.addChangeListener(this.onChange);
  }

  componentWillUnmount() {
    ExprTreeStore.removeChangeListener(this.onChange);
  }

  onChange() {
    this.setState(getStateFromStores());
  }

	render() {
    var exprTree = this.state.exprTree;
    var emptyCheck = exprTree.filter(function(node) {
      return node.isBlockNode &&
             node.eval().entries[0] === undefined &&
             node.eval().entries[1] === undefined &&
             node.UnitTop.length === 0 &&
             node.UnitBot.length === 0;
    }).length !== 0;
    if (!emptyCheck) {
      var compiled = compileTree(exprTree);

      var actual;
      if (compiled == undefined || compiled[0] === "") {
        actual = "N/A";
      } else {
        actual = compiled[1] === "" ? compiled[0] : compiled.join(" / ");
      }

      var solution = this.props.solution;
      var answer = "You got " + actual + ". The correct answer is " + solution.join(" / ");
      answer += compiled != undefined && compiled[0] == solution[0] && compiled[1] == solution[1] ? "!" : ".";
      return (
        <div className="WorkSpace">
          <div className="Answer">{answer}</div>
          <WorkSpaceExpr ExprTree={this.state.exprTree} />
        </div>
      );
    }
    return (
      <div className="WorkSpace">
        <WorkSpaceExpr ExprTree={this.state.exprTree} />
      </div>
    );
	}

}

export default WorkSpace;