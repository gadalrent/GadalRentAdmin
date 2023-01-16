import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import Switch from "@mui/material/Switch";
import Axios from "axios";
import { api } from "../Private/api";
import CircularProgress from "@mui/material/CircularProgress";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Tooltip from '@mui/material/Tooltip'
import AdminRegistration from '../Screens/AdminRegisterForm'
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useAuth from "../utils/useAuth";
import isSuperAdmin from '../utils/isSuperAdmin'
import Paper,{PaperProps} from '@mui/material/Paper'
export default function UsersList() {
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);
  const [rows, setRows] = useState([]);
  const [user, setUser] = useState([]);
  const [isAdmin, setIsAdmin] = useState([false, ""]);
  const [isPayed, setIsPayed] = useState([false, ""]);
  const {level,auth:token} = useAuth()
  useEffect(() => {
    data();
  }, []);

  const data = async () => {
    Axios.get(isSuperAdmin(level)?`${api.baseUrl}/user`:`${api.baseUrl}/user/normalUsers`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
  };
  const changeUser = (id, val, val2) => {
    Axios.patch(
      `${api.baseUrl}/user/${id}`,
      { isAdmin: val, isPayed: val2 },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        data();

        setIsAdmin([false, ""]);
        setIsPayed([false, ""]);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  console.log(level)
  return (
    <React.Fragment>
      <Paper
        sx={{
          p: 2,
          display: "flex",
          flexDirection: "column",
          overflowX: "auto",
        }}
      >
        {
          isSuperAdmin(level) &&(
            <Tooltip title ="Add new Admin">
            <Fab
            onClick={handleOpenDialog}
             sx={{
               position: 'absolute',
               bottom: 16,
               right: 16,
             }}
             color="primary" aria-label="add">
             <AddIcon />
           </Fab>
            </Tooltip>
          )
        }
        <Title>Users</Title>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>No.</TableCell>

              <TableCell>Name</TableCell>
              <TableCell>User name</TableCell>
              <TableCell>Email</TableCell>
              {
              isSuperAdmin(level) &&(
                <TableCell>Is Admin</TableCell>
              )
              }
              <TableCell>Is Payed</TableCell>
              {/* <TableCell>Access level</TableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {user.map((u, index) => (
              <TableRow key={u._id} hover={true} sx={{ cursor: "pointer" }}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.username}</TableCell>
                <TableCell>{u.email}</TableCell>
                  {
                    isSuperAdmin(level)&&(
                      <TableCell>
                      {isAdmin[0] && isAdmin[1] === u._id ? (
                        <CircularProgress />
                      ) : (
                        <Switch
                          checked={u.isAdmin}
                          onChange={() => {
                            setIsPayed([true, u._id]);
    
                            changeUser(u._id, !u.isAdmin, u.isPayed);
                          }}
                          sx={{ m: 0 }}
                        />
                      )}
                    </TableCell>
                    )
                  }
                <TableCell>
                  {isPayed[0] && isPayed[1] === u._id ? (
                    <CircularProgress />
                  ) : (
                    <Switch
                      checked={u.isPayed}
                      onChange={() => {
                        setIsPayed([true, u._id]);

                        changeUser(u._id, u.isAdmin, !u.isPayed);
                      }}
                      sx={{ m: 0 }}
                    />
                  )}
                </TableCell>
                {/* <TableCell align="right">{`$${row.amount}`}</TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
          See more users
        </Link> */}
      </Paper>
        {
          isSuperAdmin(level) &&(
            <Dialog
            open={openDialog}
            onClose={handleCloseDialog}

          > 
              <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          Register Admins
        </DialogTitle>
            <DialogContent
              sx={{}}
              >
            <AdminRegistration closeDialogOnSave = {handleCloseDialog}/>
            </DialogContent>
          </Dialog>
          )
        }
    </React.Fragment>
  );
}
