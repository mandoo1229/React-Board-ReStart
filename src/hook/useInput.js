import { useReducer } from 'react';

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function useInputs(intiState) {
  const [state, dispatch] = useReducer(reducer, intiState);
  const onChangeInput = (e) => {
    dispatch(e.target);
  };
  return [state, onChangeInput];
}
