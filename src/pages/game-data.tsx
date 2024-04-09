import { useRouter } from "next/router";
import { GetServerSidePropsContext } from 'next';

export default function gameData({ gameDataList }) {
  const router = useRouter();
  return (
    <div>
      {gameDataList.map((gameData) => {
        return (<div>{gameData.title}</div>)
      })}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const url = "http://localhost:9000/api/getGameDataList/" + context.query.id;
  console.log(context.query.id);
  const res = await fetch(url);
  const gameDataList = await res.json();
  console.log(gameDataList);
  return { props: { gameDataList } };
}
