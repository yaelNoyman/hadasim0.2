import React, { useCallback, useEffect, useMemo, useState } from "react";
import Input from '../../components/FormElements/Input';
import Button from '../../components/FormElements/Button';
import { VALIDATOR_BIRTH_DAY, VALIDATOR_ID, VALIDATOR_MAX, VALIDATOR_MAXLENGTH, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from "../../util/validators";
import '../newClient/NewClient.css';
import { useHistory } from "react-router-dom";


import { useForm } from '../../components/hooks/form-hook'
import { useParams } from "react-router-dom";
import { CLIENTS } from "../Clients";


export const UpdateClient = () => {
    const clientId = useParams().cid;
    const client = CLIENTS.find(c => c.id === clientId);
    const [isLoading, setIsLoading] = useState(false);
    const [hadCorona, setHadCorona] = useState(false);
    let history = useHistory();

    const [numberOfVaccine, setNumberOfVaccine] = useState(0);

    const [formState, inputHandler, setFormData] = useForm(
        {
            id: {
                value: '',
                isValid: false
            },
            name: {
                value: '',
                isValid: false

            },
            addres: {
                value: '',
                isValid: false
            },
            phone: {
                value: '',
                isValid: false
            },
            mobilePhone: {
                value: '',
                isValid: false
            },
            birthday: {
                value: '',
                isValid: false
            }

        }
    )

    useEffect(() => {
        console.log("test" + client.id)
        if (client) {
            setFormData(
                {
                    id: {
                        value: client.id,
                        isValid: true
                    },
                    name: {
                        value: client.name,
                        isValid: true
                    },
                    addres: {
                        value: client.address,
                        isValid: true
                    },
                    phone: {
                        value: client.phone,
                        isValid: true
                    },
                    mobilePhone: {
                        value: client.mobilePhone,
                        isValid: true
                    },
                    birthday: {
                        value: client.birthday,
                        isValid: true
                    }


                }, true
            );
        }
        //setIsLoading(false);
    }, [setFormData, client]);

    const clientSubmitHandler = useCallback((event) => {
        event.preventDefault();
        const client = {
            id: formState.inputs.id.value,
            name: formState.inputs.name.value,
            address: formState.inputs.address,
            birthDay: formState.inputs.dateOfBirht,
            phone: formState.inputs.phone,
            mobilePhone: formState.inputs.mobilePhone,

        };
        try {
            const result = fetch('http://localhost:5000/api/client/updateClient', {
                method: 'POST',
                headers: {
                    'Connect-Type': 'application/json',
                    "Content-Type": "text/plain"
                },
                mode: 'no-cors',
                body: JSON.stringify(client)
            }).then(function (response) {
                return response.json();
            }
            )
            // const r = result.body;

        } catch (eee) {
            console.log("got error!")
        }
        history.goBack()

    }, [])

    if (!client) {
        return (
            <div>
                <h2>cloud not find client with id {clientId}</h2>
            </div>
        )
    }

    if (isLoading) {
        return (
            <div>
                <h2>Loading...</h2>
            </div>
        )
    }

    // eslint-disable-next-line
    const vaccineInpt = useMemo(() => {
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
                initialValue={client.id}
                initialValid={formState.inputs.id.isValid || true}

            />
            <Input
                id="name"
                element="input"
                type="text"
                label="Full Name"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter a name."
                onInput={inputHandler}
                initialValue={client.name}
                initialValid={formState.inputs.name.isValid || true}
            />
            <Input
                id="addres"
                element="input"
                type="text"
                label="Addres"
                validators={[VALIDATOR_REQUIRE()]}
                errorText="please enter an addres."
                onInput={inputHandler}
                initialValue={client.addres}
                initialValid={formState.inputs.id.isValid || true}
            />
            <Input
                id="phone"
                element="input"
                type="tel"
                label="Phone number"
                validators={[VALIDATOR_MINLENGTH(9)]}
                errorText="please enter a valid phone number (minimum 9 digits)."
                onInput={inputHandler}
                initialValue={client.phone}
                initialValid={formState.inputs.phone.isValid || true}
            />
            <Input
                id="mobilePhone"
                element="input"
                type="text"
                label="mobile phone number"
                validators={[VALIDATOR_MAXLENGTH(9)]}
                errorText="please enter a valid mobile phone number (minimum 10 digits)"
                onInput={inputHandler}
                initialValue={client.mobilePhone}
                initialValid={formState.inputs.mobilePhone.isValid || true}
            />
            <Input
                id="birthday"
                element="input"
                type="date"
                label="Date of birth"
                validators={[VALIDATOR_BIRTH_DAY()]}
                errorText="please enter a valid date of birth."
                onInput={inputHandler}
                //DOTO
                initialValue={new Date(client.birthday)}
                initialValid={formState.inputs.birthday.isValid || true}
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
                        id="date of corona"
                        element="input"
                        type="date"
                        label="date of possitive corona answer:"
                        validators={[VALIDATOR_BIRTH_DAY()]}
                        errorText="please enter a valid date."
                        onInput={inputHandler}
                    />
                    <Input
                        id="date of finish corona"
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
            <Button type="submit" disabled={!formState.isValid}>
                ADD CLIENT
            </Button>
        </form>
    )

}