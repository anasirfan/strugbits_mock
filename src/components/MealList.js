'use client';

import MealCard from './MealCard';

const MealList = ({ meals, selectedMeals, allowSelect, weekKey, onMealSelect, onDeleteMeal }) => {
  return (
    <div className="w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 px-8 md:px-16 max-xl:w-[100%] lg:gap-4">
      {meals.map(meal => (
        <MealCard
          key={meal.id}
          meal={meal}
          isSelected={selectedMeals.includes(meal.id)}
          allowSelect={allowSelect}
          weekKey={weekKey}
          onSelect={onMealSelect}
          onDelete={onDeleteMeal}
        />
      ))}
    </div>
  );
};

export default MealList;
