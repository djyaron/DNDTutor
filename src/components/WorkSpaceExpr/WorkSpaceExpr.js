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
    if (!ExprTree.isOperatorNode) {
      var Entries = ExprTree.eval().entries;
      return (
        <div className="WorkSpaceExpr">
          <WorkSpaceBox ValueTop={Entries[0]}
                        UnitTop={ExprTree.UnitTop}
                        ValueBot={Entries[1]}
                        UnitBot={ExprTree.UnitBot}
                        BoxNumber={ExprTree.number} />
        </div>
      );
    } else {
      var ChildZero = ExprTree.args[0];
      var ChildOne = ExprTree.args[1];
      if (ChildZero.isOperatorNode && ChildOne.isOperatorNode) {
        return (
          <div className="WorkSpaceExpr">
            <WorkSpaceExpr ExprTree={ChildZero} />
            <div className="WorkSpaceExprMid">{ExprTree.op}</div>
            <WorkSpaceExpr ExprTree={ChildOne} />
          </div>
        );
      } else if (ChildZero.isOperatorNode) {
        return (
          <div className="WorkSpaceExpr">
            <WorkSpaceExpr ExprTree={ChildZero} />
            <div className="WorkSpaceExprMid">{ExprTree.op}</div>
            <WorkSpaceBox ValueTop={ChildOne.eval().entries[0]}
                          UnitTop={ChildOne.UnitTop}
                          ValueBot={ChildOne.eval().entries[1]}
                          UnitBot={ChildOne.UnitBot}
                          BoxNumber={ChildOne.number} />
          </div>
        );
      } else if (ChildOne.isOperatorNode) {
        return (
          <div className="WorkSpaceExpr">
            <WorkSpaceBox ValueTop={ChildZero.eval().entries[0]}
                          UnitTop={ChildZero.UnitTop}
                          ValueBot={ChildZero.eval().entries[1]}
                          UnitBot={ChildZero.UnitBot}
                          BoxNumber={ChildZero.number} />
            <div className="WorkSpaceExprMid">{ExprTree.op}</div>
            <WorkSpaceExpr ExprTree={ChildOne} />
          </div>
        );
      } else {
        return (
          <div className="WorkSpaceExpr">
            <WorkSpaceBox ValueTop={ChildZero.eval().entries[0]}
                          UnitTop={ChildZero.UnitTop}
                          ValueBot={ChildZero.eval().entries[1]}
                          UnitBot={ChildZero.UnitBot}
                          BoxNumber={ChildZero.number} />
            <div className="WorkSpaceExprMid">{ExprTree.op}</div>
            <WorkSpaceBox ValueTop={ChildOne.eval().entries[0]}
                          UnitTop={ChildOne.UnitTop}
                          ValueBot={ChildOne.eval().entries[1]}
                          UnitBot={ChildOne.UnitBot}
                          BoxNumber={ChildOne.number} />
          </div>
        );
      }
    }
  }
}

export default WorkSpaceExpr;