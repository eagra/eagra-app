import { Button } from '@chakra-ui/react';
import { Link, useMatch } from 'react-router-dom';
import { CustomIcon, CustomIconProps } from '../misc/CustomIcons';
import { IconType } from 'react-icons';

export const NavElement = ({
  link,
  children,
  icon,
  activeColor,
}: {
  link: string;
  children: string;
  icon: IconType;
  activeColor: CustomIconProps['color'];
}) => {
  const match = useMatch(link);

  return (
    <Link to={link}>
      <Button
        as="span"
        w="100%"
        bgColor="transparent"
        justifyContent="flex-start"
      >
        <CustomIcon
          icon={icon}
          marginRight="2"
          w="6"
          h="6"
          color={match ? activeColor : undefined}
        />
        {children}
      </Button>
    </Link>
  );
};
