export const schemaViewDataTransform = (val) => {
    return val.map(x => Object.entries(x))
    .map((c) => ({
      name: c[0][0],
      type: `${c[0][1].includes('custom') ? `${c[0][1].split(/[$.]/)[2]}`: 'Faker.js'}`,
      fakerValue:`${c[0][1].includes('custom') ? '': c[0][1]}`
    }))
}

export const schemaDataTransform = (schemaData) => {
    const formattedSchemaData = {}
    schemaData.forEach(element => {
      formattedSchemaData[element.name] = element.type === "Faker.js" ? element.fakerValue : `$custom.${element.type}`
    })
    return formattedSchemaData
  }
