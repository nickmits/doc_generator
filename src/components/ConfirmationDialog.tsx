import React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

interface ConfirmationProps {
  open: boolean;
  title: string;
  content: React.ReactNode;
  showAcknowledgment?: boolean;
  acknowledgementText: string;
  handleClose: () => void;
  handleAcknowledgement: (data: any) => void;
  disabled?: boolean;
}

const ConfirmationDialog = ({
  open,
  title,
  content,
  showAcknowledgment = true,
  acknowledgementText,
  handleClose,
  handleAcknowledgement,
  disabled,
}: ConfirmationProps) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
        <DialogContent
          sx={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
          }}
          id='alert-dialog-description'
        >
          {content}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {showAcknowledgment && (
            <Button disabled={disabled} onClick={handleAcknowledgement} autoFocus data-testid='connect-btn'>
              {acknowledgementText}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default ConfirmationDialog;
