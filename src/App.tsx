import { MantineProvider } from '@mantine/core';
import Home from './pages/home';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

export default function App() {
  return (
    <MantineProvider withGlobalClasses defaultColorScheme="dark">
      <Home />
    </MantineProvider>
  );
}
