import React from "react";
import classes from "./DarkModeToggle.module.scss";

export function DarkModeToggle() {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.checked
      ? document.documentElement.setAttribute("data-theme", "dark")
      : document.documentElement.setAttribute("data-theme", "light");
  };
  return (
    <>
      <div className={classes.toggle}>
        <input type="checkbox" id="switch" name="mode" onChange={onChange} />
        <label htmlFor="switch">Toggle</label>
        <h1>다크모드 테스트 입니다.</h1>
      </div>
    </>
  );
}
