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
    UnitTop: PropTypes.arrayOf(PropTypes.string).isRequired,
    ValueBot: PropTypes.number,
    UnitBot: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    const { connectDragSource, isDragging } = this.props;
    var top = this.props.ValueTop === undefined ? "" : this.props.ValueTop;
    top += this.props.UnitTop.join(" ");
    var bot = this.props.ValueBot === undefined ? "" : this.props.ValueBot;
    bot += this.props.UnitBot.join(" ");
    bot = bot === "" ? bot : " / "+bot;
  	return connectDragSource(
  	  <div className="Term">
  	    {top + bot}
  	  </div>
  	);
  }
}

export default DragSource(ItemTypes.DND, termSource, collect)(Term);