import { Box } from '@chakra-ui/layout';
import { Navbar } from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { useEffect, useRef } from 'react';
import { stars } from '../../sketches';
import { Header } from './Header/Header';
import { useScreenSize } from '../../hooks/useScreenSize';
import p5 from 'p5';

export const Dashboard = () => {
  const bgColor = useColorModeValue('white', 'gray.900');
  const { isMobile } = useScreenSize();

  const $p5 = useRef();

  useEffect(() => {
    if (!$p5.current) return;
    new p5(stars, $p5.current);
  }, []);

  return (
    <Box
      bgColor={bgColor}
      width="100vw"
      display="flex"
      height="100vh"
      overflow="hidden"
      css={{ transition: 'background 0.8s' }}
    >
      <Box ref={$p5 as any} position="absolute" top="0" left="0" />
      <Navbar />
      <Box
        as="main"
        p={isMobile ? 6 : 12}
        paddingBottom="0"
        flex="1"
        position="relative"
        display="flex"
        flexDir="column"
        alignItems="flex-start"
        height="100%"
      >
        <Header />
        <Box marginTop="12" w="100%" flex="1" overflowY="auto">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
