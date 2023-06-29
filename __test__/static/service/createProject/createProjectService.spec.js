import serviceData from '../../../../__data__/index'
import createProjectService from '../../../../src/static/service/createProject/createProjectService';
import dotenv from 'dotenv';
import client from '../../../../src/static/service/axiosInstance/axiosInstance'

const {createProjectData} = serviceData;
jest.mock('../../../../src/static/service/axiosInstance/axiosInstance'); 
dotenv.config();


describe('createProjectService', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should call client.post with the correct API endpoint', async () => {
    client.mockResolvedValueOnce({ data: createProjectData });
    const result = await createProjectService({ data: createProjectData });
    expect(client).toHaveBeenCalledWith({
        method: 'post',
        url: `${process.env.API_BASE_URL}/project/create`,
        headers: {
          'Content-Type': 'application/json',
        },
        data: createProjectData
      });
    expect(result).toEqual(createProjectData);
  });
  it('should handle error if API call fails', async () => {
    client.mockRejectedValueOnce({ response: { data: { error: 'Error message' } } });
    const result = await createProjectService({ data: {} });
    expect(result).toEqual({ error: 'Error message' });
  });
});