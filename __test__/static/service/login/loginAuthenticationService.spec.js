import serviceData from '../../../../__data__/index'
import loginUserService from '../../../../src/static/service/login/authenticationService';
import dotenv from 'dotenv';
import axios from '../../../../src/static/service/axiosInstance/axiosInstance'

jest.mock('../../../../src/static/service/axiosInstance/axiosInstance');
dotenv.config();
const {loginData} = serviceData;
const {request, requestErr, response, responseErr} = loginData;
beforeAll(() => {
    global.localStorage = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzaGVrLmthcm5pa0BpbXBldHVzLmNvbSIsImlhdCI6MTY4MTM5Nzc4MSwiZXhwIjoxNjgxNDg0MTgxfQ.-CHpaPOYeH7HmdvVRegU1mD7C2eyMyT3ATOJRrp47oI',
       getItem: function () {
          return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzaGVrLmthcm5pa0BpbXBldHVzLmNvbSIsImlhdCI6MTY4MTM5Nzc4MSwiZXhwIjoxNjgxNDg0MTgxfQ.-CHpaPOYeH7HmdvVRegU1mD7C2eyMyT3ATOJRrp47oI'
       },
       setItem: function () {
        return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiaGlzaGVrLmthcm5pa0BpbXBldHVzLmNvbSIsImlhdCI6MTY4MTM5Nzc4MSwiZXhwIjoxNjgxNDg0MTgxfQ.-CHpaPOYeH7HmdvVRegU1mD7C2eyMyT3ATOJRrp47oI'
     }
    };
});
  
afterAll(() => {
    jest.clearAllMocks();
});

describe('loginUserService()', () => {
    
    it('should call loginUserService', () => {
       
        axios.mockResolvedValueOnce({ data: { response } });
        setTimeout(async () => {
            const result = await loginUserService(request)
            console.log("test ", result)
            expect(axios).toHaveBeenCalledWith({
                method: 'post',
                url: `${process.env.API_BASE_URL}/login`,
                headers: { 'Content-Type': 'application/json' },
                data: request.user
            });
            

            
            expect(result).toEqual({ response });
        },2000)
    }, 3000);
    it('should handle error if API call fails', async () => {
        axios.mockRejectedValueOnce({ response: { data: { error: responseErr.data.message } } });
        setTimeout(async () => {
            const result = await loginUserService(requestErr);
            expect(result).toEqual({ error: 'Unauthorized. Password mismatch error.' });
        },2000)
    });
});