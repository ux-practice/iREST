import React from 'react'
import {Field, FieldArray, getIn} from 'formik'
import fakerObj from '../../../server/constants/fakerModel'
import {fieldTypes} from '../../constants/createMockConstants'
import './style.css'

export default function SchemaView({values, errors, touched, Dropdown, GroupedDropdown}) {
  return (
    <div className="form-group">
      <FieldArray name="schemaResponse">
        {fieldArrayPorps => {
          const {schemaResponse} = values
          const {form} = fieldArrayPorps
          const error = getIn(form.errors, 'schemaResponse')
          const touch = getIn(form.touched, 'schemaResponse')
          return (
            schemaResponse.length >= 1 && (
              <>
                {schemaResponse.map((row, index) => (
                  <div className="row" key={index}>
                    <div className="form-group col-md-3">
                      <Field
                        className="form-control options-bold-text"
                        name={`schemaResponse[${index}].name`}
                      />
                      {error &&
                        touch &&
                        errors.schemaResponse[index] &&
                        touched.schemaResponse[index] && (
                          <div className="input-feedback text-danger">
                            {errors.schemaResponse[index].name}
                          </div>
                        )}
                    </div>
                    <div className="form-group col-md-2">
                      <Field
                        component={Dropdown}
                        name={`schemaResponse[${index}].type`}
                        id="isSchema"
                        options={fieldTypes}
                      />
                    </div>
                    <div
                      className="form-group col-md-2"
                      style={{
                        display: `${schemaResponse[index].type === 'Faker.js' ? 'block' : 'none'}`,
                      }}
                    >
                      {schemaResponse[index].type === 'Faker.js' && (
                        <Field
                          component={GroupedDropdown}
                          name={`schemaResponse[${index}].fakerValue`}
                          id={`schemaResponse[${index}].fakerValue`}
                          options={fakerObj}
                          style={{
                            display: `${
                              schemaResponse[index].type === 'Faker.js' ? 'block' : 'none'
                            }`,
                          }}
                        />
                      )}
                    </div>
                    <div className="form-group col-md-2">
                      {schemaResponse.length > 1 && (
                        <button
                          className="Button IconButton Secondary button-icon"
                          type="button"
                          onClick={() => fieldArrayPorps.remove(index)}
                        >
                          <span style={{pointerEvents: 'none'}}>
                            <div className="Icon">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </svg>
                            </div>
                          </span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
                <button
                  className="Button IconButton Secondary button-icon"
                  type="button"
                  onClick={() => fieldArrayPorps.push({name: '', type: 'string', fakerValue: ''})}
                >
                  <span style={{pointerEvents: 'none'}}>
                    <div className="Icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                      </svg>
                    </div>
                  </span>
                </button>
              </>
            )
          )
        }}
      </FieldArray>
    </div>
  )
}
