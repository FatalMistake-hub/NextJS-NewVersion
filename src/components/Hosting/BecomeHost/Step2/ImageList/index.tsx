import {
    VStack,
    Text,
    Heading,
    Box,
    Flex,
    Button,
    SimpleGrid,
    Center,
    Wrap,
    WrapItem,
    IconButton,
    Tag,
    TagLabel,
    Skeleton,
    Spinner,
} from '@chakra-ui/react';
import Image from 'next/image';
import { useDropzone } from 'react-dropzone';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { BiPlus, BiX } from 'react-icons/bi';

import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { ADD_LISTIMAGE, DELETE_IMAGE, selectBecomeHost, SET_btnSTATUS } from 'src/redux/slice/becomeHostSlice';
import usePostToCloudinary from 'src/hooks/imageCloudinary/usePostToCloudinary';

const ImageListSt2: FC = () => {
    const { tour } = useAppSelector(selectBecomeHost);
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    useMemo(() => {
        if (tour.imageDtoList.length < 5) {
            dispatch(SET_btnSTATUS(true));
        } else {
            dispatch(SET_btnSTATUS(false));
        }
    }, [tour.imageDtoList.length]);
    const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, open } = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png'],
        },
        onDrop: async (acceptedFiles) => {
            setLoading(true);
            const listLink = await Promise.all(
                acceptedFiles.map(async (file) => {
                    const link = await usePostToCloudinary(file);
                    return link;
                }),
            );

            await dispatch(ADD_LISTIMAGE(listLink));
            setLoading(false);
        },
    });

    return (
        <>
            <div className="w-full justify-center min-h-[calc(100vh-176px)]  flex  px-20 mb-8">
                <VStack w={'700px'} align={'left'} gap={2} mt={8}>
                    {tour.imageDtoList.length === 0 ? (
                        <>
                            <Heading
                                lineHeight={1.2}
                                as="h1"
                                fontSize={'32px'}
                                fontWeight={'600'}
                                width={'full'}
                                // noOfLines={2}
                            >
                                Bổ sung một số bức ảnh chụp giới thiệu về trải nghiệm của bạn
                            </Heading>
                            <Text fontSize={'16px'} fontWeight={'500'} pb={4} color={'gray.600'}>
                                Bạn sẽ cần 5 bức ảnh để bắt đầu. Về sau, bạn vẫn có thể đăng thêm hoặc thay đổi ảnh.
                            </Text>
                            {!loading ? (
                                <Box
                                    // height="300px"
                                    {...getRootProps({ className: 'dropzone' })}
                                    p={10}
                                    className="flex flex-col items-center justify-center w-full h-[65vh] border-dashed border-black border mb-12 "
                                >
                                    <svg
                                        viewBox="0 0 64 64"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        role="presentation"
                                        focusable="false"
                                        className="w-16 h-16"
                                    >
                                        <path
                                            d="M41.636 8.404l1.017 7.237 17.579 4.71a5 5 0 0 1 3.587 5.914l-.051.21-6.73 25.114A5.002 5.002 0 0 1 53 55.233V56a5 5 0 0 1-4.783 4.995L48 61H16a5 5 0 0 1-4.995-4.783L11 56V44.013l-1.69.239a5 5 0 0 1-5.612-4.042l-.034-.214L.045 14.25a5 5 0 0 1 4.041-5.612l.215-.035 31.688-4.454a5 5 0 0 1 5.647 4.256zm-20.49 39.373l-.14.131L13 55.914V56a3 3 0 0 0 2.824 2.995L16 59h21.42L25.149 47.812a3 3 0 0 0-4.004-.035zm16.501-9.903l-.139.136-9.417 9.778L40.387 59H48a3 3 0 0 0 2.995-2.824L51 56v-9.561l-9.3-8.556a3 3 0 0 0-4.053-.009zM53 34.614V53.19a3.003 3.003 0 0 0 2.054-1.944l.052-.174 2.475-9.235L53 34.614zM48 27H31.991c-.283.031-.571.032-.862 0H16a3 3 0 0 0-2.995 2.824L13 30v23.084l6.592-6.59a5 5 0 0 1 6.722-.318l.182.159.117.105 9.455-9.817a5 5 0 0 1 6.802-.374l.184.162L51 43.721V30a3 3 0 0 0-2.824-2.995L48 27zm-37 5.548l-5.363 7.118.007.052a3 3 0 0 0 3.388 2.553L11 41.994v-9.446zM25.18 15.954l-.05.169-2.38 8.876h5.336a4 4 0 1 1 6.955 0L48 25.001a5 5 0 0 1 4.995 4.783L53 30v.88l5.284 8.331 3.552-13.253a3 3 0 0 0-1.953-3.624l-.169-.05L28.804 14a3 3 0 0 0-3.623 1.953zM21 31a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM36.443 6.11l-.175.019-31.69 4.453a3 3 0 0 0-2.572 3.214l.02.175 3.217 22.894 5.833-7.74a5.002 5.002 0 0 1 4.707-4.12L16 25h4.68l2.519-9.395a5 5 0 0 1 5.913-3.587l.21.051 11.232 3.01-.898-6.397a3 3 0 0 0-3.213-2.573zm-6.811 16.395a2 2 0 0 0 1.64 2.496h.593a2 2 0 1 0-2.233-2.496zM10 13a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"
                                            fill="#222"
                                        ></path>
                                    </svg>
                                    <input {...getInputProps()} />
                                    <VStack>
                                        <Text mt={2} fontSize={'22px'} fontWeight={600}>
                                            Kéo ảnh của bạn vào đây
                                        </Text>
                                        <Text fontSize={'16px'} fontWeight={'500'} color={'gray.600'}>
                                            Chọn ít nhất 5 bức ảnh
                                        </Text>
                                        <Text fontSize={'14px'} fontWeight={'500'} textDecoration={'underline'}>
                                            Tải lên từ thiết bị của bạn
                                        </Text>
                                    </VStack>
                                </Box>
                            ) : (
                                <Wrap spacing="16px" _first={{ width: '700px', height: '480px' }}>
                                    <WrapItem>
                                        <Center w="700px" h="240px" position={'relative'}>
                                            <Skeleton height={'full'} width={'full'} />
                                        </Center>
                                    </WrapItem>

                                    <WrapItem>
                                        <Center w="342px" h="115px" position={'relative'}>
                                            <Skeleton height={'full'} width={'full'} />
                                        </Center>
                                    </WrapItem>

                                    <WrapItem>
                                        <Center w="342px" h="115px" position={'relative'}>
                                            <Skeleton height={'full'} width={'full'} />
                                        </Center>
                                    </WrapItem>
                                </Wrap>
                            )}
                        </>
                    ) : (
                        <>
                            <Flex justifyContent={'space-between'}>
                                <Box>
                                    <Heading
                                        lineHeight={1.2}
                                        as="h2"
                                        fontSize={'22px'}
                                        fontWeight={'600'}
                                        width={'full'}
                                        // noOfLines={2}
                                    >
                                        Chọn ít nhất 5 bức ảnh
                                    </Heading>
                                    <Text fontSize={'16px'} fontWeight={'400'} pb={4} color={'gray.600'}>
                                        Kéo để sắp xếp lại
                                    </Text>
                                </Box>
                                <Button
                                    leftIcon={<BiPlus />}
                                    variant="outline"
                                    colorScheme={'teal'}
                                    color={'black'}
                                    rounded={'3xl'}
                                    type="button"
                                    onClick={open}
                                >
                                    Thêm ảnh
                                </Button>
                            </Flex>
                            <Wrap spacing="16px" _first={{ width: '700px', height: '480px' }}>
                                <WrapItem>
                                    <Center w="700px" h="480px" position={'relative'}>
                                        <Image
                                            src={tour.imageDtoList[0]?.link}
                                            alt={`Picture of `}
                                            layout="fill"
                                            objectFit="cover"
                                            placeholder="blur"
                                            blurDataURL={tour.imageDtoList[0]?.link}
                                        />
                                        <IconButton
                                            aria-label="del"
                                            icon={<BiX />}
                                            position={'absolute'}
                                            top={3}
                                            right={3}
                                            rounded={'full'}
                                            size={'sm'}
                                            bgColor={'white'}
                                            onClick={() => dispatch(DELETE_IMAGE(0))}
                                        />
                                        <Tag
                                            size={'md'}
                                            key={'size'}
                                            borderRadius="md"
                                            p={2}
                                            variant="solid"
                                            color={'black'}
                                            bgColor={'white'}
                                            position={'absolute'}
                                            top={3}
                                            left={3}
                                        >
                                            <TagLabel>Ảnh bìa</TagLabel>
                                        </Tag>
                                    </Center>
                                </WrapItem>
                                {tour.imageDtoList.slice(1).map((rs: any, index) => (
                                    <WrapItem key={index}>
                                        <Center w="342px" h="230px" position={'relative'}>
                                            <Image
                                                src={rs.link}
                                                alt={`Picture of `}
                                                layout="fill"
                                                objectFit="cover"
                                                placeholder="blur"
                                                blurDataURL={rs.link}
                                            />
                                            <IconButton
                                                aria-label="del"
                                                icon={<BiX />}
                                                position={'absolute'}
                                                top={3}
                                                right={3}
                                                rounded={'full'}
                                                size={'sm'}
                                                bgColor={'white'}
                                                onClick={() => dispatch(DELETE_IMAGE(index + 1))}
                                            />
                                        </Center>
                                    </WrapItem>
                                ))}

                                <WrapItem>
                                    <Center w="342px" h="230px" position={'relative'}>
                                        {!loading ? (
                                            <Box
                                                {...getRootProps({ className: 'dropzone' })}
                                                p={10}
                                                className="flex flex-col items-center justify-center w-full h-full border-dashed border-black border hover:border-solid"
                                            >
                                                <input {...getInputProps()} />
                                                <svg
                                                    viewBox="0 0 32 32"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    aria-hidden="true"
                                                    role="presentation"
                                                    focusable="false"
                                                    className="w-8 h-8"
                                                >
                                                    <path d="m27 3c2.209139 0 4 1.790861 4 4v18c0 2.209139-1.790861 4-4 4h-22c-2.209139 0-4-1.790861-4-4v-18c0-2.209139 1.790861-4 4-4zm-18.11289944 16.0381317-.09420734.0831886-5.79289322 5.7926797v.086c0 1.0543618.81587779 1.9181651 1.85073766 1.9945143l.14926234.0054857h13.085l-7.8778932-7.8786797c-.36048398-.3604839-.92771504-.3882135-1.32000624-.0831886zm12.50000004-6-.0942074.0831886-7.1288932 7.1286797 6.751 6.75h6.085c1.0543618 0 1.9181651-.8158778 1.9945143-1.8507377l.0054857-.1492623v-5.585l-6.2928932-6.2936797c-.360484-.3604839-.927715-.3882135-1.3200062-.0831886zm5.6128994-8.0381317h-22c-1.1045695 0-2 .8954305-2 2v15.084l4.37867966-4.3768932c1.12470996-1.12471 2.92027284-1.1696984 4.09865104-.1349652l.1439896.1349652 1.1276797 1.1278932 7.1296797-7.1278932c1.1247099-1.12471 2.9202728-1.1696984 4.098651-.1349652l.1439896.1349652 4.8786797 4.8778932v-9.585c0-1.0543618-.8158778-1.91816512-1.8507377-1.99451426zm-19 2c1.65685425 0 3 1.34314575 3 3 0 1.6568542-1.34314575 3-3 3s-3-1.3431458-3-3c0-1.65685425 1.34314575-3 3-3zm0 2c-.55228475 0-1 .44771525-1 1 0 .5522847.44771525 1 1 1s1-.4477153 1-1c0-.55228475-.44771525-1-1-1z"></path>
                                                </svg>
                                                <Text mt={2} fontSize={'14px'} fontWeight={600}>
                                                    Bổ sung thêm
                                                </Text>
                                            </Box>
                                        ) : (
                                            <Spinner size={'xl'} />
                                        )}
                                    </Center>
                                </WrapItem>
                            </Wrap>
                        </>
                    )}
                </VStack>
            </div>
        </>
    );
};

export default ImageListSt2;
