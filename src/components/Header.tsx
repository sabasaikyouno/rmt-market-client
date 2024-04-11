import { AppBar, Autocomplete, Grid, TextField, Toolbar, Typography } from "@mui/material";

export default function Header({ searchOptions }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container spacing={3}>
          <Grid item xs>
            <Typography variant="h3">rmt-market</Typography>
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              options={searchOptions}
              renderInput={(params) => <TextField {...params} label="Search" margin="dense" />}
            />
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}

const serachTitle = [{
  label: "a"
}]