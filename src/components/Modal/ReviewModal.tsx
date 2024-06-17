import {
    useDisclosure,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Textarea,
    Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import useCreateReview from 'src/hooks/guest/review/useCreateReview';
import StarRatings from 'react-star-ratings';
import { useRouter } from 'next/navigation';
interface ReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}
function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
    const { mutateReview, isSuccess, isLoading, isError } = useCreateReview();
    const [value, setValue] = useState('');

    const [rating, setRating] = useState(5);

    // Catch Rating value
    const router = useRouter();
    const handleCreateReview = () => {
        mutateReview({ comment: value, rating: rating, tourId: Number(router.query.tourId) }).then(() => {
            onClose();
        });
    };
    return (
        <>
            <Modal size={'3xl'} closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Đánh giá trải nghiệm</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Textarea
                            fontSize={'16px'}
                            fontWeight={'500'}
                            focusBorderColor={'teal.500'}
                            resize={'vertical'}
                            p={4}
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            placeholder="Hãy chia sẻ những điều ban thích về trải nghiệm này với những người khác"
                            size="sm"
                            rounded={'lg'}
                            colorScheme={'teal'}
                            minH={'250px'}
                        />
                        <div className=" w-full flex items-center">
                            <Text fontSize={'16px'} fontWeight={'500'} mt={8}>
                                Đánh giá mức đô hài lòng của bạn:
                            </Text>
                            <div className="mt-8 ml-6">
                                <StarRatings
                                    rating={rating}
                                    starRatedColor=" teal"
                                    changeRating={setRating}
                                    numberOfStars={5}
                                    starHoverColor="teal"
                                    starDimension="30px"
                                    starSpacing="5px"
                                    name="rating"
                                />
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={6} variant={'link'} color={'black'} onClick={onClose}>
                            Trở lại
                        </Button>
                        <Button
                            colorScheme="teal"
                            onClick={() => {
                                handleCreateReview();
                            }}
                        >
                            Hoàn thành
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
export default ReviewModal;
