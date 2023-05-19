export const mockEmptyProps = {
  openEditModal: jest.fn(),
  setEditId: jest.fn(),
  setProjectName: jest.fn(),
  openDeleteModal: jest.fn(),
  setDeleteId: jest.fn(),
  projectList: [],
  displayDeleteIcon: jest.fn(),
}

export const mockProps = {
  openEditModal: jest.fn(),
  setEditId: jest.fn(),
  setProjectName: jest.fn(),
  openDeleteModal: jest.fn(),
  setDeleteId: jest.fn(),
  projectList: [
    {
      _id: 0,
      id: 0,
      projectName: 'projectName1',
      count: 0,
      User: {name: 'name1'},
      createdOn: '2023-01-01T11:26:04.206Z',
      createdAt: '2023-01-01T11:26:04.206Z',
      updatedAt: '2023-01-01T11:26:04.206Z',
    },
    {
      _id: 1,
      id: 1,
      projectName: 'projectName2',
      count: 1,
      User: {name: 'name2'},
      createdOn: '2023-01-01T11:26:04.206Z',
      createdAt: '2023-01-01T11:26:04.206Z',
      updatedAt: '2023-01-01T11:26:04.206Z',
    },
  ],
  displayDeleteIcon: jest.fn(),
}
