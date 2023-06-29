import serviceData from '../../../../__data__/index'
import updateSessionService from '../../../../src/static/service/updateSession/updateSessionService';
import dotenv from 'dotenv';
import axios from '../../../../src/static/service/axiosInstance/axiosInstance'

jest.mock('../../../../src/static/service/axiosInstance/axiosInstance');
dotenv.config();
const {updateSessionData} = serviceData;
const {request, response} = updateSessionData;
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

describe('updateSessionService()', () => {
    it('should call updateSessionService', async() => {
        const id = "a6cb8f4e-8f21-43ae-8287-438c7685b167";
        axios.mockResolvedValueOnce({ data: { response } });
        const result = await updateSessionService(request)
        expect(axios).toHaveBeenCalledWith({
            method: 'GET',
            url: `${process.env.API_BASE_URL}/updatesession`,
            params: {"token": id}
        });
        expect(result).toEqual({ response });
    });
    it('should handle error if API call fails', async () => {
        axios.mockRejectedValueOnce({ response: { data: { error: 'Error message' } } });
        const result = await updateSessionService(request);
        expect(result).toEqual({ error: 'Error message' });
      });
});