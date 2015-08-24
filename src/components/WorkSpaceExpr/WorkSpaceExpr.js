import React, { PropTypes } from 'react';
import styles from './WorkSpaceExpr.css';
import withStyles from '../../decorators/withStyles';

import WorkSpaceBox from '../WorkSpaceBox';

@withStyles(styles)
class WorkSpaceExpr {
  static propTypes = {
    ExprType: PropTypes.string.isRequired
  };

  render() {
    switch (this.props.ExprType) {
      case "Single":
        return (
          <div className="WorkSpaceExpr">
            <WorkSpaceBox BoxValue={this.props.ExprA.value}
                          BoxType={this.props.ExprA.name}
                          BoxNumber={this.props.ExprA.number} />
          </div>
        );

      case "Double":
        var ExprA = this.props.ExprA;
        var ExprMid = this.props.ExprMid;
        var ExprB = this.props.ExprB;
        if (ExprA.isOperatorNode && ExprB.isOperatorNode) {
          return (
            <div className="WorkSpaceExpr">
              <WorkSpaceExpr ExprMid={ExprA.op}
                             ExprA={ExprA.args[0]}
                             ExprB={ExprA.args[1]}
                             ExprType={"Double"} />
              <div className="WorkSpaceExprMid">{this.props.ExprMid}</div>
              <WorkSpaceExpr ExprMid={ExprB.op}
                             ExprA={ExprB.args[0]}
                             ExprB={ExprB.args[1]}
                             ExprType={"Double"} />
            </div>
          );
        } else if (ExprA.isOperatorNode) {
          return (
            <div className="WorkSpaceExpr">
              <WorkSpaceExpr ExprMid={ExprA.op}
                             ExprA={ExprA.args[0]}
                             ExprB={ExprA.args[1]}
                             ExprType={"Double"} />
              <div className="WorkSpaceExprMid">{this.props.ExprMid}</div>
              <WorkSpaceBox BoxValue={ExprB.value}
                            BoxType={ExprB.name}
                            BoxNumber={ExprB.number} />
            </div>
          );
        } else if (ExprB.isOperatorNode) {
          return (
            <div className="WorkSpaceExpr">
              <WorkSpaceBox BoxValue={ExprA.value}
                            BoxType={ExprA.name}
                            BoxNumber={ExprA.number} />
              <div className="WorkSpaceExprMid">{this.props.ExprMid}</div>
              <WorkSpaceExpr ExprMid={ExprB.op}
                             ExprA={ExprB.args[0]}
                             ExprB={ExprB.args[1]}
                             ExprType={"Double"} />
            </div>
          );
        } else {
          return (
            <div className="WorkSpaceExpr">
              <WorkSpaceBox BoxValue={ExprA.value}
                            BoxType={ExprA.name}
                            BoxNumber={ExprA.number} />
              <div className="WorkSpaceExprMid">{this.props.ExprMid}</div>
              <WorkSpaceBox BoxValue={ExprB.value}
                            BoxType={ExprB.name}
                            BoxNumber={ExprB.number} />
            </div>
          );
        }

      default:
        return (
          <div className="WorkSpaceExpr">
          </div>
        );
    }
  }
}

export default WorkSpaceExpr;