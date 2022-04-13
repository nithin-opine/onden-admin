import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"
import StudentList from "../pages/Students"
import TeachersList from "../pages/Teachers"
import ApplicationList from "../pages/Applications"
import InterviewList from "../pages/Interviews"
import CoinWithDrawalRequest from "../pages/CoinWithdrawalRequest"
import Reports from "pages/Reports"
import LatestStudentReports from "pages/Reports/latestStudentReport"
import LatestTutorReport from "pages/Reports/latestTutorReport"
import ApplicationSettings from "../pages/ApplicationSettings"
import PackageSettings from "../pages/ApplicationSettings/PackageSettings"
import CoinvalueSettings from "../pages/ApplicationSettings/CoinValueSettings"
import ResignationReports from "pages/Reports/resignationReport"
import StudentLeavingReports from "pages/Reports/studentLeavingReport"
import InterviewReports from "pages/Reports/interviewReports"
import FeeReports from "pages/Reports/feeReports"
import MOSTReport from "pages/Reports/mostOptedStudentTimeReport"
import MATTReport from "pages/Reports/mostAvailedTutorTimeReport"
import InterviewCalendar from "../pages/InterviewCalendar"
import StudentProfile from "../pages/Students/StudentProfile"
import Interview from "pages/Applications/interview"
import TeacherProfile from "../pages/Teachers/TeacherProfile"
import InterviewApplication from "../pages/Interviews/interviewApplication"
import SingleWithdrawalRequest from "../pages/CoinWithdrawalRequest/SingleWithdrawalRequest"
import ResignationsList from "../pages/Resignations"
import ChangePassword from "../pages/ChangePassword"
import Application from "../pages/Applications/application"
import ScheduleSettings from "pages/ScheduleSettings"
import Withdrawal from "pages/Withdrawals/Withdrawal"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },

  // //profile
  { path: "/profile", component: UserProfile },
  { path: "/student-list", component: StudentList },
  { path: "/teacher-list", component: TeachersList },
  { path: "/application-list", component: ApplicationList },
  { path: "/interview-list", component: InterviewList },
  { path: "/coin-list", component: CoinWithDrawalRequest },
  { path: "/reports", component: Reports },
  { path: "/latest-student-reports", component: LatestStudentReports },
  { path: "/latest-tutor-reports", component: LatestTutorReport },
  { path: "/resignation-report", component: ResignationReports },
  { path: "/student-leave-reports", component: StudentLeavingReports },
  { path: "/interview-reports", component: InterviewReports },
  { path: "/fee-reports", component: FeeReports },
  { path: "/student-timing-reports", component: MOSTReport },
  { path: "/tutor-timing-reports", component: MATTReport },
  { path: "/settings", component: ApplicationSettings },
  { path: "/package-settings", component: PackageSettings },
  { path: "/coin-settings", component: CoinvalueSettings },
  { path: "/calendar", component: InterviewCalendar },
  { path: "/student-profile/:id", component: StudentProfile },
  { path: "/teacher-profile/:id", component: TeacherProfile },
  { path: "/interview-application/:id/:tid", component: InterviewApplication },
  { path: "/Withdrawal/:id", component: Withdrawal },
  { path: "/resignation-list", component: ResignationsList },
  { path: "/change-password", component: ChangePassword },
  { path: "/application/:id", component: Application },
  { path: "/schedule-settings", component: ScheduleSettings },

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { publicRoutes, authProtectedRoutes }
