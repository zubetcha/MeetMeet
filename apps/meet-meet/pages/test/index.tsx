import React, { useEffect } from "react";
import {
  Button,
  ButtonGroup,
  IconButton,
  Select,
  MultiSelect,
} from "ui/src/components/elements";

export default function TestPage() {
  useEffect(() => {
    console.log(new Date());
  }, []);
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
          <Button label="?????????"></Button>
          <Button label="?????????"></Button>
          <Button label="?????????"></Button>
          <Button label="?????????"></Button>
        </ButtonGroup>
        <ButtonGroup
          configuration="filled"
          size="large"
          defaultIndex={2}
          onChange={(selectedIndex: number) =>
            console.log("selectedIndex", selectedIndex)
          }
        >
          <Button label="?????????"></Button>
          <Button label="?????????"></Button>
          <Button label="?????????"></Button>
          <Button label="?????????"></Button>
        </ButtonGroup>
        <ButtonGroup
          configuration="tonal"
          size="large"
          defaultIndex={2}
          onChange={(selectedIndex: number) =>
            console.log("selectedIndex", selectedIndex)
          }
        >
          <Button label="?????????"></Button>
          <Button label="?????????"></Button>
          <Button label="?????????"></Button>
          <Button label="?????????"></Button>
        </ButtonGroup>
        <ButtonGroup
          configuration="text"
          size="large"
          defaultIndex={2}
          onChange={(selectedIndex: number) =>
            console.log("selectedIndex", selectedIndex)
          }
        >
          <Button label="?????????"></Button>
          <Button label="?????????"></Button>
          <Button label="?????????"></Button>
          <Button label="?????????"></Button>
        </ButtonGroup>
      </div>
      <div style={{ marginTop: "20px", display: "flex", columnGap: "20px" }}>
        <MultiSelect
          isSearch={true}
          defaultValues={["5???"]}
          onChange={(e: any) => console.log(e)}
          style={{ width: "250px" }}
          label={"?????? ?????? MultiSelect"}
        >
          <MultiSelect.Option id="1" name="5???" />
          <MultiSelect.Option id="2" name="10???" />
          <MultiSelect.Option id="3" name="15???" />
          <MultiSelect.Option id="4" name="20???" />
          <MultiSelect.Option id="5" name="30???" />
          <MultiSelect.Option id="6" name="40???" />
          <MultiSelect.Option id="7" name="50???" />
        </MultiSelect>
        <Select
          isSearch={true}
          defaultValue="5???"
          onChange={(e: any) => console.log(e)}
          style={{ width: "250px" }}
          label={"?????? ?????? Select"}
        >
          <Select.Option id="1" name="5???" />
          <Select.Option id="2" name="10???" />
          <Select.Option id="3" name="15???" />
        </Select>
      </div>
    </>
  );
}
