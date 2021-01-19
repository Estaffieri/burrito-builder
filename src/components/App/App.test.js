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

        const appName = screen.getByText("Burrito Builder");
        expect(appName).toBeInTheDocument();

        const nameInput = screen.getByPlaceholderText("Name");
        expect(nameInput).toBeInTheDocument();

        const order = await waitFor(() => screen.getByText("Estelle"))
        expect(order).toBeInTheDocument();


    })

    it("should display an order after submission", async () => {
        getOrders.mockResolvedValueOnce({ orders: [{ id: 1, name: "Estelle", ingredients: ["cheese"] }] })
        postOrder.mockResolvedValueOnce({ orders: [{ id: 2, name: "James", ingredients: ["carnitas", "steak"] }] })

        render(
            <App />
        )


        const order = await waitFor(() => screen.getByText("Estelle"))
        expect(order).toBeInTheDocument();

        const nameInput = screen.getByPlaceholderText("Name");
        const carnitasButton = screen.getByText("carnitas");
        expect(carnitasButton).toBeInTheDocument();
        const steakButton = screen.getByText("steak");
        expect(steakButton).toBeInTheDocument();

        fireEvent.change(nameInput, {target: {value: "James"}})
        fireEvent.click(carnitasButton);
        fireEvent.click(steakButton);

        const submitButton = screen.getByText("Submit Order")
        expect(submitButton).toBeInTheDocument()
        fireEvent.click(submitButton)

        const newOrder = await waitFor(() => screen.getByText("James"))
        expect(newOrder).toBeInTheDocument()

        



    })

})



