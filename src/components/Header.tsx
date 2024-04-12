import { AppBar, Autocomplete, Grid, TextField, Toolbar, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

export default function Header({ searchOptions }) {
  const router = useRouter();
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container spacing={3}>
          <Grid item xs>
            <Typography variant="h3">rmt-market</Typography>
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              autoComplete={true}
              options={searchOptions}
              renderInput={(params) =>
                <TextField
                  onKeyDown={e => {
                    if (e.key == "Enter") {
                      router.replace("/game-data?title=" + e.target.value);
                    }
                  }}
                  {...params}
                  label="Search"
                  margin="dense"
                />}
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