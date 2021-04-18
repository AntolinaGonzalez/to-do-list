import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { IconButton, Menu, MenuItem, Paper } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import TaskDialog from "./TaskDialog";
import { Task } from "../models/task";
import { User } from "../models/user";
import DeleteTaskDialog from "./deleteTask";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    task: {
      padding: 2,
      display: "flex",
      justifyContent: "space-between",
      borderLeft: "solid",
      "& .MuiFormControlLabel-root": {
        marginLeft: 10,
      },
    },
  })
);
interface Props {
  user: User;
  folder: number;
  initialData: Task;
}

const SimpleTask: React.FC<Props> = ({ user, folder, initialData }) => {
  const classes = useStyles();
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
    checkedF: true,
    checkedG: true,
  });
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  let borderColor;
  switch (initialData.priority) {
    case "low":
      borderColor = "lightgreen";
      break;
    case "medium":
      borderColor = "orange";
      break;
    default:
      borderColor = "red";
  }

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Paper className={classes.task} style={{ borderColor: borderColor }}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={initialData.checked}
                onChange={handleChange}
                name="checkedB"
                color="primary"
              />
            }
            label={initialData.title}
          />
        </FormGroup>
        <IconButton aria-label="settings" onClick={handleClick}>
          <MoreVertIcon />
        </IconButton>
      </Paper>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            setOpenEditDialog(true);
            handleClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          onClick={() => {
            setOpenDeleteDialog(true);
            handleClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      <TaskDialog
        initialData={initialData}
        user={user}
        folder={initialData.folder}
        open={openEditDialog}
        onClose={() => setOpenEditDialog(false)}
      />
      <DeleteTaskDialog
        initialData={initialData}
        user={user}
        folder={initialData.folder}
        type="task"
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
      />
    </>
  );
};
export default SimpleTask;
