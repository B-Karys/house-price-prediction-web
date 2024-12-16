import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { Container, Title, Space, Button, Group, Input, Text, MultiSelect, Checkbox, SimpleGrid } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { balconyOptions, bathroomOptions, conditionOptions, districtOptions, furnitureOptions, houseMaterialOptions, roomOptions, securityOptions } from '../../services/Options';
import { YearPickerInput } from '@mantine/dates';
import { DistrictDropdown, Dropdown } from '../../components/dropdown/Dropdown';
import { CheckboxGroup } from '../../components/checkbox-group/CheckboxGroup';
import YandexMap from '../../components/map/YandexMap';
import { useState } from 'react';
import { predict } from '../../services/Api';

export function Home() {
    const [apartment, setApartment] = useState<{ lat: number; lon: number; houseNumber: string; street: string } | null>(null);
    const [district, setDistrict] = useState<{ label: string; label_en: string, lat: number; lon: number } | null>(null);
    const [year, setYear] = useState<Date | null>(null);
    const [square, setSquare] = useState('');
    const [ceilingHeight, setCeilingHeight] = useState('');
    const [room, setRoom] = useState<string | null>(null);
    const [floor, setFloor] = useState('');
    const [totalFloors, setTotalFloors] = useState('');
    const [balcony, setBalcony] = useState<string | null>(null);
    const [bathroom, setBathroom] = useState<string | null>(null);
    const [houseMaterial, setHouseMaterial] = useState<string | null>(null);
    const [condition, setCondition] = useState<string | null>(null);
    const [furniture, setFurniture] = useState<string | null>(null);
    const [security, setSecurity] = useState<string[]>([]);
    const [isPledged, setIsPledged] = useState(false);
    const [wasFormerHostel, setWasFormerHostel] = useState(false);

    const handleSubmit = async () => {
        if (!apartment || !district || !year || !square || !ceilingHeight || !room || !floor || !totalFloors || !balcony || !bathroom || !houseMaterial || !condition || !furniture) {
            notifications.show({ title: 'Ошибка', message: 'Все поля и карта должны быть заполнены', color: 'red' });
            return;
        }

        const data = {
            square_m: parseFloat(square),
            rooms: parseInt(room, 10),
            floor: parseInt(floor, 10),
            total_floors: parseInt(totalFloors, 10),
            year_built: year.getFullYear(),
            balcony: balcony.toLocaleLowerCase(),
            bathroom: bathroom.toLocaleLowerCase(),
            ceiling_height_m: parseFloat(ceilingHeight),
            house_material: houseMaterial.toLocaleLowerCase(),
            condition: condition.toLocaleLowerCase(),
            furniture_status: furniture.toLocaleLowerCase(),
            security: security.join(', ').toLocaleLowerCase(),
            is_pledged: isPledged,
            was_former_hostel: wasFormerHostel,
            country: 'Kazakhstan',
            city: 'Almaty',
            district: district.label_en,
            microdistrict: null,
            street: apartment.street,
            house_num: apartment.houseNumber,
            lat: apartment.lat,
            lon: apartment.lon
        };

        console.log(data);

        try {
            const response = await predict(data, 'all');
            const formattedPrice = response.predicted_price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
            notifications.show({
                title: 'Успешно',
                message: (
                    <>
                        Прогнозируемая цена на квартиру составляет:
                        <br />
                        <strong>{formattedPrice} KZT</strong>
                        <br />
                    </>
                ),
                color: 'green',
                autoClose: 10000
            });
        } catch (error) {
            notifications.show({ title: 'Ошибка', message: 'Сервер недоступен', color: 'red' });
        }
    };

    const handleFloatInput = (value: string) => {
        const newValue = value.replace(/[^\d.]/g, '');
        return newValue;
    };

    return (
        <Container size="sm" p="md">
            <Title order={2}>Прогнозирование цены на квартиру</Title>

            <Space h="xl" />

            <Text size="sm" mb="xs">Выберите страну</Text>
            <Input disabled value="Казахстан" />

            <Space h="md" />

            <Text size="sm" mb="xs">Выберите город</Text>
            <Input disabled value="Алматы" />

            <Space h="md" />

            <Text size="sm" mb="xs">Количество Комнат</Text>
            <CheckboxGroup options={roomOptions} onChange={setRoom} />

            <Space h="md" />

            <Text size="sm" mb="xs">Площадь дома</Text>
            <Input placeholder='Введите площадь дома' value={square} onChange={(e) => setSquare(handleFloatInput(e.currentTarget.value))} />

            <Space h="md" />

            <Text size="sm" mb="xs">Высота потолка</Text>
            <Input placeholder='Введите высота потолка' value={ceilingHeight} onChange={(e) => setCeilingHeight(handleFloatInput(e.currentTarget.value))} />

            <Space h="md" />

            <Text size="sm" mb="xs">Год постройки</Text>
            <YearPickerInput
                clearable
                placeholder="Введите год постройки"
                minDate={new Date(1800, 1)}
                maxDate={new Date(2024, 1)}
                value={year}
                onChange={setYear}
            />

            <Space h="md" />

            <Text size="sm" mb="xs">Выберите район</Text>
            <DistrictDropdown data={districtOptions} onSelect={setDistrict} />

            <Space h="md" />

            <Text size="sm" mb="xs">Выберите координаты</Text>
            <YandexMap center={[43.238949, 76.889709]} zoom={13} district={district} onMapClick={setApartment} />

            <Space h="md" />

            <SimpleGrid cols={2} spacing="lg">
                <div>
                    <Text size="sm" mb="xs">Этаж</Text>
                    <Input placeholder='Введите этаж' value={floor} onChange={(e) => setFloor(handleFloatInput(e.currentTarget.value))} />
                </div>
                <div>
                    <Text size="sm" mb="xs">Всего этажей дома</Text>
                    <Input placeholder='Введите всего этажей дома' value={totalFloors} onChange={(e) => setTotalFloors(handleFloatInput(e.currentTarget.value))} />
                </div>
            </SimpleGrid>

            <Space h="md" />

            <Text size="sm" mb="xs">Выберите тип балкона</Text>
            <Dropdown data={balconyOptions} onSelect={(item) => setBalcony(item.label)} />

            <Space h="md" />

            <Text size="sm" mb="xs">Выберите тип сан-узла</Text>
            <Dropdown data={bathroomOptions} onSelect={(item) => setBathroom(item.label)} />

            <Space h="md" />

            <Text size="sm" mb="xs">Выберите материал дома</Text>
            <Dropdown data={houseMaterialOptions} onSelect={(item) => setHouseMaterial(item.label)} />

            <Space h="md" />

            <Text size="sm" mb="xs">Выберите состояние дома</Text>
            <Dropdown data={conditionOptions} onSelect={(item) => setCondition(item.label)} />

            <Space h="md" />

            <Text size="sm" mb="xs">Меблировка</Text>
            <Dropdown data={furnitureOptions} onSelect={(item) => setFurniture(item.label)} />

            <Space h="md" />

            <Text size="sm" mb="xs">Безопасность</Text>
            <MultiSelect placeholder="Выберите типы безопасности" data={securityOptions} value={security} onChange={setSecurity} />

            <Space h="md" />

            <SimpleGrid cols={2} spacing="lg">
                <div>
                    <Text size="sm" mb="xs">Квартира в залоге </Text>
                    <Checkbox checked={isPledged} onChange={(e) => setIsPledged(e.currentTarget.checked)} />
                </div>
                <div>
                    <Text size="sm" mb="xs">Бывшее общежитие</Text>
                    <Checkbox checked={wasFormerHostel} onChange={(e) => setWasFormerHostel(e.currentTarget.checked)} />
                </div>
            </SimpleGrid>

            <Space h="xl" />

            <Group style={{ justifyContent: 'center' }}>
                <Button onClick={handleSubmit} variant="filled" color="blue">
                    Predict Price
                </Button>
            </Group>

            <Space h="xl" />
        </Container>
    );
}

export default Home;
