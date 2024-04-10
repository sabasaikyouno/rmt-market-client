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

function getCard(gameData: GameData) {
  return (
    <Grid item xs={2} sm={4} md={4}>
      <Card
        variant="outlined"
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
            <Typography>{gameData.title}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  )
}

export default function gameData({ gameDataList }) {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
      {gameDataList.map((gameData: GameData) => {
        return (
          getCard(gameData)
        )
      })}
    </Grid>

  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const url = "http://localhost:9000/api/getGameDataList/" + context.query.id;
  const res = await fetch(url);
  const gameDataList = await res.json();
  return { props: { gameDataList } };
}
