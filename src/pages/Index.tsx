import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import Icon from '@/components/ui/icon';

interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  engine: string;
  transmission: string;
  fuel: string;
  power: number;
  image: string;
  isNew: boolean;
}

const mockCars: Car[] = [
  {
    id: 1,
    brand: 'Geely',
    model: 'Coolray',
    year: 2024,
    price: 25000,
    mileage: 0,
    engine: '1.5T',
    transmission: 'Автомат',
    fuel: 'Бензин',
    power: 177,
    image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/f9a72453-21c4-486d-ba80-867cfcf02ba4.jpg',
    isNew: true
  },
  {
    id: 2,
    brand: 'BYD',
    model: 'Han',
    year: 2024,
    price: 42000,
    mileage: 0,
    engine: 'Электро',
    transmission: 'Автомат',
    fuel: 'Электро',
    power: 517,
    image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3a0c7c5b-2332-4976-875b-5085d66cf3e3.jpg',
    isNew: true
  },
  {
    id: 3,
    brand: 'Chery',
    model: 'Tiggo 8 Pro',
    year: 2023,
    price: 32000,
    mileage: 15000,
    engine: '2.0T',
    transmission: 'Автомат',
    fuel: 'Бензин',
    power: 197,
    image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/53df17c2-5ceb-4393-b7fb-863aeb0b9953.jpg',
    isNew: false
  },
  {
    id: 4,
    brand: 'Geely',
    model: 'Atlas Pro',
    year: 2024,
    price: 35000,
    mileage: 0,
    engine: '2.0T',
    transmission: 'Автомат',
    fuel: 'Бензин',
    power: 238,
    image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/f9a72453-21c4-486d-ba80-867cfcf02ba4.jpg',
    isNew: true
  },
  {
    id: 5,
    brand: 'BYD',
    model: 'Tang',
    year: 2023,
    price: 48000,
    mileage: 8000,
    engine: 'Гибрид',
    transmission: 'Автомат',
    fuel: 'Гибрид',
    power: 487,
    image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3a0c7c5b-2332-4976-875b-5085d66cf3e3.jpg',
    isNew: false
  },
  {
    id: 6,
    brand: 'Chery',
    model: 'Tiggo 7 Pro',
    year: 2024,
    price: 28000,
    mileage: 0,
    engine: '1.6T',
    transmission: 'Автомат',
    fuel: 'Бензин',
    power: 186,
    image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/53df17c2-5ceb-4393-b7fb-863aeb0b9953.jpg',
    isNew: true
  }
];

