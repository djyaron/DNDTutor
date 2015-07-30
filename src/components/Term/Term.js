import React, { PropTypes } from 'react';
import { ItemTypes } from '../../constants/ItemTypes';
import { DragSource } from 'react-dnd';
import styles from './Term.css';
import withStyles from '../../decorators/withStyles';

const termSource = {
  beginDrag(props) {
    console.log(props);
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
    TermType: PropTypes.string.isRequired
  };

  render() {
    const { connectDragSource, isDragging } = this.props;
  	return connectDragSource(
  	  <div className="term">
  	    {this.props.TermType}
  	  </div>
  	);
  }
}

export default DragSource(ItemTypes.TERM, termSource, collect)(Term);