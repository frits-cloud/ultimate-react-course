import './Styles.css';
import { useEffect, useState } from 'react'

export default function App() {
  const [amount, setAmount] = useState(100)
  const [convertedAmount, setConvertedAmount] = useState(null)
  const [fromCurrency, setFromCurrency] = useState('EUR')
  const [toCurrency, setToCurrency] = useState('USD')

  useEffect(
    function () {
      async function Convert(amount, fromCurrency, toCurrency) {
        try {
          const apiUrl = `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
          const res = await fetch(apiUrl)
          console.log(res)
          const data = await res.json()

          setConvertedAmount(data.rates[toCurrency])
        } catch {
          alert("Not a valid value. Resetting to 1")
          setAmount(1)
        } finally {
          console.log("Conversion cannot be made")
        }
      }
      Convert(amount, fromCurrency, toCurrency)
    }, [amount, fromCurrency, toCurrency]
  )


  return (
    <div>
      <input value={amount} type="text" onChange={(e) => setAmount(e.target.value)} />
      <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{convertedAmount}</p>
    </div>
  );
}
