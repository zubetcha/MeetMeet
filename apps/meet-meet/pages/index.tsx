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
        showIcon={true}
        label="Button filled"
        showRightIcon={true}
        icon="more"
      />
      <Button
        configuration="filled"
        size="large"
        state="disable"
        negativeMood={false}
        showIcon={false}
        label="Button filled focused"
        showRightIcon={false}
      />
      <Button
        configuration="tonal"
        size="large"
        state="default"
        negativeMood={false}
        showIcon={false}
        label="Button filled"
        showRightIcon={false}
      />
      <Button
        configuration="tonal"
        size="large"
        state="focused"
        negativeMood={false}
        showIcon={false}
        label="Button filled focused"
        showRightIcon={false}
      />
      <Button
        configuration="outlined"
        size="large"
        state="default"
        negativeMood={false}
        showIcon={false}
        label="Button filled"
        showRightIcon={false}
      />
      <Button
        configuration="outlined"
        size="large"
        state="focused"
        negativeMood={false}
        showIcon={false}
        label="Button filled focused"
        showRightIcon={false}
      />
      <Button
        configuration="text"
        size="large"
        state="default"
        negativeMood={false}
        showIcon={false}
        label="Button filled"
        showRightIcon={false}
      />
      <Button
        configuration="text"
        size="large"
        state="focused"
        negativeMood={false}
        showIcon={false}
        label="Button filled focused"
        showRightIcon={false}
      />
      <Button
        configuration="textGray"
        size="large"
        state="default"
        negativeMood={false}
        showIcon={false}
        label="Button filled"
        showRightIcon={false}
      />
      <Button
        configuration="textGray"
        size="large"
        state="focused"
        negativeMood={false}
        showIcon={false}
        label="Button filled focused"
        showRightIcon={false}
      />
    </Layout>
  );
};

export default Home;
