import serviceData from '../../../../__data__/index';
import dotenv from 'dotenv';
import axios from '../../../../src/static/service/axiosInstance/axiosInstance'
import fetchTokenService from '../../../../src/static/service/fetchToken/fetchToken';

jest.mock('../../../../src/static/service/axiosInstance/axiosInstance');
dotenv.config();
const {fetchTokenData} = serviceData;
const {Payload, Response} = fetchTokenData;
beforeAll(() => {
    global.localStorage = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzaGVrLmthcm5pa0BpbXBldHVzLmNvbSIsImlhdCI6MTY4MTM5Nzc4MSwiZXhwIjoxNjgxNDg0MTgxfQ.-CHpaPOYeH7HmdvVRegU1mD7C2eyMyT3ATOJRrp47oI',
       getItem: function () {
          return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzaGVrLmthcm5pa0BpbXBldHVzLmNvbSIsImlhdCI6MTY4MTM5Nzc4MSwiZXhwIjoxNjgxNDg0MTgxfQ.-CHpaPOYeH7HmdvVRegU1mD7C2eyMyT3ATOJRrp47oI'
       }
    };
});
  
afterAll(() => {
    jest.clearAllMocks();
});

describe('fetchTokenService()', () => {
    it('should call fetchTokenService', async() => {
        axios.mockResolvedValueOnce({ data: { Response } });
        const result = await fetchTokenService(Payload)
        expect(axios).toHaveBeenCalledWith({
            method: 'GET',
            url: `${process.env.API_BASE_URL}/token/mockId/` + Payload.data,
        });
        expect(result).toEqual({ Response });
    });
    it('should handle error if API call fails', async () => {
        axios.mockRejectedValueOnce({ response: { data: { error: 'Error message' } } });
        const result = await fetchTokenService(Payload);
        expect(result).toEqual({ error: 'Error message' });
      });
});