import React, { useMemo, useState } from "react";
import Input from '../../components/FormElements/Input';
import Button from '../../components/FormElements/Button';
import { VALIDATOR_BIRTH_DAY, VALIDATOR_ID, VALIDATOR_MAX, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import './NewClient.css';
import { useHistory } from "react-router-dom";


import { useForm } from '../../components/hooks/form-hook'


export const NewClient = () => {
    const [hadCorona, setHadCorona] = useState(false);
    const [numberOfVaccine, setNumberOfVaccine] = useState(0);
    let history = useHistory();

    const [formState, inputHandler] = useForm(
        {
            name: {
                value: '',
                isValid: false

            }
        }
    )
    const clientSubmitHandler = event => {
        event.preventDefault();
        console.log("on submit");
        const client = {
            id: formState.inputs.id.value,
            name: formState.inputs.name.value,
            address: formState.inputs.address,
            birthDay: formState.inputs.dateOfBirht,
            phone: formState.inputs.phone,
            mobilePhone: formState.inputs.mobilePhone,

        };
        try {
            const response = fetch('http://localhost:5000/api/client/addClient', {
                method: 'POST',
                headers: {
                    'Connect-Type': 'application/json'
                },
                body: JSON.stringify(client)
            })
            const data = response.body;
            console.log("secccccc")

        } catch {
            console.log("got error!")
        }
        history.goBack()
    }


    const vaccineInpt = useMemo((err) => {
        const result = [];
        for (let i = 0; i < numberOfVaccine; i++) {
            result.push(
                (
                    <div key={"" + i}>
                        <Input
                            id="vaccineDate"
                            element="input"
                            type="date"
                            label={`Date of get vaccine ${i + 1}`}
                            validators={[VALIDATOR_BIRTH_DAY()]}
                            errorText="please enter a valid DATE."
                            onInput={inputHandler}
                        />
                        <Input
                            id="vaccineCompany"
                            element="input"
                            type="text"
                            label={`vaccine company ${i + 1}`}
                            validators={[VALIDATOR_REQUIRE()]}
                            errorText="please enter a company."
                            onInput={inputHandler}
                        />
                    </div>
                )
            )

        }
        return result;

    }, [numberOfVaccine])

    return (
        <form className="client-form" onSubmit={clientSubmitHandler}>
            <Input
                id="id"
                element="input"
                type="text"
                label="ID"
                validators={[VALIDATOR_ID()]}
                errorText="please enter a valid ID."
                onInput={inputHandler}
            />
            <Input
                id="name"
                element="input"
                type="text"
                label="Full Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter a name."
                onInput={inputHandler}
            />
            <Input
                id="addres"
                element="input"
                type="text"
                label="Addres"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter an addres."
                onInput={inputHandler}
            />
            <Input
                id="phone"
                element="input"
                type="tel"
                label="Phone number"
                validators={[VALIDATOR_MINLENGTH(9)]}
                errorText="please enter a valid phone number (minimum 9 digits)."
                onInput={inputHandler}
            />
            <Input
                id="mobilePhone"
                element="input"
                type="text"
                label="mobile phone number"
                validators={[VALIDATOR_MAXLENGTH(9)]}
                errorText="please enter a valid mobile phone number (minimum 10 digits)"
                onInput={inputHandler}
            />
            <Input
                id="date of birth"
                element="input"
                type="date"
                label="Date of birth"
                validators={[VALIDATOR_BIRTH_DAY()]}
                errorText="please enter a valid date of birth."
                onInput={inputHandler}
            />
            <h3>Have you been sick with Corona?</h3>
            <input
                type="checkbox"
                value="2"
                onChange={(e) => { setHadCorona(e.target.checked) }}
            />
            {/* <br /> */}
            {hadCorona &&
                <div>
                    <Input
                        id="dateOfCorona"
                        element="input"
                        type="date"
                        label="date of possitive corona answer:"
                        validators={[VALIDATOR_BIRTH_DAY()]}
                        errorText="please enter a valid date."
                        onInput={inputHandler}
                    />
                    <Input
                        id="dateOfFinishCorona"
                        element="input"
                        type="date"
                        label="date of recovery"
                        validators={[VALIDATOR_BIRTH_DAY()]}
                        errorText="please enter a valid date of birth."
                        onInput={inputHandler}
                    />
                </div>
            }
            {/* <Input
                id="number of vaccine"
                element="input"
                type="number"
                label="enter number of vaccine"
                validators={[VALIDATOR_MAX(4)]}
                errorText="please enter a number between 0-4"
                //   onInput={(e) => { setNumberOfVaccine(e.target.value) }}
                onInput={inputHandler}
                onChange={(e) => { setNumberOfVaccine(e.target.value) }}
            //onInput={(e) => { setNumberOfVaccine(e.target.value) }}
            /> */}
            <h3>enter number of vaccine</h3>
            <input
                type="number"
                min={0}
                max={4}
                onChange={(e) => { setNumberOfVaccine(e.target.value) }}
            />
            <br />
            {vaccineInpt}

            <br />
            <Button type="submit" disabled={!formState.isValid} >
                ADD CLIENT
            </Button>
        </form>
    )
}
