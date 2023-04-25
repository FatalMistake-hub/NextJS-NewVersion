import { Box, Heading, StackDivider, VStack,Text } from '@chakra-ui/react';
import { FC } from 'react';

const CardBooking: FC = () => {
  return (
      <div className="sticky z-10 top-[80px] w-full inline-block pr-[1px] pb-12 mt-12">
          <VStack divider={<StackDivider borderColor="black.200" />} align="stretch">
              <Box pt={12} pb={6}>
                  <div className="flex justify-between items-center">
                      <section>
                          <Heading as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={1} mb={1}>
                              Trải nghiệm do An tổ chức
                          </Heading>
                          <Text>2,5 giờ - Ngôn ngữ: Tiếng Anh, Tiếng Đức, Tiếng Pháp và Tiếng Hàn Quốc</Text>
                      </section>
  
                  </div>
              </Box>
              <Box py={12}>
                  <Heading as="h2" fontSize={'22px'} fontWeight={'600'} width={'full'} noOfLines={1} mb={6}>
                      Những điều bạn sẽ làm
                  </Heading>


              </Box>
              <Box>3</Box>
          </VStack>
      </div>
  );
};

export default CardBooking;
