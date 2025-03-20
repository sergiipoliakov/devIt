import { SET_USER_ID } from '../constants';
import { ReduxState } from '../types';

const initialState = {
  id: '',
  balance: 0
};

export default function oauth(state = initialState as { id: string, balance: number }, action: ReduxState): { id: string, balance: number} {
  console.log('🚀 ~ ;user.rd.ts:10 ~ oauth ~ action:', action);
  switch (action.type) {
    case SET_USER_ID:
      return {
        ...state,
        id: action.payload.id,
        balance: action.payload.balance
      };
    default:
      return state;
  }
}
