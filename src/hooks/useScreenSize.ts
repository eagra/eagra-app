import { useMediaQuery } from '@chakra-ui/media-query';

export const useScreenSize = () => {
  const [xl, large, small] = useMediaQuery([
    '(min-width: 1920px)',
    '(min-width: 1200px)',
    '(min-width: 720px)',
  ]);

  const isMobile = !small && !large && !xl;
  const isMedium = small && !large && !xl;
  const isLarge = small && large && !xl;
  const isXl = small && large && xl;

  return {
    isMobile,
    isMedium,
    isLarge,
    isXl,
  };
};
