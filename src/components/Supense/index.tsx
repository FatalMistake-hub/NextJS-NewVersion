import { useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent } from '@chakra-ui/react';
import React from 'react';

const Suspense = () => {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const cancelRef = React.useRef<any>();
    return (
        <AlertDialog motionPreset="slideInBottom" leastDestructiveRef={cancelRef} onClose={onClose} isOpen={true} isCentered size={'3xl'}>
            <AlertDialogOverlay />
            <AlertDialogContent bgColor={'transparent'}>
                <div className="container">
                    <div className="top">
                        <div className="square">
                            <div className="square">
                                <div className="square">
                                    <div className="square">
                                        <div className="square">
                                            <div className="square"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <div className="square">
                            <div className="square">
                                <div className="square">
                                    <div className="square">
                                        <div className="square">
                                            <div className="square"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="left">
                        <div className="square">
                            <div className="square">
                                <div className="square">
                                    <div className="square">
                                        <div className="square">
                                            <div className="square"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="square">
                            <div className="square">
                                <div className="square">
                                    <div className="square">
                                        <div className="square">
                                            <div className="square"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default Suspense;
