import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getDoctorById } from '../services/doctorService'
import { useAuth } from '../context/AuthContext'
import { useAppointments } from '../context/AppointmentContext'

function BookAppointment() {
  const { doctorId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { addAppointment } = useAppointments()

  const [doctor, setDoctor] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: '',
    notes: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchDoctor()
  }, [doctorId])

  const fetchDoctor = async () => {
    try {
      setLoading(true)
      const data = await getDoctorById(doctorId)
      setDoctor(data)
    } catch (err) {
      setError('Doctor not found')
    } finally {
      setLoading(false)
    }
  }

  const steps = [
    { number: 1, label: 'Select Date' },
    { number: 2, label: 'Select Time' },
    { number: 3, label: 'Details' },
    { number: 4, label: 'Confirm' },
  ]

  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  const validateStep = (currentStep) => {
    const errors = {}

    if (currentStep === 1 && !formData.date) {
      errors.date = 'Please select a date'
    }

    if (currentStep === 2 && !formData.time) {
      errors.time = 'Please select a time slot'
    }

    if (currentStep === 3 && !formData.reason) {
      errors.reason = 'Please provide a reason for your visit'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step)) {
      setStep((prev) => Math.min(prev + 1, 4))
    }
  }

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addAppointment({
        userId: user.id,
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        date: formData.date,
        time: formData.time,
        reason: formData.reason,
        notes: formData.notes,
        fee: doctor.fee,
      })

      setSuccess(true)
    } catch (err) {
      setError('Failed to book appointment. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTimeSelect = (time) => {
    setFormData((prev) => ({ ...prev, time }))
    setFormErrors((prev) => ({ ...prev, time: '' }))
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
      </div>
    )
  }

  if (error && !doctor) {
    return (
      <div className="container">
        <div className="empty-state">
          <h3 className="empty-state-title">{error}</h3>
          <button className="btn btn-primary" onClick={() => navigate('/doctors')}>
            Back to Doctors
          </button>
        </div>
      </div>
    )
  }

  if (success) {
    return (
      <div className="container">
        <div className="booking-form">
          <div className="card text-center">
            <div style={{ marginBottom: '24px' }}>
              <svg
                width="80"
                height="80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--success)"
                strokeWidth="2"
                style={{ margin: '0 auto' }}
              >
                <circle cx="12" cy="12" r="10" />
                <path d="m9 12 2 2 4-4" />
              </svg>
            </div>
            <h2 style={{ marginBottom: '12px' }}>Appointment Booked!</h2>
            <p className="text-secondary" style={{ marginBottom: '24px' }}>
              Your appointment with {doctor.name} has been confirmed.
            </p>
            <div className="card" style={{ background: 'var(--light-gray)', marginBottom: '24px' }}>
              <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <p><strong>Time:</strong> {formData.time}</p>
              <p><strong>Reason:</strong> {formData.reason}</p>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button className="btn btn-primary" onClick={() => navigate('/dashboard')}>
                View Dashboard
              </button>
              <button className="btn btn-secondary" onClick={() => navigate('/doctors')}>
                Book Another
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container">
      <div className="booking-form">
        <div className="card mb-3">
          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <img
              src={doctor.image}
              alt={doctor.name}
              style={{ width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover' }}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/60x60?text=Dr'
              }}
            />
            <div>
              <h3 style={{ marginBottom: '4px' }}>{doctor.name}</h3>
              <p className="text-secondary">{doctor.specialty}</p>
            </div>
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <p style={{ fontWeight: '600', color: 'var(--primary)' }}>&#8377;{doctor.fee}</p>
              <p className="text-secondary" style={{ fontSize: '0.85rem' }}>per visit</p>
            </div>
          </div>
        </div>

        <div className="steps-indicator">
          {steps.map((s) => (
            <div
              key={s.number}
              className={`step ${step === s.number ? 'active' : ''} ${step > s.number ? 'completed' : ''}`}
            >
              <div className="step-number">
                {step > s.number ? '✓' : s.number}
              </div>
              <span className="step-label">{s.label}</span>
            </div>
          ))}
        </div>

        <div className="card">
          {step === 1 && (
            <div>
              <h3 style={{ marginBottom: '20px' }}>Select Appointment Date</h3>
              <div className="form-group">
                <label htmlFor="date" className="form-label">
                  Preferred Date
                </label>
                <input
                  type="date"
                  id="date"
                  className={`form-input ${formErrors.date ? 'error' : ''}`}
                  min={getMinDate()}
                  value={formData.date}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, date: e.target.value }))
                    setFormErrors((prev) => ({ ...prev, date: '' }))
                  }}
                />
                {formErrors.date && <p className="form-error">{formErrors.date}</p>}
              </div>
              <p className="text-secondary" style={{ fontSize: '0.9rem' }}>
                <strong>Available days:</strong> {doctor.schedule.join(', ')}
              </p>
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 style={{ marginBottom: '20px' }}>Select Time Slot</h3>
              <p className="text-secondary mb-2">
                Available slots for {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </p>
              <div className="time-slots">
                {doctor.availableSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className={`time-slot ${formData.time === slot ? 'selected' : ''}`}
                    onClick={() => handleTimeSelect(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              {formErrors.time && <p className="form-error mt-2">{formErrors.time}</p>}
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 style={{ marginBottom: '20px' }}>Appointment Details</h3>
              <div className="form-group">
                <label htmlFor="reason" className="form-label">
                  Reason for Visit *
                </label>
                <input
                  type="text"
                  id="reason"
                  className={`form-input ${formErrors.reason ? 'error' : ''}`}
                  placeholder="e.g., Annual checkup, Follow-up visit"
                  value={formData.reason}
                  onChange={(e) => {
                    setFormData((prev) => ({ ...prev, reason: e.target.value }))
                    setFormErrors((prev) => ({ ...prev, reason: '' }))
                  }}
                />
                {formErrors.reason && <p className="form-error">{formErrors.reason}</p>}
              </div>
              <div className="form-group">
                <label htmlFor="notes" className="form-label">
                  Additional Notes (Optional)
                </label>
                <textarea
                  id="notes"
                  className="form-textarea"
                  placeholder="Any additional information for the doctor"
                  value={formData.notes}
                  onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                />
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 style={{ marginBottom: '20px' }}>Confirm Your Appointment</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="card" style={{ background: 'var(--light-gray)' }}>
                  <p><strong>Doctor:</strong> {doctor.name}</p>
                  <p><strong>Specialty:</strong> {doctor.specialty}</p>
                </div>
                <div className="card" style={{ background: 'var(--light-gray)' }}>
                  <p><strong>Date:</strong> {new Date(formData.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p><strong>Time:</strong> {formData.time}</p>
                </div>
                <div className="card" style={{ background: 'var(--light-gray)' }}>
                  <p><strong>Reason:</strong> {formData.reason}</p>
                  {formData.notes && <p><strong>Notes:</strong> {formData.notes}</p>}
                </div>
                <div className="card" style={{ background: 'var(--light-gray)' }}>
                  <p style={{ fontSize: '1.25rem', fontWeight: '600' }}>
                    Total Fee: <span style={{ color: 'var(--primary)' }}>&#8377;{doctor.fee}</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="form-actions">
            {step > 1 ? (
              <button type="button" className="btn btn-secondary" onClick={handleBack}>
                Back
              </button>
            ) : (
              <button type="button" className="btn btn-secondary" onClick={() => navigate(-1)}>
                Cancel
              </button>
            )}

            {step < 4 ? (
              <button type="button" className="btn btn-primary" onClick={handleNext}>
                Continue
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookAppointment
