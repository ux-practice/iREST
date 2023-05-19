import {combineReducers} from 'redux'
import login from './login/loginReducer'
import createMock from './createMock/createMockReducer'
import mockList from './mockList/mockListReducer'
import projectList from './projectList/projectListReducer'
import createProject from './createProject/createProjectReducer'
import fileUpload from './fileUpload/fileUploadReducer'
import updateSession from './updateSession/updateSessionReducer'
import saveReference from './saveReferenceReducer/saveReferenceReducer'
import mockStatus from './mockStatus/mockStatusReducer'
import deleteMock from './deleteMock/deleteMockReducer'
import createPreviewMock from './previewMock/previewMockReducer'
import updateAuthType from './updateAuthReducer/updateAuthReducer'
import fetchToken from './fetchToken/fetchToken'
import updateToken from './updateToken/updateToken'

const rootReducer = combineReducers({
  login,
  createMock,
  mockList,
  projectList,
  createProject,
  fileUpload,
  updateSession,
  saveReference,
  mockStatus,
  deleteMock,
  createPreviewMock,
  fetchToken,
  updateToken,
  updateAuthType
})

export default rootReducer
