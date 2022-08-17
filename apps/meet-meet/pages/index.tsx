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
        showIcon={true}
        label="Button filled focused"
        showRightIcon={true}
        icon="more"
      />
      <Button
        configuration="tonal"
        size="large"
        state="default"
        negativeMood={false}
        showIcon={true}
        label="Button filled"
        showRightIcon={true}
        icon="more"
      />
      <Button
        configuration="tonal"
        size="large"
        state="focused"
        negativeMood={false}
        showIcon={true}
        label="Button filled focused"
        showRightIcon={true}
        icon="more"
      />
      <Button
        configuration="outlined"
        size="large"
        state="default"
        negativeMood={false}
        showIcon={true}
        label="Button filled"
        showRightIcon={true}
        icon="more"
      />
      <Button
        configuration="outlined"
        size="large"
        state="disable"
        negativeMood={false}
        showIcon={true}
        label="Button filled focused"
        showRightIcon={true}
        icon="more"
      />
      <Button
        configuration="text"
        size="large"
        state="default"
        negativeMood={false}
        showIcon={true}
        label="Button filled"
        showRightIcon={true}
        icon="more"
      />
      <Button
        configuration="text"
        size="large"
        state="default"
        negativeMood={true}
        showIcon={true}
        label="Button filled focused"
        showRightIcon={true}
        icon="more"
      />
      <Button
        configuration="textGray"
        size="large"
        state="default"
        negativeMood={false}
        showIcon={true}
        label="Button filled"
        showRightIcon={true}
        icon="more"
      />
      <Button
        configuration="textGray"
        size="large"
        state="focused"
        negativeMood={false}
        showIcon={true}
        label="Button filled focused"
        showRightIcon={true}
        icon="more"
      />
    </Layout>
  );
};

export default Home;
