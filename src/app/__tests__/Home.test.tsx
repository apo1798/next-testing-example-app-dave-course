import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '../page';

describe('Home', () => {
  it('should add a new todo', async () => {
    render(<Home />); // ARRANGE

    // ACT
    const input = screen.getByPlaceholderText('New Todo');
    await userEvent.type(input, 'My new todo');
    expect(input).toHaveValue('My new todo'); // ASSERT

    // ACT
    const button = screen.getByRole('button', {
      name: 'Submit',
    });
    await userEvent.click(button);
    await waitFor(() => {
      expect(input).toHaveValue(''); // ASSERT
    });

    const data = await screen.findByText('My new todo');
    expect(data).toHaveTextContent('My new todo');
  });

  it('should update a todo', async () => {
    render(<Home />); // ARRANGE

    // ACT
    const checkbox = (
      await screen.findAllByRole('checkbox')
    )[0] as HTMLInputElement;
    expect(checkbox).not.toBeChecked();
    await userEvent.click(checkbox);
    await waitFor(() => {
      expect(checkbox).toBeChecked(); // ASSERT
    });
  });

  it('should delete a todo', async () => {
    render(<Home />); // ARRANGE

    const todoText = await screen.findByText('Write Code 💻');

    // ACT
    const button = (await screen.findAllByTestId('delete-button'))[0];
    await userEvent.click(button);

    await waitFor(() => {
      expect(todoText).not.toBeInTheDocument(); // ASSERT
    });
  });
});
