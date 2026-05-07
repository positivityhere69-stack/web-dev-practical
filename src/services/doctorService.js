// Mock doctor data
const doctors = [
  {
    id: '1',
    name: 'Dr. Priya Sharma',
    specialty: 'Cardiologist',
    experience: 15,
    rating: 4.9,
    reviews: 127,
    patients: 2500,
    fee: 500,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop',
    bio: 'Dr. Priya Sharma is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology and heart failure management.',
    education: 'MD from AIIMS Delhi',
    schedule: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
    availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  },
  {
    id: '2',
    name: 'Dr. Rajesh Patel',
    specialty: 'Dermatologist',
    experience: 12,
    rating: 4.8,
    reviews: 98,
    patients: 1800,
    fee: 450,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop',
    bio: 'Dr. Rajesh Patel is an experienced dermatologist specializing in medical and cosmetic dermatology. He is known for his expertise in treating skin conditions and performing cosmetic procedures.',
    education: 'MD from CMC Vellore',
    schedule: ['Monday', 'Wednesday', 'Thursday', 'Saturday'],
    availableSlots: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00'],
  },
  {
    id: '3',
    name: 'Dr. Anjali Gupta',
    specialty: 'Pediatrician',
    experience: 10,
    rating: 4.9,
    reviews: 156,
    patients: 3200,
    fee: 350,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop',
    bio: 'Dr. Anjali Gupta is a compassionate pediatrician dedicated to providing comprehensive care for children from infancy through adolescence. She focuses on preventive care and developmental health.',
    education: 'MD from KEM Hospital Mumbai',
    schedule: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    availableSlots: ['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  },
  {
    id: '4',
    name: 'Dr. Vikram Singh',
    specialty: 'Orthopedic Surgeon',
    experience: 18,
    rating: 4.7,
    reviews: 89,
    patients: 1500,
    fee: 500,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop',
    bio: 'Dr. Vikram Singh is a highly skilled orthopedic surgeon specializing in joint replacement, sports medicine, and trauma surgery. He uses minimally invasive techniques for faster recovery.',
    education: 'MD from PGIMER Chandigarh',
    schedule: ['Tuesday', 'Wednesday', 'Friday'],
    availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'],
  },
  {
    id: '5',
    name: 'Dr. Kavita Reddy',
    specialty: 'Neurologist',
    experience: 14,
    rating: 4.8,
    reviews: 112,
    patients: 1900,
    fee: 450,
    image: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop',
    bio: 'Dr. Kavita Reddy is a board-certified neurologist with expertise in treating headaches, epilepsy, stroke, and neurodegenerative diseases. She is committed to providing personalized neurological care.',
    education: 'MD from NIMHANS Bangalore',
    schedule: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
    availableSlots: ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
  },
  {
    id: '6',
    name: 'Dr. Arun Kumar',
    specialty: 'General Physician',
    experience: 20,
    rating: 4.6,
    reviews: 245,
    patients: 5000,
    fee: 300,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop',
    bio: 'Dr. Arun Kumar is a seasoned general physician with two decades of experience in primary care. He provides comprehensive health services for patients of all ages.',
    education: 'MD from Maulana Azad Medical College',
    schedule: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableSlots: ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'],
  },
  {
    id: '7',
    name: 'Dr. Meera Nair',
    specialty: 'Gynecologist',
    experience: 11,
    rating: 4.9,
    reviews: 134,
    patients: 2200,
    fee: 400,
    image: 'https://images.unsplash.com/photo-1643297654416-05795d62e39c?w=400&h=400&fit=crop',
    bio: 'Dr. Meera Nair is a dedicated gynecologist providing comprehensive women&apos;s health services including prenatal care, family planning, and menopause management.',
    education: 'MD from Grant Medical College Mumbai',
    schedule: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
    availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'],
  },
  {
    id: '8',
    name: 'Dr. Sanjay Deshmukh',
    specialty: 'Psychiatrist',
    experience: 13,
    rating: 4.8,
    reviews: 78,
    patients: 1200,
    fee: 450,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop',
    bio: 'Dr. Sanjay Deshmukh is a compassionate psychiatrist specializing in mood disorders, anxiety, and cognitive behavioral therapy. He provides a supportive environment for mental health treatment.',
    education: 'MD from JIPMER Puducherry',
    schedule: ['Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    availableSlots: ['10:00', '11:00', '13:00', '14:00', '15:00', '16:00'],
  },
]

const specialties = [
  'All Specialties',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedic Surgeon',
  'Neurologist',
  'General Physician',
  'Gynecologist',
  'Psychiatrist',
]

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export async function getAllDoctors() {
  await delay(300)
  return doctors
}

export async function getDoctorById(id) {
  await delay(200)
  const doctor = doctors.find(d => d.id === id)
  if (!doctor) {
    throw new Error('Doctor not found')
  }
  return doctor
}

export async function searchDoctors(query, specialty) {
  await delay(300)
  let results = [...doctors]

  if (query) {
    const searchTerm = query.toLowerCase()
    results = results.filter(
      d =>
        d.name.toLowerCase().includes(searchTerm) ||
        d.specialty.toLowerCase().includes(searchTerm)
    )
  }

  if (specialty && specialty !== 'All Specialties') {
    results = results.filter(d => d.specialty === specialty)
  }

  return results
}

export function getSpecialties() {
  return specialties
}
