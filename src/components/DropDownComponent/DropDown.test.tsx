import { fireEvent, render, waitFor} from '@testing-library/react';
import  {DropDown}  from './DropDown';
import "@testing-library/jest-dom";

describe('DropDown Component', () => {
const optionList = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    ];
    
    const compulsoryList = [
    { value: "compulsory1", label: "Compulsory 1", isFixed: true },
    { value: "compulsory2", label: "Compulsory 2", isFixed: true },
    ];

const registerMock = jest.fn();
const validationSchemaMock = jest.fn();
const errorsMock = {};

//checks normal render
it('renders dropdown component', () => {
const {getByRole} = render(
        <DropDown
        name="test"
        optionList={optionList}
        compulsoryList={compulsoryList}
        size='small'
        existingDataList={optionList || []}
        register={registerMock}
        validationSchema={validationSchemaMock}
        errors={errorsMock}
        onchange={() => {}}
        placeholder='abc'
        />
    );

    //check if the combobox got rendered
    const dropdown = getByRole('combobox');
    expect(dropdown).toBeTruthy();
})

//check if all compulsory options are already present in the combobox
it('Selecting an option', async () => {
    const mockOnChange = jest.fn();

    const {queryByText} = render(
        <DropDown
            name="test"
            optionList={optionList}
            compulsoryList={compulsoryList}
            register={registerMock}
            validationSchema={validationSchemaMock}
            errors={errorsMock}
            onchange={mockOnChange}
        />
    );

    //check if compulsory values are already present in the combobox
    compulsoryList.forEach((compulsoryOption) => {
        const optionElement = queryByText(compulsoryOption.label);
        expect(optionElement).toBeInTheDocument();
    });
});

//check if all non-compulsory options are not already present in the combobox
it('Selecting an option', async () => {
    const mockOnChange = jest.fn();

    const {queryByText} = render(
        <DropDown
            name="test"
            optionList={optionList}
            compulsoryList={compulsoryList}
            register={registerMock}
            validationSchema={validationSchemaMock}
            errors={errorsMock}
            onchange={mockOnChange}
        />
    );

    //check if compulsory values are not already present in the combobox
    optionList.forEach((nonCompulsoryOption) => {
        const optionElement = queryByText(nonCompulsoryOption.label);
        expect(optionElement).not.toBeInTheDocument();
    });
});

//checks if predefined option could be selected
it('Selecting an option', async () => {
    const mockOnChange = jest.fn();

    const {getByRole, getByText} = render(
        <DropDown
            name="test"
            optionList={optionList}
            compulsoryList={compulsoryList}
            register={registerMock}
            validationSchema={validationSchemaMock}
            errors={errorsMock}
            onchange={mockOnChange}
        />
    );

    // Open the dropdown menu
    const dropdown = getByRole("combobox");

    //click on the dropdown
    fireEvent.focus(dropdown);
    fireEvent.keyDown(dropdown, {key:"ArrowDown", code:"ArrowDown"})

    //get the option
    const optiontoselect = getByText("Option 1");
    fireEvent.click(optiontoselect)

    //check if onchange took place
    expect(mockOnChange).toHaveBeenCalledWith('compulsory1, compulsory2, option1');
    //it already contains compulsory1,2 because theyre compulsory lists items
});

//checks if user-created option get added
it('Creating an option', async () => {
    const mockOnChange = jest.fn();
    const {getByRole, getByText} = render(
        <DropDown
            name="test"
            optionList={optionList}
            compulsoryList={compulsoryList}
            register={registerMock}
            validationSchema={validationSchemaMock}
            errors={errorsMock}
            onchange={mockOnChange}
        />
    );

    // Open the dropdown menu
    const dropdown = getByRole("combobox");

    //insert the new option in the inputfield of combobox
    fireEvent.focus(dropdown);
    fireEvent.keyDown(dropdown, {key:"ArrowDown", code:"ArrowDown"}) //focus on the combobox
    fireEvent.change(dropdown,{target:{value:"option100"}})//enter value
    fireEvent.click(getByText("Add new option \"option100\"")) //create new option
    await waitFor(()=>getByText("option100")) //wait for value to appear

    //check if onchange took place with option100
    expect(mockOnChange).toHaveBeenCalledWith('compulsory1, compulsory2, option100');
    //it already contains compulsory1,2 because they are compulsory lists items
});

//check if compulsory option can be removed
it('Removing a compulsory option', async () => {
    const mockOnChange = jest.fn();
    const {getByLabelText} = render(
        <DropDown
            name="test"
            optionList={optionList}
            compulsoryList={compulsoryList}
            register={registerMock}
            validationSchema={validationSchemaMock}
            errors={errorsMock}
            onchange={mockOnChange}
        />
    );

    //click on remove button of compulsory option
    fireEvent.click(getByLabelText("Remove Compulsory 1"))

    //check if onchange did not take execute
    expect(mockOnChange).not.toHaveBeenCalled();
});

//check if non-compulsory options can get removed
it('Removing a non-compulsory option', async () => {
    const mockOnChange = jest.fn();
    const {getByRole, getByLabelText, getByText} = render(
        <DropDown
            name="test"
            optionList={optionList}
            compulsoryList={compulsoryList}
            register={registerMock}
            validationSchema={validationSchemaMock}
            errors={errorsMock}
            onchange={mockOnChange}
        />
    );

    const dropdown = getByRole("combobox");
    
    //click on the dropdown
    fireEvent.focus(dropdown);
    fireEvent.keyDown(dropdown, {key:"ArrowDown", code:"ArrowDown"})

    //click on the non-compulsory option
    const optiontoselect = getByText("Option 1");
    fireEvent.click(optiontoselect)
    
    //check if option got appended
    expect(mockOnChange).toHaveBeenCalledWith('compulsory1, compulsory2, option1');

    //click on remove button of non-compulsory option
    fireEvent.click(getByLabelText("Remove Option 1"))

    //check if onchange took place without option1
    expect(mockOnChange).toHaveBeenCalledWith('compulsory1, compulsory2');
});

});
