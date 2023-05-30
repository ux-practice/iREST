import {
  fileUploadAction,
  receiveDataAction,
  receiveError,
  flushUploadedData
} from '../../../../src/static/actions/fileUpload/fileUploadAction'

test('testing actions function', () => {
  expect(fileUploadAction()).toBeInstanceOf(Object)
  expect(receiveDataAction()).toBeInstanceOf(Object)
  expect(receiveError()).toBeInstanceOf(Object)
  expect(flushUploadedData()).toBeInstanceOf(Object)
})
