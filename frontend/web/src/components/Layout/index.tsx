import { ServerIcon, HomeIcon, UsersIcon, AcademicCapIcon, CogIcon, PresentationChartBarIcon, BookOpenIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { useIsomorphicLayoutEffect } from 'hooks'
import { IMenu } from 'interfaces'
import { useSelector } from 'react-redux'
import MobileSidebar from './MobileSidebar'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import Main from './Main'
import { getAuthUser } from 'redux/auth/selector'

const adminNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: PresentationChartBarIcon, end: true},
    { name: 'Classroom', href: '/dashboard/classroom', icon: HomeIcon, end: true},
    { name: 'Subject', href: '/dashboard/subject', icon: BookOpenIcon, end: true},
    { name: 'Faculty', href: '/dashboard/faculty', icon: AcademicCapIcon, end: false},
    { name: 'Student', href: '/dashboard/student', icon: UsersIcon, end: false},
    { name: 'Course', href: '/dashboard/course', icon: ServerIcon, end: false},
    { name: 'Settings', href: '/dashboard/settings', icon: CogIcon, end: false},
    // { name: 'Documents', href: '/dashboard/documents', icon: InboxIcon},
]

const studentNavigation = [
    { name: 'Classroom', href: '/faculty/classroom', icon: HomeIcon, end: true},
    { name: 'Quiz', href: '/faculty/quiz', icon: HomeIcon, end: true},
    { name: 'Grade', href: '/faculty/grade', icon: HomeIcon, end: true},
    { name: 'Settings', href: '/dashboard/settings', icon: CogIcon, end: false},
]

const facultyNavigation = [
    { name: 'Classroom', href: '/faculty/classroom', icon: HomeIcon, end: true},
    { name: 'Quiz', href: '/faculty/quiz', icon: HomeIcon, end: true},
    { name: 'Grade', href: '/faculty/grade', icon: HomeIcon, end: true},
    { name: 'Settings', href: '/dashboard/settings', icon: CogIcon, end: false},
]



const Navigation = () => {
    const user                          = useSelector(getAuthUser)
    const [menu, setMenu]               = useState<Array<IMenu>>([])
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

    useIsomorphicLayoutEffect(() => {
        switch(user.type){
            case "ADMIN":
                setMenu(adminNavigation)
                break
            case "STUDENT":
                setMenu(studentNavigation)
                break
            case "FACULTY":
                setMenu(facultyNavigation)
                break
            default:
                setMenu([])
                break
        }
    }, [user.type])

    return (
        <div>
            <MobileSidebar
                menu={menu}
                setSidebarOpen={setSidebarOpen}
                sidebarOpen={sidebarOpen}
            />

            <Sidebar menu={menu} />

            <div className="md:pl-64 flex flex-col flex-1">
                <Topbar setSidebarOpen={setSidebarOpen} />
                <Main/>
            </div>
        </div>
    )


}

export default Navigation