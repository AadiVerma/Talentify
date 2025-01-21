export default function Component2() {
  const categories = [
    { label: 'Designer', value: 70, color: 'bg-purple-300' },
    { label: 'Developer', value: 85, color: 'bg-indigo-300' },
    { label: 'Trainer', value: 60, color: 'bg-violet-300' },
    { label: 'Data Scientist', value: 90, color: 'bg-purple-400' },
  ];

  return (
    <div className="flex flex-col items-center bg-white/50 backdrop-blur-lg border border-gray-500 p-2 rounded-lg max-w-max">
      <div className="text-center font-semibold text-base mb-2 text-purple-700">Top Categories</div>
      <div className="flex">
        {categories.map((category, index) => (
          <div key={index} className="flex flex-col items-center mr-2">
            <p className="text-xs text-purple-700">{category.label}</p>
            <div className="relative w-8 h-24 bg-gray-200 rounded-lg overflow-hidden">
              <div
                className={`absolute bottom-0 ${category.color} w-full`}
                style={{ height: `${category.value}%` }}
              />
            </div>
            <p className="text-xs font-semibold text-purple-700">{category.value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
