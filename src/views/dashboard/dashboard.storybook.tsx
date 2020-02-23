import {storiesOf} from "@storybook/react";
import React from "react";
import {MemoryRouter} from 'react-router-dom';
import {GettingStarted} from "./GettingStarted";
import {CLI} from "./CLI";

storiesOf('Dashboard', module)
    .addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    ))
    .add('Getting Started', () => (
        <GettingStarted/>
    ))
    .add('CLI', () => (
        <CLI/>
    ));

