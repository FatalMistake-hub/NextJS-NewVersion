import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import LoginModal from '../LoginModal';
import { useAppDispatch, useAppSelector } from 'src/redux/hook';
import { signIn } from 'next-auth/react';
import { selectAuth, SET_isLogin_TRUE } from 'src/redux/slice/authSlice';

// Mock dependencies
vi.mock('src/redux/hook');
vi.mock('next-auth/react');

const mockDispatch = vi.fn();
const mockSignIn = vi.fn();

(useAppDispatch as Mock).mockReturnValue(mockDispatch);
(useAppSelector as Mock).mockReturnValue({ isLogin: false });
(signIn as Mock).mockImplementation(mockSignIn);

describe('LoginModal', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('renders LoginModal component', () => {
        render(<LoginModal isOpen={true} onClose={vi.fn()} />);
        expect(screen.getByText('Login')).toBeInTheDocument();
    });

    it('submits form with valid data', async () => {
        render(<LoginModal isOpen={true} onClose={vi.fn()} />);

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password123' } });

        fireEvent.click(screen.getByText(/submit/i));

        await waitFor(() => {
            expect(mockSignIn).toHaveBeenCalledWith('credentials', {
                redirect: false,
                email: 'test@example.com',
                password: 'password123',
            });
        });

        await waitFor(() => {
            expect(mockDispatch).toHaveBeenCalledWith(SET_isLogin_TRUE());
        });
    });

    it('shows validation errors with invalid data', async () => {
        render(<LoginModal isOpen={true} onClose={vi.fn()} />);

        fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'invalid-email' } });
        fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '' } });

        fireEvent.click(screen.getByText(/submit/i));

        await waitFor(() => {
            expect(screen.getByText(/vui lòng nhập một địa chỉ email hợp lệ/i)).toBeInTheDocument();
            expect(screen.getByText(/bắt buộc!/i)).toBeInTheDocument();
        });
    });
});
