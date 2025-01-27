'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Home() {
  const [meals, setMeals] = useState([]);
  const [activeTab, setActiveTab] = useState('all');
  const [weekMeals, setWeekMeals] = useState({
    week1: [],
    week2: [],
    week3: [],
    week4: []
  });
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [selectedWeek, setSelectedWeek] = useState('');
  const [showWeekSelect, setShowWeekSelect] = useState(false);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const response = await fetch('https://dummyjson.com/recipes');
        const data = await response.json();
        setMeals(data.recipes || []);
      } catch (error) {
        console.error('Error fetching meals:', error);
      }
    };
    fetchMeals();
  }, []);

  const handleMealSelect = (meal) => {
    setSelectedMeals(prev => 
      prev.includes(meal.id) 
        ? prev.filter(id => id !== meal.id)
        : [...prev, meal.id]
    );
  };

  const handleAddToWeek = () => {
    if (selectedMeals.length === 0) {
      alert('Please select meals first');
      return;
    }
    setShowWeekSelect(true);
  };

  const handleWeekSelect = (week) => {
    setSelectedWeek(week);
  };

  const handleSave = () => {
    if (!selectedWeek) {
      alert('Please select a week');
      return;
    }

    const selectedMealsData = meals.filter(meal => selectedMeals.includes(meal.id));
    const weekKey = selectedWeek.toLowerCase().replace(' ', '');
    
    const newMeals = selectedMealsData.filter(meal => 
      !weekMeals[weekKey].some(weekMeal => weekMeal.id === meal.id)
    );

    if (newMeals.length === 0) {
      alert('Selected meals are already in this week');
      return;
    }

    setWeekMeals(prev => ({
      ...prev,
      [weekKey]: [...prev[weekKey], ...newMeals]
    }));

    setSelectedMeals([]);
    setSelectedWeek('');
    setShowWeekSelect(false);
  };

  const handleDeleteMeal = (weekKey, mealId) => {
    setWeekMeals(prev => ({
      ...prev,
      [weekKey]: prev[weekKey].filter(meal => meal.id !== mealId)
    }));
  };

  const renderMealList = (mealsList, allowSelect = false, weekKey = '') => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-8 md:px-16">
      {mealsList.map(meal => (
        <div 
          key={meal.id}
          onClick={() => allowSelect && handleMealSelect(meal)}
          className={`relative bg-white rounded-[20px] overflow-hidden transition-all duration-300 shadow-lg ${
            allowSelect && selectedMeals.includes(meal.id)
              ? 'ring-4 ring-[#FF6B57] scale-[1.02]'
              : 'hover:scale-[1.02]'
          }`}
        >
          <div className="absolute top-4 right-4 z-10">
            <span className="bg-black text-white text-sm px-4 py-1 rounded-full">
              {meal.tags?.[0] || 'Dinner'}
            </span>
          </div>
          <div className="relative h-[240px] w-full">
            <Image
              src={meal.image || '/placeholder-meal.jpg'}
              alt={meal.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {allowSelect && selectedMeals.includes(meal.id) && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="bg-[#FF6B57] rounded-full p-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
          </div>
          <div className="p-6">
            <h3 className="font-bold text-xl text-[#2D2D2D] mb-3">{meal.name}</h3>
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {meal.description || 'Preheat the oven to 475°F (245°C). Roll out the pizza dough and spread with tomato sauce evenly. Top with slices of fresh mozzarella and fresh basil leaves. Drizzle with olive oil and season with salt and pepper. Bake in the preheated oven for 12-15 minutes or until the crust is golden brown. Slice and serve hot.'}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Cuisine:</span>
                <span className="text-sm font-medium text-[#2D2D2D]">{meal.cuisine || 'Italian'}</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="text-sm text-gray-600">Rating:</span>
                <span className="text-sm font-medium text-[#2D2D2D]">{meal.rating || '4.8'}</span>
                <div className="flex items-center ml-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className={`w-4 h-4 ${star <= Math.floor(meal.rating || 4.8) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
            {!allowSelect && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteMeal(weekKey, meal.id);
                }}
                className="mt-4 text-[#FF6B57] hover:text-[#ff8674] font-medium"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const tabs = [
    { id: 'all', label: 'All meals' },
    { id: 'week1', label: 'Week 1' },
    { id: 'week2', label: 'Week 2' },
    { id: 'week3', label: 'Week 3' },
    { id: 'week4', label: 'Week 4' },
  ];

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="relative">
        {/* Hero Section */}
        <div className="relative h-[300px] overflow-hidden">
          <div className="absolute inset-0">
            <Image
              src="/placeholder-meal.jpg"
              alt="Hero background"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
          </div>
          <div className="relative max-w-[1920px] mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Optimized Your Meal</h1>
            <p className="text-lg text-gray-200">Select Meal to Add in Week. You will be able to edit, modify and change the Meal Weeks.</p>
          </div>
        </div>

        {/* Sticky Header */}
        <div className="sticky top-0 z-10 bg-white shadow-md">
          <div className="max-w-[1920px] mx-auto py-4 px-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h2 className="text-xl font-bold text-[#2D2D2D]">Week Orders</h2>
              <div className="flex flex-1 flex-wrap items-center justify-center gap-4 px-4 max-w-3xl mx-auto">
                {tabs.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-[#FF6B57] text-white shadow-lg shadow-[#FF6B57]/30'
                        : 'bg-gray-100 text-[#2D2D2D] hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {selectedMeals.length > 0 && (
                <button
                  onClick={handleAddToWeek}
                  className="bg-[#FF6B57] text-white px-6 py-3 rounded-full font-medium text-lg shadow-lg shadow-[#FF6B57]/30 hover:bg-[#ff8674] transition-colors duration-300 whitespace-nowrap"
                >
                  Add to Week
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[1920px] mx-auto py-8">
          {activeTab === 'all' && renderMealList(meals, true)}
          {activeTab !== 'all' && renderMealList(weekMeals[activeTab], false, activeTab)}
        </div>
      </div>

      {/* Week Selection Modal */}
      {showWeekSelect && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-20">
          <div className="bg-white p-8 rounded-[20px] max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold mb-6 text-[#2D2D2D]">Select Week</h2>
            <div className="space-y-3">
              {tabs.slice(1).map(tab => (
                <button
                  key={tab.id}
                  onClick={() => handleWeekSelect(tab.label)}
                  className={`block w-full px-6 py-3 rounded-full text-lg font-medium transition-all duration-300 ${
                    selectedWeek === tab.label
                      ? 'bg-[#FF6B57] text-white shadow-lg shadow-[#FF6B57]/30'
                      : 'bg-gray-100 text-[#2D2D2D] hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <button
                onClick={() => {
                  setShowWeekSelect(false);
                  setSelectedWeek('');
                }}
                className="px-6 py-3 rounded-full font-medium text-[#2D2D2D] hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="bg-[#FF6B57] text-white px-6 py-3 rounded-full font-medium shadow-lg shadow-[#FF6B57]/30 hover:bg-[#ff8674] transition-colors duration-300"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
