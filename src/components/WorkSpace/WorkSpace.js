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
  if (!tree.isOperatorNode) {
    if (!tree.isArrayNode ||
        tree.nodes.length === 0) {
      return;
    }

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