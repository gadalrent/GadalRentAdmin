import React, { useEffect, useState } from "react";
import { Container, Grid, Paper } from "@mui/material";
import Chart from "../Components/Chart";
import StatusCard from "../Components/StatusCard";
import UsersList from "../Components/usersList";
// import SignIn from "../Pages/AdminUsers/Signin";
import Axios from "axios";
import { api } from "../Private/api";
import { Outlet } from "react-router-dom";
export default function DashobardDetail() {
  const getToken = localStorage.getItem("token");
  const [user, setUser] = useState([]);
  const [property, setProperty] = useState([]);
  const [vehicle, setVehicle] = useState([]);
  const [machinery, setMachinery] = useState([]);

  const [token, setToken] = useState();
  useEffect(() => {
    data();

    setToken(localStorage.getItem("token"));
  }, []);
  const data = async () => {
    Axios.get(`${api.baseUrl}/user`)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err));
    Axios.get(`${api.baseUrl}/Property`)
      .then((res) => setProperty(res.data))
      .catch((err) => console.log(err));
    Axios.get(`${api.baseUrl}/Machinery`)
      .then((res) => setMachinery(res.data))
      .catch((err) => console.log(err));
    Axios.get(`${api.baseUrl}/Vehicle`)
      .then((res) => setVehicle(res.data))
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={3}>
            <StatusCard
              title="Users"
              data={user.length}
              desc="registered users"
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <StatusCard title="Property" data={property.length} desc="posted" />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <StatusCard
              title="Machinery"
              data={machinery.length}
              desc="posted"
            />
          </Grid>
          <Grid item xs={12} md={4} lg={3}>
            <StatusCard title="Vehicle" data={vehicle.length} desc="posted" />
          </Grid>
          {/* <Grid item xs={12} md={8} lg={12}>
              <Paper
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 240,
                }}
              >
                <Chart />
              </Paper>
            </Grid> */}
          <Grid item xs={12}>
            <UsersList />
          </Grid>
        </Grid>
        <Outlet/>
      </Container>
      
    </div>
  );
}
