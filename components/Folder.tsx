import React, { useState } from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SimpleTask from "./SimpleTask";
import { Box, Menu, MenuItem } from "@material-ui/core";
import { Task } from "../models/task";
import FolderOpenIcon from "@material-ui/icons/FolderOpen";
import FolderDialog from "./FolderDialog";
import DeleteDialog from "./deleteDialog";
import TaskDialog from "./TaskDialog";
import { Folder } from "../models/folder";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    borderCard: {
      borderTop: "solid orange",
      "& .MuiTypography-body2": {
        fontSize: 20,
      },
    },
  })
);
interface Props {
  initialData: Folder;
}

const FolderComponent: React.FC<Props> = ({ initialData }) => {
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
  console.log("la data", initialData);
  return (
    <>
      <Card className={classes.borderCard}>
        <CardHeader
          avatar={<FolderOpenIcon color="primary" fontSize="large" />}
          action={
            <IconButton aria-label="settings" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
          }
          title={initialData.name}
        />
        <CardContent>
          {initialData.tasks.map(({ id, title, priority, checked }) => (
            <Box key={id} m={1}>
              <SimpleTask
                id={id}
                title={title}
                priority={priority}
                checked={checked}
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
      </Menu>
      <FolderDialog
        initialData={initialData}
        open={openFolderDialog}
        onClose={() => setOpenFolderDialog(false)}
      />
      <DeleteDialog
        type="folder"
        open={openDeleteDialog}
        onClose={() => setDeleteDialog(false)}
      />
      <TaskDialog
        open={openTaskDialog}
        onClose={() => setOpenTaskDialog(false)}
      />
    </>
  );
};

export default FolderComponent;
