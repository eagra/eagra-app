import Icon, { IconProps } from "@chakra-ui/icon";
import { IconType } from "react-icons";

export type CustomIconProps = IconProps & {
  icon: IconType;
};

export const CustomIcon = (props: CustomIconProps) => {
  const { icon, ...rest } = props;
  return <Icon as={icon} {...rest} />;
};
