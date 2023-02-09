import React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import AnimalForm from "../AnimalForm"


test('renders without errors', () => {
    render(<AnimalForm />)
})

test('when user fills all fields and submits, species appears in list', async () => {
    // Arrange
    
    render(<AnimalForm />);
    const species = 'feline';
    
    // Act
    
    const speciesInput = screen.getByLabelText(/species:/i)
    userEvent.type(speciesInput, species)

    const ageInput = screen.getByLabelText(/age:/i)
    userEvent.type(ageInput, '9');

    const notesInput = screen.getByLabelText(/notes:/i);
    userEvent.type(notesInput, 'whatever i want')

    const submitButton = screen.getByRole('button');
    userEvent.click(submitButton);

    //Assert
    await waitFor(() => {
        const speciesFeedback = screen.queryByText(species);
        expect(speciesFeedback).toBeInTheDocument();
    })
})