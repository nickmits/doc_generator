import React, { JSX } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

/**
 * Props for the ConfirmationDialog component.
 */
interface ConfirmationProps {
  /** Whether the dialog is open */
  open: boolean;

  /** Dialog title */
  title: string;

  /** Content inside the dialog */
  content: React.ReactNode;

  /** Whether to show the acknowledgment button (default: true) */
  showAcknowledgment?: boolean;

  /** Label for the acknowledgment button */
  acknowledgementText: string;

  /** Function to call when closing the dialog */
  handleClose: () => void;

  /** Function to call when acknowledging */
  handleAcknowledgement: (data: any) => void;

  /** Disable the acknowledgment button */
  disabled?: boolean;
}

/**
 * A reusable confirmation dialog component with optional acknowledgment action.
 */
const ConfirmationDialog = ({
  open,
  title,
  content,
  showAcknowledgment = true,
  acknowledgementText,
  handleClose,
  handleAcknowledgement,
  disabled,
}: ConfirmationProps): JSX.Element => {
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
            textOverflow: "ellipsis",
            overflow: "hidden",
          }}
          id='alert-dialog-description'
        >
          {content}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {showAcknowledgment && (
            <Button
              disabled={disabled}
              onClick={handleAcknowledgement}
              autoFocus
              data-testid='connect-btn'
            >
              {acknowledgementText}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ConfirmationDialog;
