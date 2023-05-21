import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {notifySuccess, notifyError} from '../common/Toast'
import Nav from '../common/nav'
import Loader from '../common/Loader'
import {flushUserData} from '../../actions/login/authenticationActions'
import {DashboardUrl} from '../../constants/url'
import DeleteModal from '../modal/ModalPopup'
import EditModal from '../modal/EditModal'
import DeleteTokenModal from '../modal/deleteTokenModal/deleteTokenModal'
import UpdateAuthTypeModal from '../modal/updateAuthTypeModal/updateAuthTypeModal'
import deleteIcon from '../../assets/images/iRest_files/blue_delete_trash.svg'
import disableDeleteIcon from '../../assets/images/iRest_files/grey_delete_trash.svg'
import {
  projectListAction,
  projectListDeleteAction,
} from '../../actions/projectList/projectListAction'
import {fetchTokenAction} from '../../actions/fetchToken/fetchToken'
import {updateTokenAction} from '../../actions/updateToken/updateToken'
import projectDeleteService from '../../service/projectDelete/projectDeleteService'
import projectEditService from '../../service/projectEdit/projectEditService'
import ProjectTable from './projectTable'
import {updateAuthTypeAction} from '../../actions/updateAuthType/updateAuthType'
import './projectList.css'

function ProjectListPage(props) {
  const [searchText, setSearchText] = useState('')
  const [editModalShow, setEditModalShow] = useState(false)
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [deleteId, setDeleteId] = useState(-1)
  const [editId, setEditId] = useState(-1)
  const [projectName, setProjectName] = useState('')
  const [projectList, setProjectList] = useState([])
  const [projId, setProjId] = useState(false)
  const [authValue, setAuthVal] = useState(null)
  const [showTokenModal, openTokenModal] = useState(false)
  const [projData, setProjData] = useState({})
  const [showTokenDelModal, setTokenDelModal] = useState(false)
  const [tokenDelMsg, setTokenDelMsg] = useState(null)

  useEffect(() => {
    props.projectListAction()
  }, [])

  useEffect(() => {
      setProjectList(props?.projectListResponse?.data?.projectList)  
  }, [props?.projectListResponse?.data?.projectList])

  useEffect(()=>{
    if (props?.projectAuth?.status===200) {
      const list = [...projectList]
      list.forEach((project)=>{
        if (project._id===projId) {
          project.authenticationType=authValue
        }
      })
      setProjectList(list)
      notifySuccess(props?.projectAuth?.message)
    }
  },[props?.projectAuth])

  useEffect(()=>{
    if (props?.updateProjectToken) {
      notifySuccess(tokenDelMsg?.length>0 ? tokenDelMsg : props?.updateProjectToken?.message)
    }
  },[props?.updateProjectToken])

  const handleAuth =(id,value)=>{
    setProjId(id)
    setAuthVal(value)
    props.updateAuthTypeAction({id, authenticationType: value}, false)
  }

  const handleTokenModal =(open)=>{
    openTokenModal(open)
  }

  const handleClickSearch = e => {
    e.preventDefault()
    const projects = props?.projectListResponse?.data?.projectList.filter(event =>
      event.projectName.toLowerCase().includes(searchText)
    )
    setProjectList(projects)
  }

  const handleClickReset = e => {
    e.preventDefault()
    setProjectList(props?.projectListResponse?.data?.projectList)
    setSearchText('')
  }

  const openEditModal = () => {
    setEditModalShow(true)
  }

  const openDeleteModal = () => {
    setDeleteModalShow(true)
  }

  const closeEditModal = async (closeReq, isEdit) => {
    setEditModalShow(closeReq)
    if (isEdit) {
      const request = {
        payload: {
          projectName,
        },
        id: editId,
      }
      const response = await projectEditService(request)
      props.projectListAction()
      if (response.status === 417) {
        notifyError('Project already exist.')
      } 
      if (response.status === 201) {
        notifySuccess('Project updated successfully!')
      }
    }
  }

  const closeDeleteModal = async (closeReq, isDelete) => {
    setDeleteModalShow(closeReq)
    if (isDelete) {
      const response = await projectDeleteService({id: deleteId})
      if (response.status === 412) {
        notifyError('Project cannot be deleted due to associated mock!')
      } else {
        props.projectListAction()
        notifySuccess('Project deleted successfully!')
      }
    }
  }

  const handleClearUser = () => {
    props.flushUserData()
  }

  const displayDeleteIcon = isDisable => {
    if (isDisable) {
      return <img src={disableDeleteIcon} alt="Delete Icon" />
    }
    return <img src={deleteIcon} alt="Delete Icon" />
  }

  const updateProjectToken =(payload)=>{
    props.updateTokenAction(payload, false)
  }

  const openTokenDeleteModal =(id)=> {
    setTokenDelModal(true)
    openTokenModal(false)
  }

  const closeDeleteTokenModal =()=>{
    setTokenDelModal(false)
    openTokenModal(true)
  }

  const setDeleteTokenMsg=()=> {
    setTokenDelMsg("Token deleted successfully")
  }

  return (
    <div>
      <Nav pageTitle="iRest" link={DashboardUrl} handleClearUser={handleClearUser} />
      <EditModal
        isOpen={editModalShow}
        closeDeleteModal={closeEditModal}
        projectName={projectName}
        setProjectNameProp={setProjectName}
      />
      <UpdateAuthTypeModal 
          isOpen={showTokenModal} 
          closeAuthModal={handleTokenModal} 
          updateToken={updateProjectToken} 
          tokenData={props.fetchToken?.data?.token}
          projData={projData}
          isMock= {false}
          openTokenDeleteModal={openTokenDeleteModal}
        />
      <DeleteTokenModal 
          isOpen={showTokenDelModal} 
          setDeleteTokenMsg ={setDeleteTokenMsg} 
          closeTokenModal ={handleTokenModal} 
          closeDeleteTokenModal={closeDeleteTokenModal} 
          updateToken={updateProjectToken} 
          details = {projData}
        />  
      <DeleteModal isOpen={deleteModalShow} closeDeleteModal={closeDeleteModal} />
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-11 custom_offset_list">
            <div className="card m-t-100 card-shadow-body">
              <div className="card-body">
                <div className="d-flex justify-content-between">
                  <div className="form-group w-100">
                    <label htmlFor="filter" className="keyword-label">
                      Project Listing
                    </label>
                    <br />
                    <br />
                    <form className="d-flex flex-row" onSubmit={e => handleClickSearch(e)}>
                      <input
                        className="form-control p-2 input-field"
                        type="text"
                        onChange={e => setSearchText(e.target.value)}
                        value={searchText}
                        placeholder="Search"
                        aria-label="Recipient's username"
                        aria-describedby="basic-addon2"
                      />
                      <button
                        className="btn btn-outline-primary mx-1 button-text"
                        type="submit"
                        onClick={handleClickSearch}
                      >
                        Search
                      </button>
                      <button
                        className="btn btn-outline-danger button-text"
                        onClick={handleClickReset}
                        type="button"
                      >
                        Reset
                      </button>
                    </form>
                    <br />
                  </div>
                </div>
                {props.isPending || props.isUpdateTokenPending ? (
                 <Loader isOverlay />   
                ) : (
               <>
                <ProjectTable
                  projectList={projectList}
                  openEditModal={openEditModal}
                  setEditId={setEditId}
                  setProjectName={setProjectName}
                  openDeleteModal={openDeleteModal}
                  setDeleteId={setDeleteId}
                  displayDeleteIcon={displayDeleteIcon}
                  openTokenModal ={handleTokenModal}
                  fetchToken={props.fetchTokenAction}
                  setProjData={setProjData}
                  handleAuth={handleAuth}
                />
                <div className="record-container">
                  {projectList?.length === 0 && <p className="record-label">No projects found.</p>}
                </div>
                </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  projectListResponse: state.projectList.response,
  isPending: state.projectList.isPending,
  fetchToken: state.fetchToken.response,
  updateProjectToken: state.updateToken?.response,
  projectAuth: state.updateAuthType.response,
  isUpdateTokenPending: state.updateToken.isPending
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      projectListDeleteAction,
      projectListAction,
      flushUserData,
      fetchTokenAction,
      updateTokenAction,
      updateAuthTypeAction
    },
    dispatch
  )

export default connect(mapStateToProps, mapDispatchToProps)(ProjectListPage)
