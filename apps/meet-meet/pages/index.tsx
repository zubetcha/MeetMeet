import { Button, Select, Option } from "ui/src/components/elements";
import type { NextPage } from "next";
import { DarkModeToggle, Layout } from "../components";

const Home: NextPage = () => {
  const onChange = (e: any) => {
    console.log(e);
  };
  return (
    <Layout>
      <DarkModeToggle />
      {/* <ColorCard /> */}
      <Select
        defaultValue="test2"
        onChange={(e: any) => console.log(e)}
        isSearch
      >
        <Option id="1" name="test1" />
        <Option id="2" name="test2" />
        <Option id="3" name="test3" />
        <Option id="4" name="test4" />
        <Option id="5" name="test5" />
      </Select>
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
