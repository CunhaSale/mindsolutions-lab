import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const stats = [
  { label: "AGENTS_ONLINE", value: "4/4" },
  { label: "LATENCY", value: "12.4ms" },
  { label: "UPTIME", value: "99.97%" },
  { label: "TASKS_COMPLETED", value: "1,847" },
];

const StatsBar = () => {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setTick((t) => t + 1), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border-2 border-border bg-card dither-bg">
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
        {stats.map((stat, i) => (
          <div key={stat.label} className="px-4 py-3 text-center">
            <p className="text-[10px] font-mono text-muted-foreground tracking-widest mb-1">
              {stat.label}
            </p>
            <motion.p
              key={tick + i}
              className="text-sm font-mono text-primary font-bold"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
            >
              {stat.value}
            </motion.p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsBar;
