import React, {
  useCallback,
  useEffect,
  useState,
  Children,
  useRef,
} from "react";
import { Button } from "../Buttons/Button";
import classes from "./multiselect.module.scss";
import classNames from "classnames";

import { colors } from "../../../shared/style";
import { Input } from "../Input";
import useOutsideAlerter from "../../../hooks/useOutsideAlerter";
import { Checkbox } from "../Checkbox";
import { SVG } from "../SVG/SVG";

interface valueType {
  id: number;
  name: string;
}

interface MultiSelect {
  children: JSX.Element[];
  width: number;
  values: valueType[];
  placeholder?: string;
  isShowDropdown?: boolean;
  setIsShowDropdown?: (e: any) => void;
  selected?: any;
  setSelected?: (e: any) => void;
  isShowTags?: boolean;
  isboxShadow?: boolean;
  initialData?: any;
}

/**
 *
 * @param width (number) 넓이
 * @param values ({id,name}[]) 드롭다운 구성요소들 {id, name}
 * @param placeholder (string) 텍스트 필드 안에 들어갈 placeholder
 * @param isShowDropdown (boolean) 드롭다운 바로 보여줄지 말지
 * @param setIsShowDropdown 드롭다운 바로 닫기
 * @param wrapperRef (useRef) 요소 밖 DOM 선택을 위한 ref (wrapperRef 밖에 누르면 취소됨)
 * @param isShowTags (boolean) 태그들 보여줄지
 * @param isboxShadow (boolean) boxShadow 효과 있는지
 * @returns
 */
