function clickLink(state, url) {
  /*
    When a click is linked, that link will now be the currentPage.
  */
  return url;
}

var initState = '/routes';
var currentPageReducer = function(state, action) {
  state = state || initState;
  switch (action.type) {
    case 'CLICK_LINK':
      return clickLink(state, action.url);
    default:
      return state;
  }
};

module.exports = currentPageReducer;
