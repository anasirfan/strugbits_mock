'use client';

import { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import StickyHeader from '../components/StickyHeader';
import MealList from '../components/MealList';
import WeekSelectionModal from '../components/WeekSelectionModal';

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

  const tabs = [
    { id: 'all', label: 'All meals' },
    { id: 'week1', label: 'Week 1' },
    { id: 'week2', label: 'Week 2' },
    { id: 'week3', label: 'Week 3' },
    { id: 'week4', label: 'Week 4' },
  ];

  const handleModalCancel = () => {
    setShowWeekSelect(false);
    setSelectedWeek('');
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <div className="relative">
        <HeroSection />
        
        <StickyHeader
          tabs={tabs}
          activeTab={activeTab}
          selectedMeals={selectedMeals}
          onTabChange={setActiveTab}
          onAddToWeek={handleAddToWeek}
        />

        <div className="max-w-[1920px] mx-auto py-8">
          {activeTab === 'all' ? (
            <MealList
              meals={meals}
              selectedMeals={selectedMeals}
              allowSelect={true}
              onMealSelect={handleMealSelect}
              onDeleteMeal={handleDeleteMeal}
            />
          ) : (
            <MealList
              meals={weekMeals[activeTab]}
              selectedMeals={selectedMeals}
              allowSelect={false}
              weekKey={activeTab}
              onMealSelect={handleMealSelect}
              onDeleteMeal={handleDeleteMeal}
            />
          )}
        </div>
      </div>

      {showWeekSelect && (
        <WeekSelectionModal
          tabs={tabs}
          selectedWeek={selectedWeek}
          onWeekSelect={handleWeekSelect}
          onCancel={handleModalCancel}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
