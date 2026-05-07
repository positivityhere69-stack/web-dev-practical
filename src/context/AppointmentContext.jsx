import { createContext, useContext, useState, useEffect } from 'react'

const AppointmentContext = createContext(null)

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([])

  useEffect(() => {
    // Load appointments from localStorage
    const saved = localStorage.getItem('healthcareAppointments')
    if (saved) {
      setAppointments(JSON.parse(saved))
    }
  }, [])

  const saveToStorage = (data) => {
    localStorage.setItem('healthcareAppointments', JSON.stringify(data))
  }

  const addAppointment = (appointment) => {
    const newAppointment = {
      ...appointment,
      id: Date.now().toString(),
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    }
    const updated = [...appointments, newAppointment]
    setAppointments(updated)
    saveToStorage(updated)
    return newAppointment
  }

  const cancelAppointment = (id) => {
    const updated = appointments.map(apt =>
      apt.id === id ? { ...apt, status: 'cancelled' } : apt
    )
    setAppointments(updated)
    saveToStorage(updated)
  }

  const getUserAppointments = (userId) => {
    return appointments.filter(apt => apt.userId === userId)
  }

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        addAppointment,
        cancelAppointment,
        getUserAppointments,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  )
}

export function useAppointments() {
  const context = useContext(AppointmentContext)
  if (!context) {
    throw new Error('useAppointments must be used within an AppointmentProvider')
  }
  return context
}
