/**
 * Specification item component for displaying room specs with icon.
 */
interface SpecItemProps {
  icon: React.ReactNode;
  label: string;
  value: number;
}

export const SpecItem: React.FC<SpecItemProps> = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900">{value}</p>
    </div>
  </div>
);
