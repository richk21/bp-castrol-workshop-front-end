import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import { SvgIcon } from "./SvgIcon";

describe("Testing SvgIcon Rendering", () => {
  //checks if icon is rendering
  it("test dynamic import",  async() => {
      const {baseElement, queryByLabelText} = render(<SvgIcon iconName="delete" />)

      //provide timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      //check if the svg is present
      expect(baseElement).toBeInTheDocument()

      //check by name
      expect(queryByLabelText("delete")).toBeInTheDocument();
  });

  //checks if loading icon renders while icon loads
  it("test dynamic import",  async() => {
    const {baseElement, queryByLabelText} = render(<SvgIcon iconName="delete" />)

    //check for loading icon
    expect(queryByLabelText("loading")).toBeInTheDocument();

    //provide timeout
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    //check if the svg appears
    expect(baseElement).toBeInTheDocument()

    //check by name
    expect(queryByLabelText("delete")).toBeInTheDocument();
  });

  //check the size of svg icons
  it("test dynamic import",  async() => {
    const {baseElement, queryByLabelText} = render(
      <>
        <SvgIcon iconName="delete" wrapperStyle="sm"/>
        <SvgIcon iconName="eye" wrapperStyle="md"/>
        <SvgIcon iconName="cross" wrapperStyle="lg"/>
      </>
    )

    //provide timeout for svg icon to load
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    //check if the svg appears
    expect(baseElement).toBeInTheDocument()

    //check by name
    expect(queryByLabelText("delete")).toHaveClass("sm");
    expect(queryByLabelText("eye")).toHaveClass("md");
    expect(queryByLabelText("cross")).toHaveClass("lg");
  });
});
