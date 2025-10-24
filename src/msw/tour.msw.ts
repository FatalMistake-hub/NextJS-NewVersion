import { rest } from 'msw';
import { setupServer } from 'msw/node';

// Define the request handler
const handlers = [
    rest.get('/tour/all', (req, res, ctx) => {
        const pageNo = req.url.searchParams.get('pageNo');
        const pageSize = req.url.searchParams.get('pageSize');

        // Mock response data
        const mockData = {
            tours: [
                {
                    tourId: 1610876256,
                    title: 'Hội An những viên ngọc tiềm ẩn cho những người dậy sớm',
                    rating: 0,
                    city: 'Quang Nam',
                    priceOnePerson: 20000,
                    imageMain: 'https://res.cloudinary.com/sacchidananad-utech/image/upload/v1686757207/pexels-photo-2161467_q9v4ta.jpg',
                    working:
                        '<p>Khám phá những đặc điểm độc đáo của miền Trung Việt Nam thông qua góc nhìn của các chuyên gia địa phương</p>',
                    latitude: 16.231722,
                    longitude: 108.72159,
                    destination: 'string',
                    destinationDescription: 'string',
                    timeSlotLength: 30,
                    categoryId: 1,
                    categoryName: 'Tour',
                    avgRating: 0,
                    isDeleted: false,
                    userId: '5d36db44-b158-4a22-bb45-d0cbe10b609c',
                },
                {
                    tourId: 1884723173,
                    title: 'Tạo một tiêu đề mô tả sắc nét và độc đáo để khách hàng hiểu rõ về những gì bạn đang cung cấp',
                    rating: 0,
                    city: 'Thành phố Đà Nẵng',
                    priceOnePerson: 180000,
                    imageMain: 'https://res.cloudinary.com/sacchidananad-utech/image/upload/v1703665681/2clothy/qhuprc7gtvvzhw6dagm6.webp',
                    working:
                        'Cung cấp kế hoạch cụ thể từ đầu đến cuối, đưa ra nhiều ý tưởng hoặc lựa chọn<br/>Mô tả điều gì làm cho trải nghiệm của bạn trở nên đặc biệt',
                    latitude: 16.078959,
                    longitude: 108.223175,
                    destination: 'Đà Nẵng, Phường Thạch Thang, Quận Hải Châu, Thành phố Đà Nẵng ',
                    destinationDescription:
                        'Cung cấp kế hoạch cụ thể từ đầu đến cuối, đưa ra nhiều ý tưởng hoặc lựa chọn<br/>Mô tả điều gì làm cho trải nghiệm của bạn trở nên đặc biệt',
                    timeSlotLength: 120,
                    categoryId: 1,
                    categoryName: 'Tour',
                    avgRating: 0,
                    isDeleted: false,
                    userId: '49e2f834-3a81-4996-b915-e8bbf7cf0439',
                },
                // Add more mock tours as needed
            ],
            pageNo: parseInt(pageNo, 10),
            pageSize: parseInt(pageSize, 10),
            total: 2, // Total number of tours
        };

        return res(ctx.status(200), ctx.json(mockData));
    }),
];

// Set up the mock server
const server = setupServer(...handlers);

// Start the server before all tests
beforeAll(() => server.listen());

// Reset handlers after each test
afterEach(() => server.resetHandlers());

// Close the server after all tests
afterAll(() => server.close());
