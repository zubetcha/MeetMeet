
import classes from "./joinPage.module.scss";

import { AuthCard } from "@components/auth/AuthCard";

const JoinPage = () => {

  return (
    <div className={classes["joinPage-container"]}>
      <AuthCard type="join" />
    </div>
  )
}

export default JoinPage;