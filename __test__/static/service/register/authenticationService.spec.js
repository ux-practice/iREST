import serviceData from '../../../../__data__/index'
import registerService from '../../../../src/static/service/register/authenticationService';
import dotenv from 'dotenv';
import axios from '../../../../src/static/service/axiosInstance/axiosInstance'

jest.mock('../../../../src/static/service/axiosInstance/axiosInstance');
dotenv.config();
const {registerData} = serviceData;
const {request, response} = registerData;
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


describe('registerService()', () => {
    it('should call registerService', () => {
        axios.mockResolvedValueOnce({ data: { response } });
        setTimeout(async () => {
            const result = await registerService(request.user)
            expect(axios).toHaveBeenCalledWith({
                method: 'put',
                url: `${process.env.API_BASE_URL}/register}`,
                headers: {
                    'Content-Type': 'application/json',
                },
                data: request.user
            });
            expect(result).toEqual({ response });
        },2000)
    });
    it('should handle error if API call fails', async () => {
        axios.mockRejectedValueOnce({ response: { data: { error: 'Error message' } } });
        setTimeout(async () => {
            const result = await registerService(request);
            expect(result).toEqual({ error: 'Error message' });
        })
      });
});