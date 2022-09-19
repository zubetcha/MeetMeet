import { Text } from "../Text/Text"

interface Props {
  children?: JSX.Element[] | JSX.Element | string;
}

export const CardDepth1Title = ({children}: Props) => {

  return (
    <Text key="title" type="title-medium" color="on-secondary-container" style={{ fontWeight: "500" }}>
      {children}
    </Text>
  )
}

export const CardDepth2Title = ({children}: Props) => {

  return (
    <Text key="title" type="title-medium" color="on-surface"  style={{ fontWeight: "500" }}>
      {children}
    </Text>
  )
}
