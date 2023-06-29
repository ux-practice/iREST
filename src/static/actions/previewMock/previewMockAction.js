import {
    PREVIEW_MOCK,
    PREVIEW_MOCK_SUCCESS,
    PREVIEW_MOCK_ERROR,
    PREVIEW_MOCK_CLEAR,
    PREVIEW_MOCK_PENDING
  } from '../actionTypes'
  
  export const createPreviewMockAction = data => {
    return {
      type: PREVIEW_MOCK,
      data,
    }
  }
  
  export const receiveDataAction = data => {
    return {
      type: PREVIEW_MOCK_SUCCESS,
      data,
    }
  }
  
  export const receiveError = data => {
    return {
      type: PREVIEW_MOCK_ERROR,
      data,
    }
  }
  
  export const flushPreviewMockData = () => {
    return {
      type: PREVIEW_MOCK_CLEAR,
    }
  }

  export const isPreviewMockPending = isPending => ({
   type: PREVIEW_MOCK_PENDING,
   isPending,
  })