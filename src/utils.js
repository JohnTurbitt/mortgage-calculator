export function calculateMortgage(P, annualRate, years, overpayment = 0) {
  const r = annualRate / 100 / 12;
  const n = years * 12;

  const M = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPaid = M * n;
  const totalInterest = totalPaid - P;

  let balance = P;
  let months = 0;
  let totalPaidWithOverpayment = 0;
  let timeline = [];

  let baselineBalance = P;

  for (let m = 1; m <= n; m++) {
    const baselineInterest = baselineBalance * r;
    baselineBalance -= M - baselineInterest;
    if (baselineBalance < 0) baselineBalance = 0;

    const interest = balance * r;
    let principalPayment = M - interest + overpayment;
    if (principalPayment > balance + interest) principalPayment = balance + interest;
    balance -= (M - interest) + overpayment;
    if (balance < 0) balance = 0;

    totalPaidWithOverpayment += M + overpayment;
    months++;

    timeline.push({
      month: m,
      baseline: Math.max(baselineBalance, 0),
      overpayment: Math.max(balance, 0),
    });

    if (balance <= 0) break;
  }

  const totalInterestWithOverpayment = totalPaidWithOverpayment - P;
  const interestSaved = totalInterest - totalInterestWithOverpayment;

  return {
    monthlyRepayment: M.toFixed(2),
    totalInterest: totalInterest.toFixed(2),
    newMonths: months,
    yearsSaved: years - Math.floor(months / 12),
    interestSaved: interestSaved.toFixed(2),
    baseline: { principal: P, interest: totalInterest },
    withOverpayment: { principal: P, interest: totalInterestWithOverpayment },
    timeline,
  };
}
