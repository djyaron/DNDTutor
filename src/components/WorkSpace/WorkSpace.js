import React, { PropTypes } from 'react';
import styles from './WorkSpace.css';
import withStyles from '../../decorators/withStyles';
import { ItemTypes } from '../../constants/ItemTypes';
import { DropTarget } from 'react-dnd';

import ExprTreeStore from '../../stores/ExprTreeStore';

const workSpaceTarget = {
  drop(props) {
    console.log(props);
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

function getStateFromStores() {
  return {
    exprTree: ExprTreeStore.getExprTree()
  };
}

@withStyles(styles)
class WorkSpace {

  static propTypes = {
    isOver: PropTypes.bool.isRequired
  };

	render() {
    const { connectDropTarget, isOver } = this.props;
    return connectDropTarget(
      <div className="WorkSpaceBox">
      </div>
    );
	}
}

export default DropTarget(ItemTypes.EXPR, workSpaceTarget, collect)(WorkSpace);