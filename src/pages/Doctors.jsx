import { useState, useEffect } from 'react'
import DoctorCard from '../components/DoctorCard'
import { searchDoctors, getSpecialties } from '../services/doctorService'

function Doctors() {
  const [doctors, setDoctors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties')
  const specialties = getSpecialties()

  useEffect(() => {
    fetchDoctors()
  }, [searchQuery, selectedSpecialty])

  const fetchDoctors = async () => {
    try {
      setLoading(true)
      setError(null)
      const results = await searchDoctors(searchQuery, selectedSpecialty)
      setDoctors(results)
    } catch (err) {
      setError('Failed to load doctors. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSpecialtyChange = (e) => {
    setSelectedSpecialty(e.target.value)
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Our Doctors</h1>
        <p className="page-subtitle">
          Find the right healthcare professional for your needs
        </p>
      </div>

      <div className="search-filters">
        <input
          type="text"
          placeholder="Search doctors by name or specialty..."
          className="form-input search-input"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select
          className="form-select filter-select"
          value={selectedSpecialty}
          onChange={handleSpecialtyChange}
        >
          {specialties.map((specialty) => (
            <option key={specialty} value={specialty}>
              {specialty}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="alert alert-error">{error}</div>
      )}

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
        </div>
      ) : doctors.length === 0 ? (
        <div className="empty-state">
          <svg className="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <h3 className="empty-state-title">No doctors found</h3>
          <p className="empty-state-description">
            Try adjusting your search or filter criteria
          </p>
          <button
            className="btn btn-secondary"
            onClick={() => {
              setSearchQuery('')
              setSelectedSpecialty('All Specialties')
            }}
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-3">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Doctors
