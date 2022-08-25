
import classes from "./loginPage.module.scss";

import { AuthCard } from "@components/auth/AuthCard";

const LoginPage = () => {

  return (
    <div className={classes["loginPage-container"]}>
      <AuthCard type="login" />
    </div>
  )
}

export default LoginPage;