import { Box, BoxProps, LinkProps } from '@chakra-ui/layout';
import { motion } from 'framer-motion';

export const AnimatedBox = motion<BoxProps & LinkProps>(Box);
