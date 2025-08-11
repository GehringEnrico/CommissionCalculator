import './App.css';
import React, { useState } from 'react';

function App() {

  const [totalFcamaraCommission, setTotalFcamaraComission] = useState(0);
  const [totalCompetitorCommission, setTotalCompetitorCommission] = useState(0);

  async function calculate(event) {
    // Get calculation from the backend
    // Update results area
    event.preventDefault(); // Prevent form submission from reloading the page

    const form = event.target;
    const localSalesCount = Number(form.localSalesCount.value);
    const foreignSalesCount = Number(form.foreignSalesCount.value);
    const averageSaleAmount = Number(form.averageSaleAmount.value);

    console.log("Calculating...: " + localSalesCount + ", " + foreignSalesCount + ", " + averageSaleAmount);

    try {
      const response = await fetch('https://localhost:5000/Commision', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          localSalesCount,
          foreignSalesCount,
          averageSaleAmount,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("Calculation result: ", data);
      
      // Update the total commission values based on the response
      setTotalFcamaraComission(data.fCamaraCommissionAmount);
      setTotalCompetitorCommission(data.competitorCommissionAmount);

    } catch (error) {
      console.error('Error during calculation:', error);
      alert('An error occurred while calculating. Please try again.');
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <div>
        </div>
        <form onSubmit={calculate}>
          <label for="localSalesCount">Local Sales Count</label>  
          <input name="localSalesCount" /><br />

          <label for="foreignSalesCount">Foreign Sales Count</label>  
          <input name="foreignSalesCount" /><br />
          
          <label for="averageSaleAmount">Average Sale Amount</label>  
          <input name="averageSaleAmount" /><br />

          <button type="submit">Calculate</button>
        </form>
      </header>

      <div>
        <h3>Results</h3>
        <p>Total FCamara commission: {totalFcamaraCommission}</p>
        <p>Total FCamara commission: {totalCompetitorCommission}</p>
      </div>
    </div>
  );
}

export default App;
