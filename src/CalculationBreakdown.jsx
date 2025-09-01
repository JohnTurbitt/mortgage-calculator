import React, { useState } from "react";
import Modal from "react-modal";

// Required for accessibility
Modal.setAppElement("#root");

const CalculationBreakdown = ({ principal, interestRate, years }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);

    // Calculate breakdown
    const monthlyRate = interestRate / 100 / 12;
    const months = years * 12;
    const monthlyPayment =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

    return (
        <div className="text-center mt-6">
            <button
                onClick={() => setModalIsOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
                Show Calculation Details
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="calculation-modal"
                overlayClassName="calculation-overlay"
            >
                <div className="calculation-modal-content">
                    <h2>How Your Payment is Calculated</h2>

                    <p><strong>Inputs:</strong></p>
                    <ul>
                        <li>Principal: €{principal.toLocaleString()}</li>
                        <li>Interest Rate: {interestRate}% per year</li>
                        <li>Term: {years} years ({months} months)</li>
                    </ul>

                    <p><strong>The formula for monthly payments is:</strong></p>
                    <pre>
                        M = P × (r × (1 + r)^n) / ((1 + r)^n - 1)
                    </pre>

                    <ul>
                        <li>Monthly interest rate (r): {(monthlyRate * 100).toFixed(4)}%</li>
                        <li>Total months (n): {months}</li>
                        <li>Monthly payment (M): €{monthlyPayment.toFixed(2)}</li>
                    </ul>

                    <button onClick={() => setModalIsOpen(false)}>Close</button>
                </div>
            </Modal>

        </div>
    );
};

export default CalculationBreakdown;
