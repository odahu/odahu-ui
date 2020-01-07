import {storiesOf} from "@storybook/react";
import React from "react";
import {MemoryRouter} from 'react-router-dom';
import {ParameterView} from "./ParameterView";
import {OdahuSelect} from "./OdahuSelect";
import {Formik} from "formik";
import {ResourcesSpecElements} from "./ResourceSpecElements";

storiesOf('Components', module)
    .addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    ))
    .add('Parameter View', () => {
        return <ParameterView params={[
            {name: "Key 123", elem: "value 123"},
            {name: "This key must be skipped because elem is null", elem: null},
            {name: "Key 456", elem: "value 456"},
        ]}/>
    })
    .add('Custom Select', () => (
        <OdahuSelect
            label="Header"
            name="test"
            onChange={value => console.log(value)}
            value={""}
            defaultValue="value 1"
            error={false}
            helperText="Some field description"
            options={["value 1", "value 2", "value 3"]}
        />
    ))
    .add('Error Custom Select', () => (
        <OdahuSelect
            label="Header"
            name="test"
            onChange={value => console.log(value)}
            value={""}
            defaultValue={"value 1"}
            error
            helperText="Some error"
            options={["value 1", "value 2", "value 3"]}
        />
    ))
    .add('Resources', () => (
        <Formik
            initialValues={{
                spec: {
                    resources: {
                        requests: {
                            cpu: '1',
                            gpu: '2',
                            memory: '3Gb',
                        },
                        limits: {
                            cpu: '4',
                            gpu: '5',
                            memory: '6Gb',
                        },
                    }
                }
            }}
            onSubmit={(values) => {
                alert(values);
            }}>
            <ResourcesSpecElements gpu/>
        </Formik>
    ));

