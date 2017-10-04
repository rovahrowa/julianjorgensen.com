export let navReducer = (state = { show: false }, action) => {
  switch (action.type) {
    case 'TOGGLE_NAV':
      return {
        ...state,
        show: !state.show
      };
    case 'SHOW_NAV':
      return {
        ...state,
        show: true
      };
    case 'CLOSE_NAV':
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
};

export let scrollReducer = (state = { y: 0 }, action) => {
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

export let siteReducer = (state = { showScheduling: false }, action) => {
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
