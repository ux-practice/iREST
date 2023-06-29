import dotenv from 'dotenv';
import axios from '../../../../src/static/service/axiosInstance/axiosInstance'
import serviceData from '../../../../__data__/index'
import {updateTokenService} from '../../../../src/static/service/updateToken/updateToken';

jest.mock('../../../../src/static/service/axiosInstance/axiosInstance');
dotenv.config();
const {updateTokenData} = serviceData;
const {request, requestErr, response} = updateTokenData;
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

describe('updateTokenService()', () => {
    it('should call updateTokenService', async() => {
        const id = '6a600b93-854d-4a8a-b28b-5e46dfd0a874';
        axios.mockResolvedValueOnce({ data: { response } });
        const result = await updateTokenService(request)
        expect(axios).toHaveBeenCalledWith({
            method: 'put',
            url: `${process.env.API_BASE_URL}/token/mockId/${id}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: request.data
        });
        expect(result).toEqual({ response });
    });
    it('should handle error if API call fails', async () => {
        axios.mockRejectedValueOnce({ response: { data: { error: 'Error message' } } });
        const result = await updateTokenService(requestErr);
        expect(result).toEqual({ error: 'Error message' });
      });
});