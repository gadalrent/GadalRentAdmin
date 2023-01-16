import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import Axios from "axios";
import { api } from "../Private/api";
import useAuth from "../utils/useAuth";
import isSuperAdmin from "../utils/isSuperAdmin";
import { useNavigate } from "react-router-dom";

// function createData(id, name, price, location, freeContact, period) {
//   return {
//     id,
//     name,
//     price,
//     location,
//     freeContact,
//     period,
//   };
// }

// const rows = [
//   createData(
//     "1",
//     "Lorem Ipsum",
//     "305,000 birr",
//     "Addis Ababa",
//     "NO",
//     "Per Quarter"
//   ),
//   createData(
//     "2",
//     "Lamed Surop Mokwle",
//     "546,879,000 birr",
//     "Addis Ababa",
//     "YES",
//     "Per Month"
//   ),
//   createData(
//     "3",
//     "Lorem Lamed Surop Mokwle Ipsum",
//     "246,000 birr",
//     "Adama",
//     "NO",
//     "Per Year"
//   ),
//   createData(
//     "4",
//     "Lorem Ipsum",
//     "354,658,000 birr",
//     "Bahir dar",
//     "YES",
//     "Per Quarter"
//   ),
//   createData(
//     "5",
//     "Lamed Surop Mokwle",
//     "705,000 birr",
//     "Addis Ababa",
//     "NO",
//     "Per Quarter"
//   ),
//   createData(
//     "1",
//     "Lorem Ipsum",
//     "305,000 birr",
//     "Addis Ababa",
//     "NO",
//     "Per Month"
//   ),
//   createData(
//     "2",
//     "Lamed Surop Mokwle",
//     "546,879,000 birr",
//     "Addis Ababa",
//     "YES",
//     "Per Year"
//   ),
//   createData(
//     "3",
//     "Lorem Lamed Surop Mokwle Ipsum",
//     "246,000 birr",
//     "Adama",
//     "NO",
//     "Per Month"
//   ),
//   createData("4", "Lorem Ipsum", "354,658,000 birr", "Bahir dar", "YES"),
//   createData(
//     "5",
//     "Lamed Surop Mokwle",
//     "705,000 birr",
//     "Addis Ababa",
//     "NO",
//     "Per Year"
//   ),
// ];

function Products(props) {
  const [rows, setRows] = useState([]);
  const navigate = useNavigate()
  const gotoEdit = (id) =>
  navigate({
    pathname: `/${props.service}/${id}`,
  });
  const [isapprove, seIsApprove] = useState([false, ""]);
  const {auth:token,level} = useAuth()
  const [isFree, setIsFree] = useState([false, ""]);
  const [isavailable, setIsavailable] = useState([false, ""]);
  const [isDelete, setIsDelete] = useState([false, ""]);
  useEffect(() => {
    data();
  }, []);

  const data = async () => {
    const res = Axios.get(`${api.baseUrl}/${props.service}/admin`)
      .then((res) => setRows(res.data))
      .catch((err) => console.log(err));
  };

  const approveProduct = (id, val, val2, val3) => {
    const res = Axios.patch(
      `${api.baseUrl}/${props.service}/${id}`,
      { isApproved: val, freeContact: val2, available: val3 },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    )



    
      .then((res) => {
        data();
        seIsApprove([false, ""]);
        setIsFree([false, ""]);
        setIsavailable([false, ""]);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsFree([false, ""]);
        seIsApprove([false, ""]);
      });
  };
  const deleteProduct = (id) => {
    const res = Axios.delete(
      `${api.baseUrl}/${props.service}/${id}`,

      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        data();

        setIsDelete([false, ""]);
      })
      .catch((err) => {
        setIsDelete([false, ""]);
      });
  };
  return (
    <div>
      <Paper
        sx={{
          m: 5,
          p: 2,
          display: "flex",
          flexDirection: "column",
          overflowX: "auto",
        }}
      >
        <Table sx={{ minWidth: 80 }}>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Price</TableCell>

              <TableCell>Location</TableCell>
              <TableCell>Free Contact</TableCell>

              <TableCell>Avalability</TableCell>
              <TableCell>Approve</TableCell>
              {isSuperAdmin(level) && (
                <TableCell>Delete</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .filter((row) => {
                return row.isApproved === props.isApproved;
              })
              .map((row) => (
                <TableRow
                  key={row._id}
                  hover={true}
                  sx={{
                    p: 0,
                    m: 0,
                    cursor: "pointer",
                    "&:last-child td, &:last-child th": { border: 0 },
                  }}
                >
                  <TableCell>
                    <Button
                      onClick={() => {
                        gotoEdit(row._id);
                      }}
                      // variant="text"
                      // sx={{ color: "#161616" }}
                    variant="text" sx={{ color: "#161616" }}>
                      {row.title}
                    </Button>
                  </TableCell>
                  <TableCell>{row.price}</TableCell>

                  <TableCell>{row.location}</TableCell>
                  <TableCell>
                    {isFree[0] && isFree[1] === row._id ? (
                      <CircularProgress />
                    ) : (
                      <Switch
                        checked={row.freeContact}
                        onChange={() => {
                          setIsFree([true, row._id]);

                          approveProduct(
                            row._id,
                            row.isApproved,
                            !row.freeContact,
                            row.available
                          );
                        }}
                        sx={{ m: 0 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {isavailable[0] && isavailable[1] === row._id ? (
                      <CircularProgress />
                    ) : (
                      <Switch
                        checked={row.available}
                        onChange={() => {
                          setIsavailable([true, row._id]);

                          approveProduct(
                            row._id,
                            row.isApproved,
                            row.freeContact,
                            !row.available
                          );
                        }}
                        sx={{ m: 0 }}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {isapprove[0] && isapprove[1] === row._id ? (
                      <CircularProgress />
                    ) : (
                      <Switch
                        checked={row.isApproved}
                        onChange={() => {
                          seIsApprove([true, row._id]);

                          approveProduct(
                            row._id,
                            !row.isApproved,
                            row.freeContact,
                            row.available
                          );
                        }}
                        sx={{ m: 0 }}
                      />
                    )}
                  </TableCell>

                 {
                  isSuperAdmin(level)&&(
                    <TableCell>
                    {isDelete[0] && isDelete[1] === row._id ? (
                      <CircularProgress />
                    ) : (
                      <IconButton
                        aria-label="edit"
                        onClick={() => {
                          setIsDelete([true, row._id]);
                          deleteProduct(row._id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    )}
                  </TableCell>
                  )
                 }
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default Products;
