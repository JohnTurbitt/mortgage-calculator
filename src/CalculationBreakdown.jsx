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
        <div className="calculator__breakdown">
            <button
                onClick={() => setModalIsOpen(true)}
                className="calculator__breakdown__button"
            >
                Show Calculation Details
            </button>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="calculator__modal"
                overlayClassName="calculator__modal-overlay"
            >
                <div className="calculator__modal-content">
                    <h2 className="calculator__modal-title">How Your Payment is Calculated</h2>

                    <p className="calculator__modal-strong">Inputs:</p>
                    <ul className="calculator__modal-list">
                        <li>Principal: €{principal.toLocaleString()}</li>
                        <li>Interest Rate: {interestRate}% per year</li>
                        <li>Term: {years} years ({months} months)</li>
                    </ul>

                    <p className="calculator__modal-strong">The formula for monthly payments is:</p>
                    <pre className="calculator__modal-pre">
                        M = P × (r × (1 + r)^n) / ((1 + r)^n - 1)
                    </pre>

                    <ul className="calculator__modal-list">
                        <li>Monthly interest rate (r): {(monthlyRate * 100).toFixed(4)}%</li>
                        <li>Total months (n): {months}</li>
                        <li>Monthly payment (M): €{monthlyPayment.toFixed(2)}</li>
                    </ul>

                    <button
                        onClick={() => setModalIsOpen(false)}
                        className="calculator__modal__button"
                    >
                        Close
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default CalculationBreakdown;
