import { Checkbox, SimpleGrid, Text, UnstyledButton } from '@mantine/core';
import { useState } from 'react';
import classes from './Checkboxes.module.css';

interface CheckboxProps {
  isChecked: boolean;
  onChange: () => void;
  title: string;
}

interface MyCheckboxesProps {
  data: Array<{ title: string }>;
}

export function MyCheckbox({
  isChecked,
  onChange,
  title,
  className,
  ...others
}: CheckboxProps & Omit<React.ComponentPropsWithoutRef<'button'>, keyof CheckboxProps>) {

  return (
    <UnstyledButton
      {...others}
      onClick={onChange}
      data-checked={isChecked || undefined}
      className={classes.button}
    >
      <div className={classes.body}>
        <Text fw={500} size="sm" lh={1}>
          {title}
        </Text>
      </div>

      <Checkbox
        checked={isChecked}
        onChange={() => {}}
        tabIndex={-1}
        styles={{ input: { cursor: 'pointer' } }}
      />
    </UnstyledButton>
  );
}

export function MyCheckboxes({ data }: MyCheckboxesProps) {
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null);

  const items = data.map((item) => (
    <MyCheckbox
      key={item.title}
      title={item.title}
      isChecked={item.title === selectedTitle}
      onChange={() => setSelectedTitle(selectedTitle === item.title ? null : item.title)}
    />
  ));

  return <SimpleGrid cols={{ base: 1, sm: 2, md: 5 }}>{items}</SimpleGrid>;
}
