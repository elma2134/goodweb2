import { useState } from 'react';
import { Scissors, Sparkles, Heart, Calendar, Star, MapPin, Phone, MessageCircle, Clock, CheckCircle2, Shield } from 'lucide-react';
import { Dashboard } from './components/Dashboard';
import { LoginPage } from './components/LoginPage';

function BookingSuccessMessage() {
  return (
    <div className="mb-8 bg-green-100 border-2 border-green-500 rounded-2xl p-6 flex items-center gap-3">
      <CheckCircle2 className="w-8 h-8 text-green-500" />
      <div>
        <div className="font-bold text-green-800">จองคิวสำเร็จ!</div>
        <div className="text-green-700">เราจะติดต่อกลับเพื่อยืนยันนัดหมายในเร็วๆนี้ค่ะ</div>
      </div>
    </div>
  );
}

export default function App() {
  const [formData, setFormData] = useState({
    ownerName: '',
    petName: '',
    petType: '',
    service: '',
    date: '',
    time: '',
    phone: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  
const [activeMenu, setActiveMenu] = useState('booking');

// Sync activeMenu with scroll position
import { useEffect, useRef } from 'react';

const sectionIds = ['services', 'gallery', 'testimonials', 'booking'];
const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

useEffect(() => {
  const handleScroll = () => {
    let current = sectionIds[0];
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      sectionRefs.current[id] = el;
      if (el) {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 120) {
          current = id;
        }
      }
    }
    setActiveMenu(current);
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  const menus = [
  { id: 'services', label: 'บริการ' },
  { id: 'gallery', label: 'ผลงาน' },
  { id: 'testimonials', label: 'รีวิว' },
  { id: 'booking', label: 'จองคิว' },
];
  
  const services = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'อาบน้ำ - ตัดเล็บ',
      price: 'เริ่มต้น 200 บาท',
      description: 'บริการอาบน้ำพร้อมแชมพูคุณภาพ แปรงขน ตัดเล็บ และทำความสะอาดหู',
      features: ['แชมพูออร์แกนิค', 'ตัดเล็บและขัด', 'ทำความสะอาดหู', 'ขูดขน']
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'อาบน้ำ - ไถขนสั้น',
      price: 'เริ่มต้น 400 บาท',
      description: 'บริการไถขนสั้น พร้อมดูแลสุขภาพผิวหนัง',
      features: ['อาบน้ำ-ไถขน','ไถสั้นก็น่ารักได้','โดยสัตวแพทย์ด้านผิวหนัง']
    },
    {
      icon: <Scissors className="w-8 h-8" />,
      title: 'อาบน้ำ - ตัดขนทรงสวย',
      price: 'เริ่มต้น 500 บาท',
      description: 'บริการตัดขนแบบครบวงจร ทั้งอาบน้ำและตัดทรงตามสายพันธุ์',
      features: ['มีบริการรับส่ง','ไถเท้าท้องก้น','ตัดทรงตามสายพันธุ์']
},
  ];

  const galleryImages = [
    'https://images.unsplash.com/photo-1733964659477-35534815c626?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjdXRlJTIwZ3Jvb21lZCUyMGRvZyUyMGFmdGVyJTIwYmF0aHxlbnwxfHx8fDE3NzgxNTI1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1611173622933-91942d394b04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxkb2clMjBncm9vbWluZyUyMHNwYSUyMHNhbG9ufGVufDF8fHx8MTc3ODE1MjUyMXww&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1629030502047-b6ac6d4a78b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjdXRlJTIwZ3Jvb21lZCUyMGRvZyUyMGFmdGVyJTIwYmF0aHxlbnwxfHx8fDE3NzgxNTI1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1678153188688-0dc45722708a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxMHx8Y3V0ZSUyMGdyb29tZWQlMjBkb2clMjBhZnRlciUyMGJhdGh8ZW58MXx8fHwxNzc4MTUyNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1641290378771-563a05ed1e66?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw2fHxjdXRlJTIwZ3Jvb21lZCUyMGRvZyUyMGFmdGVyJTIwYmF0aHxlbnwxfHx8fDE3NzgxNTI1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    'https://images.unsplash.com/photo-1588112141571-959b20dbf541?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjdXRlJTIwZ3Jvb21lZCUyMGRvZyUyMGFmdGVyJTIwYmF0aHxlbnwxfHx8fDE3NzgxNTI1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  ];

  const testimonials = [
    {
      name: 'คุณสมศรี',
      pet: 'น้องมะลิ (ปอม)',
      rating: 5,
      text: 'พนักงานบริการดีมาก อ่อนโยน ใส่ใจทุกขั้นตอน น้องมะลิสวยมากเลยค่ะ จะมาใช้บริการอีกแน่นอน!'
    },
    {
      name: 'คุณวิทย์',
      pet: 'น้องโชคดี (ชิสุ)',
      rating: 5,
      text: 'ประทับใจมากครับ ตัดขนออกมาสวยงาม น้องโชคดีชอบที่นี่มาก แพ็คเกจสปาคุ้มค่าทุกบาทเลย'
    },
    {
      name: 'คุณนภา',
      pet: 'น้องลูกหมี (พุดเดิ้ล)',
      rating: 5,
      text: 'มืออาชีพจริงๆ ทั้งตัดทรงสวย อาบน้ำสะอาด น้องลูกหมีตื่นเต้นทุกครั้งที่พามาค่ะ จองออนไลน์ก็สะดวกดีด้วย'
    }
  ];


  const handleLogin = (username: string) => {
    setCurrentUser(username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  if (isAdmin) {
    return (
      <div className="min-h-screen bg-slate-100">
        <button
          onClick={() => setIsAdmin(false)}
          className="fixed top-4 left-4 z-50 bg-pink-500 text-white px-5 py-3 rounded-full shadow-xl transition-all duration-300 hover:bg-pink-600 hover:shadow-2xl hover:scale-105 active:scale-95"
        >
          ← กลับหน้าเว็บไซต์
        </button>

        {isLoggedIn ? (
          <Dashboard currentUser={currentUser} onLogout={handleLogout} />
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </div>
    );
  }

 const handleSubmit = async (e: React.FormEvent) => {

  e.preventDefault();

  try {

    const response = await fetch(
      'https://script.google.com/macros/s/AKfycbyPdA4wR-xhgIuDeRdogGhMw38lqrNLrIwpABLnEHD6n6MUcEOORfbnbzfQPF7YOiZ-/exec',
      {
        method: 'POST',

        body: new URLSearchParams({
          action: 'createBooking',

          ownerName: formData.ownerName,
          petName: formData.petName,
          petType: formData.petType,
          service: formData.service,

          dateTime: `${formData.date} ${formData.time}`,

          phone: formData.phone,
        }),
      }
    );

    const data = await response.json();

    if (data.success) {

      setShowSuccess(true);

      setTimeout(() => {
        setShowSuccess(false);
      }, 5000);

      setFormData({
        ownerName: '',
        petName: '',
        petType: '',
        service: '',
        date: '',
        time: '',
        phone: '',
      });

    } else {

      alert(data.error || 'ไม่สามารถจองได้');

    }

  } catch (error) {

    console.error(error);

    alert('เกิดข้อผิดพลาด กรุณาลองใหม่');
  }
};

const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/70 border-b border-white/20 backdrop-blur-xl backdrop-blur-sm shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Heart className="w-8 h-8 text-pink-500" />
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                Happy Spa Grooming Dog&Cat
              </span>
            </div>

<div className="hidden md:flex">
  <div className="relative flex items-center bg-white/80 backdrop-blur-xl p-2 rounded-full shadow-lg border border-pink-100">

    {/* Animated Background */}
    <div
      className="absolute top-2 bottom-2 rounded-full bg-gradient-to-r from-pink-500 to-pink-400 shadow-md"
      style={{
        width: '110px',
        left:
          activeMenu === 'services'
            ? '8px'
            : activeMenu === 'gallery'
            ? '118px'
            : activeMenu === 'testimonials'
            ? '228px'
            : '338px',
        transition: 'left 0.5s cubic-bezier(0.4, 0.0, 0.2, 1)',
      }}
    />

    {menus.map((menu) => (
      <button
        key={menu.id}
        onClick={() => {
          setActiveMenu(menu.id);
          scrollToSection(menu.id);
        }}
        className={`relative z-10 w-[110px] py-3 rounded-full font-semibold ${
          activeMenu === menu.id
            ? 'text-white'
            : 'text-gray-700 hover:text-pink-500 transition-colors duration-300'
        }`}
      >
        {menu.label}
      </button>
    ))}
  </div>
</div>

</div>
</div>
</nav>

{/* Hero Section */}
<section className="pt-16 min-h-screen relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffd6ec,transparent_30%),radial-gradient(circle_at_bottom_right,#dbeafe,transparent_30%),linear-gradient(to_bottom_right,#fff1f2,#faf5ff,#eff6ff)]"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                Happy
                <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent"> Grooming spa Dog&Cat</span>
              </h1>
              <p className="text-xl text-gray-600">
                บริการอาบน้ำ ตัดขน สปา สำหรับสุนัขและแมว ด้วยความใส่ใจและมาตรฐานระดับพรีเมียม
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('booking')}
                  className="bg-pink-500 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 hover:bg-pink-600 hover:shadow-xl shadow-lg hover:scale-105 active:scale-95"
                >
                  จองคิวเลย
                </button>
                <button
                  onClick={() => scrollToSection('services')}
                  className="bg-white text-pink-500 px-8 py-4 rounded-full text-lg font-semibold border-2 border-pink-500 transition-all duration-300 hover:bg-gray-50 hover:shadow-lg hover:scale-105"
                >
                  ดูบริการ
                </button>
              </div>
              <div className="flex gap-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-500">10K+</div>
                  <div className="text-gray-600">น้องๆที่ไว้วางใจ</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-500">10+</div>
                  <div className="text-gray-600">ปีของประสบการณ์</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-pink-500">5.0</div>
                  <div className="text-gray-600">คะแนนรีวิว</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-3xl transform rotate-6"></div>
              <img
                src="https://images.unsplash.com/photo-1733964659477-35534815c626?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjdXRlJTIwZ3Jvb21lZCUyMGRvZyUyMGFmdGVyJTIwYmF0aHxlbnwxfHx8fDE3NzgxNTI1MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Happy groomed dog"
                className="relative rounded-3xl shadow-2xl object-cover w-full h-[600px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">บริการของเรา</h2>
            <p className="text-xl text-gray-600">ดูแลน้องๆด้วยความใส่ใจในทุกรายละเอียด</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-2 hover:rotate-1">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-6 text-pink-500">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2">{service.title}</h3>
                <div className="text-3xl font-bold text-pink-500 mb-4">{service.price}</div>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <ul className="space-y-3">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

   {/* Facebook + TikTok */}
<section
  id="gallery"
  className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 overflow-hidden"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* TITLE */}
    <div className="text-center mb-16">
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        ผลงานล่าสุดหน้าเพจ
      </h2>

      <p className="text-xl text-gray-600">
        รีวิว ผลงาน และคลิปล่าสุดจาก Facebook & TikTok
      </p>
    </div>

    {/* 2 COLUMN */}
    <div className="grid lg:grid-cols-2 gap-8 items-stretch">

      {/* FACEBOOK */}
      <div
        className="
        h-[820px]
        bg-white/90
        backdrop-blur-xl
        rounded-[36px]
        shadow-[0_20px_80px_rgba(0,0,0,0.12)]
        border border-pink-100
        overflow-hidden
        p-4 md:p-6
        flex flex-col
      "
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.17 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.77l-.44 2.91h-2.33V22c4.78-.77 8.44-4.92 8.44-9.94z"/>
            </svg>
          </div>

          <div>
            <h3 className="text-2xl font-bold">
              Facebook Page
            </h3>

            <p className="text-gray-500">
              รีวิวและผลงานล่าสุด
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden rounded-[28px]">

          <div
            className="fb-page w-full"
            data-href="https://www.facebook.com/Happygroomingspa/"
            data-tabs="timeline"
            data-width="550"
            data-height="720"
            data-small-header="false"
            data-adapt-container-width="true"
            data-hide-cover="false"
            data-show-facepile="true"
          >
            <blockquote
              cite="https://www.facebook.com/Happygroomingspa/"
              className="fb-xfbml-parse-ignore"
            >
              <a href="https://www.facebook.com/Happygroomingspa/">
                Happy Grooming Spa
              </a>
            </blockquote>
          </div>

        </div>
      </div>

      {/* TIKTOK */}
      <div
        className="
        h-[820px]
        bg-white/90
        backdrop-blur-xl
        rounded-[36px]
        shadow-[0_20px_80px_rgba(0,0,0,0.12)]
        border border-pink-100
        overflow-hidden
        p-4 md:p-6
        flex flex-col
      "
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center shrink-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.1v13.4a2.62 2.62 0 1 1-2.62-2.62c.2 0 .39.02.58.06V9.67a5.76 5.76 0 1 0 5.14 5.73V8.53a7.9 7.9 0 0 0 4.6 1.47V6.9c-.28 0-.55-.07-.83-.21z"/>
            </svg>
          </div>

          <div>
            <h3 className="text-2xl font-bold">
              TikTok
            </h3>

            <p className="text-gray-500">
              คลิปน้องๆล่าสุด
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden rounded-[28px] bg-black">

  {/* Responsive: Move styles to CSS or use Tailwind for consistency */}
</section>
      iframe {
        min-height: 700px;
      }
    }

    @media (max-width: 768px) {
      iframe {
        min-height: 600px;
      }
    }
  `}</style>
</section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">รีวิวจากลูกค้า</h2>
            <p className="text-xl text-gray-600">ความประทับใจจากเจ้าของน้องๆ</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                <div className="border-t border-gray-200 pt-4">
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-gray-600 text-sm">{testimonial.pet}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="booking" className="py-20 bg-gradient-to-br from-pink-100 to-purple-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">จองคิวออนไลน์</h2>
            <p className="text-xl text-gray-600">จองง่าย สะดวก รวดเร็ว</p>
          </div>

          {showSuccess && <BookingSuccessMessage />}

          <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl p-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">ชื่อเจ้าของ</label>
                <input
                  type="text"
                  required
                  value={formData.ownerName}
                  onChange={(e) => setFormData({...formData, ownerName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-200"
                  placeholder="กรอกชื่อของคุณ"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">ชื่อสัตว์เลี้ยง</label>
                <input
                  type="text"
                  required
                  value={formData.petName}
                  onChange={(e) => setFormData({...formData, petName: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-200"
                  placeholder="กรอกชื่อน้อง"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">ประเภทสัตว์เลี้ยง</label>
                <select
                  required
                  value={formData.petType}
                  onChange={(e) => setFormData({...formData, petType: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-200"
                >
                  <option value="">เลือกประเภทสัตว์เลี้ยง</option>
                  <option value="dog">สุนัข</option>
                  <option value="cat">แมว</option>
                  <option value="other">อื่นๆ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">เลือกบริการ</label>
                <select
                  required
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-200"
                >
                  <option value="">เลือกบริการ</option>
                  <option value="bath">อาบน้ำ - ตัดเล็บ</option>
                  <option value="grooming">อาบน้ำ - ไถขนสั้น</option>
                  <option value="spa">อาบน้ำ - ตัดขนทรงสวย</option>
                </select>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">วันที่ต้องการ</label>
                <input
                  type="date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-200"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">เวลาที่ต้องการ</label>
                <select
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({...formData, time: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-200"
                >
                  <option value="">เลือกเวลา</option>
                  <option value="10:00">10:00 น.</option>
                  <option value="12:00">12:00 น.</option>
                  <option value="14:00">14:00 น.</option>
                  <option value="16:00">16:00 น.</option>
                  <option value="18:00">18:00 น.</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">เบอร์โทรศัพท์</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-pink-500 focus:outline-none transition-all duration-300 focus:shadow-lg focus:shadow-pink-200"
                placeholder="08X-XXX-XXXX"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:from-pink-600 hover:to-purple-700 hover:shadow-xl shadow-lg hover:scale-105 active:scale-95"
            >
              ยืนยันการจอง
            </button>
          </form>
        </div>
      </section>

      {/* Contact/Footer Section */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 text-2xl font-bold mb-4">
                <Heart className="w-8 h-8 text-pink-500" />
                <span>Happy Spa</span>
              </div>
              <p className="text-gray-400">
                บริการอาบน้ำ ตัดขน สปา ด้วยความรักและใส่ใจในทุกรายละเอียด
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">เมนูหลัก</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => scrollToSection('services')} className="transition-colors duration-300 hover:text-pink-500">บริการ</button></li>
                <li><button onClick={() => scrollToSection('gallery')} className="transition-colors duration-300 hover:text-pink-500">ผลงาน</button></li>
                <li><button onClick={() => scrollToSection('booking')} className="transition-colors duration-300 hover:text-pink-500">จองคิว</button></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">เวลาทำการ</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  จันทร์-อาทิตย์: 10:00-21:00
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">ติดต่อเรา</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  096-137-2568 , 091-8046068
                </li>
                <li className="flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  @Groomingspa
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  308 Tha Kham 28 Alley, Samae Dam, Bang Khun Thian, Bangkok 10150
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Happy Spa Grooming Dog&Cat. สงวนลิขสิทธิ์</p>
          </div>
        </div>
      </footer>
      {/* Floating Buttons */}
<div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">

  {/* LINE */}
  <a
    href="https://line.me/ti/p/@Groomingspa"
    target="_blank"
    className="w-14 h-14 rounded-full bg-green-500 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
  >
    <MessageCircle className="text-white w-7 h-7" />
  </a>

  {/* Facebook */}
  <a
    href="https://www.facebook.com/Happygroomingspa/"
    target="_blank"
    className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="white"
      viewBox="0 0 24 24"
      className="w-7 h-7"
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.17 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.77l-.44 2.91h-2.33V22c4.78-.77 8.44-4.92 8.44-9.94z"/>
    </svg>
  </a>

  {/* TikTok */}
<a
  href="https://www.tiktok.com/@happygroomingspacatdog"
  target="_blank"
  className="w-14 h-14 rounded-full bg-black flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="white"
    className="w-7 h-7"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.1v13.4a2.62 2.62 0 1 1-2.62-2.62c.2 0 .39.02.58.06V9.67a5.76 5.76 0 1 0 5.14 5.73V8.53a7.9 7.9 0 0 0 4.6 1.47V6.9c-.28 0-.55-.07-.83-.21z"/>
  </svg>
</a>

  {/* Phone */}
  <a
    href="tel:0961372568"
    className="w-14 h-14 rounded-full bg-pink-500 flex items-center justify-center shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
  >
    <Phone className="text-white w-7 h-7" />
  </a>
</div>

{/* Admin Button */}
<button
  onClick={() => setIsAdmin(true)}
  className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-4 rounded-full shadow-2xl flex items-center gap-2 transition-all duration-300 hover:scale-110 hover:shadow-3xl active:scale-95"
>
  <Shield className="w-5 h-5" />
  Admin Dashboard
</button>
    </div>
  );
}

