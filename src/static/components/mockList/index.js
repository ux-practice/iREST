import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {bindActionCreators} from 'redux'
import 'bootstrap/dist/css/bootstrap.css'
import './mockList.css'
import Pagination from 'react-js-pagination'
import queryString from 'query-string'
import {toast} from 'react-toastify'
import startCase from 'lodash/startCase'
import 'react-toastify/dist/ReactToastify.css'
import Tooltips from '../common/Tooltip'
import {notifySuccess} from '../common/Toast'
import Nav from '../common/nav'
import Loader from '../common/Loader'
import CopyBoard from '../common/copyUrl'
import {mockListPageTitle} from '../../constants/helperText'
import {createMockUrl, DashboardUrl, EditMockUrl} from '../../constants/url'
import {mockListAction} from '../../actions/mockList/mockListActions'
import {mockStatusAction} from '../../actions/mockStatus/mockStatusActions'
import {deleteMockAction} from '../../actions/deleteMock/deleteMockAction'
import {updateAuthTypeAction} from '../../actions/updateAuthType/updateAuthType'
import {fetchTokenAction} from '../../actions/fetchToken/fetchToken'
import {updateTokenAction} from '../../actions/updateToken/updateToken'
import {projectListAction} from '../../actions/projectList/projectListAction'
import TableSorting from './TableSorting'
import {flushUserData} from '../../actions/login/authenticationActions'
import ModalShow from '../modal/ModalShow'
import ModalPopup from '../modal/ModalPopup'
import DeleteTokenModal from '../modal/deleteTokenModal/deleteTokenModal'
import UpdateAuthTypeModal from '../modal/updateAuthTypeModal/updateAuthTypeModal'
import editIcon from '../../assets/images/iRest_files/edit_icon.png'
import keyIcon from '../../assets/images/iRest_files/key.svg'
import addIcon from '../../assets/images/iRest_files/plus_circle.svg'
import deleteIcon from '../../assets/images/iRest_files/blue_delete_trash.svg'
import previewEye from '../../assets/images/iRest_files/try_eye.svg'
import downloadIcon from '../../assets/images/iRest_files/download.svg'
import mockListService from '../../service/mockList/mockListService'
import editMockService from '../../service/editMock/editMockService'

toast.configure()

