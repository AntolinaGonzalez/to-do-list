import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Folder } from "../models/folder";
import { useFolderForm } from "../hooks/useFolder";
import { User } from "../models/user";
import { useForm } from "react-hook-form";

interface Props {
  user: User;
  open: boolean;
  onClose(): void;
  initialData: Folder;
}
const FolderDialog: React.FC<Props> = ({
  user,
  open,
  onClose,
  initialData,
}) => {
  const { submitHandler, register, formState} = useFolderForm({
     initialData,
     user,
     handleClose: onClose,
   });
  // const {register, handleSubmit} = useForm({defaultValues: initialData})
  // const onSubmit = (data, e)=>{
  //   console.log(data)
  // }
  const { ref, ...rest } = register('name')
  console.log('llega al form', initialData)
  return (
    
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <form onSubmit={submitHandler}>
        <DialogTitle id="form-dialog-title">New Folder</DialogTitle>
        <DialogContent>
          <DialogContentText>Create a new Folder.</DialogContentText>
          <TextField
            required
            autoFocus
            inputRef={ref}{...rest}
            margin="dense"
            name="name"
            id="name"
            label="Folder's name"
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" type="submit" >
            Confirm
          </Button>
        </DialogActions>
        </form>
      </Dialog>
  );
};

export default FolderDialog;
