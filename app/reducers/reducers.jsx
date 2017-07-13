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
      console.log('setting scroll position in redux');
      return {
        ...state,
        y: action.scrollY
      };
    default:
      return state;
  }
};

export var invoiceReducer = (state = {id: '', number: '', amount: '', email: '', currency: '', paid: false}, action) => {
  switch (action.type) {
    case 'SET_INVOICE':
      console.log('setting invoice in reducer...', action);
      return {
        id: action.invoice.id,
        number: action.invoice.number,
        totalAmount: action.invoice.totalAmount,
        email: action.invoice.email,
        currency: action.invoice.currency,
        paid: action.invoice.paid
      };
    default:
      return state;
  }
};
