import { Text } from "../Text/Text"

export const CardTitle = ({children}: Props) => {

  return (
    <Text>
      {children}
    </Text>
  )
}

interface Props {
  children?: JSX.Element[] | JSX.Element;
}
