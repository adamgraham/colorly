import React, { useEffect, useState } from 'react';
import {
  MaterialIcon,
  MaterialIconButton,
  MaterialSnackbar,
} from '../components/material';
import { copyToClipboard } from '../utils/eventHandlers';

const CopyToClipboardToast = () => {
  const [copy, setCopy] = useState(null);

  useEffect(() => {
    const listener = (event) => {
      setCopy(null);
      copyToClipboard(event.detail);
      setTimeout(() => {
        setCopy(event.detail);
      });
    };
    document.addEventListener('CopyColorToClipboard', listener);
    return () => {
      document.removeEventListener('CopyColorToClipboard', listener);
    };
  }, []);

  return (
    <MaterialSnackbar
      action={
        <MaterialIconButton
          aria-label="Close"
          color="inherit"
          onClick={() => setCopy(null)}
        >
          <MaterialIcon>close</MaterialIcon>
        </MaterialIconButton>
      }
      autoHideDuration={3000}
      open={Boolean(copy)}
      onClose={() => {
        setCopy(null);
      }}
      message={copy && `"${copy}" copied to the clipboard`}
    />
  );
};

export default CopyToClipboardToast;
