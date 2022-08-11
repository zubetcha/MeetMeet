import type { NextPage } from "next";
import { DarkModeToggle, ColorCard } from "../components";

const Home: NextPage = () => {
  return (
    <div>
      <DarkModeToggle />
      <ColorCard/>
    </div>
  );
};

export default Home;
