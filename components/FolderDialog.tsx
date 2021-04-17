import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Folder } from "../models/folder";

interface Props {
  open: boolean;
  onClose(): void
  initialData: Folder
}
const FolderDialog: React.FC<Props> = ({ open, onClose, initialData }) => {

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">New Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create a new Folder.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Folder's name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button  color="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button  color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      
    </div>
  );
};

export default FolderDialog
