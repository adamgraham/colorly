import React, { useState } from 'react';
import { MaterialDialog, MaterialIcon, MaterialIconButton } from './material';
import './AboutDialog.css';

const AboutDialog = () => {
  const [infoDialogOpen, setInfoDialogOpen] = useState(false);
  return (
    <div className="about-dialog-container">
      <MaterialIconButton
        aria-label="About"
        className="info-button"
        color="inherit"
        onClick={() => {
          setInfoDialogOpen(true);
        }}
      >
        <MaterialIcon>info_outline</MaterialIcon>
      </MaterialIconButton>
      <MaterialDialog
        open={infoDialogOpen}
        onClose={() => {
          setInfoDialogOpen(false);
        }}
      >
        <div className="about-dialog">
          <MaterialIconButton
            aria-label="Close"
            className="close-button"
            color="inherit"
            onClick={() => {
              setInfoDialogOpen(false);
            }}
          >
            <MaterialIcon>close</MaterialIcon>
          </MaterialIconButton>
          <div className="typography-credits-title">About</div>
          <div className="typography-credits">
            <p>
              Colorly is a versatile collection of color tools for designers and
              developers. The chosen tool can be selected from the dropdown menu
              attached to the page title. Valid input formats:
            </p>
            <ul>
              <li>#RGB, #RRGGBB</li>
              <li>rgb(red,green,blue)</li>
              <li>
                <a
                  href="https://developer.mozilla.org/en-US/docs/Web/CSS/color_value"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  CSS Color Values
                </a>
              </li>
            </ul>
          </div>
          <div className="typography-credits-title">Credits</div>
          <ul className="typography-credits">
            <li>
              Created by{' '}
              <a
                href="https://github.com/adamgraham"
                rel="noopener noreferrer"
                target="_blank"
              >
                @adamgraham
              </a>
            </li>
            <li>
              Built with React JS by
              <a
                href="https://github.com/facebook"
                rel="noopener noreferrer"
                target="_blank"
              >
                @Facebook
              </a>
            </li>
            <li>
              Material Design Components &amp; Icons by{' '}
              <a
                href="https://github.com/google"
                rel="noopener noreferrer"
                target="_blank"
              >
                @Google
              </a>
            </li>
            <li>
              Design inspired from Shadowlord by{' '}
              <a
                href="https://github.com/noeldelgado"
                rel="noopener noreferrer"
                target="_blank"
              >
                @noeldelgado
              </a>
            </li>
          </ul>
        </div>
      </MaterialDialog>
    </div>
  );
};

export default AboutDialog;
