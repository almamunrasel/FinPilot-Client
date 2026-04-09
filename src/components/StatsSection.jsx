import React from 'react';

const StatCard = ({ percentage, description }) => (
  <div className="bg-white p-8 rounded-xl shadow-sm border-b-8 border-[#2DD4BF] flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
    <h3 className="text-5xl lg:text-6xl font-black text-[#161c5f] mb-4">{percentage}</h3>
    <p className="text-[#161c5f] font-medium leading-relaxed">
      {description}
    </p>
  </div>
);

const StatsSection = () => {
  return (
    <section className="relative bg-[#F4F9DD] pt-20 pb-32 overflow-hidden">
      {/* Curved Background Wrapper */}
     <div className="absolute inset-0 z-0 pointer-events-none ">
        <svg 
          className="absolute bottom-0 left-0 w-full h-[70%]" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
        >
          <path 
            /* The lower color from your image */
            fill="#FDF5D3" 
            d="M0,160 C480,350 960,0 1440,160 L1440,320 L0,320 Z"
          />
        </svg>
     </div>

      <div className="container mx-auto px-6 lg:px-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Text Content */}
          <div className="w-full lg:w-2/5 space-y-6">
            <h2 className="text-4xl lg:text-5xl font-black text-[#161c5f] leading-tight">
              We’re #1 for a reason...
            </h2>
            <p className="text-gray-500 italic text-sm">
              (and not just because our mom said so.)
            </p>
            <p className="text-[#161c5f] text-lg leading-relaxed">
              FinPilot simplifies spending decisions, clarifies priorities, and brings more joy to every day and every dollar by making it easy to get good at money. Just give every dollar a job and never worry about money again.
            </p>
            <button className="mt-4 px-8 py-3 border-2 border-indigo-600 text-indigo-600 font-bold rounded-lg transition-all hover:bg-indigo-50 active:scale-95">
              Learn More About the Method
            </button>
          </div>

          {/* Right Cards Grid */}
          <div className="w-full lg:w-3/5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <StatCard 
              percentage="90%" 
              description="say their finances are in a better place since starting FinPilot*" 
            />
            <StatCard 
              percentage="91%" 
              description="say FinPilot has changed the way they think about money*" 
            />
            <StatCard 
              percentage="70%" 
              description="of FinPilot users could live for 3 months or more on savings*" 
            />
            <StatCard 
              percentage="93%" 
              description="have recommended FinPilot to friends or family*" 
            />
          </div>
        </div>
        
        {/* Footer Note */}
        <p className="text-right text-[10px] text-gray-400 mt-12 w-full uppercase tracking-widest">
          *based on survey responses
        </p>

        {/* <p className='text-center text-2xl mt-40 '>FinPilot isn’t just a tool for money management. It’s a tool for self-actualization. Who do you want to be, and how can the money you earn help you get there?”</p> */}
      </div>

       

    </section>
  );
};

export default StatsSection;