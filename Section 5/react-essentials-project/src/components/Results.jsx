import { calculateInvestmentResults, formatter } from "../util/investment.js";

export default function Results({ userInput }) {
  const results = calculateInvestmentResults(userInput);

  function prepareResultData(){
    return results.map(result => ({
      year: result.year,
      investmentValue: formatter.format(result.valueEndOfYear),
      interest: formatter.format(result.interest),
      totalInterest: formatter.format(result.valueEndOfYear - userInput.initialInvestment - (result.year * userInput.annualInvestment)),
      investedCapital: formatter.format(userInput.initialInvestment + (result.year * userInput.annualInvestment)),
    }));
  }

  const resultData = prepareResultData();

  return (
    <table id="result">
      <thead>
      <tr>
        <th>Year</th>
        <th>Investment Value</th>
        <th>Interest (Year)</th>
        <th>Total Interest</th>
        <th>Invested Capital</th>
      </tr>
      </thead>
      <tbody>
        {resultData.map(result => (
          <tr key={result.year}>
            <td>{result.year}</td>
            <td>{result.investmentValue}</td>
            <td>{result.interest}</td>
            <td>{result.totalInterest}</td>
            <td>{result.investedCapital}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}