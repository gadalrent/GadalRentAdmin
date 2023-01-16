import * as React from 'react'
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EmailIcon from "@mui/icons-material/Email";
import AppsIcon from "@mui/icons-material/Apps";
import PeopleIcon from "@mui/icons-material/People";
const Navigations = [
    {
        description:'Dashboard',
        icon: () => <DashboardIcon color='primary'/>,
        to:'/',

    },
    {
        description:'Property',
        icon: () => <ApartmentIcon color='primary'/>,
        to:'/property'
    },
    {
        description:'Machinery',
        icon: () => <PrecisionManufacturingIcon color =  "primary" />,
        to:'/machinery'
    },
    {
        description:'Vehicle',
        icon: () => <DriveEtaIcon color='primary'/>,
        to:'/vehicle',
    },
    {
        description:'Message',
        icon: () => <EmailIcon color='primary'/>,
        to:'/message',
    },
    {
        description:'Customers',
        icon: () => <PeopleIcon color='primary'/>,
        to:'/user',
    },
    {
        description:'Web Info',
        icon: () => <AppsIcon color='primary'/>,
        to:"/webinfo",
    },
]


export default Navigations