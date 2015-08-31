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
        props.UnitTop.length === 0 &&
        props.UnitBot.length === 0) { dropHeldExpression(props.BoxNumber); }
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
    UnitTop: PropTypes.arrayOf(PropTypes.string).isRequired,
    UnitBot: PropTypes.arrayOf(PropTypes.string).isRequired,
    BoxNumber: PropTypes.number.isRequired
  };

  render() {
    const { connectDropTarget, isOver } = this.props;
    var ValueTop = this.props.ValueTop;
    var ValueBot = this.props.ValueBot;
    var UnitTop = this.props.UnitTop;
    var UnitBot = this.props.UnitBot;
    if (ValueTop === undefined && ValueBot === undefined) {
      return connectDropTarget(
        <div className="WorkSpaceBox">
          <div className="WorkSpaceBoxWrap">
            {"EMPTY"}
          </div>
        </div>
      );
    }
    var top = ValueTop === undefined ? "" : ValueTop;
    top += UnitTop.join(" ");
    var bot = ValueBot === undefined ? "" : ValueBot;
    bot += UnitBot.join(" ");
    bot = bot === "" ? bot : " / "+bot;
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