import { httpSever } from '../../utils/instance/http';
import { HttpStatusCode } from 'axios';
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, test } from 'vitest';

describe('Fetch sever action', () => {
    beforeAll(() => {
        console.log('before All');
    });
    afterAll(() => {
        console.log('after All');
    });
    test('Get all category', async () => {
        const { payload, status } = await httpSever.get<any>('/categories/', {
            baseUrl: 'http://192.168.5.107:9000/api',
        });
        console.log('data', payload, status);
        expect(payload).toBeDefined();
        expect(status).toBe(HttpStatusCode.Ok);
    });
  test("hi", () => {
    console.log("hi");
    expect(1).toBe(1);
  });
});
