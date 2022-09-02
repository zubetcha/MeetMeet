import React from "react";
import {
  Button,
  ButtonGroup,
  IconButton,
  MultiSelect,
} from "ui/src/components/elements";

// 1. **키워드 검색 전**
//     - 존재하는 모든 요소 전체 선택 및 해제 작동
//     - 리스트에서 일부 선택 해제시 체크박스 프로퍼티 ‘indeterminate=true’
// 2. **키워드 검색 후**
//     - 검색된 리스트 내에서만 전체 선택 및 해제 적용
//     - 검색 후에 기존 선택된 리스트만 존재할 시 체크박스 프로퍼티 ‘indeterminate=false’
// 3. **검색 키워드 삭제**
//     1. 새로 노출된 리스트들이 모두 체크된 경우
//     전체 선택 체크박스 프로퍼티 ‘indeterminate=false’
//     2. 새로 노출된 리스트들이 일부 체크된 경우
//     전체 선택 체크박스 프로퍼티 ‘indeterminate=true’
//     3. 새로 노출된 리스트들이 모두 체크 해제된 경우
//     전체 선택 체크박스 프로퍼티 ‘checked=false’

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
        defaultValues={["5분"]}
        onChange={(e: any) => console.log(e)}
        style={{ width: "300px" }}
      >
        <MultiSelect.Option id="1" name="5분" />
        <MultiSelect.Option id="2" name="10분" />
        <MultiSelect.Option id="3" name="15분" />
        <MultiSelect.Option id="4" name="20분" />
        <MultiSelect.Option id="5" name="30분" />
        <MultiSelect.Option id="6" name="40분" />
        <MultiSelect.Option id="7" name="50분" />
      </MultiSelect>
      {/* <Select
        isSearch={true}
        defaultValue="5분"
        onChange={(e: any) => console.log(e)}
        style={{ width: "500px" }}
      >
        <Select.Option id="1" name="5분" />
        <Select.Option id="2" name="10분" />
        <Select.Option id="3" name="15분" />
      </Select> */}
    </>
  );
}
