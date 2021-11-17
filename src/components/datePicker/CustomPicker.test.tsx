import { render, fireEvent } from "@testing-library/react";
import CustomPicker from "./CustomPicker";

describe("Date Picker", () => {
  const handleChange = jest.fn();
  let value = new Date();
  const label = "Earth Date";

  test("should show current date and should call change when date is changed", () => {
    const { container } = render(
      <CustomPicker value={value} handleChange={handleChange} label={label} />
    );
    const datePickerValue = container.querySelector(".MuiOutlinedInput-input");
    expect(datePickerValue).toHaveValue(value.toLocaleDateString("en-CA"));
    fireEvent.click(datePickerValue!);
  });
});
