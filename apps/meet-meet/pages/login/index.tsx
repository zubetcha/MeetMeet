import classes from "./loginPage.module.scss";

import { AuthCard } from "@components/auth/AuthCard";

const LoginPage = () => {

  return (
    <div className={classes["loginPage-container"]}>
      <div className={classes["authCard-wrapper"]}>
        <AuthCard type="login" />
      </div>
    </div>
  )
}

export default LoginPage;