import React from 'react'
import Card from 'components/Card'

const applications = [
    {
      applicant: {
        name: 'Ricardo Cooper',
        email: 'ricardo.cooper@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      date: '2020-01-07',
      dateFull: 'January 7, 2020',
      stage: 'Completed phone screening',
      href: '#',
    },
    {
      applicant: {
        name: 'Kristen Ramos',
        email: 'kristen.ramos@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      date: '2020-01-07',
      dateFull: 'January 7, 2020',
      stage: 'Completed phone screening',
      href: '#',
    },
    {
      applicant: {
        name: 'Ted Fox',
        email: 'ted.fox@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      date: '2020-01-07',
      dateFull: 'January 7, 2020',
      stage: 'Completed phone screening',
      href: '#',
    },
  ]

const UsersDashboard = () => {
    return (
        <>
            <div className='my-5'>
                <h1 className="text-2xl leading-6 font-semibold"> Users </h1> 
            </div>

            <div className='space-y-4'>

                <Card headerText='Faculties' descriptionText='List for the faculty members'  createButton={true} buttonText='Create' users={applications}/>

                <Card headerText='Students' descriptionText='List for the students'  createButton={true} buttonText='Create' users={applications}/>

                <Card headerText='Admins' descriptionText='List for admins'  createButton={true} buttonText='Create' users={applications}/>
            </div>

        </>
    )
}

export default UsersDashboard