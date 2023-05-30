import React from 'react'
import Tooltip from '../common/Tooltip'
import editIcon from '../../assets/images/iRest_files/edit_icon.png'
import keyIcon from '../../assets/images/iRest_files/key.svg'


function ProjectTable(props) {
  const handleEdit = item => {
    props.openEditModal()
    props.setEditId(item?._id)
    props.setProjectName(item?.projectName)
  }
  const handleDelete = item => {
    props.openDeleteModal()
    props.setDeleteId(item?._id)
  }

  const handleProjTokenUpdate = (projId) => {
    props.openTokenModal(true)
    props.fetchToken(projId, false)
  }

  return (
    <table className="table fs-13 mock-table">
      <thead className="table-theme">
        <tr>
          <th className="table-label">PROJECT NAME</th>
          <th className="table-label">MOCK COUNT</th>
          <th className="table-label">CREATED BY</th>
          <th className="table-label">UPDATED AT</th>
          <th className="table-label">AUTHENTICATION</th>
          <th className="table-label">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {props?.projectList?.length > 0 &&
          props?.projectList?.map(item => (
            <tr key={item.id}>
              <td className="project-column">
                <div title={item?.projectName} className="mockname-project-label">
                  {item?.projectName}
                </div>
              </td>
              <td className="created-count-column">
                <div title={item?.count} className="project-label">
                  {item?.count}
                </div>
              </td>
              <td className="created-count-column">
                <div title={item?.count} className="project-label">
                  {item?.User?.name}
                </div>
              </td>
              <td className="created-update-column">
                <div title={item?.updatedAt} className="date-label">
                  {new Date(item?.createdAt).toLocaleDateString()}{' '}
                  {new Date(item?.createdAt).toLocaleTimeString()}
                </div>
              </td>
              <td>
                <div
                  className="custom-control custom-switch"
                >
                  <Tooltip content="Toggle Authentication" direction="extreme">
                    <input
                      id={`${item._id}_tooltip`}
                      type="checkbox"
                      checked={item?.authenticationType}
                      className="custom-control-input"
                      onChange={(e) => {
                        props.handleAuth(item._id, e.target.checked)
                      }}
                    />
                    <label
                      className="custom-control-label table-label"
                      data-testid="box"
                      htmlFor={`${item._id}_tooltip`}
                    />
                  </Tooltip>
                </div>
              </td>
              <td className="text-center">
                <div className="d-flex ">
                  <Tooltip content="Edit Project" direction="left">
                    <button
                      className="tryme"
                      aria-label="edit-button"
                      onClick={() => handleEdit(item)}
                    >
                      <img src={editIcon} alt="Delete Icon" />
                    </button>
                  </Tooltip>
                  <Tooltip content="Delete Project" direction="left">
                    <button
                      className="tryme"
                      aria-label="delete-button"
                      disabled={item?.count !== 0}
                      onClick={() => handleDelete(item)}
                    >
                      {props.displayDeleteIcon(item?.count !== 0)}
                    </button>
                  </Tooltip>
                  <Tooltip content="API secret" direction="left">
                    <button
                      className="tryme"
                      onClick={()=>{
                        handleProjTokenUpdate(item._id)
                        props.setProjData(item)
                      }}
                    >
                      <img src={keyIcon} alt="Api secret" />
                    </button>
                  </Tooltip>
                </div>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  )
}

export default ProjectTable
