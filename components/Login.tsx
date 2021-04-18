import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";

interface Props {
  open: boolean;
  onClose: () => void;
}
const Login: React.FC<Props> = ({ open, onClose }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="form-dialog-title"
        fullScreen
      >
        <DialogTitle id="form-dialog-title">To Do List APP</DialogTitle>
        <DialogContent>
          <DialogContentText>Login to To Do List App</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="username"
            label="Username"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Grid
            item
            xs={6}
            md={2}
            style={{
              backgroundColor: "orange",
              textAlign: "center",
              display: "flex",
              justifyContent: "center",
              alignItems:'center'
            }}
          >
            <Button onClick={onClose} color="secondary">
              Login
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
