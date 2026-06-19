'use client';

import CountUp from '@/components/ui/CountUp';

const STATS = [
  { value: 50, suffix: '+', label: 'Projects' },
  { value: 1200, suffix: '+', label: 'Customers' },
  { value: 4.9, suffix: '★', label: 'Rating', isDecimal: true },
  { value: 99, prefix: '₹', label: 'Starting' },
];

export default function StatsSection() {
  return (
    <section className="stats" aria-label="Key statistics">
      <div className="stats__inner">
        {STATS.map((stat) => (
          <div key={stat.label} className="stats__item">
            <span className="stats__value">
              {stat.prefix}
              {stat.isDecimal ? (
                <span>{stat.value}</span>
              ) : (
                <CountUp end={stat.value} />
              )}
              {stat.suffix}
            </span>
            <p className="stats__label">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
