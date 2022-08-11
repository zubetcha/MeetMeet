import type { NextPage } from "next";
import { DarkModeToggle, ApolloRead, ApolloReadById } from "../components";

const Home: NextPage = () => {
  return (
    <div>
      <DarkModeToggle />
      <ApolloRead />
      <ApolloReadById />
    </div>
  );
};

export default Home;
