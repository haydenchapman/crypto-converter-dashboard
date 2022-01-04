import {useState} from "react"
import ExchangeRate from "./ExchangeRate"
import axios from "axios"


const CurrencyConverter = () => {
    const currencies = ['BTC','ETH','USD','XRP','LTC','ADA']
    const [chosenPrimacyCurrency, setChosenPrimaryCurrency] = useState('BTC')
    const [chosenSecondaryCurrency, setChosenSecondaryCurrency]  = useState('USD')
    const [amount, setAmount] = useState(1)
    //const [exchangeRate, setExchangeRate] = useState(0)
    //const [primaryCurrencyExchanged, setPrimaryCurrencyExchanged] = useState('BTC')
    //const [secondaryCurrencyExchanged, setSecondaryCurrencyExchanged] = useState('USD')
    const [result, setResult] = useState(0)

    const [exchangedData, setExchangedData] = useState({
        primaryCurrency: 'BTC',
        secondaryCurrency: 'BTC',
        exchangeRate: 0
    })


    console.log(chosenPrimacyCurrency)

    const convert = () => {

        const options = {
            method: 'GET',
            url: 'http://localhost:8000/convert',
            params: {from_currency: chosenPrimacyCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: chosenSecondaryCurrency},
        }

        axios.request(options).then(response =>{
            console.log(response.data*amount)
            //setExchangeRate(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate'])
            setResult(response.data * amount)
            //setPrimaryCurrencyExchanged(chosenPrimacyCurrency)
            //setSecondaryCurrencyExchanged(chosenSecondaryCurrency)
            setExchangedData({
                primaryCurrency: chosenPrimacyCurrency,
                secondaryCurrency: chosenSecondaryCurrency,
                exchangeRate: response.data
            })
        }).catch(error => {
            console.error(error)
        })
    }

    return (<div className="currency-converter">
        <h2>Cryptocurrency Converter</h2>

        <div className="input-box">
            <table>
                <body>
                <tr>
                    <td>Primary Currency:</td>
                    <td>
                        <input
                            type={'number'}
                            name="currency-amount-1"
                            value={amount}
                            onChange={(event) => setAmount(event.target.value)}
                        />
                    </td>
                    <td>
                        <select
                            value = {chosenPrimacyCurrency}
                            name="currency-option-1"
                            className="currency-options"
                            onChange={event => setChosenPrimaryCurrency(event.target.value)}
                        >
                            {currencies.map((currency, index) => <option key={index}>{currency}</option>)}
                        </select>
                    </td>
                </tr>
                <tr>
                    <td>Secondary Currency:</td>
                    <td>
                        <input
                            name="currency-amount-2"
                            value={result}
                            disabled={true}
                        />
                    </td>
                    <td>
                        <select
                            value={chosenSecondaryCurrency}
                            name="currency-option-2"
                            className="currency-options"
                            onChange={event => setChosenSecondaryCurrency(event.target.value)}
                        >
                            {currencies.map((currency, index) => <option key={index}>{currency}</option>)}
                        </select>
                    </td>
                </tr>
                </body>
            </table>

            <button id="convert-button" onClick={convert}>Convert</button>

        </div>
        <ExchangeRate
            exchangedData={exchangedData}
        />
    </div>)
}

export default CurrencyConverter;