import { motion } from 'framer-motion';
function MotionLayout({ children }: any) {
    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{
                type: 'spring',
                stiffness: 260,
                damping: 20,
            }}
        >
            {children}
        </motion.div>
    );
}

export default MotionLayout;