export const MultiSelect = ({
  children,
  width,
  values,
  placeholder,
  isShowDropdown = false,
  setIsShowDropdown,
  selected,
  setSelected,
  isShowTags = true,
  isboxShadow = false,
  initialData,
}: MultiSelect) => {
  // 텍스트 필드 value
  const [inputValue, setInputValue] = useState("");
  // 드롭다운 active ? true | false
  const [isActive, setIsActive] = useState(false);
  // 선택된 item 들
  const [checkedItem, setCheckedItem] = useState<any[]>([]);
  // 태그 만들어주기 위한 state
  const [checkedItemResult, setCheckedItemResult] = useState<any[]>();
  // 검색 결과
  const [searchResult, setSearchResult] = useState<any[]>();
  // 전체선택체크 박스 관련 상태값
  const [isTotalCheckboxChecked, setIsTotalCheckboxChecked] = useState(false);
  const [isHalf, setIsHalf] = useState(false);

  useEffect(() => {
    if (
      checkedItem &&
      checkedItem.length > 0 &&
      checkedItem.length !== values.length
    ) {
      document.getElementById(`item-${checkedItem[0].id}`)?.scrollIntoView();
    }
  }, [isActive]);

  useEffect(() => {
    if (initialData) {
      setCheckedItem(values.filter((val) => initialData.includes(val.name)));
    } else {
      setCheckedItem(values);
    }
  }, [initialData, values]);

  useEffect(() => {
    // console.log(checkedItem);
  }, [checkedItem]);
  useEffect(() => {
    setIsActive(isShowDropdown);
    if (searchResult) {
      setCheckedItem(searchResult);
    } else if (checkedItemResult) {
      setCheckedItem(checkedItemResult);
    }
  }, [isShowDropdown, checkedItemResult, searchResult]);

  useEffect(() => {
    if (checkedItem?.length == 0) {
      setIsHalf(false);
      setIsTotalCheckboxChecked(false);
    } else if (checkedItem?.length == values.length) {
      setIsHalf(false);
      setIsTotalCheckboxChecked(true);
    } else {
      setIsHalf(true);
      setIsTotalCheckboxChecked(true);
    }
  }, [checkedItem]);

  useEffect(() => {
    if (setSelected && checkedItemResult) {
      setSelected(checkedItemResult);
    }
  }, [checkedItemResult]);

  const onActiveToggle = () => {
    setIsActive(true);
  };

  const onInActiveToggle = () => {
    setInputValue("");
    setSearchResult(undefined);

    if (setIsShowDropdown) {
      setIsShowDropdown(false);
    }
  };

  const onChange = (e: React.ChangeEvent<any>) => {
    const { value } = e.target;
    searchItems(value);
    setInputValue(value);
  };

  const onChangeTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.id === "check-전체 선택") {
      setIsTotalCheckboxChecked(e.target.checked);
      if (!searchResult) {
        e.target.checked ? setCheckedItem([...values]) : setCheckedItem([]);
      } else {
        e.target.checked
          ? setCheckedItem([...searchResult])
          : setCheckedItem([]);
      }
      e.target.checked = !e.target.checked;
      return;
    }
  };

  const searchItems = (value: string) => {
    let result: any[] = [];
    values.map((vl: any, i: number) => {
      if (vl?.name?.toString().includes(value)) {
        result.push(vl);
      }
    });
    console.log(result);

    setSearchResult(result);
    setCheckedItem(result);
  };

  const onClickConfirmBtn = () => {
    setCheckedItemResult(checkedItem);

    setIsShowDropdown ? setIsShowDropdown(false) : setIsActive(false);
  };

  const { wrapperRef } = useOutsideAlerter(onInActiveToggle);

  return (
    <div
      className={classes.multiselect_container}
      style={{ minWidth: `${width}px` }}
      ref={wrapperRef}
    >
      {isActive && (
        <>
          <div className={classes.select_menu}>
            <div
              className={classes.select_item_lists}
              style={{ minWidth: width }}
            >
              <div className={classes.select_body} onClick={onActiveToggle}>
                {isShowTags == false ? (
                  <Input
                    type={"input"}
                    name={"multiSelect"}
                    value={inputValue}
                    placeholder={placeholder}
                    onChange={onChange}
                    status={"default"}
                    size={"large"}
                    icon={<SVG name="search" color={colors.darkMedium} />}
                    isBoxShadow={true}
                    isHelperText={false}
                  ></Input>
                ) : (
                  <div className={classes.checkedItemResultBox}>
                    <div
                      style={{
                        width: "100%",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {checkedItemResult &&
                        checkedItemResult.map((ck, i) => ck.name).join(", ")}
                    </div>
                  </div>
                )}
              </div>
              <ul
                className={classes.item_list}
                style={{
                  boxShadow: isboxShadow
                    ? "0px 4px 8px rgba(0, 0, 0, 0.16)"
                    : "0",
                }}
              >
                <MultiOption
                  item={{ id: 999, name: "전체 선택" }}
                  check={isTotalCheckboxChecked}
                  checkedItem={checkedItem}
                  setCheckedItem={setCheckedItem}
                  i={999}
                  isHalf={isHalf}
                  onChangeTotal={onChangeTotal}
                ></MultiOption>
                {!searchResult ? (
                  <>
                    {Children.toArray(children).map(
                      (child: any, index: number) => {
                        return (
                          <div key={`option-child-${index}`}>
                            {React.cloneElement(child, {
                              checkedItem: checkedItem,
                              check: true,
                              setCheckedItem: setCheckedItem,
                              i: index,
                            })}
                          </div>
                        );
                      }
                    )}
                  </>
                ) : (
                  <>
                    {searchResult.map((sr: any, index: number) => {
                      return (
                        <MultiOption
                          item={sr}
                          key={`search-result-option-${index}`}
                          check={true}
                          checkedItem={checkedItem}
                          setCheckedItem={setCheckedItem}
                          i={index}
                        ></MultiOption>
                      );
                    })}
                  </>
                )}
              </ul>
              <div
                style={{
                  width: "100%",
                  marginTop: "8px",
                  display: "flex",
                  columnGap: "8px",
                }}
              >
                <div
                  style={{
                    boxShadow: isboxShadow
                      ? "0px 4px 8px rgba(0, 0, 0, 0.16)"
                      : "0",
                  }}
                >
                  <Button
                    text="창 닫기"
                    style="line"
                    width={"fit-content"}
                    onClick={onInActiveToggle}
                  ></Button>
                </div>
                <div
                  style={{
                    boxShadow: isboxShadow
                      ? "0px 4px 8px rgba(0, 0, 0, 0.16)"
                      : "0",
                    width: "100%",
                  }}
                >
                  <Button
                    text="선택 완료"
                    style="solid"
                    width={"100%"}
                    height={"100%"}
                    onClick={onClickConfirmBtn}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

interface MultiOption {
  item: any;
  onClick?: (e: React.MouseEvent<HTMLLIElement>) => void;
  onKeyDown?: React.KeyboardEventHandler;
  check?: boolean;
  checkedItem?: any[];
  setCheckedItem?: (e: any) => void;
  i?: number;
  isHalf?: boolean;
  onChangeTotal?: (e: any) => void;
}

export const MultiOption = ({
  item,
  onKeyDown,
  check,
  checkedItem,
  setCheckedItem,
  i,
  isHalf = false,
  onChangeTotal,
}: MultiOption) => {
  const [checked, setChecked] = useState(check);

  useEffect(() => {
    setChecked(check);
  }, [check]);

  useEffect(() => {
    if (item.name == "전체 선택") return;
    checkedItem?.map((ck) => ck.name).includes(item.name)
      ? setChecked(true)
      : setChecked(false);
  }, [checkedItem]);

  // 만약에 selectedIdList 가 해당 item.id 를 포함하고 있다면 checkbox;
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setChecked(!checked);

    if (setCheckedItem && checkedItem) {
      let tmp = [...checkedItem];
      if (checked) {
        tmp?.push(item);
        setCheckedItem(tmp);
      } else {
        setCheckedItem(tmp?.filter((tp, i) => tp.name != item.name));
      }
    }
  };

  return (
    <>
      <li
        id={`item-${item.id}`}
        key={`select-item-${item.id}`}
        onKeyDown={onKeyDown}
        tabIndex={i}
        className={classNames(
          classes.select_item,
          checked && item.name !== "전체 선택" ? classes.selected : ""
        )}
        style={{ display: "flex", justifyItems: "flex-end" }}
      >
        <Checkbox
          name={`check-${item.name}`}
          id={`check-${item.name}`}
          onChange={onChangeTotal ? onChangeTotal : onChange}
          checked={checked}
          label={item.name}
          isHalf={isHalf}
        ></Checkbox>
      </li>
    </>
  );
};
