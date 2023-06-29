import serviceData from '../../../../__data__/index'
import projectEditService from '../../../../src/static/service/projectEdit/projectEditService';
import dotenv from 'dotenv';
import axios from '../../../../src/static/service/axiosInstance/axiosInstance'

jest.mock('../../../../src/static/service/axiosInstance/axiosInstance');
dotenv.config();
const {projectEditData} = serviceData;
const {request, response, requestErr} = projectEditData;
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

describe('projectEditService()', () => {
    it('should call projectEditService', async() => {
        axios.mockResolvedValueOnce({ data: { response } });
        const result = await projectEditService(request)
        expect(axios).toHaveBeenCalledWith({
            method: 'put',
            url: `${process.env.API_BASE_URL}/project/item/${request.id}`,
            headers: {
                'Content-Type': 'application/json',
            },
            data: request.payload
        });
        expect(result).toEqual({ data: {response} });
    });
    it('should handle error if API call fails', async () => {
        axios.mockRejectedValueOnce({ response: { data: { error: 'Error message' } } });
        const result = await projectEditService(request);
        expect(result).toEqual({ error: 'Error message' });
      });
});