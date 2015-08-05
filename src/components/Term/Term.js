import React, { PropTypes } from 'react';
import { ItemTypes } from '../../constants/ItemTypes';
import { DragSource } from 'react-dnd';
import styles from './Term.css';
import withStyles from '../../decorators/withStyles';

import { holdTermProps } from '../../actions/ExprTreeActionCreators'

const termSource = {
  beginDrag(props) {
    holdTermProps(props);
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
class Term {

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    TermValue: PropTypes.number.isRequired,
    TermUnit: PropTypes.string.isRequired
  };

  render() {
    const { connectDragSource, isDragging } = this.props;
  	return connectDragSource(
  	  <div className="term">
  	    {this.props.TermValue + " " + this.props.TermUnit}
  	  </div>
  	);
  }
}

export default DragSource(ItemTypes.DND, termSource, collect)(Term);