import { TabPanel } from "@mui/joy";
import { Box, Tab, Tabs } from "@mui/material";
import { useRouter } from "next/router";
import { title } from "process";

export default function CategoryTabs({ categoryList }) {
  const router = useRouter();
  return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <Tabs onChange={(e, value) => {
        router.push({
          pathname: "/game-data",
          query: {
            title: router.query.title,
            page: 1,
            category: value
          }
        })
      }}>
        <Tab label="全て" value="全て" />
        {categoryList.map((category) => {
          return (
            <Tab label={category} value={category} />
          )
        })}
      </Tabs>
    </Box>
  )
}