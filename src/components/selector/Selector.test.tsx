import { render, screen, fireEvent, within } from "@testing-library/react";
import { Options } from "core/entities/Options";
import react from "react";
import Selector from "./Selector";
describe("Selector", () => {
  const options: Options = [
    { label: "Curiosity", value: "curiosity" },
    { label: "Spirit", value: "spirit" },
  ];
  const handleChange = jest.fn();
  test("should exist and show first item of options", () => {
    render(<Selector options={options} handleChange={handleChange} />);
    const item = screen.getByText("Curiosity");
    expect(item).toBeInTheDocument();
  });
  test("should call handleChange function and change value when selected", () => {
    render(<Selector options={options} handleChange={handleChange} />);
    const selector = screen.getByTestId("selector");
    fireEvent.change(selector, { target: { value: "spirit" } });
    expect(handleChange).toBeCalled();
    expect(screen.getByText("Spirit")).toBeInTheDocument();
  });
});
