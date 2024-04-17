import { AppBar, Autocomplete, Grid, Link, TextField, Toolbar, Typography } from "@mui/material";
import { redirect } from "next/navigation";
import { useRouter } from "next/router";

export default function Header({ searchOptions }) {
  const router = useRouter();
  return (
    <AppBar position="static">
      <Toolbar>
        <Grid container spacing={3}>
          <Grid item xs>
            <Link href="/" variant="h3" color="secondry" underline="none">RMT Market</Link>
          </Grid>
          <Grid item xs={4}>
            <Autocomplete
              autoComplete={true}
              options={searchOptions}
              renderInput={(params) =>
                <TextField
                  onKeyDown={e => {
                    if (e.key == "Enter") {
                      router.push({
                        pathname: "/game-data",
                        query: {
                          title: e.target.value,
                          page: 1,
                          category: "全て"
                        }
                      })
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