class MockList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      limit: 5,
      offset: 0,
      totalMock: 0,
      mockListData: null,
      search: '',
      onChangeSearch: '',
      serviceResponseType: '',
      allProjectName: [],
      allProjectName1: [],
      projectName: '',
      tableHeader: [
        {name: 'MOCK NAME', field: 'mockName', sortable: true},
        {name: 'PROJECT', field: 'projectName', sortable: true},
        {name: 'API TYPE', field: 'serviceResponseType', sortable: true},
        {name: 'URL', field: 'endpoint', sortable: true},
        {name: 'METHOD', field: 'method', sortable: true},
        {name: 'AUTH TYPE', field: 'authenticationType', sortable: true},
        {name: 'STATUS', field: 'statusCode', sortable: false},
        {name: 'MOCK STATUS', field: 'mockStatus', sortable: false},
        {name: 'ACTION', field: '', sortable: false},
      ],
      sorting: {field: '', order: ''},
      show: false,
      urlShow: '',
      deleteModalShow: false,
      deleteId: -1,
      showAuthModal: false,
      showTokenModal: false,
      mockdata:null,
      showTokenDelModal: false,
      tokenMockId: null,
      tokenDeleteMsg: null,
    }
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
    this.urlHit = this.urlHit.bind(this)
    this.openDeleteModal = this.openDeleteModal.bind(this)
    this.closeDeleteModal = this.closeDeleteModal.bind(this)
    this.handleAuthTypeModal = this.handleAuthTypeModal.bind(this)
    this.updateMockAuthType = this.updateMockAuthType.bind(this)
    this.openTokenModal = this.openTokenModal.bind(this)
    this.closeTokenModal = this.closeTokenModal.bind(this)
    this.updateMockToken = this.updateMockToken.bind(this)
    this.openTokenDeleteModal = this.openTokenDeleteModal.bind(this)
    this.closeDeleteTokenModal = this.closeDeleteTokenModal.bind(this)
    this.setDeleteTokenMsg = this.setDeleteTokenMsg.bind(this)
  }

  componentDidMount() {
    const {
      limit,
      sorting: {field, order},
      offset,
      search,
      serviceResponseType,
      projectName,
    } = this.state
    const parsed = queryString.parse(this.props.location.search)
    if (parsed.activePage !== undefined) {
      const sorting = {field: parsed.sortBy, order: parsed.order}
      this.setState(state => ({
        sorting,
        activePage: JSON.parse(parsed.activePage),
        search: parsed.search,
        onChangeSearch: parsed.search,
        serviceResponseType: parsed.serviceResponseType,
        projectName: parsed.projectName,
        offset: parsed.offset,
      }))
    }
    this.props.mockListAction({
      limit: parsed.limit || limit,
      offset: parsed.offset || offset,
      sortBy: parsed.sortBy || field,
      order: parsed.order || order,
      search: parsed.search || search,
      serviceResponseType: parsed.serviceResponseType || serviceResponseType,
      projectName: parsed.projectName || projectName,
    })
    this.props.projectListAction()
  }
 

  componentDidUpdate(prevProps, prevState) {
    const {
      limit,
      offset,
      activePage,
      sorting: {field, order},
      search,
      serviceResponseType,
      projectName,
    } = this.state
    if (
      this.state.sorting !== prevState.sorting ||
      activePage !== prevState.activePage ||
      search !== prevState.search ||
      serviceResponseType !== prevState.serviceResponseType ||
      projectName !== prevState.projectName || this.props.updateMockAuthTypeRes !== prevProps.updateMockAuthTypeRes
    ) {
      this.props.history.replace({
        pathname: '/dashboard',
        search: `?search=${search}&sortBy=${field}&order=${order}&limit=${limit}&offset=${offset}&activePage=${activePage}&serviceResponseType=${serviceResponseType}&projectName=${projectName}`,
      })
      this.props.mockListAction({
        limit,
        offset,
        sortBy: field,
        order,
        search,
        serviceResponseType,
        projectName,
      })
      if (this.props?.updateMockAuthTypeRes?.status === 201) {
        notifySuccess(this.props?.updateMockAuthTypeRes?.message)
      }
    }
    if (this.props?.fetchToken !== prevProps?.fetchToken) {
      this.openTokenModal()
    }
    if (this.props?.updateMockToken!==prevProps.updateMockToken && !this.state.tokenDeleteMsg) {
      const mockData = this.props?.mockListResponse?.data?.mockList
      mockData.forEach((mock)=>{
        if (!this.state.tokenDeleteMsg && mock._id ===this.state.mockdata._id ) {
          mock.authenticationType="MOCK_SPECIFIC"
        }
      })
      this.setState({mockListData: mockData})
      notifySuccess(this.props?.updateMockToken?.message)
    }
    if (this.state?.tokenDeleteMsg?.length>0 && this.state.tokenDeleteMsg !== prevState.tokenDeleteMsg) {
      notifySuccess(this.state.tokenDeleteMsg)
    }
  }

  static getDerivedStateFromProps(props, state) {
    const {mockListResponse, projectListResponse} = props
    if (mockListResponse?.data?.mockList?.length > 0) {
      if (props?.mockStatusResponse) {
        const getUpdatedStatus = (mocks, mock) => {
          const index = mocks.findIndex(obj => obj._id === mock._id)
          const mockClone = [...mocks]
          mockClone[index].mockStatus = mock.mockStatus
          return mockClone
        }
        return {
          ...state,
          mockListData: [
            ...getUpdatedStatus(mockListResponse.data.mockList, props.mockStatusResponse),
          ],
        }
      }
      return {
        ...state,
        mockListData: mockListResponse.data.mockList,
        totalMock: mockListResponse.data.totalMocks,
        allProjectName: projectListResponse?.data?.projectList,
      }
    }
    return {
      ...state,
      mockListData: [],
      totalMock: 0,
      allProjectName: projectListResponse?.data?.projectList,
    }
  }

  handleClickSearch(e) {
    e.preventDefault()
    this.setState(state => ({
      search: state.onChangeSearch,
      offset: 0,
      activePage: 1,
    }))
  }

  handleClickReset() {
    this.setState({
      search: '',
      onChangeSearch: '',
      offset: 0,
      activePage: 1,
    })
  }

  handleClearUser = () => {
    this.props.flushUserData()
  }

  handleAuthTypeModal(open) {
    this.setState({showAuthModal: open})
  }

  setDeleteTokenMsg() {
    this.setState({tokenDeleteMsg: "Token deleted successfully"})
  }

  transformData = Data => {
    const {mockList = {}} = Data
    const {API_BASE_URL} = process.env
    const mockArray = mockList.map(data => {
      return {
        name: data.projectName,
        description: '',
        item: data.allowedMethods.map(method => {
          return {
            name: `${method} -/${data.endpoint}`,
            request: {
              url: `${API_BASE_URL}${data.endpoint}`,
              method,
              header: [...data.headers],
              body: {
                mode: 'raw',
                raw: '',
              },
              description: '',
            },
          }
        }),
      }
    })
    const formattedData = {
      variables: [],
      info: {
        name: 'iRest: Rest API Simulator',
        _postman_id: '50578d9a-80f4-964c-b3f8-dd09c392bead',
        description: 'iRest',
        schema: 'https://schema.getpostman.com/json/collection/v2.0.0/collection.json',
      },
      items: [...mockArray],
      protocolProfileBehavior: {},
    }
    return formattedData
  }

  handleDownloadButton = async (event, done) => {
    const mockList = await mockListService({data:{all:true}})
    const promises = await mockList.data.mockList.map(async infos => {
      const mockDetails = await editMockService({data: infos._id})
      return mockDetails
    })
    const details = await Promise.all(promises)
    details.forEach(mockValue => {
      const index = mockList.data.mockList.findIndex(
        item => item._id === mockValue.data.mock._id
      )
      const detailedMock = {...mockList.data.mockList[index], ...mockValue.data.mock}
      mockList.data.mockList[index] = detailedMock
    })
    const {data = {}} = mockList
    if (data) {
      const transformedData = this.transformData(data)
      const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
        JSON.stringify(transformedData)
      )}`
      const link = document.createElement('a')
      link.href = jsonString
      link.download = 'PostmanCollection.json'
      link.click()
    }
  }

  mockStatusChange(id, currentStatus) {
    if (currentStatus === 'enabled') {
      this.setState({mockStatus: 'disabled'}, () => {
        this.props.mockStatusAction({id, mockStatus: this.state.mockStatus})
      })
    } else {
      this.setState({mockStatus: 'enabled'}, () => {
        this.props.mockStatusAction({id, mockStatus: this.state.mockStatus})
      })
    }
  }

  openModal() {
    this.setState({show: true})
  }

  closeModal(closeRequest) {
    this.setState({show: closeRequest})
  }

  urlHit(method, endpoint) {
    const host = window.location.href.split('dashboard')
    const url = endpoint.split(host[0])

    if (method === 'GET') {
      const methodCall = '#get-/'
      const finalCall = methodCall + url[1]
      this.setState({urlShow: finalCall, show: true})
    } else if (method === 'POST') {
      const methodCall = '#post-/'
      const finalCall = methodCall + url[1]
      this.setState({urlShow: finalCall, show: true})
    } else {
      const methodCall = '#patch-/'
      const finalCall = methodCall + url[1]
      this.setState({urlShow: finalCall, show: true})
    }
  }

  deleteMockPopup(id) {
    const {limit, offset, search, serviceResponseType, projectName, sorting} = this.state

    this.props.deleteMockAction({id})

    this.props.mockListAction({
      limit,
      offset,
      sortBy: sorting.field,
      order: sorting.order,
      search,
      serviceResponseType,
      projectName,
    })

    notifySuccess('Mock deleted successfully!')
  }

  openDeleteModal() {
    this.setState({deleteModalShow: true})
  }

  closeDeleteModal(closeReq, isDelete) {
    this.setState({deleteModalShow: closeReq})
    if (isDelete) {
      this.deleteMockPopup(this.state.deleteId)
    }
  }

  openTokenModal() {
    this.setState({showTokenModal: true, tokenDeleteMsg: null})
  }

  closeTokenModal() {
    this.setState({showTokenModal: false})
  }

  openTokenDeleteModal(id) {
    this.setState({showTokenDelModal: true,showTokenModal: false, showAuthModal: false, tokenMockId: id})
  }

  closeDeleteTokenModal() {
    this.setState({showTokenDelModal: false,showTokenModal: true, showAuthModal: true,})
  }

  updateMockAuthType(payload) {
    this.props.updateAuthTypeAction(payload, true)
  }

  updateMockToken(payload) {
    this.props.updateTokenAction(payload, true)
  }

  render() {
    const {
      serviceResponseType,
      onChangeSearch,
      tableHeader,
      activePage,
      limit,
      totalMock,
      mockListData,
      projectName,
    } = this.state
    
    const searchProject = this.state.allProjectName

    const {isPending, isDeletePending, isUpdateAuthPending} = this.props
    return (
      <div className="mocklist-page" style={{display: this.state.show ? 'none' : 'block'}}>
        <Nav
          pageTitle={mockListPageTitle}
          link={DashboardUrl}
          handleClearUser={this.handleClearUser}
        />
        <ModalPopup isOpen={this.state.deleteModalShow} closeDeleteModal={this.closeDeleteModal} />
        <DeleteTokenModal 
          isOpen={this.state.showTokenDelModal} 
          setDeleteTokenMsg ={this.setDeleteTokenMsg} 
          closeTokenModal ={this.closeTokenModal} 
          closeDeleteTokenModal={this.closeDeleteTokenModal} 
          updateToken={this.updateMockToken} 
          details = {this.state.mockdata}
          closeAuthModal={this.handleAuthTypeModal} 
          isMock
        />
        <UpdateAuthTypeModal 
          isMock
          mockdata = {this.state.mockdata} 
          isOpen={this.state.showAuthModal} 
          closeAuthModal={this.handleAuthTypeModal} 
          updateMockAuthType={this.updateMockAuthType} 
          updateToken={this.updateMockToken} 
          tokenData={this.props.fetchToken?.data?.token}
          openTokenDeleteModal={this.openTokenDeleteModal}
        />
           {isPending || isDeletePending || isUpdateAuthPending ?(
                 <Loader isOverlay />     
                ) : (
                  <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-11 custom_offset_list">
              <div className="card m-t-100 card-shadow">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <div className="form-group w-100">
                      <label htmlFor="filter" className="keyword-label">
                        API Listing
                      </label>
                      <br />
                      <br />
                      <form className="d-flex flex-row" onSubmit={e => this.handleClickSearch(e)}>
                        <input
                          className="form-control p-2 input-field"
                          type="text"
                          onChange={e => this.setState({onChangeSearch: e.target.value})}
                          value={onChangeSearch}
                          placeholder="Search"
                          aria-label="Recipient's username"
                          aria-describedby="basic-addon2"
                        />
                        <button className="btn btn-outline-primary mx-1 button-text" type="submit">
                          Search
                        </button>
                        <button
                          className="btn btn-outline-danger button-text"
                          onClick={() => this.handleClickReset()}
                          type="button"
                        >
                          Reset
                        </button>
                      </form>
                      <br />
                      <div className="d-flex float-end">
                        <div className="form-group">
                          <label htmlFor="filter" className="filter-label">
                            Filter By Project Name
                          </label>
                          <select
                            onChange={e =>
                              this.setState({offset: 0, projectName: e.target.value, activePage: 1})
                            }
                            value={projectName}
                            className="form-control select-width input-field"
                            aria-label="Default select example"
                          >
                            <option value="">Select Project</option>
                            {searchProject &&
                              searchProject.length > 0 &&
                              searchProject.map(item => (
                                <option key={item.projectName} value={item.projectName}>
                                  {item.projectName}
                                </option>
                              ))}
                          </select>
                        </div>
                        <div className="form-group ml-5">
                          <label htmlFor="filter" className="filter-label">
                            Filter By API Type
                          </label>
                          <select
                            onChange={e =>
                              this.setState({
                                offset: 0,
                                serviceResponseType: e.target.value,
                                activePage: 1,
                              })
                            }
                            value={serviceResponseType}
                            className="form-control select-width input-field"
                            aria-label="Default select example"
                          >
                            <option value="">Select API</option>
                            <option value="default">Fetch</option>
                            <option value="save">Save</option>
                          </select>
                        </div>
                        {mockListData && mockListData.length > 0 && <div className="postman-table">
                          <Tooltips content="Export as Postman Collection" direction="left">
                            <button className="tryme" onClick={this.handleDownloadButton}>
                              <img src={downloadIcon} alt="Download Icon" />
                            </button>
                          </Tooltips>
                        </div>}
                      </div>
                    </div>
                  </div>
               

                  <table className="table fs-13 mock-table">
                    <TableSorting
                      tableHeader={tableHeader}
                      onSorting={(field, order) => this.setState({sorting: {field, order}})}
                    />
                    <tbody>
                      {mockListData &&
                        mockListData.length > 0 &&
                        mockListData.map(item => (
                          <tr key={item._id}>
                            <td>
                              <div title={item.mockName} className="no_wrap_list mockname-label">
                                {item.mockName}
                              </div>
                            </td>
                            <td>
                              <div title={item.projectName} className="no_wrap_list project-label">
                                {item.projectName}
                              </div>
                            </td>
                            <td>
                              <div
                                title={item.serviceResponseType}
                                className="no_wrap_list api-wrap-label"
                              >
                                {item.serviceResponseType === 'default'
                                  ? 'fetch'
                                  : item.serviceResponseType}
                              </div>
                            </td>
                            <td style={{width: '200px'}} className="table-label">
                              <CopyBoard
                                textBody={item.endpoint}
                                method={item.allowedMethods.toString()}
                                serviceResponseType={item.serviceResponseType}
                              />
                            </td>
                            <td className="table-label">{item.allowedMethods.toString()}</td>
                            <td className="text-left">
                              <div className="d-flex ">
                                <span className="table-label">
                                  {startCase(item?.authenticationType?.replace("_", " ").toLowerCase())}
                                </span>
                              </div>
                            </td>
                            <td className="text-center table-label">{item.statusCode}</td>
                            <td className="text-center">
                              <div
                                className="custom-control custom-switch"
                                style={this.state.deleteModalShow ? {display: 'none'} : {}}
                              >
                                <Tooltips content="Toggle Status" direction="extreme">
                                  <input
                                    data-testid="mockStatusId"
                                    id={`${item._id}_tooltip`}
                                    type="checkbox"
                                    className="custom-control-input"
                                    onChange={() =>
                                      this.mockStatusChange(item._id, item.mockStatus)
                                    }
                                    value={item.mockStatus === 'enabled' ? 'enabled' : 'disabled'}
                                    checked={item.mockStatus !== 'disabled'}
                                  />

                                  <label
                                    className="custom-control-label table-label"
                                    data-testid="box"
                                    htmlFor={`${item._id}_tooltip`}
                                  />
                                </Tooltips>
                              </div>
                            </td>
                            <td className="text-center">
                              <div className="d-flex ">
                                <Tooltips content="Delete Mock" direction="left">
                                  <button
                                    className="tryme"
                                    onClick={() => {
                                      this.openDeleteModal()
                                      this.setState({deleteId: item._id})
                                    }}
                                  >
                                    <img src={deleteIcon} alt="Delete Icon" />
                                  </button>
                                </Tooltips>
                                <Tooltips content="Edit Mock" direction="left">
                                  <Link to={`${EditMockUrl}/${item._id}`}>
                                    <img src={editIcon} alt="edit_icon" className="edit-icon" />
                                  </Link>
                                </Tooltips>
                                <Tooltips content="Try Mock" direction="left">
                                  <button
                                    className="tryme"
                                    onClick={() =>
                                      this.urlHit(item.allowedMethods[0], item.endpoint)
                                    }
                                  >
                                    <img src={previewEye} alt="Try out" />
                                  </button>
                                </Tooltips>
                                <Tooltips content="API secret" direction="left">
                                  <button
                                    className="tryme"
                                    onClick={() => {
                                      this.handleAuthTypeModal(true)
                                      this.props.fetchTokenAction(item?._id, true)
                                      this.setState({mockdata: item})
                                    }}
                                  >
                                    <img src={keyIcon} alt="API secret" />
                                  </button>
                                </Tooltips>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="record-container">
                    {this.props?.mockListResponse?.data?.mockList?.length === 0 && (
                      <p className="record-label">No record found.</p>
                    )}
                  </div>
                 
                </div>
                
              </div>
              {totalMock > limit && (
                <div className="d-flex flex-row-reverse m-t-10">
                  <Pagination
                    activePage={activePage}
                    itemsCountPerPage={limit}
                    totalItemsCount={totalMock}
                    nextPageText="Next"
                    prevPageText="Prev"
                    itemClass="page-item"
                    linkClass="page-link"
                    onChange={value =>
                      this.setState({activePage: value, offset: (value - 1) * limit})
                    }
                  />
                </div>
              )}
            </div>
          </div>
          <div className="create-btn-wrapper">
            <Tooltips content="Create Mock" direction="left">
              <Link to={createMockUrl}>
                <img src={addIcon} alt="add_icon" />
              </Link>
            </Tooltips>
          </div>
         
        </div>
        </>)}
        <ModalShow
          isOpen={this.state.show}
          urlShowTo={this.state.urlShow}
          closeRequest={this.closeModal}
        />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  projectListResponse: state.projectList.response,
  mockListResponse: state.mockList.response,
  userState: state.login,
  mockStatusResponse: state.mockStatus.response.data.mock,
  isPending: state.mockList.isPending,
  updateMockAuthTypeRes: state.updateAuthType.response,
  fetchToken: state.fetchToken.response,
  updateMockToken: state.updateToken?.response,
  isDeletePending: state.deleteMock.isPending,
  isUpdateAuthPending: state.updateAuthType.isPending
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      projectListAction,
      mockListAction,
      mockStatusAction,
      deleteMockAction,
      flushUserData,
      updateAuthTypeAction,
      fetchTokenAction,
      updateTokenAction,
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(MockList)
