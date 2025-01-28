'use client';

import { Allan } from "next/font/google";

const StickyHeader = ({ tabs, activeTab, selectedMeals, onTabChange, onAddToWeek }) => {
  return (
    <div className="sticky top-0 z-20 bg-white shadow-md">
      <div className="max-w-[1920px] mx-auto py-8 px-4 max-sm:py-3">
        <div className="flex flex-wrap items-center justify-between gap-2 max-sm:gap-0 max-sm:flex-col">
          <h2 className="text-3xl font-bold text-[#2D2D2D]">Week Orders</h2>
          <div className="flex flex-1 flex-wrap items-center justify-center gap-3 px-4 max-sm:py-2  mx-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`px-12 py-3  text-md  font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'text-[#004370] border-b-[4px] border-[#004370]'
                    : 'text-black hover:border-b-[4px] hover:border-[#004370] hover:text-[#004370]'
                }
                ${tab.id === 'all'
                  ? 'max-sm:w-[80%]'
                  : ''
                }
                ` 
              }
              >
                {tab.label}
              </button>
            ))}
          </div>
      
            <button
              onClick={onAddToWeek}
              className={`bg-[#004370] text-white px-6 py-3 rounded-lg font-medium text-lg shadow-lg shadow-[#FF6B57]/30 hover:bg-[#004370] hover:bg-opacity-50 transition-colors duration-300 whitespace-nowrap ${selectedMeals.length > 0 ? 'opacity-100' : 'opacity-0'}`}
            >
              Add to Week
            </button>
        
        </div>
      </div>
    </div>
  );
};

export default StickyHeader;
