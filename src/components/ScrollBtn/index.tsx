import { IconButton } from '@chakra-ui/react';
import { AnimatePresence, motion } from 'framer-motion';
import { BiDownArrowAlt } from 'react-icons/bi';

interface ScrollArrowProps {
    isVisible: boolean;
    container: HTMLDivElement | null;
}

export default function ScrollBtn({ isVisible, container }: ScrollArrowProps) {
    function handleClick() {
        container?.scrollTo({
            top: container.scrollHeight,
            behavior: 'smooth',
        });
    }

    return (
        <AnimatePresence initial={false} >
            <motion.div
                key={isVisible ? 'animate' : 'exit'}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                exit={{ opacity: 0, x: 10 }}
                initial={{ opacity: 0, x: 10 }}
                style={{
                    zIndex: 1,
                    right: '1.25rem',
                    bottom: '4.5rem',
                    position: 'absolute',
                }}
            >
                {isVisible && (
                    <IconButton
                        size="sm"
                        shadow="xl"
                        rounded="full"
                        colorScheme="teal"
                        icon={<BiDownArrowAlt />}
                        aria-label="Scroll bottom"
                        onClick={() => handleClick()}
                    />
                )}
            </motion.div>
        </AnimatePresence>
    );
}
