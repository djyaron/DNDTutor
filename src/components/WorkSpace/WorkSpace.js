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
    var et = this.state.exprTree;
    if (et.args === undefined) {
      if (et.isConstantNode) {
        return (
          <div className="WorkSpace">
            <WorkSpaceExpr ExprA={{"value":et.value,"name":et.unit,"number":et.number}}
                           ExprType={"Single"} />
          </div>
        );
      } else {
        return (
          <div className="WorkSpace">
            <WorkSpaceExpr ExprA={{"name":et.name,"number":et.number}}
                           ExprType={"Single"} />
          </div>
        );
      }
    } else {
      return (
        <div className="WorkSpace">
          <WorkSpaceExpr ExprMid={et.op}
                         ExprA={et.args[0]}
                         ExprB={et.args[1]}
                         ExprType={"Double"} />
        </div>
      );
    }
	}

}

export default WorkSpace;