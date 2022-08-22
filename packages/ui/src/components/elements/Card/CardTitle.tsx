import { Text } from "../Text/Text"

export const CardDepth1Title = ({children}: Props) => {

  return (
    <Text type="title-medium" color="on-secondary-container" weight="500">
      {children}
    </Text>
  )
}

export const CardDepth2Title = ({children}: Props) => {

  return (
    <Text type="title-medium" color="on-surface" weight="500">
      {children}
    </Text>
  )
}

interface Props {
  children?: JSX.Element[] | JSX.Element;
}
