'use client';

import Image from 'next/image';

const MealCard = ({ meal, isSelected, allowSelect, weekKey, onSelect, onDelete }) => {
  return (
    <div 
      onClick={() => allowSelect && onSelect(meal)}
      className={`relative bg-white rounded-[20px] overflow-hidden transition-all duration-300 shadow-lg py-6 px-6 ${
        allowSelect && isSelected
          ? 'ring-4 ring-[#004370] scale-[1.02]'
          : 'hover:scale-[1.02]'
      }`}
    >
      <div className="absolute top-10 right-10 z-10">
        <span className="bg-black text-white text-sm px-4 py-1 rounded-full">
          {meal.tags?.[0] || 'Dinner'}
        </span>
      </div>
      <div className="relative h-[240px] w-full">
        {!allowSelect && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(weekKey, meal.id);
            }}
            className="absolute top-4 left-4 z-10 bg-[#004370] hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-300"
            title="Delete meal"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        )}
        <Image
          src={meal.image || '/placeholder-meal.jpg'}
          alt={meal.name}
          fill
          className="object-cover rounded-[20px]"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {allowSelect && isSelected && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="bg-[#004370] rounded-full p-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        )}
      </div>
      <div className="py-4 px-1">
        <h3 className="font-bold text-xl text-[#191919] mb-3 font-poppins ">{meal.name}</h3>
        <p className="text-[#404040] text-sm mb-4 line-clamp-3">
          {meal.instructions.join(' ') || 'Preheat the oven to 475°F (245°C). Roll out the pizza dough and spread with tomato sauce evenly. Top with slices of fresh mozzarella and fresh basil leaves. Drizzle with olive oil and season with salt and pepper. Bake in the preheated oven for 12-15 minutes or until the crust is golden brown. Slice and serve hot.'}
        </p>
        <div className="flex items-center space-x-2 justify-between max-sm:flex-col max-sm:space-x-0 max-sm:justify-center max-sm:items-start max-sm:space-y-2">
          <div className="flex items-center gap-2 max-xl:gap-1">
            <span className="text-sm text-[#2D2D2D] font-bold">Cuisine:</span>
            <span className="text-sm font-medium text-[#2D2D2D]">{meal.cuisine || 'Italian'}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-sm text-[#2D2D2D] font-bold">Rating:</span>
            <span className="text-sm font-semibold text-[#2D2D2D]">{meal.rating || '4.8'}</span>
            <div className="flex items-center ml-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className={`w-4 h-4 ${star <= Math.floor(meal.rating || 4.8) ? 'text-[#004370]' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealCard;
