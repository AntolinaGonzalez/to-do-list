import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SimpleTask from "./SimpleTask";
import { Box, Menu, MenuItem } from "@material-ui/core";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import FolderDialog from "./FolderDialog";
import DeleteDialog from "./deleteDialog";
import TaskDialog from "./TaskDialog";
import { Folder } from "../models/folder";
import { User } from "../models/user";
import { Task } from "../models/task";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    borderCard: {
      borderTop: "solid orange",
    },
  })
);
interface Props {
  initialData: Folder;
  user: User;
}

const FolderComponent: React.FC<Props> = ({ initialData, user }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openFolderDialog, setOpenFolderDialog] = useState(false);
  const [openDeleteDialog, setDeleteDialog] = useState(false);
  const [openTaskDialog, setOpenTaskDialog] = useState(false);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const taskData = new Task();

  return (
    <>
      <Card className={classes.borderCard}>
        <CardHeader
          avatar={<FolderOpenIcon color="primary" />}
          action={
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={initialData.name}
        />
        <CardContent>
          {initialData.tasks &&
            initialData.tasks.map((t) => (
              <Box key={t.id} m={1}>
                <SimpleTask
                  initialData={t}
                  user={user}
                  folder={initialData.id}
                />
              </Box>
            ))}
        </CardContent>
      </Card>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {initialData.name === "General" ? (
          <MenuItem
            onClick={() => {
              setOpenTaskDialog(true);
              handleClose();
            }}
          >
            Add task
          </MenuItem>
        ) : (
          <>
            <MenuItem
              onClick={() => {
                setOpenFolderDialog(true);
                handleClose();
              }}
            >
              Edit Folder
            </MenuItem>
            <MenuItem
              onClick={() => {
                setDeleteDialog(true);
                handleClose();
              }}
            >
              Delete Folder
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenTaskDialog(true);
                handleClose();
              }}
            >
              Add task
            </MenuItem>
          </>
        )}
      </Menu>
      <FolderDialog
        user={user}
        initialData={initialData}
        open={openFolderDialog}
        onClose={() => setOpenFolderDialog(false)}
      />
      <DeleteDialog
        initialData={initialData}
        user={user}
        type="folder"
        open={openDeleteDialog}
        onClose={() => setDeleteDialog(false)}
      />
      <TaskDialog
        initialData={taskData}
        user={user}
        folder={initialData.id}
        open={openTaskDialog}
        onClose={() => setOpenTaskDialog(false)}
      />
    </>
  );
};

export default FolderComponent;
