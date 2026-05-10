export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <button
        onClick={() => onSelect(null)}
        className={`px-4 py-2 rounded-full font-medium transition ${
          selected === null
            ? 'bg-green-600 text-white'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        }`}
      >
        All Products
      </button>
      {categories.map(category => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-full font-medium transition ${
            selected === category
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  )
}
