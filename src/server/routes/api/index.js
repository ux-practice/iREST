import Express from 'express'

// middlewares
import jwtCreate from '../../middlewares/jwt/jwtCreate'
import jwtVerify from '../../middlewares/jwt/jwtVerify'
import mockValidator from '../../middlewares/mock/mockValidator'
import mockStatusValidator from '../../middlewares/mock/mockStatusValidator'
import loginValidator from '../../middlewares/user/loginValidator'
import registerValidator from '../../middlewares/user/registerValidator'
import projectValidator from '../../middlewares/project/projectValidator'
import tokenValidator from '../../middlewares/user/tokenValidator'

// controllers
import userRegister from './user/register'
import userLogin from './user/login'
import mockCreate from './mock/create'
import mockUpdate from './mock/update'
import mockList from './mock/list'
import mockDetail from './mock/detail'
import mockStatus from './mock/status'
import mockDelete from './mock/delete'
import updateMockAuth from './mock/updateAuth'
import projectList from './project/list'
import projectCreate from './project/create'
import projectUpdate from './project/update'
import projectDelete from './project/delete'
import updateProjectAuth from './project/updateAuth'
import tokenUpdate from './token/update'
import tokenDetail from './token/list'
import deleteProjectToken from './token/delete'
import jsonUploader from './file/jsonUploader'
import apiSimulation from './iRest/response'
import largerResponse from '../../helpers/largerResponse'
import updateSession from './updateSession/updateSession'

const router = Express.Router()

// auth
router.post('/register', registerValidator, userRegister)
router.post('/login', loginValidator, userLogin, jwtCreate) // pass jwt if match

// mock
router.post('/mock/create', jwtVerify, mockValidator, mockCreate)
router.get('/mock/list', jwtVerify, mockList)
router.get('/mock/item/:id', jwtVerify, mockDetail) // view
router.put('/mock/item/:id', jwtVerify, mockValidator, mockUpdate) // update
router.patch('/mock/item/:id', jwtVerify, mockStatusValidator, mockStatus) // for update mockStatus
router.delete('/mock/item/:id', jwtVerify, mockDelete)
router.put('/authentication/mockId/:mockId', jwtVerify, updateMockAuth)

// project
router.get('/project/list', jwtVerify, projectList)
router.post('/project/create', jwtVerify, projectValidator, projectCreate)
router.put('/project/item/:id', jwtVerify, projectValidator, projectUpdate) // update
router.delete('/project/item/:id', jwtVerify, projectDelete)
router.put('/authentication/projectId/:projectId', jwtVerify, updateProjectAuth)

// token
router.get('/token/projectId/:projectId', jwtVerify, tokenDetail)
router.delete('/token/projectId/:projectId', jwtVerify, deleteProjectToken)
router.put('/token/projectId/:projectId', jwtVerify, tokenUpdate)
router.get('/token/mockId/:mockId', jwtVerify, tokenDetail)
router.put('/token/mockId/:mockId', jwtVerify, tokenUpdate)

// json uploader
router.post('/file/json-upload', jwtVerify, jsonUploader)

// large response test
router.get('/large-response', jwtVerify, largerResponse) // along with jwt verification

//  update session api
router.get('/updatesession', jwtVerify, updateSession)

const {MOCK_BASE_URL} = process.env
// mock responder
router.get(`${MOCK_BASE_URL}/:projectName/:projectEndpoint*`,tokenValidator, apiSimulation)
router.post(`${MOCK_BASE_URL}/:projectName/:projectEndpoint*`,tokenValidator, apiSimulation)
router.put(`${MOCK_BASE_URL}/:projectName/:projectEndpoint*`, tokenValidator, apiSimulation)
router.patch(`${MOCK_BASE_URL}/:projectName/:projectEndpoint*`, tokenValidator, apiSimulation)
router.delete(`${MOCK_BASE_URL}/:projectName/:projectEndpoint*`, tokenValidator, apiSimulation)
router.get('/mockPreview', apiSimulation).post('/mockPreview', apiSimulation)
module.exports = router
