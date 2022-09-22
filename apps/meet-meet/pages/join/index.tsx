
import classes from "./joinPage.module.scss";

import { AuthCard } from "@components/auth/AuthCard";

const JoinPage = () => {

  return (
    <div className={classes["joinPage-container"]}>
      <div className={classes["authCard-wrapper"]}>
        <AuthCard type="join" />
      </div>
    </div>
  )
}

export default JoinPage;