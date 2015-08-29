import React, { PropTypes } from 'react';
import styles from './WorkSpace.css';
import withStyles from '../../decorators/withStyles';

import ExprTreeStore from '../../stores/ExprTreeStore';

import WorkSpaceBox from '../WorkSpaceBox';
import WorkSpaceExpr from '../WorkSpaceExpr';

function getStateFromStores() {
  return {
    exprTree: ExprTreeStore.getExprTree()
  };
}

function getResult(tree) {
  if (tree === undefined) { return; }

  if (!tree.isOperatorNode) {
    if (!tree.isBlockNode) { return; }
    var ResultSet = tree.eval();
    var Entries = ResultSet.entries;
    if (Entries.length !== 2) { return; }
    if (Entries[0] === undefined && Entries[1] === undefined &&
        tree.UnitTop === undefined && tree.UnitBot === undefined) { return; }

    var FracTop = Entries[0] === undefined || tree.UnitTop === undefined ? Entries[0] : Entries[0].toString().concat(tree.UnitTop.join(" "));
    var FracBot = Entries[1] === undefined || tree.UnitBot === undefined ? Entries[1] : Entries[1].toString().concat(tree.UnitBot.join(" "));
    return [FracTop, FracBot];
  } else {

  }
}

@withStyles(styles)
class WorkSpace extends React.Component {
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
    console.log(exprTree);
    var testResult = getResult(exprTree);
    console.log(testResult);
    return (
      <div className="WorkSpace">
        <WorkSpaceExpr ExprTree={this.state.exprTree} />
      </div>
    );
	}

}

export default WorkSpace;