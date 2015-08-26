import React, { PropTypes } from 'react';
import styles from './WorkSpaceExpr.css';
import withStyles from '../../decorators/withStyles';

import WorkSpaceBox from '../WorkSpaceBox';

@withStyles(styles)
class WorkSpaceExpr {
  static propTypes = {
    ExprTree: PropTypes.object
  };

  render() {
    var ExprTree = this.props.ExprTree;
    console.log(ExprTree);
    if (!ExprTree.isOperatorNode) {
      if (ExprTree.nodes === undefined) { return; }
      return (
        <div className="WorkSpaceExpr">
          <WorkSpaceBox ValueTop={ExprTree.nodes[0]}
                        UnitTop={ExprTree.UnitTop}
                        ValueBot={ExprTree.nodes[1]}
                        UnitBot={ExprTree.UnitBot}
                        BoxNumber={ExprTree.number} />
        </div>
      );
    } else {
      return;
    }
  }
}

export default WorkSpaceExpr;