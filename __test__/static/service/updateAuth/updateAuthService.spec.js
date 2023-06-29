import serviceData from '../../../../__data__/index'
import updateAuthService from '../../../../src/static/service/updateAuthType/updateAuthType';
import dotenv from 'dotenv';
import axios from '../../../../src/static/service/axiosInstance/axiosInstance'

jest.mock('../../../../src/static/service/axiosInstance/axiosInstance');
dotenv.config();
const {updateAuthData} = serviceData;
const {request, response} = updateAuthData;
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

describe('updateAuthService()', () => {
    it('should call updateAuthService', async() => {
        axios.mockResolvedValueOnce({ data: { response } });
        const result = await updateAuthService(request)
        expect(axios).toHaveBeenCalledWith({
            method: 'put',
            url: `${process.env.API_BASE_URL}/authentication/mockId/${request.data.id}`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: request.data
        });
        expect(result).toEqual({ response });
    });
    it('should handle error if API call fails', async () => {
        axios.mockRejectedValueOnce({ response: { data: { error: 'Error message' } } });
        const result = await updateAuthService(request);
        expect(result).toEqual({ error: 'Error message' });
      });
});