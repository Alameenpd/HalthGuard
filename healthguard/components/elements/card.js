export default function Card({ data }) {
  return (
    <>
      <div className="group relative bg-white dark:bg-gray-800 transition hover:z-[1] hover:shadow-2xl hover:shadow-gray-600/10">
        <div className="relative space-y-8 py-12 p-8 border-b border-gray-100 dark:border-gray-700">
          <data.Icon size={50} className="text-gray-600 dark:text-white" />
          <div className="space-y-2">
            <h5 className="text-xl font-semibold text-gray-700 dark:text-white transition group-hover:text-secondary">
              {data.title}
            </h5>
            <p className="text-gray-600 dark:text-gray-300">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
