import {
  schemaViewDataTransform,
  schemaDataTransform,
} from '../../../../src/static/components/common/utils'

describe('testing utils file', () => {
  test('testing schemaViewDataTransform method', () => {
    const data = [{field: '$custom.string'}]
    const result = [{name: 'field', type: 'string', fakerValue: ''}]
    expect(schemaViewDataTransform(data)).toEqual(result)
  })

  test('testing schemaViewDataTransform method with new payload', () => {
    const data = [{field: '$custom.string'}, {india: '$address.country'}]
    const result = [
      {name: 'field', type: 'string', fakerValue: ''},
      {name: 'india', type: 'Faker.js', fakerValue: '$address.country'},
    ]
    expect(schemaViewDataTransform(data)).toEqual(result)
  })

  test('testing schemaDataTransform method', () => {
    const data = [{fakerValue: '$address.buildingNumber', name: 'field', type: 'string'}]
    const result = {field: '$custom.string'}
    expect(schemaDataTransform(data)).toEqual(result)
  })

  test('testing schemaDataTransform method with new payload', () => {
    const data = [
      {name: 'field', type: 'string', fakerValue: '$address.buildingNumber'},
      {name: 'india', type: 'Faker.js', fakerValue: '$address.country'},
    ]
    const result = {field: '$custom.string', india: '$address.country'}
    expect(schemaDataTransform(data)).toEqual(result)
  })
})
