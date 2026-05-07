import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Home() {
  const { user } = useAuth()

  const features = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
      title: 'Expert Doctors',
      description: 'Access to verified and experienced healthcare professionals across all specialties.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      ),
      title: 'Easy Scheduling',
      description: 'Book appointments at your convenience with our simple scheduling system.',
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      ),
      title: 'Secure & Private',
      description: 'Your health information is protected with enterprise-grade security.',
    },
  ]

  const stats = [
    { value: '50+', label: 'Expert Doctors' },
    { value: '10,000+', label: 'Happy Patients' },
    { value: '15+', label: 'Specialties' },
    { value: '98%', label: 'Satisfaction Rate' },
  ]

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1 className="hero-title">
            Your Health, Our Priority
          </h1>
          <p className="hero-subtitle">
            Find and book appointments with top healthcare professionals. Quality healthcare is just a click away.
          </p>
          <div className="hero-actions">
            <Link to="/doctors" className="btn btn-primary">
              Find a Doctor
            </Link>
            {!user && (
              <Link to="/login" className="btn btn-outline">
                Create Account
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '40px 0', borderBottom: '1px solid var(--border-color)' }}>
        <div className="container">
          <div className="grid grid-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--primary)' }}>
                  {stat.value}
                </div>
                <div className="text-secondary">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <div className="grid grid-3">
            {features.map((feature, index) => (
              <div key={index} className="card feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>
            Ready to Book Your Appointment?
          </h2>
          <p className="text-secondary" style={{ marginBottom: '24px' }}>
            Join thousands of patients who trust us with their healthcare needs.
          </p>
          <Link to="/doctors" className="btn btn-primary">
            Browse Doctors
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
