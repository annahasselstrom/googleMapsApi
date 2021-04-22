import React, { useState, useRef, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { Tooltip } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import { Forecast } from './Forecast';

export const ScrollDialog = ({ newLat, newLng }) => {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState('paper');
  const noDataMessage = "Sorry, no data available"

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
    <div>
      <Tooltip title="Weather on chosen location">
         <button className="scroll-dialog" onClick={handleClickOpen('paper')}>Info</button>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogContent>
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
          >
            <div className="content-dialog-container">
              {newLng && newLat  
              ?
                  <Forecast 
                      newLat={newLat} 
                      newLng={newLng}>
                  </Forecast>
                :
                  {noDataMessage}
                }                
            </div>
           
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
};
