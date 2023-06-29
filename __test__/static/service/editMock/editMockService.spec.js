import serviceData from '../../../../__data__/index'
import dotenv from 'dotenv';
import axios from '../../../../src/static/service/axiosInstance/axiosInstance'
import editMockService from '../../../../src/static/service/editMock/editMockService';

jest.mock('../../../../src/static/service/axiosInstance/axiosInstance');
dotenv.config();
const {editMockData} = serviceData;
const {request, response} = editMockData;


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

describe('editMockService()', () => {
    it('should call editMockService', async() => {
        axios.mockResolvedValueOnce({ data: { response } });
        const result = await editMockService(request)
        expect(axios).toHaveBeenCalledWith({
            method: 'get',
            url: `${process.env.API_BASE_URL}/mock/item/` + request.data,
            headers: { 'Content-Type': 'application/json' }
        });
        expect(result).toEqual({ response });
    });
    it('should handle error if API call fails', async () => {
        axios.mockRejectedValueOnce({ response: { data: { error: 'Error message' } } });
        const result = await editMockService(request);
        expect(result).toEqual({ error: 'Error message' });
      });
});