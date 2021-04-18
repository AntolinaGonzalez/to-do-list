import React, { useCallback } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  createStyles,
  FormControl,
  InputLabel,
  makeStyles,
  Select,
  Theme,
} from "@material-ui/core";
import { useTaskForm } from "../hooks/useTask";
import { User } from "../models/user";
import { Task } from "../models/task";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  })
);

interface Props {
  initialData: Task;
  user: User;
  folder?: number;
  open: boolean;
  onClose(): void;
}
const TaskDialog: React.FC<Props> = ({
  initialData,
  user,
  folder,
  open,
  onClose,
}) => {
  const [state, setState] = React.useState<{
    priority: string;
    name: string;
  }>({
    priority: initialData.priority,
    name: "priority",
  });
  const priorityLabel = state.priority;
  const { register, formState, submitHandler } = useTaskForm({
    initialData:{...initialData, priority: priorityLabel},
    user,
    folder,
    handleClose: onClose,
  });
  const classes = useStyles();
  
  const handleChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const name = event.target.name as keyof typeof state;
    setState({
      ...state,
      [name]: event.target.value,
    });
  };
  const { ref, ...rest } = register("title");
  
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="form-dialog-title"
      fullWidth
    >
      <form onSubmit={submitHandler}>
        <DialogTitle id="form-dialog-title">New Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Describe your task to add it to your to do list
          </DialogContentText>
          <TextField
            required
            autoFocus
            inputRef={ref}
            {...rest}
            margin="dense"
            name="title"
            id="title"
            label="Task's name"
            type="text"
            fullWidth
          />
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="age-native-simple">Priority</InputLabel>
            <Select
              native
              value={state.priority}
              onChange={handleChange}
              inputProps={{
                name: "priority",
                id: "Priority-label",
              }}
            >
              <option aria-label="None" value="" />
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" type="submit">
            Confirm
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default TaskDialog;
