import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import OrderForm from "./OrderForm";

describe("ORDERFORM TESTS", () => {

        it("should render an orderForm", () => {
            const mockSubmitOrder = jest.fn()

            render (
            <MemoryRouter>
                    <OrderForm/>
            </MemoryRouter>
            )

            const nameInput = screen.getByPlaceholderText("Name");
            const beansButton = screen.getByText("beans");
            const steakButton = screen.getByText("steak");
            expect(nameInput).toBeInTheDocument();
            expect(beansButton).toBeInTheDocument();
            expect(steakButton).toBeInTheDocument()

        })

        it("should be able to change an input field", () => {
          
            render(
                <MemoryRouter>
                    <OrderForm />
                </MemoryRouter>
            )

            const nameInput = screen.getByPlaceholderText("Name");
            const submitButton = screen.getByText("Submit Order")
            fireEvent.change(nameInput,{target: {value: "Estelle"}})
            expect(nameInput.value).toBe("Estelle");
            expect(submitButton).toBeInTheDocument()


        })


    it("should be able to clear the input on submit", () => {

        render(
            <MemoryRouter>
                <OrderForm />
            </MemoryRouter>
        )
        const mockedFunction = jest.fn();

        const nameInput = screen.getByPlaceholderText("Name");
        fireEvent.change(nameInput, { target: { value: "Estelle" } })
        expect(nameInput.value).toBe("Estelle");
        const submitButton = screen.getByText("Submit Order")
        expect(submitButton).toBeInTheDocument()
        fireEvent.click(submitButton);
        expect(nameInput.value).toBe("")

    })
    
})

