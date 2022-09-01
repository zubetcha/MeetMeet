import React from "react";
import {
  Button,
  ButtonGroup,
  IconButton,
  MultiSelect,
} from "ui/src/components/elements";

export default function TestPage() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "20px",
        }}
      >
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
          state="focused"
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "20px",
        }}
      >
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          marginTop: "20px",
          flexDirection: "column",
        }}
      >
        <ButtonGroup
          configuration="outlined"
          size="large"
          defaultIndex={2}
          onChange={(selectedIndex: number) =>
            console.log("selectedIndex", selectedIndex)
          }
          label="Label"
        >
          <Button label="테스트"></Button>
          <Button label="테스트"></Button>
          <Button label="테스트"></Button>
          <Button label="테스트"></Button>
        </ButtonGroup>
        <ButtonGroup
          configuration="filled"
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
        <ButtonGroup
          configuration="tonal"
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
        <ButtonGroup
          configuration="text"
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
      </div>
      <MultiSelect
        isSearch={true}
        defaultValue="5분"
        onChange={(e: any) => console.log(e)}
        style={{ width: "500px" }}
      >
        <MultiSelect.Option id="1" name="5분" />
        <MultiSelect.Option id="2" name="10분" />
        <MultiSelect.Option id="3" name="15분" />
      </MultiSelect>
    </>
  );
}
