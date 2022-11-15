import {
  GET_LIST_USER_PENDING,
  GET_LIST_USER_SUCCESS,
  GET_LIST_USER_FAILED,
} from '../actions/types';

const initialState = {
  isLoading: false,
  isError: false,
  data: [],
  error: null,
};

const detailRecipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_USER_PENDING:
      return { ...state, isLoading: true };
    case GET_LIST_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload.data,
      };
    case GET_LIST_USER_FAILED:
      return {
        ...state,
        isLoading: false,
        isError: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default detailRecipeReducer;
