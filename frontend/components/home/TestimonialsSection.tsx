'use client';

const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Rahul Sharma',
    role: 'Senior Frontend Developer',
    company: '@TechCorp',
    rating: 5,
    text: '"The Three.js template saved me 3 weeks of work. Insane attention to detail — every animation is silky smooth."',
    initials: 'RS',
  },
  {
    id: 't2',
    name: 'Priya Mehta',
    role: 'Full-Stack Engineer',
    company: '@StartupXYZ',
    rating: 5,
    text: '"Bought the SaaS dashboard. Clean code, TypeScript strict mode, works perfectly. Will buy again."',
    initials: 'PM',
  },
  {
    id: 't3',
    name: 'Arjun Nair',
    role: 'Freelance Developer',
    company: '@Self-Employed',
    rating: 5,
    text: '"Not your average template — this is actual production-quality code. My clients loved the result."',
    initials: 'AN',
  },
  {
    id: 't4',
    name: 'Sneha Reddy',
    role: 'UI/UX + Dev',
    company: '@DigitalAgency',
    rating: 5,
    text: '"The landing page template is stunning. Framer Motion animations are perfectly optimized."',
    initials: 'SR',
  },
  {
    id: 't5',
    name: 'Dev Patel',
    role: 'React Developer',
    company: '@ProductStudio',
    rating: 5,
    text: '"Worth every rupee. The custom cursor and magnetic buttons alone make clients think I\'m a design god."',
    initials: 'DP',
  },
  {
    id: 't6',
    name: 'Kavya Iyer',
    role: 'Frontend Lead',
    company: '@Fintech Co.',
    rating: 5,
    text: '"Exactly what it says on the tin — premium. Download link was sent within 2 hours of payment."',
    initials: 'KI',
  },
];

const GRADIENT_COLORS = [
  'linear-gradient(135deg, #7C3AED, #3B82F6)',
  'linear-gradient(135deg, #3B82F6, #06B6D4)',
  'linear-gradient(135deg, #7C3AED, #06B6D4)',
  'linear-gradient(135deg, #8B5CF6, #3B82F6)',
  'linear-gradient(135deg, #06B6D4, #7C3AED)',
  'linear-gradient(135deg, #3B82F6, #8B5CF6)',
];

export default function TestimonialsSection() {
  return (
    <section className="section" id="testimonials" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section__header" style={{ textAlign: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
          <p className="section__eyebrow">Social Proof</p>
          <h2 className="section__title" id="testimonials-heading">Trusted by Developers</h2>
          <p className="section__subtitle">Real feedback from real developers who built real products.</p>
        </div>

        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <article key={t.id} className="testimonial-card glass-card">
              <div className="testimonial-card__stars" aria-label={`${t.rating} stars`}>
                {'★'.repeat(t.rating)}
                <span style={{ marginLeft: 4, color: 'var(--text-muted)', fontSize: 12 }}>5.0</span>
              </div>
              <p className="testimonial-card__text">{t.text}</p>
              <div className="testimonial-card__author">
                <div
                  className="testimonial-card__avatar"
                  style={{ background: GRADIENT_COLORS[i % GRADIENT_COLORS.length] }}
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="testimonial-card__name">{t.name}</p>
                  <p className="testimonial-card__role">{t.role} · {t.company}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
