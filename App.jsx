import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, MapPin, MessageCircle, Volume2, VolumeX, Clock, CalendarHeart } from 'lucide-react';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [showDoors, setShowDoors] = useState(true);
  
  // Audio State
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  // Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Target Date for the wedding/engagement (22 June 2026)
  const targetDate = new Date('2026-06-22T20:00:00').getTime();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  // فتح الدعوة وإخفاء الأبواب وتشغيل الموسيقى
  const handleOpenInvitation = () => {
    setIsOpen(true);
    
    if (audioRef.current) {
      audioRef.current.volume = 0.5;
      const playPromise = audioRef.current.play();
      
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setIsPlaying(true);
        }).catch(error => {
          console.error("Auto-play was prevented by the browser:", error);
        });
      }
    }

    setTimeout(() => {
      setShowDoors(false);
    }, 1500);
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
              console.error("Play prevented:", error);
            });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#fcf9f2] text-slate-800 overflow-x-hidden font-cairo" dir="rtl">
      
      {/* Audio Element */}
      <audio 
        ref={audioRef} 
        src="https://cdn.pixabay.com/download/audio/2022/04/27/audio_67b43b679b.mp3?filename=piano-moment-9835.mp3" 
        loop
        preload="auto"
      />

      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Aref+Ruqaa:wght@400;700&family=Cairo:wght@400;600;700&display=swap');
        
        .font-aref { font-family: 'Aref Ruqaa', serif; }
        .font-cairo { font-family: 'Cairo', sans-serif; }
        
        .door-container { perspective: 1200px; }
        
        .door-left, .door-right {
          transition: transform 1.5s cubic-bezier(0.645, 0.045, 0.355, 1);
          transform-style: preserve-3d;
        }
        
        .door-left { transform-origin: left center; }
        .door-left.is-open { transform: rotateY(100deg); }
        
        .door-right { transform-origin: right center; }
        .door-right.is-open { transform: rotateY(-100deg); }

        .fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
          opacity: 0;
          transform: translateY(20px);
        }
        
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />

      {showDoors && (
        <div className="door-container fixed inset-0 z-50 flex h-full w-full overflow-hidden bg-black">
          <div className={`door-left relative w-1/2 h-full bg-[#1e293b] flex items-center justify-end border-r-2 border-[#d4af37] ${isOpen ? 'is-open' : ''}`}>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>
            <div className="w-4 h-16 bg-[#d4af37] rounded-l-full mr-4 shadow-lg"></div>
          </div>

          <div className={`door-right relative w-1/2 h-full bg-[#1e293b] flex items-center justify-start border-l-2 border-[#d4af37] ${isOpen ? 'is-open' : ''}`}>
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/arabesque.png')] pointer-events-none"></div>
            <div className="w-4 h-16 bg-[#d4af37] rounded-r-full ml-4 shadow-lg"></div>
          </div>

          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 transition-opacity duration-700 ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <button 
              onClick={handleOpenInvitation}
              className="group relative flex flex-col items-center justify-center w-40 h-40 bg-[#1e293b] rounded-full border-4 border-[#d4af37] shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] transition-all duration-300 hover:scale-105"
            >
              <Heart className="text-[#d4af37] w-10 h-10 mb-2 group-hover:animate-pulse" />
              <span className="text-[#d4af37] font-cairo font-bold text-center leading-tight">انقر لعرض<br/>الدعوة</span>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto min-h-screen flex flex-col bg-white shadow-2xl relative">
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none"></div>
        
        <main className="relative z-10 flex-grow px-4 md:px-6 py-16 flex flex-col items-center text-center pb-24">
          
          <div className="fade-in-up" style={{ animationDelay: '1.5s' }}>
            <p className="text-xl text-[#d4af37] font-aref mb-4">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="h-px w-16 bg-[#d4af37]"></div>
              <Sparkles className="text-[#d4af37] w-5 h-5" />
              <div className="h-px w-16 bg-[#d4af37]"></div>
            </div>
          </div>

          <div className="fade-in-up mb-8" style={{ animationDelay: '1.8s' }}>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed mb-2">
              بكل الحب والود، نتشرف بدعوتكم لمشاركتنا فرحتنا الكبرى
            </p>
            <p className="text-lg md:text-xl text-slate-600 font-bold">
              بمناسبة حفل خطوبتنا
            </p>
          </div>

          <div className="fade-in-up my-10 relative" style={{ animationDelay: '2.1s' }}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-100/50 via-transparent to-transparent -z-10 rounded-full blur-xl"></div>
            <h1 className="text-6xl md:text-8xl font-aref text-[#1e293b] leading-tight flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <span>أحمد</span>
              <span className="text-4xl md:text-6xl text-[#d4af37]">&</span>
              <span>ندى</span>
            </h1>
          </div>

          <div className="fade-in-up w-full mt-4 mb-12" style={{ animationDelay: '2.3s' }}>
            <div className="flex items-center justify-center gap-2 mb-6 text-[#d4af37]">
              <Clock className="w-5 h-5" />
              <h3 className="text-xl font-bold font-cairo">العد التنازلي</h3>
            </div>
            <div className="flex justify-center gap-3 md:gap-6 w-full max-w-md mx-auto" dir="ltr">
              {[
                { label: 'ثانية', value: timeLeft.seconds },
                { label: 'دقيقة', value: timeLeft.minutes },
                { label: 'ساعة', value: timeLeft.hours },
                { label: 'يوم', value: timeLeft.days }
              ].map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-[#1e293b] rounded-xl border-2 border-[#d4af37] flex items-center justify-center shadow-lg mb-2 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[#d4af37]/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    <span className="text-2xl md:text-3xl font-bold text-white relative z-10">{item.value}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-600">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="fade-in-up w-full space-y-6 max-w-xl mx-auto" style={{ animationDelay: '2.5s' }}>
            <div className="bg-[#1e293b]/5 rounded-2xl p-6 border border-[#d4af37]/20 flex flex-col items-center">
              <CalendarHeart className="w-8 h-8 text-[#d4af37] mb-3" />
              <h3 className="text-2xl font-aref text-[#1e293b] mb-2">الزمان</h3>
              <p className="text-2xl font-bold text-[#d4af37] font-cairo tracking-widest">22 / 06 / 2026</p>
            </div>
            
            <div className="bg-[#1e293b]/5 rounded-2xl p-6 border border-[#d4af37]/20">
              <h3 className="text-2xl font-aref text-[#d4af37] mb-2">المكان</h3>
              <p className="text-lg text-slate-700 font-bold mb-1">قاعة القصر الملكي</p>
              <p className="text-sm md:text-base text-slate-600">داخل مركز شباب بين السرايات</p>
              <p className="text-sm md:text-base text-slate-600 mb-6">بجانب مترو جامعة القاهرة</p>
              
              <a 
                href="https://maps.app.goo.gl/HhQHce2Eo5xvyjZE8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#1e293b] hover:bg-[#d4af37] text-white py-3 px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg w-full md:w-auto"
              >
                <MapPin className="w-5 h-5" />
                <span className="font-bold text-sm">عرض الموقع على الخريطة</span>
              </a>
            </div>
          </div>

        </main>
        
        <div className="w-full bg-[#f8fafc] py-8 px-6 flex flex-col items-center justify-center border-t border-[#e2e8f0] mt-auto">
          <p className="text-slate-700 mb-2 font-bold font-cairo">هل أعجبتك هذه الدعوة؟</p>
          <p className="text-slate-500 mb-5 text-sm text-center max-w-sm">يمكنك الحصول على دعوة إلكترونية احترافية مشابهة لمناسبتك السعيدة</p>
          <a
            href="https://wa.me/201286094595?text=مرحباً، أريد تصميم دعوة إلكترونية مشابهة"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-[#25D366] text-white py-3 px-8 rounded-full hover:bg-[#128C7E] transition-transform hover:scale-105 shadow-md font-bold text-sm"
          >
            <MessageCircle className="w-5 h-5" />
            <span>تواصل معي لطلب تصميم</span>
          </a>
        </div>

        <footer className="py-6 text-center text-slate-400 text-sm bg-white border-t border-slate-100">
          <p>ألف مبروك للعروسين • {new Date().getFullYear()}</p>
        </footer>

        {isOpen && (
          <button
            onClick={toggleAudio}
            className="fixed bottom-6 right-6 z-40 bg-white/90 backdrop-blur border border-[#d4af37] p-3 rounded-full shadow-[0_4px_15px_rgba(212,175,55,0.3)] text-[#d4af37] hover:bg-[#d4af37] hover:text-white transition-all duration-300"
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? <Volume2 className="w-6 h-6 animate-pulse" /> : <VolumeX className="w-6 h-6" />}
          </button>
        )}

      </div>
    </div>
  );
}