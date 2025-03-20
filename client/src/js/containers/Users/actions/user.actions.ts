import { ReduxState } from '../types';
import { SET_USER_ID } from '../constants';

export function user(payload: { userId: string, balance: number}): ReduxState {
	const { userId, balance } = payload;
	return {
		type: SET_USER_ID,
		payload: {
			id: userId,
      balance
		}
	};
}
