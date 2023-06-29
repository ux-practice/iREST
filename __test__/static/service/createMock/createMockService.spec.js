import {createMockService, fetchListByIdService} from '../../../../src/static/service/createMock/createMockService';
import dotenv from 'dotenv';
import serviceData from '../../../../__data__/index'
import axios from '../../../../src/static/service/axiosInstance/axiosInstance'

jest.mock('../../../../src/static/service/axiosInstance/axiosInstance'); 
const {createMockServicedata} = serviceData;
const {createMockErr, createMockRequest,
   fetchListRequest, createMockResponse, editMockData} = createMockServicedata;
dotenv.config();

describe('createMockService', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should call axios.post when mockId is not provided', async () => {
    axios.mockResolvedValueOnce({ data: { createMockResponse } });
    const request = { data: { createMockRequest } };
    const result = await createMockService(request);
    expect(axios).toHaveBeenCalledWith({
      method: 'post',
      url: `${process.env.API_BASE_URL}/mock/create`,
      headers: { 'Content-Type': 'application/json' },
      data: request.data,
    });
    expect(result).toEqual({ createMockResponse });
  });
  it('should call axios.post when edit mock happened', async () => {
    axios.mockResolvedValueOnce({ data: { createMockResponse: editMockData.response } });
    const request = { data: { createMockRequest: editMockData.request } };
    const result = await createMockService(request);
    expect(axios).toHaveBeenCalledWith({
      method: 'post',
      url: `${process.env.API_BASE_URL}/mock/create`,
      headers: { 'Content-Type': 'application/json' },
      data: request.data,
    });
    expect(result).toEqual({ createMockResponse: editMockData.response });
  });
  it('should handle error if API call fails', async () => {
    axios.mockRejectedValueOnce({ response: { data: { error: 'Error message' } } });
    const request = { data: createMockErr };
    const result = await createMockService(request);
    expect(result).toEqual({ error: 'Error message' });
  });
});

describe('fetchListByIdService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should handle error if API call fails', async () => {
    axios.mockRejectedValueOnce({ response: { data: { error: 'Error message' } } });
    const request = { data: fetchListRequest };
    const result = await fetchListByIdService(request);
    expect(result).toEqual({ error: 'Error message' });
  });
});
