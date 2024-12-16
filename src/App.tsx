import { MantineProvider } from '@mantine/core';
import Home from './pages/home/Home';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';

export default function App() {
    return (
        <MantineProvider withGlobalClasses defaultColorScheme="dark">
            <Notifications position="top-right" />
            <Home />
        </MantineProvider>
    );
}
