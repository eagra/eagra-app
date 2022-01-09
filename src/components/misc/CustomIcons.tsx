import Icon, { IconProps } from "@chakra-ui/icon";
import { Image } from "@chakra-ui/react";
import { IconType } from "react-icons";

type CustomConstructorTypes =
  | {
      icon: string;
      fromImage: true;
    }
  | {
      icon: IconType;
      fromImage?: false;
    };

export type CustomIconProps = IconProps & CustomConstructorTypes;

export const CustomIcon = (props: CustomIconProps) => {
  const { icon, fromImage, ...rest } = props;

  if (fromImage) {
    return (
      <Image
        src={icon as string}
        height={rest.height}
        width={rest.width}
        bgColor={rest.bgColor}
        borderRadius="full"
        padding="2"
      />
    );
  }

  return <Icon as={icon as IconType} {...rest} />;
};
