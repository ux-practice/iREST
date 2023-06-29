import {
  saveReferenceId,
  saveReferenceIdError,
} from '../../../../src/static/actions/saveReference/saveReferenceAction'

test('testing actions function', () => {
  expect(saveReferenceId()).toBeInstanceOf(Object)
  expect(saveReferenceIdError()).toBeInstanceOf(Object)
})
