import {storiesOf} from "@storybook/react";
import React from "react";
import {MemoryRouter} from 'react-router-dom';
import {Documentation} from "./Documentation";

storiesOf('Dashboard', module)
    .addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    ))
    .add('Getting Started', () => (
        <Documentation/>
    ));

