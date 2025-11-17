export function SelectedDateInfo() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-linear-to-br from-yellow-100 to-amber-200 p-6 shadow-md">
      <h3 className="mb-2 text-sm font-medium text-gray-600">Selected Date</h3>
      <p className="text-2xl font-bold text-amber-600">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      <div
        className={`absolute bottom-0 left-0 h-1 w-full bg-linear-to-r from-yellow-500 to-amber-600`}
      ></div>
    </div>
  );
}
