import type { NextPage } from "next";
import {
  DarkModeToggle,
  ApolloRead,
  ApolloReadById,
  Select,
  Option,
} from "../components";

const Home: NextPage = () => {
  return (
    <div>
      <DarkModeToggle />
      {/* <ApolloRead />
      <ApolloReadById /> */}
      <Select defaultValue="test1" isSearch>
        <Option id="1" name="test1"></Option>
        <Option id="2" name="test2"></Option>
      </Select>
    </div>
  );
};

export default Home;
