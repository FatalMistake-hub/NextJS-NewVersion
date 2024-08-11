// __tests__/page.test.tsx

import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../../app/(main)/page';
import { getAllToursServer } from '../../utils/apis/tour.sever.api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { vi, Mock, describe, it, expect } from 'vitest';

// Mock the getAllToursServer function
vi.mock('src/utils/apis/tour.sever.api', () => ({
    getAllToursServer: vi.fn(),
}));

const queryClient = new QueryClient();

describe('Home Component', () => {
    beforeEach(() => {
        (getAllToursServer as Mock).mockResolvedValue({
            data: {
                pageNo: 1,
                totalPages: 1,
                tours: [],
            },
        });
    });

    it('renders the main layout', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>,
        );

        await waitFor(() => {
            expect(screen.getByText('Khám phá thế giới qua những chuyến đi')).toBeInTheDocument();
        });
    });

    it('renders the image', async () => {
        render(
            <QueryClientProvider client={queryClient}>
                <Home />
            </QueryClientProvider>,
        );

        await waitFor(() => {
            const image = screen.getByAltText('Picture of ');
            expect(image).toBeInTheDocument();
        });
    });
});
