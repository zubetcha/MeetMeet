import { useRouter } from "next/router";
import classNames from "classnames";
import classes from "./Layout.module.scss";
import { SVG, Text } from "ui/src/pages";

interface Props {
  menuInfo: {
    icon: string,
    label: string,
    path: string,
    isModal: boolean,
  };
  setClose: (is: boolean) => void;
}

export const MenuItem = ({ menuInfo, setClose }: Props) => {
  const router = useRouter();
  const { icon, label, path } = menuInfo;
  const isFocused = router.pathname === `/${path}`;

  return (
      <div className={classNames(
        classes.menuItem_container,
        {[classes.focused]: isFocused},
      )}
        onClick={() => {
          router.push(`/${path}`)
          setClose(true);
        }}
      >
        <div className={classes.icon_wrapper}>
          <SVG name={icon} color="onSurfaceVariant" width="24" height="24" />
        </div>
        <Text type="label-large" color="on-surface-variant" style={{ cursor: "pointer" }}>{label}</Text>
      </div>
      // <div className={classes.stateLayer}></div>
  )
}
