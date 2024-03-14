import React,{useEffect, useState} from 'react'
import { StudentDashboard } from './StudentsPages/StudentDashboard'
import { useSelector } from 'react-redux'
import TeachersDashboard from './TeachersPages/TeachersDashboard'
import ProfessionalDashboard from './ProfessionalPages/ProfessionalDashboard'
import { toast } from 'react-toastify'


const Dashoboard = () => {
  const userData = useSelector(state => state.userLoginReducer)
  const { currentUser } = userData;
  useEffect(()=>{
    if(Object.values(currentUser.user).some(value => value === null)|| Array.isArray(currentUser.user.skills) && currentUser.user.skills.length === 0){
      toast.info("Please Update your profile.")
    }
  },[])
  return (
    <div>
      {
        currentUser.user.role == 0 ? <StudentDashboard /> : currentUser.user.role==1 ?<TeachersDashboard />:<ProfessionalDashboard/>
      }
    </div>
  )
}

export default Dashoboard