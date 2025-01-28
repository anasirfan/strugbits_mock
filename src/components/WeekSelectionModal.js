'use client';

const WeekSelectionModal = ({ tabs, selectedWeek, onWeekSelect, onCancel, onSave }) => {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-20">
      <div className="bg-white p-8 rounded-[10px] max-w-2xl w-full mx-4">
        <h2 className="text-2xl text-center font-bold mb-6 text-[#2D2D2D]">Select Week</h2>
        <div className="space-x-4 flex justify-between">
          {tabs.slice(1).map(tab => (
            <button
              key={tab.id}
              onClick={() => onWeekSelect(tab.label)}
              className={`block w-full px-4 py-2 rounded-lg text-md font-medium transition-all duration-300 ${
                selectedWeek === tab.label
                  ? 'bg-[#CFECFF] shadow-lg shadow-[#CFECFF]/30'
                  : 'bg-gray-100 text-[#2D2D2D] hover:bg-gray-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={onCancel}
            className="px-8 py-3 rounded-lg font-medium text-[#2D2D2D] hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="bg-[#004370] text-white px-8 py-1 rounded-lg font-medium shadow-lg shadow-[#FF6B57]/30 hover:bg-[#CFECFF] hover:text-black transition-colors duration-300"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default WeekSelectionModal;
