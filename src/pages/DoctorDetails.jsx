import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getDoctorById } from '../services/doctorService'
import { useAuth } from '../context/AuthContext'

function DoctorDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchDoctor()
  }, [id])

  const fetchDoctor = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getDoctorById(id)
      setDoctor(data)
    } catch (err) {
      setError('Doctor not found. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3 className="empty-state-title">Doctor Not Found</h3>
          <p className="empty-state-description">{error}</p>
          <Link to="/doctors" className="btn btn-primary">
            Back to Doctors
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="doctor-detail">
        <div>
          <img
            src={doctor.image}
            alt={doctor.name}
            className="doctor-detail-image"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x400?text=Doctor'
            }}
          />
        </div>

        <div className="doctor-detail-info">
          <h1>{doctor.name}</h1>
          <p className="doctor-detail-specialty">{doctor.specialty}</p>

          <div className="doctor-detail-stats">
            <div className="stat-item">
              <div className="stat-value">{doctor.experience}</div>
              <div className="stat-label">Years Exp.</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{doctor.patients.toLocaleString()}</div>
              <div className="stat-label">Patients</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                <span className="star">★</span> {doctor.rating}
              </div>
              <div className="stat-label">{doctor.reviews} Reviews</div>
            </div>
          </div>

          <div className="card mb-3">
            <h3 style={{ marginBottom: '12px' }}>About</h3>
            <p className="doctor-detail-bio">{doctor.bio}</p>
            <p className="text-secondary">
              <strong>Education:</strong> {doctor.education}
            </p>
          </div>

          <div className="card mb-3">
            <h3 style={{ marginBottom: '12px' }}>Available Days</h3>
            <div className="doctor-schedule">
              {doctor.schedule.map((day) => (
                <span key={day} className="schedule-day">
                  {day}
                </span>
              ))}
            </div>
          </div>

          <div className="card mb-3">
            <h3 style={{ marginBottom: '12px' }}>Consultation Fee</h3>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' }}>
              &#8377;{doctor.fee}
              <span style={{ fontSize: '1rem', fontWeight: '400', color: 'var(--text-secondary)' }}>
                {' '}/ visit
              </span>
            </p>
          </div>

          <Link
            to={user ? `/book/${doctor.id}` : '/login'}
            state={user ? undefined : { from: `/book/${doctor.id}` }}
            className="btn btn-primary"
            style={{ width: '100%', padding: '16px' }}
          >
            Book Appointment
          </Link>
        </div>
      </div>
    </div>
  )
}

export default DoctorDetails
