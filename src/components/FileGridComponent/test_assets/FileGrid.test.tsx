
import "@testing-library/jest-dom";
import { render, fireEvent } from '@testing-library/react';
import FileGrid from '../FileGrid';
 
jest.mock('react-hook-form', () => ({
  useFormContext: jest.fn().mockReturnValue({
  register: jest.fn(),
  unregister: jest.fn(),
  setValue: jest.fn(),
  watch: jest.fn().mockReturnValue([]),
  }),
}));

describe('FileGrid component', () => {
  it('renders without crashing', () => {
  render(<FileGrid />);
  });

  it('displays drag-and-drop message when no files are uploaded', async () => {
  const { getByText } = render(<FileGrid />);

  expect(getByText('Drag files to upload')).toBeInTheDocument();
  });

  it('renders the grid container with the correct data-testid', () => {
  const { getByTestId } = render(<FileGrid />);
  const gridContainer = getByTestId('filegrid-container');

  expect(gridContainer).toBeInTheDocument();
  });

  it('allows adding new files', async () => {
  const { getByTestId,getByText } = render(<FileGrid />);

  expect(getByText('Choose Files')).toBeInTheDocument();
  const fileInput = getByTestId('file-input') as HTMLInputElement;

  expect(getByText('Choose Files')).toBeInTheDocument();
  const file1 = new File(['file1'], 'file1.jpg', { type: 'image/jpeg' });

  fireEvent.change(fileInput, {
    target: { files: [file1] },
  });

  expect(fileInput.files?.[0]).toEqual(file1);
  });

});
