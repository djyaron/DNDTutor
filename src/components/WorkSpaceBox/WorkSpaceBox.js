import React, { PropTypes } from 'react';
import styles from './WorkSpaceBox.css';
import withStyles from '../../decorators/withStyles';
import { ItemTypes } from '../../constants/ItemTypes';
import { DropTarget } from 'react-dnd';

import { dropHeldExpression } from '../../actions/ExprTreeActionCreators';

const workSpaceBoxTarget = {
  drop(props) {
    if (props.ValueTop !== undefined &&
        props.ValueTop.value === "EMP" &&
        props.UnitTop === "TY") { dropHeldExpression(props.BoxNumber); }
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
    ValueTop: PropTypes.object,
    ValueBot: PropTypes.object,
    UnitTop: PropTypes.string,
    UnitBot: PropTypes.string,
    BoxNumber: PropTypes.number.isRequired
  };

  render() {
    const { connectDropTarget, isOver } = this.props;
    var top = this.props.ValueTop === undefined || this.props.UnitTop === undefined ? "" : this.props.ValueTop.value + this.props.UnitTop;
    var bot = this.props.ValueBot === undefined || this.props.UnitBot === undefined ? "" : " / " + this.props.ValueBot.value + this.props.UnitBot;
    return connectDropTarget(
      <div className="WorkSpaceBox">
        <div className="WorkSpaceBoxWrap">
          {top + bot}
        </div>
      </div>
    );
  }
}

export default DropTarget(ItemTypes.DND, workSpaceBoxTarget, collect)(WorkSpaceBox);