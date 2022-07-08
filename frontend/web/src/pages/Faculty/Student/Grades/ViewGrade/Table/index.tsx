import React from 'react'
import { Link } from 'react-router-dom';
import { Classroom } from 'redux/classroom/interface';
import { GradePeriod } from 'redux/grade/interface';

interface IProps {
    grade: GradePeriod[]
}

const Table: React.FC<IProps> = ({grade}) => {

    if(!grade){
        return (
            <> Grades are not available </>
        )
    }

    const calculation = (grade: GradePeriod) => {
        let quizzes         = ((grade.quiz1 + grade.quiz2)/2)*0.4
        let exam            = (grade.exam*0.65)
        // let classStanding   = (100*0.1)
        // let quizzes         = ((85+85)/2)*0.4
        // let exam            = 79*0.65
        let total           = quizzes + exam
        return total;
    }

    const calcFinalGrade = (grade: number) => {
        switch(true){
            case grade < 100 && grade > 96:
                return '1'
            case grade < 95 && grade > 92:
                return '1.25'
            case grade < 91 && grade > 87:
                return '1.50'
            case grade < 86 && grade > 82:
                return '1.75'
            case grade < 81 && grade > 77:
                return '2'
            case grade < 76 && grade > 72:
                return '2.25'
            case grade < 71 && grade > 67:
                return '2.50'
            case grade < 66 && grade > 62:
                return '2.75'
            case grade < 61 && grade > 57:
                return '3'
            case grade < 56 && grade !== 0:
                return '5'
            case grade === 0:
                return 'INC'
        }
    }



    return (
        <div className="hidden sm:block mt-2">
            <div className="mx-auto px-1 sm:px-2 lg:px-4">
                <div className="flex flex-col"> 
                    <div className="align-middle min-w-full overflow-x-auto shadow overflow-hidden sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        PERIOD
                                    </th>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        QUIZ 1
                                    </th>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        QUIZ 2
                                    </th>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        EXAM
                                    </th>
                                    
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        GRADE
                                    </th>
                                    <th
                                        className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                        scope="col"
                                    >
                                        FINAL GRADE
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {grade.sort((a, b) => {
                                    return a.period < b.period ? 1 : (a.period > b.period ? -1 : 0)
                                }).map((grade) => (
                                <tr key={grade.id} className="bg-white">
                                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                        <span className="text-gray-900 font-medium">{grade.period} </span>
                                    </td>
                                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-900">
                                        <span className="text-gray-900 font-medium">
                                            {grade.quiz1}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                        <span className="text-gray-900 font-medium">{grade.quiz2} </span>
                                    </td>

                                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                        <span className="text-gray-900 font-medium">{grade.exam} </span>
                                    </td>

                                    <td className="px-6 py-4 text-left whitespace-nowrap text-sm text-gray-500">
                                        <span className="text-gray-900 font-medium">{calculation(grade)} </span>
                                    </td>
                                   
                                    <td className="px-6 py-4 whitespace-nowrap text-sm  text-left text-gray-500">
                                        <span className="text-gray-900 font-medium">{calcFinalGrade(calculation(grade))} </span>
                                    </td>
                                </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Table;