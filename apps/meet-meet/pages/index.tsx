import { Button, ButtonGroup, Select, IconButton } from "ui/src/components/elements";
import type { NextPage } from "next";
import { DarkModeToggle, ColorCard, Layout } from "../components";


const Home: NextPage = () => {
  const onChange = (e: any) => {
    console.log(e);
  };

  return (
    <Layout>
      <DarkModeToggle />
      <ColorCard/>
      <div style={{
        display:"flex", 
        flexWrap:"wrap", 
        gap:'8px', 
        marginTop:'20px'
      }} >
        <Button
          configuration="filled"
          size="medium"
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
          negativeMood={false}
          showIcon={true}
          label="Button filled"
          showRightIcon={true}
          icon="more"
        />
        <Button
          configuration="text"
          size="large"
          negativeMood={true}
          showIcon={true}
          label="Button filled focused"
          showRightIcon={true}
          icon="more"
        />
        <Button
          configuration="textGray"
          size="large"
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
      </div>
      <div style={{
        display:"flex", 
        flexWrap:"wrap", 
        gap:'8px', 
        marginTop:'20px'
      }} >
        <IconButton
          configuration="filled"
          size="large"
          state="default"
          negativeMood={false}
          icon="more"
        />
        <IconButton
          configuration="filled"
          size="large"
          state="default"
          negativeMood={true}
          icon="more"
        />
        <IconButton
          configuration="filled"
          size="large"
          state="disable"
          negativeMood={false}
          icon="more"
        />
      </div>

      <ButtonGroup
        configuration="outlined"
        size="large"
        defaultIndex={2}
        onChange={(selectedIndex: number) =>
          console.log("selectedIndex", selectedIndex)
        }
      >
        <Button label="테스트"></Button>
        <Button label="테스트"></Button>
        <Button label="테스트"></Button>
        <Button label="테스트"></Button>
      </ButtonGroup>
    </Layout>
  );
};

export default Home;
