import {storiesOf} from "@storybook/react";
import {MainLayout} from "./Main";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {SideBar} from "./SideBar";
import {TopBar} from "./TopBar";
import {MemoryRouter} from 'react-router-dom';

storiesOf('Layout', module)
    .addDecorator(story => (
        <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>
    ))
    .add('Main', () => (
        <MainLayout>
            <Typography paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
                ut labore et dolore magna aliqua. Rhoncus dolor purus non enim praesent elementum
                facilisis leo vel. Risus at ultrices mi tempus imperdiet. Semper risus in hendrerit
                gravida rutrum quisque non tellus. Convallis convallis tellus id interdum velit laoreet id
                donec ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra nibh cras.
                Metus vulputate eu scelerisque felis imperdiet proin fermentum leo. Mauris commodo quis
                imperdiet massa tincidunt. Cras tincidunt lobortis feugiat vivamus at augue. At augue eget
                arcu dictum varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem
                donec massa sapien faucibus et molestie ac.
            </Typography>
        </MainLayout>
    ))
    .add('TopBar', () => <TopBar onTopBarButtonClick={() => {alert('click')}} isSideBarOpened/>)
    .add('Opened Sidebar', () => <SideBar isOpened/>)
    .add('Closed Sidebar', () => <SideBar isOpened={false}/>);

