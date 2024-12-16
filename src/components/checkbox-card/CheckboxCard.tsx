import { Checkbox, Text, UnstyledButton } from '@mantine/core';
import classes from './CheckboxCard.module.css';

interface CheckboxCardProps {
	isChecked: boolean;
	onToggle: () => void;
	label: string;
}

export function CheckboxCard({
	isChecked,
	onToggle,
	label,
	...others
}: CheckboxCardProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof CheckboxCardProps>) {
	return (
		<UnstyledButton
			{...others}
			onClick={onToggle}
			data-checked={isChecked || undefined}
			className={classes.button}
		>
			<div className={classes.body}>
				<Text fw={500} size="sm" lh={1}>
					{label}
				</Text>
			</div>

			<Checkbox
				checked={isChecked}
				onChange={() => { }}
				tabIndex={-1}
				styles={{ input: { cursor: 'pointer' } }}
			/>
		</UnstyledButton>
	);
}