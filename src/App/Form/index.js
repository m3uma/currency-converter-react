import { useState } from "react";
import { Result } from "./Result";
import { LabelText, Field, Button, Header, Info, Loading, Failure } from "./styled";
import { useRatesData } from "./useRatesData";

export const Form = () => {
    const [result, setResult] = useState();
    const ratesData = useRatesData();

    const calculateResult = (currency, amount) => {
        const rate = ratesData.rates[currency];

        setResult({
            sourceAmount: +amount,
            targetAmount: amount * rate,
            currency,
        });
    }

    const [currency, setCurrency] = useState("EUR");
    const [amount, setAmount] = useState("");

    const onSubmit = (event) => {
        event.preventDefault();
        calculateResult(currency, amount);
    }

    return (
        <form className="form" onSubmit={onSubmit}>
            <Header>
                Currency converter
            </Header>
            {ratesData.state === "loading"
                ? (
                    <Loading>
                        One second... <br /> I load exchange rates from the European Central Bank
                    </Loading>
                )
                : (
                    ratesData.state === "error" ? (
                        <Failure>
                            Hmm ... something went wrong
                            Check your Internet connection - if you have one, the problem is on our side. We apologize.
                        </Failure>
                    ) : (
                        <>
                            <p>
                                <label>
                                    <LabelText>
                                        Amount in PLN*:
                                    </LabelText>
                                    <Field
                                        value={amount}
                                        onChange={({ target }) => setAmount(target.value)}
                                        placeholder="Enter the amount in PLN"
                                        type="number"
                                        required
                                        step="0.01"
                                    />
                                </label>
                            </p>
                            <p>
                                <label>
                                    <LabelText>
                                        Currency:
                                    </LabelText>
                                    <Field
                                        as="select"
                                        value={currency}
                                        onChange={({ target }) => setCurrency(target.value)}
                                    >
                                        {Object.keys(ratesData.rates).map(((currency) => (
                                            <option
                                                key={currency}
                                                value={currency}
                                            >
                                                {currency}
                                            </option>
                                        )))}
                                    </Field>
                                </label>
                            </p>
                            <p>
                                <Button>Convert!</Button>
                            </p>

                            <Info>
                                The courses are taken from the European Central Bank. <br /> Valid as of <strong>{ratesData.date}</strong>.
                            </Info>

                            <Result result={result} />
                        </>
                    )
                )
            }

        </form>
    );
};