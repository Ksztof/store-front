import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAILURE } from '../../types/authTypes';

interface AuthState {
  loading: boolean;
  userData: any; 
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  userData: null,
  error: null,
};

const authReducer = (state = initialState, action: { type: string; payload?: any }) => {
  switch (action.type) {
    case LOGIN_START:
      return { ...state, loading: true, error: null };
    case LOGIN_SUCCESS:
      return { ...state, loading: false, userData: action.payload };
    case LOGIN_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default authReducer;
