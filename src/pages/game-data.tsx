import { useRouter } from "next/router";
import { GetServerSidePropsContext } from 'next';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button, CardActionArea, Container, CssBaseline, Grid, Pagination, Tab, Tabs } from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import Header from "../components/Header";
import CategoryTabs from "@/components/CategoryTabs";

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

export default function gameData({ gameDataList, searchOptions, gamePage, categoryList }) {
  const router = useRouter();
  return (
    <Container>
      <Header searchOptions={searchOptions} />
      <CategoryTabs categoryList={categoryList} />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} paddingTop={2}>
        {gameDataList.map((gameData: GameData) => {
          return (
            getCard(gameData)
          )
        })}
      </Grid>
      <Box style={{ textAlign: "center" }} paddingTop={2} paddingBottom={2}>
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
                page: page,
                category: router.query.category
              }
            })
          }}
        />
      </Box>
    </Container>
  );
}

function getCard(gameData: GameData) {
  const router = useRouter();
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card
        variant="outlined"
        sx={{ maxWidth: 345, width: "100%" }}
      >
        <CardActionArea onClick={e => {
          router.push(gameData.url);
        }}>
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
  const gameDataList = await getJson(getGameDataUrl(context));
  const searchOptions = await getJson("http://localhost:9000/api/getSearchOptions");
  const gamePage = await getJson(getGamePageUrl(context));
  const categoryList = await getJson("http://localhost:9000/api/getCategory/" + context.query.title);

  //データがなかったら404
  if (Object.keys(gameDataList).length === 0) {
    return {
      notFound: true
    }
  }

  return { props: { gameDataList, searchOptions, gamePage, categoryList } };
}

async function getJson(url: String) {
  const res = await fetch(url);
  return await res.json();
}

function getGameDataUrl(context) {
  const url = "http://localhost:9000/api/getGameDataListByTitle/" + context.query.title + "?page=" + context.query.page + "&category=" + context.query.category;

  if (context.query.search === undefined) {
    return url;
  } else {
    return (
      url + "&search=" + context.query.search
    )
  }
}

function getGamePageUrl(context) {
  const url = "http://localhost:9000/api/getGameDataPage/" + context.query.title + "?category=" + context.query.category;

  if (context.query.search === undefined) {
    return url;
  } else {
    return (
      url + "&search=" + context.query.search
    )
  }
}
