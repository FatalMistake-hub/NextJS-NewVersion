import { AxiosError } from 'axios';
import { isAxiosError } from '../../utils/instance/utils';
import { describe, it, expect } from 'vitest';
describe('isAxiosError', () => {
    it('should return true if error is an AxiosError', () => {
        const error = new Error();
        expect(isAxiosError(error)).toBe(false)
        expect(isAxiosError(new AxiosError())).toBe(true)
    });
});
