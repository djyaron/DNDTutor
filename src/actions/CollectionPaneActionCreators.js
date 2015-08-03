import TutPageDispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

export function selectCollection(collection_name) {
  TutPageDispatcher.dispatch({
    type: ActionTypes.SELECT_COLL,
    collection: collection_name
  });
}