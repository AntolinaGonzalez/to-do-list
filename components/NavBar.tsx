import React from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import HelpOutlineRoundedIcon from "@material-ui/icons/HelpOutlineRounded";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import {
  Box,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import FolderIcon from "@material-ui/icons/Folder";
import DescriptionIcon from "@material-ui/icons/Description";
import NewFolderDialog from "./FolderDialog";
import NewTaskDialog from "./TaskDialog";
import FolderComponent from "./Folder";
import { Folder } from "../models/folder";

const drawerWidth = 350;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      "& .MuiAppBar-colorPrimary": {
        backgroundColor: "#f19f3c",
        height: "60px !important",
      },
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
    logout: {
      display: "flex",
      marginLeft: 15,
      justifyContent: "flex-end",
    },
    gridList: {
      width: 500,
      height: 450,
      margin: 50,
    },
  })
);

export default function NavBar() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpenDrawer] = React.useState(true);
  const [openNewFolderDialog, setOpenNewFolderDialog] = React.useState(false);
  const [openNewTaskDialog, setOpenNewTaskDialog] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };
  const folder = new Folder();
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Box display="flex" justifyContent="space-between" m={1}>
          <Box
            display="flex"
            alignContent="center"
            justifyContent="center"
            alignItems="center"
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <HelpOutlineRoundedIcon color="secondary" />
            </IconButton>
            <Box>
              <Typography variant="h6" color="secondary">
                To Do List
              </Typography>
            </Box>
          </Box>

          <Box
            display="flex"
            alignContent="center"
            justifyContent="center"
            alignItems="center"
            mr={2}
          >
            <Typography
              variant="h6"
              className={classes.logout}
              color="secondary"
            >
              Log Out
            </Typography>
          </Box>
        </Box>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => setOpenNewFolderDialog(true)}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="New Folder" />
          </ListItem>
          <ListItem button onClick={() => setOpenNewTaskDialog(true)}>
            <ListItemIcon>
              <DescriptionIcon />
            </ListItemIcon>
            <ListItemText primary=" New Task" />
          </ListItem>
        </List>
        <Divider />
      </Drawer>
      <NewFolderDialog
        initialData={folder}
        open={openNewFolderDialog}
        onClose={() => setOpenNewFolderDialog(false)}
      />
      <NewTaskDialog
        open={openNewTaskDialog}
        onClose={() => setOpenNewTaskDialog(false)}
      />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus
          dolor purus non enim praesent elementum
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FolderComponent initialData={folders} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FolderComponent initialData={folders} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FolderComponent initialData={folders} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FolderComponent initialData={folders} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FolderComponent initialData={folders} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FolderComponent initialData={folders} />
          </Grid>
        </Grid>
      </main>
    </div>
  );
}

const tareas = [
  { id: "1", title: "una tarea", priority: "medium", checked: false },
  { id: "2", title: "dps tarea", priority: "high", checked: false },
  { id: "3", title: "tres tarea", priority: "low", checked: false },
  { id: "4", title: "cuarta tarea", priority: "medium", checked: false },
];

const folders = {
  id: "1",
  name: "General",
  tasks: tareas,
};
