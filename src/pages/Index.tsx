import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from '@/components/ui/icon';

interface Vehicle {
  id: number;
  type: 'car' | 'moto';
  category?: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  engine: string;
  power: number;
  image: string;
  isNew: boolean;
  inStock?: boolean;
}

const vehicles: Vehicle[] = [
  { id: 1, type: 'car', brand: 'Geely', model: 'Coolray', year: 2024, price: 25000, mileage: 0, engine: '1.5T', power: 177, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/f9a72453-21c4-486d-ba80-867cfcf02ba4.jpg', isNew: true, inStock: true },
  { id: 2, type: 'car', brand: 'BYD', model: 'Han EV', year: 2024, price: 42000, mileage: 0, engine: 'Электро', power: 517, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3a0c7c5b-2332-4976-875b-5085d66cf3e3.jpg', isNew: true, inStock: true },
  { id: 3, type: 'car', brand: 'Chery', model: 'Tiggo 8 Pro', year: 2023, price: 32000, mileage: 15000, engine: '2.0T', power: 197, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/53df17c2-5ceb-4393-b7fb-863aeb0b9953.jpg', isNew: false, inStock: true },
  { id: 4, type: 'car', brand: 'Geely', model: 'Atlas Pro', year: 2024, price: 35000, mileage: 0, engine: '2.0T', power: 238, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/f9a72453-21c4-486d-ba80-867cfcf02ba4.jpg', isNew: true, inStock: true },
  { id: 5, type: 'car', brand: 'BYD', model: 'Tang DM-i', year: 2023, price: 48000, mileage: 8000, engine: 'Гибрид', power: 487, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3a0c7c5b-2332-4976-875b-5085d66cf3e3.jpg', isNew: false, inStock: false },
  { id: 6, type: 'car', brand: 'Chery', model: 'Tiggo 7 Pro', year: 2024, price: 28000, mileage: 0, engine: '1.6T', power: 186, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/53df17c2-5ceb-4393-b7fb-863aeb0b9953.jpg', isNew: true, inStock: true },
  { id: 7, type: 'moto', category: 'Эндуро', brand: 'Kayo', model: 'K6 250', year: 2024, price: 3200, mileage: 0, engine: '250cc', power: 28, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/ec31ff11-229c-4b24-adbf-310f718418f3.jpg', isNew: true, inStock: true },
  { id: 8, type: 'moto', category: 'Дорожный', brand: 'Lifan', model: 'KPR 200', year: 2024, price: 2800, mileage: 0, engine: '200cc', power: 18, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3b15bcbe-62c2-45bd-a285-af62bb6245bc.jpg', isNew: true, inStock: true },
  { id: 9, type: 'moto', category: 'Турэндуро', brand: 'Zongshen', model: 'RX3S', year: 2023, price: 4500, mileage: 2000, engine: '400cc', power: 35, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/ba4a5ed4-89b1-44e2-b8f5-78827ccdcdf8.jpg', isNew: false, inStock: true },
  { id: 10, type: 'car', brand: 'Haval', model: 'Jolion', year: 2024, price: 27000, mileage: 0, engine: '1.5T', power: 150, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/f9a72453-21c4-486d-ba80-867cfcf02ba4.jpg', isNew: true, inStock: true },
  { id: 11, type: 'car', brand: 'Li Auto', model: 'L9', year: 2024, price: 65000, mileage: 0, engine: 'EREV', power: 449, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3a0c7c5b-2332-4976-875b-5085d66cf3e3.jpg', isNew: true, inStock: false },
  { id: 12, type: 'car', brand: 'Changan', model: 'CS75 Plus', year: 2023, price: 24000, mileage: 12000, engine: '2.0T', power: 233, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/53df17c2-5ceb-4393-b7fb-863aeb0b9953.jpg', isNew: false, inStock: true },
  { id: 13, type: 'moto', category: 'Эндуро', brand: 'Kayo', model: 'T4', year: 2024, price: 4200, mileage: 0, engine: '250cc', power: 30, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/ec31ff11-229c-4b24-adbf-310f718418f3.jpg', isNew: true, inStock: true },
  { id: 14, type: 'moto', category: 'Дорожный', brand: 'Benelli', model: '302R', year: 2024, price: 5200, mileage: 0, engine: '300cc', power: 38, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3b15bcbe-62c2-45bd-a285-af62bb6245bc.jpg', isNew: true, inStock: true },
  { id: 15, type: 'moto', category: 'Турэндуро', brand: 'CFMoto', model: '800MT', year: 2024, price: 11500, mileage: 0, engine: '800cc', power: 91, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/ba4a5ed4-89b1-44e2-b8f5-78827ccdcdf8.jpg', isNew: true, inStock: true },
  { id: 16, type: 'car', brand: 'Geely', model: 'Monjaro', year: 2024, price: 38000, mileage: 0, engine: '2.0T', power: 238, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/f9a72453-21c4-486d-ba80-867cfcf02ba4.jpg', isNew: true, inStock: true },
  { id: 17, type: 'car', brand: 'NIO', model: 'ET5', year: 2024, price: 58000, mileage: 0, engine: 'Электро', power: 490, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3a0c7c5b-2332-4976-875b-5085d66cf3e3.jpg', isNew: true, inStock: false },
  { id: 18, type: 'car', brand: 'GAC', model: 'GS8', year: 2023, price: 31000, mileage: 8500, engine: '2.0T', power: 252, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/53df17c2-5ceb-4393-b7fb-863aeb0b9953.jpg', isNew: false, inStock: true },
  { id: 19, type: 'moto', category: 'Эндуро', brand: 'Shineray', model: 'XY250GY', year: 2023, price: 2900, mileage: 1500, engine: '250cc', power: 21, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/ec31ff11-229c-4b24-adbf-310f718418f3.jpg', isNew: false, inStock: true },
  { id: 20, type: 'moto', category: 'Дорожный', brand: 'Keeway', model: 'RKS 125', year: 2024, price: 2100, mileage: 0, engine: '125cc', power: 11, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3b15bcbe-62c2-45bd-a285-af62bb6245bc.jpg', isNew: true, inStock: true },
  { id: 21, type: 'car', brand: 'Hongqi', model: 'E-HS9', year: 2024, price: 72000, mileage: 0, engine: 'Электро', power: 551, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3a0c7c5b-2332-4976-875b-5085d66cf3e3.jpg', isNew: true, inStock: false },
  { id: 22, type: 'car', brand: 'Chery', model: 'Arrizo 8', year: 2024, price: 22000, mileage: 0, engine: '1.6T', power: 197, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/53df17c2-5ceb-4393-b7fb-863aeb0b9953.jpg', isNew: true, inStock: true },
  { id: 23, type: 'moto', category: 'Турэндуро', brand: 'Voge', model: '650DS', year: 2024, price: 8900, mileage: 0, engine: '650cc', power: 70, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/ba4a5ed4-89b1-44e2-b8f5-78827ccdcdf8.jpg', isNew: true, inStock: true },
  { id: 24, type: 'car', brand: 'BYD', model: 'Seal', year: 2024, price: 45000, mileage: 0, engine: 'Электро', power: 530, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3a0c7c5b-2332-4976-875b-5085d66cf3e3.jpg', isNew: true, inStock: true },
  { id: 25, type: 'car', brand: 'Geely', model: 'Tugella', year: 2023, price: 36000, mileage: 6000, engine: '2.0T', power: 238, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/f9a72453-21c4-486d-ba80-867cfcf02ba4.jpg', isNew: false, inStock: true },
  { id: 26, type: 'moto', category: 'Эндуро', brand: 'Avantis', model: 'Enduro 250', year: 2024, price: 3500, mileage: 0, engine: '250cc', power: 26, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/ec31ff11-229c-4b24-adbf-310f718418f3.jpg', isNew: true, inStock: true },
  { id: 27, type: 'moto', category: 'Дорожный', brand: 'Lifan', model: 'KPS 150', year: 2024, price: 2300, mileage: 0, engine: '150cc', power: 14, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3b15bcbe-62c2-45bd-a285-af62bb6245bc.jpg', isNew: true, inStock: true },
  { id: 28, type: 'car', brand: 'Haval', model: 'H9', year: 2023, price: 42000, mileage: 11000, engine: '2.0T', power: 224, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/f9a72453-21c4-486d-ba80-867cfcf02ba4.jpg', isNew: false, inStock: true },
  { id: 29, type: 'car', brand: 'Xpeng', model: 'P7', year: 2024, price: 52000, mileage: 0, engine: 'Электро', power: 473, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3a0c7c5b-2332-4976-875b-5085d66cf3e3.jpg', isNew: true, inStock: false },
  { id: 30, type: 'moto', category: 'Турэндуро', brand: 'Motoland', model: 'GS 250', year: 2023, price: 4100, mileage: 3200, engine: '250cc', power: 25, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/ba4a5ed4-89b1-44e2-b8f5-78827ccdcdf8.jpg', isNew: false, inStock: true },
  { id: 31, type: 'car', brand: 'Tank', model: '500', year: 2024, price: 49000, mileage: 0, engine: '3.0T', power: 354, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/f9a72453-21c4-486d-ba80-867cfcf02ba4.jpg', isNew: true, inStock: true },
  { id: 32, type: 'car', brand: 'Zeekr', model: '001', year: 2024, price: 61000, mileage: 0, engine: 'Электро', power: 544, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3a0c7c5b-2332-4976-875b-5085d66cf3e3.jpg', isNew: true, inStock: false },
  { id: 33, type: 'moto', category: 'Эндуро', brand: 'Kayo', model: 'K2', year: 2024, price: 2700, mileage: 0, engine: '200cc', power: 19, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/ec31ff11-229c-4b24-adbf-310f718418f3.jpg', isNew: true, inStock: true },
  { id: 34, type: 'moto', category: 'Дорожный', brand: 'Zongshen', model: 'Cyclone RX6', year: 2024, price: 6100, mileage: 0, engine: '650cc', power: 68, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3b15bcbe-62c2-45bd-a285-af62bb6245bc.jpg', isNew: true, inStock: true },
  { id: 35, type: 'car', brand: 'Changan', model: 'UNI-K', year: 2024, price: 33000, mileage: 0, engine: '2.0T', power: 233, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/53df17c2-5ceb-4393-b7fb-863aeb0b9953.jpg', isNew: true, inStock: true },
  { id: 36, type: 'moto', category: 'Турэндуро', brand: 'Benelli', model: 'TRK 502', year: 2023, price: 7200, mileage: 4500, engine: '500cc', power: 47, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/ba4a5ed4-89b1-44e2-b8f5-78827ccdcdf8.jpg', isNew: false, inStock: true },
  { id: 37, type: 'car', brand: 'MG', model: 'MG 7', year: 2024, price: 26000, mileage: 0, engine: '2.0T', power: 261, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/f9a72453-21c4-486d-ba80-867cfcf02ba4.jpg', isNew: true, inStock: true },
  { id: 38, type: 'car', brand: 'BYD', model: 'Dolphin', year: 2024, price: 23000, mileage: 0, engine: 'Электро', power: 204, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3a0c7c5b-2332-4976-875b-5085d66cf3e3.jpg', isNew: true, inStock: true },
  { id: 39, type: 'moto', category: 'Эндуро', brand: 'BSE', model: 'Z5 250', year: 2024, price: 3800, mileage: 0, engine: '250cc', power: 29, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/ec31ff11-229c-4b24-adbf-310f718418f3.jpg', isNew: true, inStock: true },
  { id: 40, type: 'moto', category: 'Дорожный', brand: 'Lifan', model: 'KPT 200', year: 2023, price: 2600, mileage: 1800, engine: '200cc', power: 16, image: 'https://cdn.poehali.dev/projects/4bad61c1-db67-4ad8-a5f4-ce3c2f5cb460/files/3b15bcbe-62c2-45bd-a285-af62bb6245bc.jpg', isNew: false, inStock: true },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'car' | 'moto'>('all');
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });

  const filteredVehicles = activeTab === 'all' ? vehicles : vehicles.filter(v => v.type === activeTab);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary/95 backdrop-blur-sm text-primary-foreground shadow-lg sticky top-0 z-50 border-b border-gold/20">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 md:gap-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                <span className="text-lg md:text-2xl">🚗</span>
              </div>
              <div>
                <h1 className="text-base md:text-xl font-bold">Авто из Китая</h1>
                <p className="text-xs text-primary-foreground/70 font-light hidden md:block">Новые и с пробегом</p>
              </div>
            </div>
            <Button className="bg-gold text-gold-foreground hover:bg-gold/90 text-xs md:text-sm px-3 md:px-4 py-2">
              <Icon name="Phone" size={14} className="mr-1 md:mr-2" />
              <span className="hidden sm:inline">Позвонить</span>
              <span className="sm:hidden">☎</span>
            </Button>
          </div>
        </div>
      </header>

      <section className="relative py-12 md:py-20 overflow-hidden bg-gradient-to-br from-primary via-secondary to-primary">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4wMyIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center animate-fade-in">
            <Badge className="mb-4 md:mb-6 bg-gold/20 text-gold border-gold/30 px-4 md:px-6 py-1 md:py-2 text-xs md:text-sm font-light">
              🇨🇳 Прямые поставки
            </Badge>
            <h2 className="text-3xl md:text-6xl font-bold mb-4 md:mb-6 text-primary-foreground leading-tight">
              Авто и мото из Китая
            </h2>
            <p className="text-base md:text-xl mb-6 md:mb-10 text-primary-foreground/90 font-light leading-relaxed">
              Гарантия • Рассрочка 0% • Доставка за 30 дней • Свой сервис
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center">
              <Button size="lg" className="bg-gold text-gold-foreground hover:bg-gold/90 shadow-xl font-medium text-sm md:text-base w-full sm:w-auto">
                <Icon name="Search" size={18} className="mr-2" />
                Подобрать авто
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-medium text-sm md:text-base w-full sm:w-auto">
                <Icon name="Calculator" size={18} className="mr-2" />
                Калькулятор
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 md:gap-8 mt-10 md:mt-16">
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-gold mb-1 md:mb-2">500+</div>
                <div className="text-xs md:text-sm text-primary-foreground/70 font-light">В наличии</div>
              </div>
              <div className="text-center border-x border-primary-foreground/20">
                <div className="text-2xl md:text-4xl font-bold text-gold mb-1 md:mb-2">12</div>
                <div className="text-xs md:text-sm text-primary-foreground/70 font-light">Лет опыта</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-4xl font-bold text-gold mb-1 md:mb-2">98%</div>
                <div className="text-xs md:text-sm text-primary-foreground/70 font-light">Довольны</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-tertiary/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {[
              { icon: 'Shield', title: 'Гарантия', desc: 'До 5 лет' },
              { icon: 'Percent', title: 'Рассрочка', desc: '0% на год' },
              { icon: 'Truck', title: 'Доставка', desc: 'За 30 дней' },
              { icon: 'Wrench', title: 'Сервис', desc: 'Свой СТО' }
            ].map((item, i) => (
              <Card key={i} className="text-center p-4 md:p-6 border hover:border-gold transition-all hover:shadow-lg bg-card/80">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-gold/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                  <Icon name={item.icon as any} size={20} className="md:w-7 md:h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-sm md:text-lg mb-1">{item.title}</h3>
                <p className="text-xs md:text-sm text-muted-foreground font-light">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="catalog" className="py-8 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-2 md:mb-4">Каталог</h2>
            <p className="text-sm md:text-lg text-muted-foreground font-light">Новые и с пробегом авто, мотоциклы</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-6 md:mb-8">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
              <TabsTrigger value="all" className="text-xs md:text-sm">Все ({vehicles.length})</TabsTrigger>
              <TabsTrigger value="car" className="text-xs md:text-sm">Авто ({vehicles.filter(v => v.type === 'car').length})</TabsTrigger>
              <TabsTrigger value="moto" className="text-xs md:text-sm">Мото ({vehicles.filter(v => v.type === 'moto').length})</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredVehicles.map((vehicle, index) => (
              <Card 
                key={vehicle.id} 
                className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="relative overflow-hidden group">
                  <img 
                    src={vehicle.image} 
                    alt={`${vehicle.brand} ${vehicle.model}`}
                    className="w-full h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-2 right-2 flex flex-col gap-1">
                    {vehicle.isNew && (
                      <Badge className="bg-accent text-accent-foreground shadow-lg text-xs px-2 py-0.5">
                        Новый
                      </Badge>
                    )}
                    {vehicle.inStock && (
                      <Badge className="bg-gold text-gold-foreground shadow-lg text-xs px-2 py-0.5">
                        В наличии
                      </Badge>
                    )}
                  </div>
                  {vehicle.category && (
                    <Badge className="absolute top-2 left-2 bg-primary/80 text-primary-foreground text-xs px-2 py-0.5">
                      {vehicle.category}
                    </Badge>
                  )}
                </div>
                
                <CardContent className="p-3 md:p-4">
                  <div className="mb-2 md:mb-3">
                    <div className="text-xs text-muted-foreground font-light uppercase mb-0.5">{vehicle.brand}</div>
                    <h3 className="text-base md:text-lg font-bold">{vehicle.model}</h3>
                  </div>
                  
                  <div className="flex items-end justify-between mb-3 md:mb-4 pb-2 md:pb-3 border-b">
                    <div>
                      <div className="text-xs text-muted-foreground font-light mb-0.5">Цена</div>
                      <span className="text-xl md:text-2xl font-bold text-primary">
                        ${vehicle.price.toLocaleString()}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">{vehicle.year}</Badge>
                  </div>

                  <div className="space-y-2 mb-3 md:mb-4 text-xs md:text-sm">
                    <div className="flex items-center gap-2">
                      <Icon name="Gauge" size={14} className="text-tertiary" />
                      <span className="text-muted-foreground font-light">
                        {vehicle.mileage.toLocaleString()} км
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name={vehicle.type === 'car' ? 'Fuel' : 'Zap'} size={14} className="text-secondary" />
                      <span className="text-muted-foreground font-light">
                        {vehicle.engine} • {vehicle.power} л.с.
                      </span>
                    </div>
                  </div>

                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs md:text-sm">
                    <Icon name="Phone" size={14} className="mr-1 md:mr-2" />
                    Узнать подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-br from-muted/30 to-tertiary/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Условия покупки</h2>
            <p className="text-sm md:text-lg text-muted-foreground font-light">Удобные варианты оплаты</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <Card className="p-6 md:p-8 border-2 hover:border-gold transition-all bg-card/80">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gold/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Icon name="Percent" size={28} className="text-gold" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Рассрочка 0%</h3>
              <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-gold mt-0.5 flex-shrink-0" />
                  <span>Без переплат на 12 месяцев</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-gold mt-0.5 flex-shrink-0" />
                  <span>Первый взнос от 20%</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-gold mt-0.5 flex-shrink-0" />
                  <span>Оформление за 1 день</span>
                </li>
              </ul>
            </Card>

            <Card className="p-6 md:p-8 border-2 hover:border-gold transition-all bg-card/80">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-secondary/20 rounded-full flex items-center justify-center mb-4 md:mb-6">
                <Icon name="Banknote" size={28} className="text-secondary" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Кредит</h3>
              <ul className="space-y-2 md:space-y-3 text-sm md:text-base text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                  <span>Ставка от 0.1% годовых</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                  <span>Срок до 7 лет</span>
                </li>
                <li className="flex items-start gap-2">
                  <Icon name="Check" size={18} className="text-secondary mt-0.5 flex-shrink-0" />
                  <span>Одобрение за 30 минут</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Почему мы?</h2>
            <p className="text-sm md:text-lg text-muted-foreground font-light">Ваша уверенность в покупке</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { icon: 'Building2', title: 'Собственный склад', desc: 'Более 200 авто всегда в наличии на нашем складе в Минске' },
              { icon: 'Wrench', title: 'Свой сервис-центр', desc: 'Профессиональное обслуживание и ремонт всех китайских марок' },
              { icon: 'Award', title: '12 лет опыта', desc: 'Более 5000 довольных клиентов по всей Беларуси' }
            ].map((item, i) => (
              <Card key={i} className="p-6 md:p-8 text-center border hover:border-gold transition-all hover:shadow-xl bg-card/80">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gold/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                  <Icon name={item.icon as any} size={32} className="text-primary" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3">{item.title}</h3>
                <p className="text-sm md:text-base text-muted-foreground font-light">{item.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 bg-gradient-to-br from-gold/10 to-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8 md:mb-10">
              <Badge className="mb-4 md:mb-6 bg-gold/20 text-gold border-gold/30 px-4 md:px-6 py-1 md:py-2 text-xs md:text-sm">
                Бесплатная консультация
              </Badge>
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-4">Оставьте заявку</h2>
              <p className="text-sm md:text-base text-muted-foreground font-light">
                Мы перезвоним в течение 5 минут и ответим на все вопросы
              </p>
            </div>

            <Card className="p-6 md:p-8 border-2 bg-card/90 backdrop-blur-sm">
              <form className="space-y-4 md:space-y-6">
                <div>
                  <Input 
                    placeholder="Ваше имя" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="h-11 md:h-12 text-sm md:text-base"
                  />
                </div>
                <div>
                  <Input 
                    placeholder="Телефон" 
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="h-11 md:h-12 text-sm md:text-base"
                  />
                </div>
                <div>
                  <Textarea 
                    placeholder="Комментарий (необязательно)" 
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="min-h-[80px] md:min-h-[100px] text-sm md:text-base"
                  />
                </div>
                <Button className="w-full bg-gold text-gold-foreground hover:bg-gold/90 shadow-lg h-11 md:h-12 text-sm md:text-base font-medium">
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить заявку
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
                </p>
              </form>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-gold/20 rounded-lg flex items-center justify-center">
                  <span className="text-lg md:text-2xl">🚗</span>
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-bold">Авто из Китая</h3>
                  <p className="text-xs text-primary-foreground/60">Новые и БУ</p>
                </div>
              </div>
              <p className="text-xs md:text-sm text-primary-foreground/80 font-light">
                Официальный импортер китайских автомобилей и мотоциклов
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-gold text-sm md:text-base">Контакты</h4>
              <div className="space-y-2 md:space-y-3 text-xs md:text-sm font-light">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={14} />
                  <span>+375 29 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={14} />
                  <span>info@china-cars.by</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="MapPin" size={14} />
                  <span>г. Минск, ул. Автомобильная, 1</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3 md:mb-4 text-gold text-sm md:text-base">Режим работы</h4>
              <div className="space-y-1 md:space-y-2 text-xs md:text-sm text-primary-foreground/80 font-light">
                <p>Пн-Пт: 9:00 - 19:00</p>
                <p>Сб: 10:00 - 16:00</p>
                <p>Вс: по записи</p>
              </div>
            </div>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-4 md:pt-6 text-center text-xs md:text-sm text-primary-foreground/60">
            © 2024 Авто из Китая. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
