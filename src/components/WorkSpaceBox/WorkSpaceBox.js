import React, { PropTypes } from 'react';
import styles from './WorkSpaceBox.css';
import withStyles from '../../decorators/withStyles';
import { ItemTypes } from '../../constants/ItemTypes';
import { DropTarget } from 'react-dnd';

import { dropHeldExpression } from '../../actions/ExprTreeActionCreators'

const workSpaceBoxTarget = {
  drop(props) {
    if (props.BoxType === "Empty") { dropHeldExpression(props.BoxNumber); }
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

@withStyles(styles)
class WorkSpaceBox {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    BoxValue: PropTypes.string,
    BoxType: PropTypes.string.isRequired,
    BoxNumber: PropTypes.number.isRequired
  };

  render() {
    const { connectDropTarget, isOver } = this.props;
    if (this.props.BoxValue === undefined) {
      return connectDropTarget(
        <div className="WorkSpaceBox">
          <div className="WorkSpaceBoxWrap">
            {this.props.BoxType}
          </div>
        </div>
      );
    } else {
      return connectDropTarget(
        <div className="WorkSpaceBox">
          <div className="WorkSpaceBoxWrap">
            {this.props.BoxValue+" "+this.props.BoxType}
          </div>
        </div>
      );
    }
  }
}

export default DropTarget(ItemTypes.DND, workSpaceBoxTarget, collect)(WorkSpaceBox);