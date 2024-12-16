import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { Container, Title, Space, Button, Group, Text, Input, MultiSelect, Checkbox } from '@mantine/core';
import { useState } from 'react';
import { YearPickerInput } from '@mantine/dates';
import { Dropdowns } from '../assets/Dropdown';
import { MyCheckboxes } from '../assets/Checkboxes';
import { FloatingLabelInput } from '../assets/FloatingLabelInput';
import YandexMap from '../assets/YandexMap';
import { DistrictDropdown } from '../assets/DistrictDropdown';

export function Home() {
    const handleSubmit = () => {
        console.log('Submit button clicked!');
    };

    const balconyData = [
        { label: 'Лоджия' },
        { label: 'Балкон' },
        { label: 'Балкон и Лоджия' },
        { label: 'Несколько балконов или лоджий ' }
    ];

    const bathroomData = [
        { label: 'Совмещенный' },
        { label: 'Раздельный' },
        { label: '2 с/у и более' },
        { label: 'Нет' }
    ];

    const houseMaterialData = [
        { label: 'Монолитный' },
        { label: 'Панельный' },
        { label: 'Кирпичный' },
        { label: 'Иной' }
    ];

    const conditionData = [
        { label: 'Свежий ремонт' },
        { label: 'Не новый, но аккуратный ремонт' },
        { label: 'Черновая отделка' },
        { label: 'Требует ремонта' },
        { label: 'Cвободная планировка' }
    ];

    const furnitureData = [
        { label: 'Полностью' },
        { label: 'Частично' },
        { label: 'Без мебели' }
    ];

    const roomData = [
        { title: '1' },
        { title: '2' },
        { title: '3' },
        { title: '4' },
        { title: '5' }
    ];


    const [selectedDistrict, setSelectedDistrict] = useState<{ label: string; lat: number; lon: number } | null>(null);
    const [value, setValue] = useState<Date | null>(null);

    return (
        <Container size="sm" p="md">
            <Title order={2}>Apartment Price Prediction</Title>

            <Space h="md" />

            <Text size="sm" mb="xs">Выберите страну</Text>
            <Input disabled placeholder="Казахстан" />

            <Space h="md" />

            <Text size="sm" mb="xs">Выберите город</Text>
            <Input disabled placeholder="Алматы" />

            <Space h="md" />

            <Text size="sm" mb="xs">Количество Комнат</Text>
            <MyCheckboxes data={roomData} />
            <Space h="md" />

            <Text size="sm" mb="xs">Площадь дома</Text>
            <FloatingLabelInput />
            <Space h="md" />

            <Text size="sm" mb="xs">Высота потолка</Text>
            <FloatingLabelInput />
            <Space h="md" />

            <YearPickerInput
                clearable
                label="Год постройки"
                placeholder="Введите год постройки"
                minDate={new Date(1800, 1)}
                maxDate={new Date(2024, 1)}
                value={value}
                onChange={setValue}
            />
            <Space h="md" />

            <DistrictDropdown onSelect={setSelectedDistrict} />
            <Space h="md" />

            <YandexMap center={[43.238949, 76.889709]} zoom={13} selectedDistrict={selectedDistrict} />
            <Space h="md" />

            <Text size="sm" mb="xs">Выберите тип Балкона</Text>
            <Dropdowns data={balconyData} />

            <Space h="md" />

            <Text size="sm" mb="xs">Выберите тип Сан-узла</Text>
            <Dropdowns data={bathroomData} />

            <Space h="md" />

            <Text size="sm" mb="xs">Выберите материал дома</Text>
            <Dropdowns data={houseMaterialData} />

            <Space h="md" />

            <Text size="sm" mb="xs">Выберите состояние дома</Text>
            <Dropdowns data={conditionData} />

            <Space h="md" />

            <Text size="sm" mb="xs">Выберите мебелирование дома </Text>
            <Dropdowns data={furnitureData} />
            <Space h="md" />

            <Text size="sm" mb="xs">Безопаснсть</Text>
            <MultiSelect
                placeholder="Выберите типы безопасности"
                data={['Видеодомофон', 'Видеонаблюдение', 'Домофон', 'Кодовый замок', 'Консьерж', 'Охрана', 'Решетки на окнах', 'Сигнализация']}
            />

            <Space h="md" />

            <Text size="sm" mb="xs">Квартира в залоге </Text>

            <Checkbox mt="xs"/>
            <Space h="md" />

            <Text size="sm" mb="xs">Бывшее общежитие</Text>
            <Checkbox mt="xs"/>
            <Space h="md" />

            <Group>
                <Button onClick={handleSubmit} variant="filled" color="blue">
                    Predict Price
                </Button>
            </Group>
        </Container>
    );
}

export default Home;
