import React from 'react';
import { render } from '@testing-library/react';
import SchemaView from '../../../../src/static/components/createMock/SchemaView';
import '@testing-library/jest-dom/extend-expect'

describe('SchemaView', () => {
  test('renders correctly', () => {
    const values = { schemaResponse: [] };
    const errors = {};
    const touched = {};
    const Dropdown = () => <select />;
    const GroupedDropdown = () => <select />;
    const { container } = render(
      <SchemaView values={values} errors={errors} touched={touched} Dropdown={Dropdown} GroupedDropdown={GroupedDropdown} />
    );
    expect(container).toBeInTheDocument();
  });
});
