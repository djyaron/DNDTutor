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
    switch (this.state.exprTree.type) {

      case "OperatorNode":
        var exprTree = this.state.exprTree;
        return (
          <div className="WorkSpace">
            <WorkSpaceExpr ExprMid={exprTree.op}
                           ExprA={exprTree.args[0]}
                           ExprB={exprTree.args[1]}
                           ExprType={"Double"} />
          </div>
        );

      default:
        var ExprInit = {};
        ExprInit.name = "Empty";
        ExprInit.number = 0;
        return (
          <div className="WorkSpace">
            <WorkSpaceExpr ExprA={ExprInit}
                           ExprType={"Single"} />
          </div>
        );
    }

	}

}

export default WorkSpace;