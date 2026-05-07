import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useAppointments } from '../context/AppointmentContext'

function Dashboard() {
  const { user } = useAuth()
  const { getUserAppointments, cancelAppointment } = useAppointments()

  const appointments = getUserAppointments(user.id)

  const upcomingAppointments = appointments
    .filter((apt) => apt.status !== 'cancelled' && new Date(apt.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))

  const pastAppointments = appointments
    .filter((apt) => new Date(apt.date) < new Date() || apt.status === 'cancelled')
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const stats = {
    total: appointments.length,
    upcoming: upcomingAppointments.length,
    completed: appointments.filter((apt) => apt.status !== 'cancelled' && new Date(apt.date) < new Date()).length,
  }

  const handleCancel = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      cancelAppointment(id)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return {
      day: date.getDate(),
      month: date.toLocaleDateString('en-US', { month: 'short' }),
      full: date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    }
  }

  return (
    <div className="container dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="welcome-text">Welcome back, {user.name}!</h1>
          <p className="text-secondary">Manage your appointments and health records</p>
        </div>
        <Link to="/doctors" className="btn btn-primary">
          Book Appointment
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="card stat-card">
          <div className="stat-card-value">{stats.total}</div>
          <div className="stat-card-label">Total Appointments</div>
        </div>
        <div className="card stat-card">
          <div className="stat-card-value">{stats.upcoming}</div>
          <div className="stat-card-label">Upcoming</div>
        </div>
        <div className="card stat-card">
          <div className="stat-card-value">{stats.completed}</div>
          <div className="stat-card-label">Completed</div>
        </div>
      </div>

      <div className="mb-4">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Upcoming Appointments</h2>

        {upcomingAppointments.length === 0 ? (
          <div className="card empty-state">
            <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <h3 className="empty-state-title">No upcoming appointments</h3>
            <p className="empty-state-description">
              You don&apos;t have any scheduled appointments yet.
            </p>
            <Link to="/doctors" className="btn btn-primary">
              Find a Doctor
            </Link>
          </div>
        ) : (
          <div className="appointment-list">
            {upcomingAppointments.map((apt) => {
              const date = formatDate(apt.date)
              return (
                <div key={apt.id} className="card appointment-card">
                  <div className="appointment-info">
                    <div className="appointment-date">
                      <div className="appointment-day">{date.day}</div>
                      <div className="appointment-month">{date.month}</div>
                    </div>
                    <div className="appointment-details">
                      <h4>{apt.doctorName}</h4>
                      <p>{apt.specialty} • {apt.time}</p>
                      <p>{apt.reason}</p>
                    </div>
                  </div>
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <span className={`appointment-status status-${apt.status}`}>
                      {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                    </span>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleCancel(apt.id)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {pastAppointments.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '24px' }}>Past Appointments</h2>
          <div className="appointment-list">
            {pastAppointments.slice(0, 5).map((apt) => {
              const date = formatDate(apt.date)
              return (
                <div key={apt.id} className="card appointment-card" style={{ opacity: apt.status === 'cancelled' ? 0.6 : 1 }}>
                  <div className="appointment-info">
                    <div className="appointment-date">
                      <div className="appointment-day">{date.day}</div>
                      <div className="appointment-month">{date.month}</div>
                    </div>
                    <div className="appointment-details">
                      <h4>{apt.doctorName}</h4>
                      <p>{apt.specialty} • {apt.time}</p>
                      <p>{apt.reason}</p>
                    </div>
                  </div>
                  <span className={`appointment-status status-${apt.status}`}>
                    {apt.status === 'cancelled' ? 'Cancelled' : 'Completed'}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
