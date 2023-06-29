import serviceData from '../../../../__data__/index'
import fileUploadService from '../../../../src/static/service/fileUpload/fileUploadService';
import dotenv from 'dotenv';
import axios from '../../../../src/static/service/axiosInstance/axiosInstance'

jest.mock('../../../../src/static/service/axiosInstance/axiosInstance');
dotenv.config();
const {fileUploadData} = serviceData;
const {request, response} = fileUploadData
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

describe('fileUploadService()', () => {
    it('should call fileUploadService', async() => {
        axios.mockResolvedValueOnce({ data: { response } });
        const result = await fileUploadService(request)
        expect(axios).toHaveBeenCalledWith({
            method: 'post',
            url: `${process.env.API_BASE_URL}/file/json-upload`,
            headers: { 'Content-Type': 'application/json' },
            data: request.data
        });
        expect(result).toEqual({ response });
    });
    it('should handle error if API call fails', async () => {
        axios.mockRejectedValueOnce({ response: { data: { error: 'Error message' } } });
        const result = await fileUploadService(fileUploadData);
        expect(result).toEqual({ error: 'Error message' });
      });
});