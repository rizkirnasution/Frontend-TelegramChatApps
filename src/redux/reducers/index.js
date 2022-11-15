import { combineReducers } from 'redux';
import detailUserReducer from './detailUser';
import listUserReducer from './listUser';
import detailReceiverReducer from './detailReceiver';

const rootReducers = combineReducers({
  detailUser: detailUserReducer,
  listUser: listUserReducer,
  detailReceiver: detailReceiverReducer,
});

export default rootReducers;
