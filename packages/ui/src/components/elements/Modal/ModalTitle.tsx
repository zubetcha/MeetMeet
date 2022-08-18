import { Text } from "../Text/Text";

export const ModalTitle = ({children, type = "title-medium", color = "on-surface", weight = "500"}: Props) => {

  return (
    <>
      <Text type={type} color={color} weight={weight}>
        {children}
      </Text>
    </>
  )
}

interface Props {
  children: any;
  type?: string;
  color?: string;
  weight?: string;
}