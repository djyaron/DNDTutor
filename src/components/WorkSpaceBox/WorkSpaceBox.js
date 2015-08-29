import React, { PropTypes } from 'react';
import styles from './WorkSpaceBox.css';
import withStyles from '../../decorators/withStyles';
import { ItemTypes } from '../../constants/ItemTypes';
import { DropTarget } from 'react-dnd';

import { dropHeldExpression } from '../../actions/ExprTreeActionCreators';

const workSpaceBoxTarget = {
  drop(props) {
    if (props.ValueTop === undefined &&
        props.ValueBot === undefined &&
        props.UnitTop === undefined &&
        props.UnitBot === undefined) { dropHeldExpression(props.BoxNumber); }
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
    ValueTop: PropTypes.number,
    ValueBot: PropTypes.number,
    UnitTop: PropTypes.arrayOf(PropTypes.string),
    UnitBot: PropTypes.arrayOf(PropTypes.string),
    BoxNumber: PropTypes.number.isRequired
  };

  render() {
    const { connectDropTarget, isOver } = this.props;
    var ValueTop = this.props.ValueTop;
    var ValueBot = this.props.ValueBot;
    var UnitTop = this.props.UnitTop;
    var UnitBot = this.props.UnitBot;
    if (ValueTop === undefined && ValueBot === undefined &&
        UnitTop === undefined && UnitBot === undefined) {
      return connectDropTarget(
        <div className="WorkSpaceBox">
          <div className="WorkSpaceBoxWrap">
            {"EMPTY"}
          </div>
        </div>
      );
    }
    var top = ValueTop === undefined || UnitTop === undefined ? "" : ValueTop+UnitTop.join(" ");
    var bot = this.props.ValueBot === undefined || UnitBot === undefined ? "" : " / "+ValueBot+UnitBot.join(" ");
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