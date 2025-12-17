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
  featured?: boolean;
}

const mockCars: Car[] = [
  {
    id: 1,
    brand: 'Geely',
    model: 'Coolray Premium',
    year: 2024,
    price: 25000,
    mileage: 0,
    engine: '1.5T',
    transmission: 'Автомат',
    fuel: 'Бензин',
    power: 177,
    image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/f9a72453-21c4-486d-ba80-867cfcf02ba4.jpg',
    isNew: true,
    featured: true
  },
  {
    id: 2,
    brand: 'BYD',
    model: 'Han EV',
    year: 2024,
    price: 42000,
    mileage: 0,
    engine: 'Электро',
    transmission: 'Автомат',
    fuel: 'Электро',
    power: 517,
    image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3a0c7c5b-2332-4976-875b-5085d66cf3e3.jpg',
    isNew: true,
    featured: true
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
    model: 'Tang DM-i',
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
    model: 'Tiggo 7 Pro Max',
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
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <header className="bg-primary/95 backdrop-blur-sm text-primary-foreground shadow-2xl sticky top-0 z-50 border-b border-gold/20">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                <span className="text-2xl">🚗</span>
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight">China Premium Motors</h1>
                <p className="text-xs text-primary-foreground/70 font-light">Эксклюзивные автомобили</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#catalog" className="text-sm hover:text-gold transition-colors font-light tracking-wide">Каталог</a>
              <a href="#about" className="text-sm hover:text-gold transition-colors font-light tracking-wide">О нас</a>
              <a href="#service" className="text-sm hover:text-gold transition-colors font-light tracking-wide">Сервис</a>
              <Button className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-lg font-medium">
                <Icon name="Phone" size={16} className="mr-2" />
                +375 29 123-45-67
              </Button>
            </nav>
            <Button variant="ghost" className="md:hidden text-primary-foreground">
              <Icon name="Menu" size={24} />
            </Button>
          </div>
        </div>
      </header>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary opacity-95"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wNSIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 bg-gold/20 text-gold border-gold/30 px-6 py-2 text-sm font-light tracking-wider">
              Премиальный импорт
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold mb-6 text-primary-foreground leading-tight">
              Автомобили из Китая
              <span className="block text-gold mt-2">класса люкс</span>
            </h2>
            <p className="text-lg md:text-xl mb-10 text-primary-foreground/90 font-light max-w-2xl mx-auto leading-relaxed">
              Официальная гарантия производителя • VIP доставка • Полное сопровождение сделки
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="text-base px-10 py-6 bg-gold text-gold-foreground hover:bg-gold/90 shadow-2xl font-medium">
                <Icon name="Search" size={20} className="mr-2" />
                Подобрать автомобиль
              </Button>
              <Button size="lg" variant="outline" className="text-base px-10 py-6 bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary shadow-lg font-medium">
                <Icon name="Calculator" size={20} className="mr-2" />
                Калькулятор стоимости
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-gold mb-2">500+</div>
                <div className="text-sm text-primary-foreground/70 font-light">Авто в наличии</div>
              </div>
              <div className="text-center border-x border-primary-foreground/20">
                <div className="text-4xl font-bold text-gold mb-2">12</div>
                <div className="text-sm text-primary-foreground/70 font-light">Лет на рынке</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-gold mb-2">98%</div>
                <div className="text-sm text-primary-foreground/70 font-light">Довольных клиентов</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-tertiary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: 'Shield', title: 'Гарантия', desc: 'До 5 лет' },
              { icon: 'Truck', title: 'Доставка', desc: 'Бесплатно' },
              { icon: 'Banknote', title: 'Кредит', desc: 'От 0.1%' },
              { icon: 'Wrench', title: 'Сервис', desc: '24/7' }
            ].map((item, i) => (
              <Card key={i} className="text-center p-6 border-2 hover:border-gold transition-all duration-300 hover:shadow-xl bg-card/80 backdrop-blur-sm">
                <div className="w-16 h-16 bg-gradient-to-br from-gold/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name={item.icon as any} size={28} className="text-primary" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground font-light">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/20 text-accent-foreground border-accent/30 px-4 py-1 font-light">
              Каталог
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Эксклюзивная коллекция</h2>
            <p className="text-muted-foreground text-lg font-light">Тщательно отобранные автомобили премиум-класса</p>
          </div>
          
          <Card className="mb-12 shadow-2xl border-2 border-border/50 animate-scale-in bg-card/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <h3 className="text-2xl font-semibold mb-8 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary/20 to-tertiary/20 rounded-lg flex items-center justify-center">
                  <Icon name="Filter" size={24} className="text-primary" />
                </div>
                Параметры подбора
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium mb-3 block text-muted-foreground uppercase tracking-wider">Марка автомобиля</label>
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger className="h-12 border-2 bg-background/50">
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
                  <label className="text-sm font-medium mb-3 block text-muted-foreground uppercase tracking-wider">Год выпуска</label>
                  <Select value={selectedYear} onValueChange={setSelectedYear}>
                    <SelectTrigger className="h-12 border-2 bg-background/50">
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
                  <label className="text-sm font-medium mb-3 block text-muted-foreground uppercase tracking-wider">Тип двигателя</label>
                  <Select value={selectedFuel} onValueChange={setSelectedFuel}>
                    <SelectTrigger className="h-12 border-2 bg-background/50">
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
                  <label className="text-sm font-medium mb-3 block text-muted-foreground uppercase tracking-wider">
                    Стоимость: ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    min={0}
                    max={100000}
                    step={5000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mt-4"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block text-muted-foreground uppercase tracking-wider">
                    Пробег: {mileageRange[0].toLocaleString()} - {mileageRange[1].toLocaleString()} км
                  </label>
                  <Slider
                    min={0}
                    max={100000}
                    step={5000}
                    value={mileageRange}
                    onValueChange={setMileageRange}
                    className="mt-4"
                  />
                </div>

                <div className="flex items-end">
                  <Button 
                    variant="outline" 
                    className="w-full h-12 border-2 hover:bg-muted font-medium"
                    onClick={() => {
                      setSelectedBrand('all');
                      setSelectedYear('all');
                      setSelectedFuel('all');
                      setPriceRange([0, 100000]);
                      setMileageRange([0, 100000]);
                    }}
                  >
                    <Icon name="RotateCcw" size={18} className="mr-2" />
                    Сбросить фильтры
                  </Button>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between pt-6 border-t">
                <div className="text-sm text-muted-foreground">
                  Найдено автомобилей: <span className="font-bold text-foreground text-lg ml-1">{filteredCars.length}</span>
                </div>
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <Icon name="ArrowRight" size={18} className="ml-2" />
                  Показать результаты
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCars.map((car, index) => (
              <Card 
                key={car.id} 
                className={`overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 animate-fade-in border-2 ${car.featured ? 'border-gold/50 bg-gradient-to-br from-card to-gold/5' : 'border-border/50 bg-card/80 backdrop-blur-sm'}`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative overflow-hidden group">
                  <img 
                    src={car.image} 
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  {car.isNew && (
                    <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground shadow-lg px-4 py-1 font-medium">
                      Новый
                    </Badge>
                  )}
                  {car.featured && (
                    <Badge className="absolute top-4 left-4 bg-gold text-gold-foreground shadow-lg px-4 py-1 font-medium">
                      ⭐ Premium
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground font-light uppercase tracking-wider mb-1">{car.brand}</div>
                    <h3 className="text-2xl font-bold">
                      {car.model}
                    </h3>
                  </div>
                  
                  <div className="flex items-end justify-between mb-6 pb-4 border-b">
                    <div>
                      <div className="text-xs text-muted-foreground font-light mb-1">Стоимость</div>
                      <span className="text-3xl font-bold text-primary">
                        ${car.price.toLocaleString()}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-sm font-light">
                      {car.year} год
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 bg-tertiary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Gauge" size={16} className="text-tertiary" />
                      </div>
                      <span className="text-muted-foreground font-light">
                        Пробег: <span className="text-foreground font-medium">{car.mileage.toLocaleString()} км</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                        <Icon name="Fuel" size={16} className="text-secondary" />
                      </div>
                      <span className="text-muted-foreground font-light">
                        {car.engine} • {car.transmission}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-8 h-8 bg-gold/10 rounded-lg flex items-center justify-center">
                        <Icon name="Zap" size={16} className="text-gold" />
                      </div>
                      <span className="text-muted-foreground font-light">
                        Мощность: <span className="text-foreground font-medium">{car.power} л.с.</span>
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 shadow-md font-medium">
                      <Icon name="Phone" size={16} className="mr-2" />
                      Связаться
                    </Button>
                    <Button variant="outline" size="icon" className="w-12 border-2 hover:bg-gold/10 hover:border-gold">
                      <Icon name="Heart" size={18} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-muted/50 to-tertiary/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gold/20 text-gold border-gold/30 px-6 py-2 font-light">
              Индивидуальный подход
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Не нашли подходящий автомобиль?
            </h2>
            <p className="text-lg text-muted-foreground mb-10 font-light">
              Мы подберем автомобиль под ваши требования и доставим из Китая за 30 дней
            </p>
            <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-2xl text-lg px-12 py-6 font-medium">
              <Icon name="MessageSquare" size={20} className="mr-2" />
              Оставить заявку на подбор
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wMyIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🚗</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold">China Premium</h3>
                  <p className="text-xs text-primary-foreground/60 font-light">Motors</p>
                </div>
              </div>
              <p className="text-sm text-primary-foreground/80 font-light leading-relaxed">
                Официальный импортер премиальных китайских автомобилей с полным сервисным обслуживанием
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gold">Контакты</h4>
              <div className="space-y-3 text-sm font-light">
                <div className="flex items-center gap-3 text-primary-foreground/80 hover:text-gold transition-colors cursor-pointer">
                  <Icon name="Phone" size={16} />
                  <span>+375 29 123-45-67</span>
                </div>
                <div className="flex items-center gap-3 text-primary-foreground/80 hover:text-gold transition-colors cursor-pointer">
                  <Icon name="Mail" size={16} />
                  <span>info@china-premium.by</span>
                </div>
                <div className="flex items-center gap-3 text-primary-foreground/80">
                  <Icon name="MapPin" size={16} />
                  <span>г. Минск, ул. Автомобильная, 1</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-gold">Режим работы</h4>
              <div className="space-y-2 text-sm text-primary-foreground/80 font-light">
                <p>Пн-Пт: 9:00 - 19:00</p>
                <p>Сб: 10:00 - 16:00</p>
                <p>Вс: по записи</p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-gold">Социальные сети</h4>
              <div className="flex gap-3">
                {['Instagram', 'Facebook', 'Youtube'].map((social) => (
                  <Button key={social} variant="outline" size="icon" className="border-primary-foreground/20 text-primary-foreground hover:bg-gold/20 hover:border-gold">
                    <Icon name={social as any} size={18} />
                  </Button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-primary-foreground/60 font-light">
              © 2024 China Premium Motors. Все права защищены.
            </div>
            <div className="flex gap-6 text-sm text-primary-foreground/60 font-light">
              <a href="#" className="hover:text-gold transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-gold transition-colors">Условия использования</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
