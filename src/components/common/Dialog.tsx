import { Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import React from "react";
import Button from "./Button";

interface DialogProps {
  open: boolean;
  handleClose?: () => void;
  title: string;
  handleConfirm?: () => void;
}

export default ({ open, handleClose, title, handleConfirm }: DialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>

      <DialogActions>
        <Button title="Cancel" handleOnClick={handleClose} color="primary" />

        <Button
          title={"Delete"}
          handleOnClick={handleConfirm}
          color="secondary"
        />
      </DialogActions>
    </Dialog>
  );
};
