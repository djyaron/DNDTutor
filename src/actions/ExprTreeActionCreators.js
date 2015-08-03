import TutPageDispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

export function holdExpressionProps(Props) {
  TutPageDispatcher.dispatch({
    type: ActionTypes.HOLD_EPROPS,
    props: Props
  });
}

export function holdTermProps(Props) {
  TutPageDispatcher.dispatch({
    type: ActionTypes.HOLD_TPROPS,
    props: Props
  });
}

export function dropHeldExpression(BoxNumber) {
  TutPageDispatcher.dispatch({
    type: ActionTypes.DROP_PROPS,
    number: BoxNumber
  });
}