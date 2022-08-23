import { Text } from "../Text/Text";

export const ModalDescription = ({children, type = "body-medium", color = "on-surface-variant"}: Props) => {

  return (
    <>
      <Text type={type} color={color}>
        {children}
      </Text>
    </>
  )
}

interface Props {
  children: any;
  type?: string;
  color?: string;
}