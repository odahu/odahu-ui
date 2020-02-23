import {storiesOf} from "@storybook/react";
import React from "react";
import {MemoryRouter} from 'react-router-dom';
import {Connections} from "./Connections";

storiesOf('Connections', module)
    .addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    ))
    .add('Main', () => {
        return <Connections/>
    })
    .add('Table', () => {
        return <Connections/>
    });

