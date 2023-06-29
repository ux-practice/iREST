import serviceData from '../../../../__data__/index'
import mockStatusService from '../../../../src/static/service/mockStatus/mockStatusService';
import dotenv from 'dotenv';
import axios from '../../../../src/static/service/axiosInstance/axiosInstance'

jest.mock('../../../../src/static/service/axiosInstance/axiosInstance');
dotenv.config();
const {mockStatusData} = serviceData;
const {request, response} = mockStatusData;
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

describe('mockStatusService()', () => {
    it('should call mockStatusService', async() => {
        axios.mockResolvedValueOnce({ data: { response } });
        const result = await mockStatusService(request)
        expect(axios).toHaveBeenCalledWith({
            method: 'patch',
            url: `${process.env.API_BASE_URL}/mock/item/${request.data.id}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: {mockStatus: request.data.mockStatus},
        });
        expect(result).toEqual({ response });
    });
    it('should handle error if API call fails', async () => {
        axios.mockRejectedValueOnce({ response: { data: { error: 'Error message' } } });
        const result = await mockStatusService({data:{}});
        expect(result).toEqual({ error: 'Error message' });
      });
});