import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { getOrders, postOrder } from "../../apiCalls";
jest.mock("../../apiCalls")
import App from "./App";

describe("APP TESTS", () => {

    it("should orders title and form", async () => {
        getOrders.mockResolvedValueOnce({orders: [{id: 1, name: "Estelle", ingredients: ["cheese"]}]})

        render(
            <App />
        )

        const appName = screen.getText("Burrito Builder");
        expect(appName).toBeInTheDocument();

        const nameInput = screen.getByPlaceholderText("Name");
        expect(nameInput).toBeInTheDocument();

        const order = await waitFor(() => screen.getByText("Estelle"))
        expect(order).toBeInTheDocument();

      

    })

    it("should be able to change an input field", () => {

        render(
            <MemoryRouter>
                <OrderForm />
            </MemoryRouter>
        )

        const nameInput = screen.getByPlaceholderText("Name");
        const submitButton = screen.getByText("Submit Order")
        fireEvent.change(nameInput, { target: { value: "Estelle" } })
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



