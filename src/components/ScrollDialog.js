import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Tooltip } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Forecast } from './Forecast';
import PropTypes from 'prop-types';

export const ScrollDialog = ({ newLat, newLng }) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <section>
      <Tooltip title="Weather on chosen location">
         <span 
            className="scroll-dialog" 
            disabled={!newLng && !newLat}
            onClick={handleClickOpen('paper')}>Info</span>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <section className="content-dialog-container">
              {newLng && newLat  
              ?
                  <Forecast 
                     newLat={newLat}
                     newLng={newLng}
                   />
              :
                "Sorry, no data available"
              }                
            </section>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  )
}

ScrollDialog.propTypes = {
  setNewLat: PropTypes.func.isRequired,
  setNewLng: PropTypes.func.isRequired
};

