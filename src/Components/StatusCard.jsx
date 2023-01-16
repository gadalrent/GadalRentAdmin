import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Title from "./Title";

function preventDefault(event) {
  event.preventDefault();
}

export default function StatusCard(props) {
  return (
    <React.Fragment>
      <Paper
        sx={{
          p: 3,
          display: "flex",
          flexDirection: "column",
        }}
        elevation={0}
        className="drop-shadow-sm hover:drop-shadow-xl cursor-pointer "
      >
        <Title>{props.title}</Title>
        <Typography component="p" variant="h4">
          {props.data}
        </Typography>
        <Typography color="text.secondary" sx={{ flex: 1 }}>
          {props.desc}
        </Typography>
      </Paper>
    </React.Fragment>
  );
}

{
  /* <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          View balance
        </Link>
      </div> */
}
