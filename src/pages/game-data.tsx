import { useRouter } from "next/router";
import { GetServerSidePropsContext } from 'next';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, Container, CssBaseline, Grid, Pagination } from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import Header from "../components/Header";

type GameData = {
  title: String
  imgSrc: String
  gameTitleId: number
  detail: String
  price: number
  url: String
  categoryId: number
  siteId: number
}

export default function gameData({ gameDataList, searchOptions, gamePage }) {
  const router = useRouter();
  return (
    <Container>
      <Header searchOptions={searchOptions} />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} paddingTop={2}>
        {gameDataList.map((gameData: GameData) => {
          return (
            getCard(gameData)
          )
        })}
      </Grid>
      <Box style={{textAlign: "center"}} paddingTop={2} paddingBottom={2}>
        <Pagination
          count={gamePage}
          color="secondary"
          sx={{ display: 'inline-block' }}
          size="large"
          onChange={(e, page) => {
            router.push({
              pathname: "/game-data",
              query: {
                title: router.query.title,
                page: page
              }
            })
          }}
        />
      </Box>
    </Container>
  );
}

function getCard(gameData: GameData) {
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card
        variant="outlined"
        sx={{ maxWidth: 345, width: "100%" }}
      >
        <CardActionArea>
          <AspectRatio objectFit="contain">
            <CardMedia
              component="img"
              height="140"
              image={gameData.imgSrc}
              loading="lazy"
            />
          </AspectRatio>
          <CardContent>
            <Typography variant="h5">{gameData.title}</Typography>
            <Typography variant="h5" sx={{ textAlign: "right" }} color="error" paddingTop={2}>{gameData.price}円</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const gameDataList = await getJson("http://localhost:9000/api/getGameDataListByTitle/" + context.query.title + "?page=" + context.query.page);
  const searchOptions = await getJson("http://localhost:9000/api/getSearchOptions");
  const gamePage = await getJson("http://localhost:9000/api/getGameDataPage/" + context.query.title);

  //データがなかったら404
  if (Object.keys(gameDataList).length === 0) {
    return {
      notFound: true
    }
  }

  return { props: { gameDataList, searchOptions, gamePage } };
}

async function getJson(url: String) {
  const res = await fetch(url);
  return await res.json();
}
