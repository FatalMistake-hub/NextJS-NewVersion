import { Button, Card, CardBody, CardFooter, Heading, SimpleGrid, Stack, Text, Image, Flex, HStack, StackDivider } from '@chakra-ui/react';
import CardTrip from "@components/Card/CardTrip";
import Link from 'next/link';

const MobileLogin = () => {
  return (
      <div className="">
          <Text fontSize={'24px'} fontWeight={'600'} width={'full'} py={4}>
              Các chuyến đi đã đặt
          </Text>
          <SimpleGrid minChildWidth={'100%'} gap={4} maxH={'100vh'} overflowY={'scroll'}>
              <Link href={'/mobile/indentity/guest'}>
                  <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
                      <Image
                          objectFit="cover"
                          maxW={{ base: '100%', sm: '200px' }}
                          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                          alt="Caffe Latte"
                      />

                      <Stack>
                          <CardBody>
                              <Heading noOfLines={2} size="md">
                                  The perfect latte
                              </Heading>

                              <HStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch" p={4}>
                                  <Flex alignItems={'center'} direction={'column'} minW={'fit-content'} w={'45%'}>
                                      <Text fontSize={'14px'} fontWeight={'600'} width={'full'}>
                                          Bắt đầu
                                      </Text>
                                      <Text fontSize={'16px'} mt={1} fontWeight={'700'} width={'full'} letterSpacing={'tight'}>
                                          Th 4, 3 thg 5
                                      </Text>
                                      <Text fontSize={'14px'} fontWeight={'400'} width={'full'}>
                                          13:00
                                      </Text>
                                  </Flex>
                                  <Flex alignItems={'center'} direction={'column'}>
                                      <Text fontSize={'14px'} fontWeight={'600'} width={'full'}>
                                          Kết thúc
                                      </Text>
                                      <Text fontSize={'16px'} mt={1} fontWeight={'700'} width={'full'} letterSpacing={'tight'}>
                                          Th 4, 3 thg 5
                                      </Text>
                                      <Text fontSize={'14px'} fontWeight={'400'} width={'full'}>
                                          13:00
                                      </Text>
                                  </Flex>
                              </HStack>
                          </CardBody>
                      </Stack>
                  </Card>
              </Link>
              <Link href={'/mobile/indentity/host'}>
                  <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
                      <Image
                          objectFit="cover"
                          maxW={{ base: '100%', sm: '200px' }}
                          src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                          alt="Caffe Latte"
                      />

                      <Stack>
                          <CardBody>
                              <Heading noOfLines={2} size="md">
                                  The perfect latte
                              </Heading>

                              <HStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch" p={4}>
                                  <Flex alignItems={'center'} direction={'column'} minW={'fit-content'} w={'45%'}>
                                      <Text fontSize={'14px'} fontWeight={'600'} width={'full'}>
                                          Bắt đầu
                                      </Text>
                                      <Text fontSize={'16px'} mt={1} fontWeight={'700'} width={'full'} letterSpacing={'tight'}>
                                          Th 4, 3 thg 5
                                      </Text>
                                      <Text fontSize={'14px'} fontWeight={'400'} width={'full'}>
                                          13:00
                                      </Text>
                                  </Flex>
                                  <Flex alignItems={'center'} direction={'column'}>
                                      <Text fontSize={'14px'} fontWeight={'600'} width={'full'}>
                                          Kết thúc
                                      </Text>
                                      <Text fontSize={'16px'} mt={1} fontWeight={'700'} width={'full'} letterSpacing={'tight'}>
                                          Th 4, 3 thg 5
                                      </Text>
                                      <Text fontSize={'14px'} fontWeight={'400'} width={'full'}>
                                          13:00
                                      </Text>
                                  </Flex>
                              </HStack>
                          </CardBody>
                      </Stack>
                  </Card>
              </Link>
              <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
                  <Image
                      objectFit="cover"
                      maxW={{ base: '100%', sm: '200px' }}
                      src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                      alt="Caffe Latte"
                  />

                  <Stack>
                      <CardBody>
                          <Heading noOfLines={2} size="md">
                              The perfect latte
                          </Heading>

                          <HStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch" p={4}>
                              <Flex alignItems={'center'} direction={'column'} minW={'fit-content'} w={'45%'}>
                                  <Text fontSize={'14px'} fontWeight={'600'} width={'full'}>
                                      Bắt đầu
                                  </Text>
                                  <Text fontSize={'16px'} mt={1} fontWeight={'700'} width={'full'} letterSpacing={'tight'}>
                                      Th 4, 3 thg 5
                                  </Text>
                                  <Text fontSize={'14px'} fontWeight={'400'} width={'full'}>
                                      13:00
                                  </Text>
                              </Flex>
                              <Flex alignItems={'center'} direction={'column'}>
                                  <Text fontSize={'14px'} fontWeight={'600'} width={'full'}>
                                      Kết thúc
                                  </Text>
                                  <Text fontSize={'16px'} mt={1} fontWeight={'700'} width={'full'} letterSpacing={'tight'}>
                                      Th 4, 3 thg 5
                                  </Text>
                                  <Text fontSize={'14px'} fontWeight={'400'} width={'full'}>
                                      13:00
                                  </Text>
                              </Flex>
                          </HStack>
                      </CardBody>
                  </Stack>
              </Card>
              <Card direction={{ base: 'column', sm: 'row' }} overflow="hidden" variant="outline">
                  <Image
                      objectFit="cover"
                      maxW={{ base: '100%', sm: '200px' }}
                      src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                      alt="Caffe Latte"
                  />

                  <Stack>
                      <CardBody>
                          <Heading noOfLines={2} size="md">
                              The perfect latte
                          </Heading>

                          <HStack divider={<StackDivider borderColor="gray.200" />} spacing={4} align="stretch" p={4}>
                              <Flex alignItems={'center'} direction={'column'} minW={'fit-content'} w={'45%'}>
                                  <Text fontSize={'14px'} fontWeight={'600'} width={'full'}>
                                      Bắt đầu
                                  </Text>
                                  <Text fontSize={'16px'} mt={1} fontWeight={'700'} width={'full'} letterSpacing={'tight'}>
                                      Th 4, 3 thg 5
                                  </Text>
                                  <Text fontSize={'14px'} fontWeight={'400'} width={'full'}>
                                      13:00
                                  </Text>
                              </Flex>
                              <Flex alignItems={'center'} direction={'column'}>
                                  <Text fontSize={'14px'} fontWeight={'600'} width={'full'}>
                                      Kết thúc
                                  </Text>
                                  <Text fontSize={'16px'} mt={1} fontWeight={'700'} width={'full'} letterSpacing={'tight'}>
                                      Th 4, 3 thg 5
                                  </Text>
                                  <Text fontSize={'14px'} fontWeight={'400'} width={'full'}>
                                      13:00
                                  </Text>
                              </Flex>
                          </HStack>
                      </CardBody>
                  </Stack>
              </Card>
          </SimpleGrid>
      </div>
  );
}
 
export default MobileLogin;
MobileLogin.Layout = 'MobileLayout';
