import TutPageDispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

export function holdExpressionProps(Props) {
  console.log(TutPageDispatcher);
  TutPageDispatcher.dispatch({
    type: ActionTypes.HOLD_EPROPS,
    props: Props
  });
}

export function addTerm(Term) {
  TutPageDispatcher.dispatch({
    type: ActionTypes.ADD_TERM,
    term: Term
  });
}