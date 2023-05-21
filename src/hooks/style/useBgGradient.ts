import { useColorModeValue } from '@chakra-ui/react';

export default function useBgGradient() {
    const mainGradient = useColorModeValue('rgba(237, 237, 237, 0.2)', 'rgba(39, 39, 39, 0.4)');
    const secondGradient = useColorModeValue('rgba(237, 237, 237, 1)', 'rgba(39, 39, 39, 1)');
    const bg = `linear-gradient(180deg, ${mainGradient}, ${secondGradient} 85%),radial-gradient(ellipse at top left, #ACD5D4, transparent 90%),radial-gradient(ellipse at top right, #D7FFFE, transparent 90%),radial-gradient(ellipse at center right, #cdb6da, transparent 50%),radial-gradient(ellipse at center left, #90F9C4, transparent 60%)`;

    return bg;
}

