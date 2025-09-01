import React, { useState } from "react";
import "./styles.scss";
import {
    Tooltip,
    Legend,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer,
} from "recharts";
import { calculateMortgage } from './utils';
import PieChartBox from "./PieChartBox";
import CalculationBreakdown from "./CalculationBreakdown";

const MortgageCalculator = () => {
    const [balance, setBalance] = useState(200000);
    const [rate, setRate] = useState(4);
    const [years, setYears] = useState(25);
    const [overpayment, setOverpayment] = useState(100);
    const [result, setResult] = useState(null);

    const calculate = () => {
        const res = calculateMortgage(balance, rate, years, overpayment);
        setResult(res);
    };

    return (
        <div className="calculator__container">
            <header className="calculator__header">
                <h1 className="calculator__header-title">Mortgage Overpayment Calculator (Ireland)</h1>
                <p className="calculator__header-description">
                    Quickly calculate your monthly repayment, interest savings, and term reduction by adding extra monthly payments.
                </p>
            </header>

            <div className="calculator__form">
                <div className="calculator__form-group">
                    <label className="calculator__form-group__label">Mortgage Balance (€)</label>
                    <input
                        type="number"
                        className="calculator__form-group__input"
                        value={balance}
                        onChange={(e) => setBalance(+e.target.value)}
                        placeholder="Enter your mortgage balance"
                    />
                </div>

                <div className="calculator__form-group">
                    <label className="calculator__form-group__label">Interest Rate (%)</label>
                    <input
                        type="number"
                        className="calculator__form-group__input"
                        value={rate}
                        onChange={(e) => setRate(+e.target.value)}
                        placeholder="Enter your interest rate"
                    />
                </div>

                <div className="calculator__form-group">
                    <label className="calculator__form-group__label">Term (Years)</label>
                    <input
                        type="number"
                        className="calculator__form-group__input"
                        value={years}
                        onChange={(e) => setYears(+e.target.value)}
                        placeholder="Enter remaining term"
                    />
                </div>

                <div className="calculator__form-group">
                    <label className="calculator__form-group__label">Monthly Overpayment (€)</label>
                    <input
                        type="number"
                        className="calculator__form-group__input"
                        value={overpayment}
                        onChange={(e) => setOverpayment(+e.target.value)}
                        placeholder="Extra monthly payment"
                    />
                </div>

                <button className="calculator__form__button" onClick={calculate}>
                    Calculate
                </button>
            </div>

            {result && (
                <>
                    <div className="calculator__results">
                        <p className="calculator__results-item"><strong>Monthly Repayment:</strong> €{result.monthlyRepayment}</p>
                        <p className="calculator__results-item"><strong>New Term:</strong> {Math.floor(result.newMonths / 12)} years, {result.newMonths % 12} months</p>
                        <p className="calculator__results-item"><strong>Interest Saved:</strong> €{result.interestSaved}</p>
                        <p className="calculator__results-item"><strong>Years Knocked Off:</strong> {result.yearsSaved} years</p>
                    </div>

                    <div className="calculator__charts">
                        <div className="calculator__charts-pie-container">
                            <PieChartBox
                                title="Baseline"
                                data={result.baseline}
                                colors={["#1e3a8a", "#ef4444"]}
                            />
                            <PieChartBox
                                title="With Overpayment"
                                data={result.withOverpayment}
                                colors={["#1e3a8a", "#16a34a"]}
                            />
                        </div>

                        <div className="calculator__charts-line-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={result.timeline}
                                    margin={{ top: 20, right: 40, left: 40, bottom: 40 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" label={{ value: "Month", position: "insideBottom", offset: 25 }} />
                                    <YAxis label={{ value: "Balance (€)", angle: -90, position: "insideLeft", offset: 10 }} />
                                    <Tooltip formatter={(value) => `€${value.toLocaleString()}`} />
                                    <Legend verticalAlign="top" height={36} />
                                    <Line type="monotone" dataKey="baseline" stroke="#ef4444" name="Baseline" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="overpayment" stroke="#16a34a" name="With Overpayment" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <CalculationBreakdown
                        principal={balance}
                        interestRate={rate}
                        years={years}
                    />
                </>
            )}
        </div>
    );
};

export default MortgageCalculator;
