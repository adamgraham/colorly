export const enterKeyHandler = (callback) => (event) => {
  if (event.defaultPrevented) {
    return;
  }

  var handled = false;
  if (event.key === 'Enter') {
    handled = true;
    callback(event);
  }

  if (handled) {
    event.preventDefault();
  }
};

export const clearSelection = () => {
  if (document.selection && document.selection.empty) {
    document.selection.empty();
  } else if (window.getSelection) {
    var sel = window.getSelection();
    sel.removeAllRanges();
  }
};

export const getSelection = () => {
  if (document.selection) {
    return document.selection;
  } else if (window.getSelection) {
    return window.getSelection();
  } else {
    return null;
  }
};

export const copyToClipboard = (str, onCopyComplete = () => {}) => {
  const element = document.createElement('textarea');
  element.value = str;
  element.setAttribute('readonly', '');
  element.style.position = 'absolute';
  element.style.left = '-9999px';
  document.body.appendChild(element);
  element.select();
  document.execCommand('copy');
  document.body.removeChild(element);
  onCopyComplete();
};
