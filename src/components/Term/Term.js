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
    ValueTop: PropTypes.number,
    UnitTop: PropTypes.string,
    ValueBot: PropTypes.number,
    UnitBot: PropTypes.string,
  };

  render() {
    const { connectDragSource, isDragging } = this.props;
    var top = this.props.ValueTop === undefined || this.props.UnitTop === undefined ? "" : this.props.ValueTop + this.props.UnitTop;
    var bot = this.props.ValueBot === undefined || this.props.UnitBot === undefined ? "" : " / " + this.props.ValueBot + this.props.UnitBot;
  	return connectDragSource(
  	  <div className="Term">
  	    {top + bot}
  	  </div>
  	);
  }
}

export default DragSource(ItemTypes.DND, termSource, collect)(Term);