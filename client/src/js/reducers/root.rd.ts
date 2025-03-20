import { combineReducers } from 'redux';

// Reducers
import user from '../containers/Users/reducers/user.rd';

const store = combineReducers({
  user
});

export default (state: ReturnType<typeof store>, action: { type: string }): ReturnType<typeof store> => {
	if (action.type === 'LOG_OUT') return store({}, action);
	return store(state, action);
};
