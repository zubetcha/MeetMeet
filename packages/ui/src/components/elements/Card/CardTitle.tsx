import { Text } from "../Text/Text"

export const CardDepth1Title = ({children}: Props) => {

  return (
    <Text type="title-medium" color="on-secondary-container" style={{ fontWeight: "500" }}>
      {children}
    </Text>
  )
}

export const CardDepth2Title = ({children}: Props) => {

  return (
    <Text type="title-medium" color="on-surface"  style={{ fontWeight: "500" }}>
      {children}
    </Text>
  )
}

interface Props {
  children?: JSX.Element[] | JSX.Element | string;
}
