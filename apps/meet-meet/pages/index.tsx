import type { NextPage } from "next";
import {
  DarkModeToggle,
  ApolloRead,
  ApolloReadById,
  Select,
  Option,
} from "../components";

const Home: NextPage = () => {
  const onChange = (e: any) => {
    console.log(e);
  };
  return (
    <div>
      <DarkModeToggle />
      <Select defaultValue="test1" onChange={onChange} isSearch>
        <Option id="1" name="test1"></Option>
        <Option id="2" name="test2"></Option>
      </Select>
    </div>
  );
};

export default Home;
