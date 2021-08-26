import { useState } from "react";
import { currencies } from "../currencies";
import { Result } from "./Result";
import { LabelText, Field, Button, Header, Info } from "./styled";

export const Form = ({ calculateResult, result }) => {
    const [currency, setCurrency] = useState(currencies[0].short);
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
                        {currencies.map((currency => (
                            <option
                                key={currency.short}
                                value={currency.short}
                            >
                                {currency.name}
                            </option>
                        )))}
                    </Field>
                </label>
            </p>
            <p>
                <Button>Convert!</Button>
            </p>

            <Info>
                The rates are taken from the nbp.pl website from table 164 / A / NBP / 2021 of 2021-08-25
            </Info>

            <Result result={result} />
        </form>
    );
};