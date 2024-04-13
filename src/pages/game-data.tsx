import { useRouter } from "next/router";
import { GetServerSidePropsContext } from 'next';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import AspectRatio from '@mui/joy/AspectRatio';
import Head from "next/head";
import Header from "../components/Header";
import { notFound } from "next/navigation";

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

export default function gameData({ gameDataList, searchOptions }) {
  return (
    <div>
      <Header searchOptions={searchOptions} />
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        {gameDataList.map((gameData: GameData) => {
          return (
            getCard(gameData)
          )
        })}
      </Grid>
    </div>
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
            <Typography variant="h4">{gameData.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const gameDataList = await getJson("http://localhost:9000/api/getGameDataListByTitle/" + context.query.title);
  const searchOptions = await getJson("http://localhost:9000/api/getSearchOptions");

  //データがなかったら404
  if(Object.keys(gameDataList).length === 0) {
    return {
      notFound: true
    }
  }

  return { props: { gameDataList, searchOptions } };
}

async function getJson(url: String) {
  const res = await fetch(url);
  return await res.json();
}
