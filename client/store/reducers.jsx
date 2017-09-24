export var navReducer = (state = {showClose: false, showNav: false}, action) => {
  switch (action.type) {
    case 'TOGGLE_NAV_ICON':
      return {
        ...state,
        showClose: !state.showClose,
        showNav: state.showNav
      };
    case 'TOGGLE_NAV':
      return {
        ...state,
        showClose: !state.showClose,
        showNav: !state.showNav
      };
    case 'CLOSE_NAV':
      return {
        ...state,
        showClose: false,
        showNav: false
      };
    default:
      return state;
  }
};

export var scrollReducer = (state = {y: 0}, action) => {
  switch (action.type) {
    case 'SET_SCROLL_POSITION':
      return {
        ...state,
        y: action.scrollY
      };
    default:
      return state;
  }
};

export var siteReducer = (state = {showScheduling: false}, action) => {
  switch (action.type) {
    case 'TOGGLE_SCHEDULING':
      return {
        ...state,
        showScheduling: !state.showScheduling
      };
    default:
      return state;
  }
};
