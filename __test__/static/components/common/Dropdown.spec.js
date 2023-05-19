import React from 'react'
import { render, screen} from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import { Dropdown, GroupedDropdown } from "../../../../src/static/components/common/Dropdown";

describe("Dropdown Component", () => {
    const options = [
      { key: "string", value: "String" },
      { key: "number", value: "Number" },
      { key: "boolean", value: "Boolean" },
    ];
  
    it("renders the dropdown with given options", () => {
      render(
        <Dropdown field={{ name: "test" }} options={options} />
      );
      const selectElement = screen.getByTestId("dropdown");
      expect(selectElement).toBeInTheDocument();
      expect(selectElement).toHaveAttribute("name", "test");
      expect(selectElement).toHaveClass("form-control options-bold-text");
      options.forEach((option) => {
        expect(selectElement).toContainElement(
          screen.getByText(option.value)
        );
      });
    });
  });
  
  describe("GroupedDropdown Component", () => {
    const options = {
      address: [
        { key: "buildingNumber", value: "buildingNumber", displayValue: "$address.buildingNumber" },
        { key: 'cardinalDirection', value: 'cardinalDirection', displayValue: '$address.cardinalDirection' },
      ],
      animal: [
        { key: 'bear', value: 'bear', displayValue: '$animal.bear' },
        { key: 'bird', value: 'bird', displayValue: '$animal.bird' },
      ],
    };
  
    it("renders the grouped dropdown with given options", () => {
      render(
        <GroupedDropdown field={{ name: "test" }} options={options} />
      );
      const selectElement = screen.getByTestId("grouped-dropdown");
      expect(selectElement).toBeInTheDocument();
      expect(selectElement).toHaveAttribute("name", "test");
      expect(selectElement).toHaveClass("form-control options-bold-text");
      Object.keys(options).forEach(groupLabel => {
        options[groupLabel].forEach(option => {
          const optionElement = screen.getByText(option.key);
          expect(optionElement).toBeInTheDocument();
          expect(optionElement).toHaveValue(option.displayValue);
        });
      });
    });
    
      
  });
  