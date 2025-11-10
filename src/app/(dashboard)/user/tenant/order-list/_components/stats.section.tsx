import { orderStats } from "../_const/order.stats";
import StatsCard from "./stats-components/stats.card";

export default function OrderListStats() {
  return (
    <section className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {orderStats.map((stat, index) => (
        <StatsCard
          key={index}
          label={stat.label}
          value={stat.value}
          className={stat.className}
          icon={stat.icon}
        />
      ))}
    </section>
  );
}
