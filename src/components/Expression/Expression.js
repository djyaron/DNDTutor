import React, { PropTypes } from 'react';
import { ItemTypes } from '../../constants/ItemTypes';
import { DragSource } from 'react-dnd';
import styles from './Expression.css';
import withStyles from '../../decorators/withStyles';

import { holdExpressionProps } from '../../actions/ExprTreeActionCreators'

const expSource = {
  beginDrag(props) {
    holdExpressionProps(props);
    return props;
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

@withStyles(styles)
class Expression {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    ExpType: PropTypes.string.isRequired,
    ExpA: PropTypes.string.isRequired,
    ExpB: PropTypes.string.isRequired
  };

  render() {
    const { connectDragSource, isDragging } = this.props;
  	return connectDragSource(
  	  <div className="Expression">
  	    {this.props.ExpType}
  	  </div>
  	);
  }
}

export default DragSource(ItemTypes.DND, expSource, collect)(Expression);