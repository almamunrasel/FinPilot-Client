import React from 'react';

const AppCategory = ({ icon, label, amount, type }) => (
  <div className="flex items-center justify-between p-2 rounded-lg border border-gray-100 hover:bg-gray-50 transition cursor-default">
    <div className="flex items-center gap-2">
      <span className="text-lg">{icon}</span>
      <span className="font-semibold text-gray-800 text-sm">{label}</span>
    </div>
    <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${type === 'amount' ? 'text-green-700 bg-green-100' : 'text-blue-700 bg-blue-100'}`}>
      {type === 'amount' ? amount : 'Review'}
    </div>
  </div>
);

const Hero = () => {
  const billsConfig = [
    { top: '15%', left: '30%', rotate: -20, delay: '0s' },
    { top: '30%', left: '28%', rotate: 15, delay: '1s' },
    { top: '15%', left: '70%', rotate: -35, delay: '2s' },
    { top: '38%', left: '65%', rotate: -15, delay: '0.5s' },
    { top: '68%', left: '25%', rotate: 15, delay: '1.5s' },
    { top: '78%', left: '65%', rotate: -5, delay: '3s' },
    { top: '50%', left: '62%', rotate: -5, delay: '3.5s' },
    { top: '50%', left: '25%', rotate: -5, delay: '1.2s' },
    { top: '2%', left: '50%', rotate: -5, delay: '0.8s' },
    { top: '85%', left: '40%', rotate: -5, delay: '2.5s' }
  ];


  return (
  <section className="relative w-full min-h-screen bg-[#4C3BFF] overflow-hidden text-white flex items-center py-12 lg:py-0">
    {/* Animation Styles */}
    <style>{`
      @keyframes float {
        0%, 100% { transform: translateY(0) rotate(var(--base-rotation)); }
        50% { transform: translateY(-20px) rotate(calc(var(--base-rotation) + 2deg)); }
      }

      @keyframes phoneEntry {
        0%, 100% {
          transform: rotateX(10deg) rotateY(-10deg) rotateZ(8deg) translateZ(0px) translateY(0px);
        }
        50% {
          transform: rotateX(15deg) rotateY(-5deg) rotateZ(6deg) translateZ(40px) translateY(20px);
        }
      }

      .animate-float {
        animation: float 6s ease-in-out infinite;
        --base-rotation: 0deg;
      }

      .animate-phone-3d {
        animation: phoneEntry 8s ease-in-out infinite;
        transform-style: preserve-3d;
      }
    `}</style>

    {/* Background Curves */}
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="absolute bottom-0 left-0 w-full h-full"
        viewBox="0 0 1440 800"
        preserveAspectRatio="none"
      >
        <path fill="#2DD4BF" d="M1000,800 L1440,800 L1440,400 Q1200,600 1000,800 Z" />
      </svg>

      <svg
        className="absolute bottom-0 left-0 w-full h-[50%] md:h-[60%]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path fill="#F4F9DD" d="M0,320L1440,320L1440,120C1200,250 800,0 0,160Z" />
      </svg>
    </div>

    <div className="container mx-auto px-4 sm:px-6 lg:px-16 relative z-10">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

        {/* Left Side */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[0.95] tracking-tight">
            Bad at money?
            <br />
            <span>FinPilot can help.</span>
          </h1>

          <p className="text-lg sm:text-xl lg:text-2xl text-white/80 font-medium italic">
            Start your free trial and get good at money.
          </p>

          <div className="pt-2">
            <button className="bg-[#b4f05a] text-[#161c5f] font-black text-base sm:text-lg lg:text-xl px-6 sm:px-8 py-4 rounded-xl transition-all hover:scale-105">
              Start Your Free Trial
            </button>

            <p className="text-xs sm:text-sm text-white/60 mt-4">
              It's easy! No credit card required.
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div className="relative w-full lg:w-1/2 min-h-[400px] sm:min-h-[500px] md:min-h-[600px] flex items-center justify-center [perspective:1000px]">

          {/* Floating Bills */}
          {billsConfig.slice(0, window.innerWidth < 640 ? 4 : billsConfig.length).map((bill, index) => (
            <div
              key={index}
              className="absolute animate-float z-20 hidden sm:block"
              style={{
                top: bill.top,
                left: bill.left,
                animationDelay: bill.delay,
                '--base-rotation': `${bill.rotate}deg`
              }}
            >
              <div className="w-12 sm:w-14 md:w-16 h-8 sm:h-9 md:h-10 bg-[#C1FF72] rounded-lg border-[3px] border-[#2D5A27] font-black text-[#2D5A27] flex items-center justify-center text-lg shadow-xl">
                $
              </div>
            </div>
          ))}

          {/* Phone */}
          <div className="animate-phone-3d relative w-56 sm:w-64 md:w-72 h-[420px] sm:h-[500px] md:h-[560px] bg-[#31388D] p-3 rounded-[35px] sm:rounded-[40px] shadow-2xl z-10">
            <div className="w-full h-full bg-white rounded-[28px] sm:rounded-[35px] overflow-hidden flex flex-col">

              <div className="p-4 sm:p-6 pb-2">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl sm:text-2xl font-black text-[#31388D]">
                    Home
                  </span>
                  <div className="w-7 h-7 rounded-full bg-gray-100" />
                </div>

                <div className="space-y-2">
                  <AppCategory label="4 New Transactions" type="review" />
                  <AppCategory label="$1,000 Ready to Assign" type="review" />
                </div>
              </div>

              <div className="flex-1 bg-gray-50/50 p-4 sm:p-6 space-y-3">
                <div className="font-bold text-[10px] text-gray-400 uppercase tracking-widest">
                  Top Priorities
                </div>

                <AppCategory icon="🛒" label="Groceries" amount="$450.00" type="amount" />
                <AppCategory icon="💞" label="Date nights" amount="$100.00" type="amount" />
                <AppCategory icon="🍽️" label="Dining out" amount="$125.00" type="amount" />

                <div className="font-bold text-[10px] text-gray-400 uppercase tracking-widest mt-4">
                  Summary
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-[10px] text-gray-400">Spent</div>
                    <div className="font-bold text-xs">$1,200</div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                    <div className="text-[10px] text-gray-400">Goals</div>
                    <div className="font-bold text-xs">85%</div>
                  </div>
                </div>
              </div>

              <div className="h-14 sm:h-16 border-t border-gray-100 flex justify-around items-center px-4 bg-white">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-5 h-5 sm:w-6 sm:h-6 rounded bg-gray-100" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

 
};

export default Hero;