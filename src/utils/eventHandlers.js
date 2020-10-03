export const enterKeyHandler = (callback) => (event) => {
  if (event.defaultPrevented) {
    return;
  }

  var handled = false;
  if (event.key === 'Enter') {
    handled = true;
    callback();
  }

  if (handled) {
    event.preventDefault();
  }
};
