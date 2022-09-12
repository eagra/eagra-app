import { Box } from '@chakra-ui/react';
import { useLoading } from '../../store/pageLoading';
import { AnimatedBox } from '../misc';

export const Loader = () => {
  const [loading] = useLoading();
  // if (!loading) return null;

  return (
    <Box
      css={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        overflow: 'hidden',
      }}
      zIndex="overlay"
    >
      <AnimatedBox
        css={{
          // translateX: '-100vw',
          width: '100%',
          height: 2,
          background: `linear-gradient(90deg, rgba(255,0,0,1) 0%, rgba(255,172,0,1) 17%, rgba(81,206,49,1) 34%, rgba(0,255,234,1) 49%, rgba(0,82,252,1) 63%, rgba(241,13,161,1) 86%, rgba(255,0,0,1) 100%)`,
        }}
        animate={{
          // translateX: '100vw',
          transition: {
            duration: 2,
            ease: 'easeOut',
            repeat: Infinity,
            repeatType: 'reverse',
          },
        }}
      />
    </Box>
  );
};
