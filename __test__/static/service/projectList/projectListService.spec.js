import serviceData from '../../../../__data__/index'
import projectListService from '../../../../src/static/service/projectList/projectListService';
import dotenv from 'dotenv';
import axios from '../../../../src/static/service/axiosInstance/axiosInstance'

const {projectListData} = serviceData;
const {dataID, dataErr} = projectListData;
jest.mock('../../../../src/static/service/axiosInstance/axiosInstance'); 
dotenv.config();


describe('projectListService', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should call axios.get with the correct API endpoint and params', async () => {
    axios.mockResolvedValueOnce({ data: dataID.userId });
    const result = await projectListService({ dataID });
    expect(axios).toHaveBeenCalledWith({
      method: 'GET',
      url: `${process.env.API_BASE_URL}/project/list`,   
    });
    expect(result).toEqual(dataID.userId);
  });
  it('should handle error if API call fails', async () => {
    axios.mockRejectedValueOnce({ response: { data: { error: 'Error message' } } });
    const data = { dataErr };
    const result = await projectListService({ data });
    expect(result).toEqual({ error: 'Error message' });
  });
});
