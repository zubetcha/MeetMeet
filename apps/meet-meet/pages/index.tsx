import { Button } from "@components/ui";
import type { NextPage } from "next";
import { DarkModeToggle, ColorCard, Layout } from "../components";


const Home: NextPage = () => {
  return (
    <Layout>
      <DarkModeToggle />
      <ColorCard/>
      <Button
        configuration="filled"
        size="large"
        state="default"
        negativeMood={false}
        showIcon={false}
        label="Button label"
        showRightIcon={false}
      />
    </Layout>
  );
};

export default Home;
