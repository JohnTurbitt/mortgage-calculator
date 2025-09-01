import React, { useState } from "react";
import SEO from "./Seo";
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
import { calculateMortgage } from "./utils";
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Mortgage Overpayment Calculator",
    url: window.location.href,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    description:
      "Quickly calculate mortgage repayments, interest savings, and term reduction for Irish mortgages with overpayments.",
  };

  return (
    <main className="calculator-container">
      <SEO
        title="Mortgage Overpayment Calculator Ireland | Reduce Your Term & Interest"
        description="Calculate your mortgage repayments in Ireland with optional overpayments. See interest savings, term reduction, and monthly breakdown instantly."
        keywords="mortgage calculator Ireland, mortgage overpayment, interest savings, term reduction"
        structuredData={structuredData}
      />

      <header className="calculator-header">
        <h1>Mortgage Overpayment Calculator (Ireland)</h1>
        <p>
          Quickly calculate your monthly repayment, interest savings, and term
          reduction by adding extra monthly payments.
        </p>
      </header>

      <section className="form-grid" aria-label="Mortgage Calculator Inputs">
        <div className="input-group">
          <label htmlFor="balance">Mortgage Balance (€)</label>
          <input
            id="balance"
            type="number"
            value={balance}
            onChange={(e) => setBalance(+e.target.value)}
            placeholder="Enter your mortgage balance"
          />
        </div>

        <div className="input-group">
          <label htmlFor="rate">Interest Rate (%)</label>
          <input
            id="rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(+e.target.value)}
            placeholder="Enter your interest rate"
          />
        </div>

        <div className="input-group">
          <label htmlFor="years">Term (Years)</label>
          <input
            id="years"
            type="number"
            value={years}
            onChange={(e) => setYears(+e.target.value)}
            placeholder="Enter remaining term"
          />
        </div>

        <div className="input-group">
          <label htmlFor="overpayment">Monthly Overpayment (€)</label>
          <input
            id="overpayment"
            type="number"
            value={overpayment}
            onChange={(e) => setOverpayment(+e.target.value)}
            placeholder="Extra monthly payment"
          />
        </div>

        <button onClick={calculate}>Calculate</button>
      </section>

      {result && (
        <section className="results-section" aria-label="Mortgage Calculation Results">
          <div className="results">
            <p>
              <strong>Monthly Repayment:</strong> €{result.monthlyRepayment.toLocaleString()}
            </p>
            <p>
              <strong>New Term:</strong> {Math.floor(result.newMonths / 12)} years, {result.newMonths % 12} months
            </p>
            <p>
              <strong>Interest Saved:</strong> €{result.interestSaved.toLocaleString()}
            </p>
            <p>
              <strong>Years Knocked Off:</strong> {result.yearsSaved} years
            </p>
          </div>

          <div className="charts">
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

            <div style={{ width: "100%", height: 350, margin: "2rem auto" }}>
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
                  <Line
                    type="monotone"
                    dataKey="baseline"
                    stroke="#ef4444"
                    name="Baseline"
                    strokeWidth={2}
                    dot={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="overpayment"
                    stroke="#16a34a"
                    name="With Overpayment"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <CalculationBreakdown
            principal={balance}
            interestRate={rate}
            years={years}
          />
        </section>
      )}
    </main>
  );
};

export default MortgageCalculator;
