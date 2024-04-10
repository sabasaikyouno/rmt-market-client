import { useRouter } from "next/router";

export default function Home({ gameTitleList }) {
  const router = useRouter();
  return (
    <div>
      {gameTitleList.map((gameTitle) => {
        return (<div>{gameTitle.gameTitle}</div>)
      })}
    </div>
  );
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:9000/api/getAllGameTitle");
  const gameTitleList = await res.json();
  return { props: { gameTitleList } };
}
