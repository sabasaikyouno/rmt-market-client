/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://rmt-market.com",
  generateRobotTxt: true,
  additionalPaths: async () => {
    return await genePaths();
  },
};

const genePaths = async () => {
  const res = await fetch("http://localhost:9000/api/getSearchOptions");
  const json = await res.json();

  return json.map(game => {
    return {
      loc: `/game-data?title=${game.label}&page=1&category=全て`,
      changefreq: 'daily',
      priority: 0.8
    }
  })
}