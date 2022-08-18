import { Button, Select } from "ui/src/components/elements";
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
        defaultValue="투썸플레이스"
        onChange={onChange}
        style={{ width: "200px" }}
        isSearch
      >
        <Select.Option id="1" name="스타벅스" />
        <Select.Option id="2" name="투썸플레이스" />
        <Select.Option id="3" name="메가커피" />
        <Select.Option id="4" name="스노우커피" />
        <Select.Option id="5" name="엔제리너스" />
      </Select>
      {/* <Button
        configuration="filled"
        size="large"
        state="default"
        negativeMood={false}
        showIcon={false}
        label="Button label"
        showRightIcon={false}
      /> */}
    </Layout>
  );
};

export default Home;
