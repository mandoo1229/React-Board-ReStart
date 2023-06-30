export const GET_LOCAL_STORAGE = 'GET_LOCAL_STORAGE';
export const ADD_ITEM = 'ADD_ITEM';
export const UPDATE_ITEM = 'UPDATE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const INCREASE_VIEWS = 'INCREASE_VIEWS';
export const CHANGE_MENU = 'CHANGE_MENU';

export const BoardReducer = (state, action) => {
  switch (action.type) {
    case GET_LOCAL_STORAGE: {
      const localList = localStorage.getItem('list');
      const list = localList ? JSON.parse(localList) : [];
      const localId = localStorage.getItem('id');
      const id = localId ? parseInt(localId) : 0;
      return {
        ...state,
        list,
        id,
      };
    }
    //localStroage에서 'list'와 'id'라는 키로 저장된 값을 가져와서 현재 상태에 추가한다. localstorage에 값이 없는 경우에는 빈 배여로가 0을 사용한다.

    case ADD_ITEM: {
      const list = [...state.list, action.item];
      const id = state.id + 1;
      return {
        ...state,
        list,
        id,
      };
    }
    //액션에 전달된 'item'을 현재 상태의 'list'배열에 추가한다. 또 현재 상태의 'id'값에 1을 더한 값을 사용한다.

    case UPDATE_ITEM: {
      const list = state.list.map((item) => (item.id === action.item.id ? action.item : item));
      return {
        ...state,
        list,
      };
    }
    // 현재 상태의 'list'배열에서 액션에 전달된 'id'와 일치하지 않는 항목만을 남기고 필터링한다.

    case DELETE_ITEM: {
      const list = state.list.filter((item) => item.id !== action.id);
      return {
        ...state,
        list,
      };
    }
    //현재 상태의 'list'배열에서 액션에 전달된 'item'의 'id'와 일치하지 않는 항목만을 남기고 필터링한다.

    case INCREASE_VIEWS: {
      const list = state.list.map((item) => (item.id === action.id ? { ...item, views: item.views + 1 } : item));
      return {
        ...state,
        list,
      };
    }
    // 현재 상태의 'list'배열에서 액션에 전달된 'id'와 일치하는 항목을 찾아서 'views'값을 1증가 시킨다. (조회수 기능)

    case CHANGE_MENU: {
      return {
        ...state,
        menu: action.menu,
      };
    }
    //현재 상태의 'menu'값을 액션에 전달된 값으로 변경한다.

    default:
      return { ...state };
  }
};
