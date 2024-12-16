import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Group, Menu, UnstyledButton } from '@mantine/core';
import classes from '../assets/DistricDropdown.module.css';

const data = [
    { label: 'Бостандыкский район', lat: 43.2167, lon: 76.8936 },
    { label: 'Ауезовский район', lat: 43.2181, lon: 76.8461 },
    { label: 'Алмалинский район', lat: 43.2567, lon: 76.9286 },
    { label: 'Медеуский район', lat: 43.2521, lon: 76.9606 },
    { label: 'Наурызбайский район', lat: 43.1927, lon: 76.8012 },
    { label: 'Алатауский район', lat: 43.1826, lon: 76.8857 },
    { label: 'Турксибский район', lat: 43.3462, lon: 76.9577 },
    { label: 'Жетусуский район', lat: 43.3348, lon: 76.9044 },
  ];
  
  interface DistrictDropdownProps {
    onSelect: (district: { label: string; lat: number; lon: number }) => void;
  }
  
  export function DistrictDropdown({ onSelect }: DistrictDropdownProps) {
    const [opened, setOpened] = useState(false);
    const [selected, setSelected] = useState(data[0]);
  
    const items = data.map((item) => (
      <Menu.Item
        onClick={() => {
          setSelected(item);
          onSelect(item); // Pass selected district data to parent
        }}
        key={item.label}
      >
        {item.label}
      </Menu.Item>
    ));
  
    return (
      <Menu
        onOpen={() => setOpened(true)}
        onClose={() => setOpened(false)}
        radius="md"
        width="target"
        withinPortal
      >
        <Menu.Target>
          <UnstyledButton className={classes.control} data-expanded={opened || undefined}>
            <Group gap="xs">
              <span className={classes.label}>{selected.label}</span>
            </Group>
            <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
          </UnstyledButton>
        </Menu.Target>
        <Menu.Dropdown>{items}</Menu.Dropdown>
      </Menu>
    );
  }