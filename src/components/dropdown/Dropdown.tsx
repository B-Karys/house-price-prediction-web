import { useState } from 'react';
import { IconChevronDown } from '@tabler/icons-react';
import { Group, Menu, UnstyledButton } from '@mantine/core';
import classes from './Dropdown.module.css';

interface DropdownProps {
    data: Array<{ label: string }>;
    onSelect?: (selectedItem: { label: string }) => void;
}

interface DistrictDropdownProps {
    data: Array<{ label: string; label_en: string; lat: number; lon: number }>;
    onSelect: (district: { label: string; label_en: string; lat: number; lon: number }) => void;
}

export function Dropdown({ data, onSelect }: DropdownProps) {
    const [opened, setOpened] = useState(false);
    const [selected, setSelected] = useState<{ label: string }>({ label: '' });

    const handleSelect = (item: { label: string }) => {
        setSelected(item);
        onSelect?.(item);
    };

    const items = data.map((item) => (
        <Menu.Item
            onClick={() => handleSelect(item)}
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

export function DistrictDropdown({ data, onSelect }: DistrictDropdownProps) {
    const [opened, setOpened] = useState(false);
    const [selected, setSelected] = useState<{ label: string; label_en: string; lat: number; lon: number }>({ label: '', label_en: '', lat: 0, lon: 0 });

    const handleSelect = (item: { label: string; label_en: string; lat: number; lon: number }) => {
        setSelected(item);
        onSelect(item);
    };

    const items = data.map((item) => (
        <Menu.Item
            onClick={() => handleSelect(item)}
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