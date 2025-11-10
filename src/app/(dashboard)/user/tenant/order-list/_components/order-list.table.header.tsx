export default function OrderListTableHeader() {
  return (
    <div className="hidden items-center gap-4 rounded-xl border border-gray-200 bg-linear-to-br from-blue-600 to-blue-800 p-5 text-sm font-semibold text-white shadow-sm lg:grid lg:grid-cols-6">
      <span className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-white" />
        ORDER ID
      </span>
      <span>PROPERTY & ROOM</span>
      <span>STATUS</span>
      <span>CUSTOMER</span>
      <span>CHECK IN/CHECK OUT</span>
      <span className="text-center">ACTION</span>
    </div>
  );
}
