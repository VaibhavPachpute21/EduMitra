import React from 'react'
import {StudentDashboard} from './StudentsPages/StudentDashboard'
import {useSelector } from 'react-redux'
import TeachersDashboard from './TeachersPages/TeachersDashboard'


const Dashoboard = () => {
    const userData = useSelector(state => state.userLoginReducer)
    const { currentUser } = userData;
  return (
    <div>
        {
            currentUser.user.role==0?<StudentDashboard/>:<TeachersDashboard/>
        }
    </div>
  )
}

export default Dashoboard