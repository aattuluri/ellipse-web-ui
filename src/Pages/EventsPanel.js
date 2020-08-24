import React from "react";
import { Grid, AppBar, Toolbar, Typography } from "@material-ui/core";

export default () => (
    <div className={"root"}>
      <React.Fragment>
    <AppBar position="static" color="default" className="flex-no-shrink">
      <Toolbar>
        <Typography variant="title" color="inherit">
          Scrolling Columns
        </Typography>
      </Toolbar>
    </AppBar>
    <div className="flex-no-shrink">
      <Typography>More stuff</Typography>
      <Typography>More stuff</Typography>
      <Typography>More stuff</Typography>
    </div>
    <Grid container className="flex-section">
      <Grid
        item
        xs={6}
        className={"flex-col-scroll"}
        style={{ backgroundColor: "pink" }}
      >
        <h1>Column 1</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>end line</h1>
      </Grid>
      <Grid
        item
        xs={6}
        className={"flex-col-scroll"}
        style={{ backgroundColor: "lightblue" }}
      >
        <h1>Column 2</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>new line</h1>
        <h1>end line</h1>
      </Grid>
    </Grid>
  </React.Fragment>
    </div>

);
