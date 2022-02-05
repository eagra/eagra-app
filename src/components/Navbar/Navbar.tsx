import { Box } from '@chakra-ui/layout';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import logo from '../../assets/cardano-logo.svg';
// import { useCardano } from "../../hooks/useCardano";
import {
  Button,
  useColorMode,
  useColorModeValue,
  useOutsideClick,
} from '@chakra-ui/react';
import {
  ArrowBackIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from '@chakra-ui/icons';
import { AnimatedBox, AnimatedButton } from '../misc';
import { NavElement } from './NavElement';
import { TiChartArea, TiStarFullOutline } from 'react-icons/ti';
import { MdFavorite } from 'react-icons/md';
import { useScreenSize } from '../../hooks/useScreenSize';
import { noop } from '@chakra-ui/utils';
import { CustomIcon } from '../misc/CustomIcons';

export const Navbar = () => {
  const { isMobile } = useScreenSize();

  const [expanded, setExpanded] = useState(!isMobile);

  const $navbar = useRef<HTMLElement>() as React.RefObject<HTMLElement>;
  useOutsideClick({
    // something seems off with types here
    ref: $navbar,
    handler: isMobile ? () => setExpanded(false) : noop,
  });

  useEffect(() => {
    if (isMobile) return setExpanded(false);
    setExpanded(true);
  }, [isMobile]);

  const { toggleColorMode, colorMode } = useColorMode();
  const bgColor = useColorModeValue('whiteAlpha.600', 'blackAlpha.600');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const logoBgColor = useColorModeValue('gray.800', 'transparent');

  return (
    <AnimatedBox
      ref={$navbar}
      as="nav"
      p="4"
      bgColor={bgColor}
      backdropFilter="blur(12px)"
      borderLeftRadius="md"
      zIndex="1"
      width="250px"
      height="100vh"
      flexShrink="0"
      animate={{ x: expanded ? 0 : -250, width: expanded ? 250 : 0 }}
      position={isMobile ? 'absolute' : 'relative'}
      overflow="visible"
      borderRightColor={borderColor}
      borderRightWidth="1px"
      borderRightStyle="solid"
      display="flex"
      flexDir="column"
      justifyContent="space-between"
      shadow="base"
      css={{ transition: 'background 1.2s' }}
    >
      <>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="8"
        >
          <Link to="/">
            <CustomIcon
              icon={logo}
              fromImage={true}
              height="46"
              width="46"
              bgColor={logoBgColor}
            />
          </Link>
          <AnimatedButton
            width="46px"
            height="46px"
            borderRadius="full"
            onClick={() => setExpanded((exp) => !exp)}
            animate={{ left: expanded ? 180 : 270 }}
            position="absolute"
            top="4"
            shadow="md"
          >
            {expanded ? <ArrowBackIcon /> : <HamburgerIcon />}
          </AnimatedButton>
        </Box>

        <Box display="grid" gridTemplate="1fr" gap="4">
          <NavElement link="/" icon={TiChartArea} activeColor="purple.400">
            Dashboard
          </NavElement>
          <NavElement
            link="/assets"
            icon={TiStarFullOutline}
            activeColor="yellow.400"
          >
            Assets
          </NavElement>
          <NavElement link="/staking" icon={MdFavorite} activeColor="red.400">
            Staking
          </NavElement>
        </Box>
      </>
      <Box flex="1" display="flex" flexDir="column-reverse">
        <Button
          onClick={toggleColorMode}
          justifyContent="flex-start"
          borderRadius="full"
          width="46px"
          height="46px"
          shadow="md"
        >
          {colorMode === 'dark' ? (
            <SunIcon color="yellow.400" />
          ) : (
            <MoonIcon color="skyblue" />
          )}
        </Button>
      </Box>
    </AnimatedBox>
  );
};
