import { SimpleGrid } from '@mantine/core';
import { CheckboxCard } from '../checkbox-card/CheckboxCard';
import { useState } from 'react';

interface CheckboxGroupProps {
	options: Array<{ label: string }>;
	onChange?: (selectedLabel: string | null) => void;
}

export function CheckboxGroup({ options, onChange }: CheckboxGroupProps) {
	const [selectedLabel, setSelectedLabel] = useState<string | null>(null);

	const handleToggle = (label: string) => {
		const newSelectedLabel = selectedLabel === label ? null : label;
		setSelectedLabel(newSelectedLabel);
		onChange?.(newSelectedLabel);
	};

	const checkboxItems = options.map((option) => (
		<CheckboxCard
			key={option.label}
			label={option.label}
			isChecked={option.label === selectedLabel}
			onToggle={() => handleToggle(option.label)}
		/>
	));

	return <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }}>{checkboxItems}</SimpleGrid>;
}