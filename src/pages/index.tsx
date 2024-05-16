import Header from "@/components/Header";
import { AspectRatio } from "@mui/joy";
import { Card, CardActionArea, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";

export default function Home({ gameTitleDataList, searchOptions }) {
  return (
    <Container>
      <Header searchOptions={searchOptions} />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} paddingTop={2} >
        {gameTitleDataList.map((gameTitleData) => {
          return(getCard(gameTitleData))
        })}
      </Grid>
    </Container>
  );
}

function getCard(gameTitleData) {
  const router = useRouter();
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card
        variant="outlined"
        sx={{ maxWidth: 345, width: "100%" }}
      >
        <CardActionArea onClick={e => {
          router.push({
            pathname: "/game-data",
            query: {
              title: gameTitleData.gameTitle,
              page: 1,
              category: "全て"
            }
          })
        }}>
          <AspectRatio objectFit="contain">
            <CardMedia
              component="img"
              height="140"
              image={gameTitleData.gameImg}
              alt={gameTitleData.gameTitle}
            />
          </AspectRatio>
          <CardContent>
            <Typography variant="h4">{gameTitleData.gameTitle}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export async function getServerSideProps() {
  const gameTitleDataList = await getJson("http://localhost:9000/api/getAllGameTitleData")
  const searchOptions = await getJson("http://localhost:9000/api/getSearchOptions");
  return { props: { gameTitleDataList, searchOptions } };
}

async function getJson(url: String) {
  const res = await fetch(url);
  return await res.json();
}
