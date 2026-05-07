import { Link } from 'react-router-dom'

function DoctorCard({ doctor }) {
  return (
    <div className="card doctor-card">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="doctor-image"
        onError={(e) => {
          e.target.src = 'https://via.placeholder.com/400x400?text=Doctor'
        }}
      />
      <div className="doctor-info">
        <h3 className="doctor-name">{doctor.name}</h3>
        <p className="doctor-specialty">{doctor.specialty}</p>
        <div className="doctor-details">
          <span className="doctor-rating">
            <span className="star">★</span>
            {doctor.rating} ({doctor.reviews} reviews)
          </span>
          <span>{doctor.experience} years experience</span>
          <span>&#8377;{doctor.fee} per visit</span>
        </div>
        <Link to={`/doctors/${doctor.id}`} className="btn btn-primary" style={{ width: '100%' }}>
          View Profile
        </Link>
      </div>
    </div>
  )
}

export default DoctorCard
