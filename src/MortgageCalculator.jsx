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
        <div className="calculator-container">
            {/* HEADER */}
            <header className="calculator-header">
                <h1>Mortgage Overpayment Calculator (Ireland)</h1>
                <p>Quickly calculate your monthly repayment, interest savings, and term reduction by adding extra monthly payments.</p>
            </header>

            {/* INPUTS */}
            <div className="form-grid">
                <div className="input-group">
                    <label>Mortgage Balance (€)</label>
                    <input
                        type="number"
                        value={balance}
                        onChange={(e) => setBalance(+e.target.value)}
                        placeholder="Enter your mortgage balance"
                    />
                </div>

                <div className="input-group">
                    <label>Interest Rate (%)</label>
                    <input
                        type="number"
                        value={rate}
                        onChange={(e) => setRate(+e.target.value)}
                        placeholder="Enter your interest rate"
                    />
                </div>

                <div className="input-group">
                    <label>Term (Years)</label>
                    <input
                        type="number"
                        value={years}
                        onChange={(e) => setYears(+e.target.value)}
                        placeholder="Enter remaining term"
                    />
                </div>

                <div className="input-group">
                    <label>Monthly Overpayment (€)</label>
                    <input
                        type="number"
                        value={overpayment}
                        onChange={(e) => setOverpayment(+e.target.value)}
                        placeholder="Extra monthly payment"
                    />
                </div>

                <button onClick={calculate}>Calculate</button>
            </div>

            {/* RESULTS */}
            {result && (
                <>
                    <div className="results">
                        <p><strong>Monthly Repayment:</strong> €{result.monthlyRepayment}</p>
                        <p><strong>New Term:</strong> {Math.floor(result.newMonths / 12)} years, {result.newMonths % 12} months</p>
                        <p><strong>Interest Saved:</strong> €{result.interestSaved}</p>
                        <p><strong>Years Knocked Off:</strong> {result.yearsSaved} years</p>
                    </div>

                    {/* CHARTS */}
                    <div className="charts">
                        <div>
                            <PieChartBox title="Baseline" data={result.baseline} colors={["#1e3a8a", "#ef4444"]} />
                            <PieChartBox title="With Overpayment" data={result.withOverpayment} colors={["#1e3a8a", "#16a34a"]} />
                        </div>

                        <div style={{ width: "100%", height: 350, margin: "0 auto" }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={result.timeline}
                                    margin={{ top: 20, right: 40, left: 40, bottom: 40 }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis
                                        dataKey="month"
                                        label={{ value: "Month", position: "insideBottom", offset: 25 }}
                                    />
                                    <YAxis
                                        label={{ value: "Balance (€)", angle: -90, position: "insideLeft", offset: 10 }}
                                    />
                                    <Tooltip formatter={(value) => `€${value.toLocaleString()}`} />
                                    <Legend verticalAlign="top" height={36} />
                                    <Line type="monotone" dataKey="baseline" stroke="#ef4444" name="Baseline" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="overpayment" stroke="#16a34a" name="With Overpayment" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MortgageCalculator;