const Index = () => {
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<number[]>([0, 100000]);
  const [mileageRange, setMileageRange] = useState<number[]>([0, 100000]);
  const [selectedFuel, setSelectedFuel] = useState<string>('all');

  const brands = ['all', ...Array.from(new Set(mockCars.map(car => car.brand)))];
  const years = ['all', ...Array.from(new Set(mockCars.map(car => car.year.toString())))];
  const fuelTypes = ['all', 'Бензин', 'Электро', 'Гибрид'];

  const filteredCars = mockCars.filter(car => {
    const brandMatch = selectedBrand === 'all' || car.brand === selectedBrand;
    const yearMatch = selectedYear === 'all' || car.year.toString() === selectedYear;
    const priceMatch = car.price >= priceRange[0] && car.price <= priceRange[1];
    const mileageMatch = car.mileage >= mileageRange[0] && car.mileage <= mileageRange[1];
    const fuelMatch = selectedFuel === 'all' || car.fuel === selectedFuel;
    
    return brandMatch && yearMatch && priceMatch && mileageMatch && fuelMatch;
  });

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-tight">🚗 Авто из Китая</h1>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#catalog" className="hover:text-accent transition-colors">Каталог</a>
              <a href="#about" className="hover:text-accent transition-colors">О нас</a>
              <a href="#contacts" className="hover:text-accent transition-colors">Контакты</a>
              <Button variant="outline" className="bg-primary-foreground text-primary hover:bg-accent hover:text-accent-foreground">
                <Icon name="Phone" size={16} className="mr-2" />
                Позвонить
              </Button>
            </nav>
            <Button variant="ghost" className="md:hidden">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary to-primary/90 text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Автомобили из Китая с доставкой
            </h2>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              Официальная гарантия • Прямые поставки • Лучшие цены
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                <Icon name="Search" size={20} className="mr-2" />
                Подобрать авто
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Icon name="Calculator" size={20} className="mr-2" />
                Рассчитать стоимость
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="catalog" className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Каталог автомобилей</h2>
          
          <Card className="mb-8 shadow-lg animate-scale-in">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Icon name="Filter" size={24} />
                Фильтры поиска
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Марка</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger>
                      <SelectValue placeholder="Все марки" />
                    </SelectTrigger>
                    <SelectContent>
                      {brands.map(brand => (
                        <SelectItem key={brand} value={brand}>
                          {brand === 'all' ? 'Все марки' : brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Год выпуска</label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger>
                      <SelectValue placeholder="Все года" />
                    </SelectTrigger>
                    <SelectContent>
                      {years.map(year => (
                        <SelectItem key={year} value={year}>
                          {year === 'all' ? 'Все года' : year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Тип двигателя</label>
                  <Select value={selectedFuel} onValueChange={setSelectedFuel}>
                    <SelectTrigger>
                      <SelectValue placeholder="Все типы" />
                    </SelectTrigger>
                    <SelectContent>
                      {fuelTypes.map(fuel => (
                        <SelectItem key={fuel} value={fuel}>
                          {fuel === 'all' ? 'Все типы' : fuel}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Цена: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    min={0}
                    max={100000}
                    step={5000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Пробег: {mileageRange[0].toLocaleString()} - {mileageRange[1].toLocaleString()} км
                  </label>
                  <Slider
                    min={0}
                    max={100000}
                    step={5000}
                    value={mileageRange}
                    onValueChange={setMileageRange}
                    className="mt-2"
                  />
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setSelectedBrand('all');
                      setSelectedYear('all');
                      setSelectedFuel('all');
                      setPriceRange([0, 100000]);
                      setMileageRange([0, 100000]);
                    }}
                  >
                    <Icon name="RotateCcw" size={16} className="mr-2" />
                    Сбросить фильтры
                  </Button>
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                Найдено автомобилей: <span className="font-semibold text-foreground">{filteredCars.length}</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCars.map((car, index) => (
              <Card 
                key={car.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative">
                  <img 
                    src={car.image} 
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-56 object-cover"
                  />
                  {car.isNew && (
                    <Badge className="absolute top-3 right-3 bg-accent text-accent-foreground">
                      Новый
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-5">
                  <h3 className="text-xl font-bold mb-2">
                    {car.brand} {car.model}
                  </h3>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary">
                      ${car.price.toLocaleString()}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {car.year} год
                    </span>
                  </div>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Gauge" size={16} />
                      <span>Пробег: {car.mileage.toLocaleString()} км</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Fuel" size={16} />
                      <span>{car.engine} • {car.transmission}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Icon name="Zap" size={16} />
                      <span>Мощность: {car.power} л.с.</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1">
                      <Icon name="Phone" size={16} className="mr-2" />
                      Позвонить
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <Icon name="Heart" size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">🚗 Авто из Китая</h3>
              <p className="text-sm opacity-90">
                Официальный импортер китайских автомобилей с полной гарантией и сервисным обслуживанием
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <div className="space-y-2 text-sm opacity-90">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>+375 29 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@china-cars.by</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={16} />
                  <span>г. Минск, ул. Автомобильная, 1</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Режим работы</h4>
              <div className="space-y-1 text-sm opacity-90">
                <p>Пн-Пт: 9:00 - 19:00</p>
                <p>Сб: 10:00 - 16:00</p>
                <p>Вс: выходной</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 mt-8 pt-6 text-center text-sm opacity-75">
            © 2024 Авто из Китая. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
