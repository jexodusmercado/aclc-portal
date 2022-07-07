import { createSelector } from '@reduxjs/toolkit'
import { List } from 'interfaces'
import { AppState } from 'redux/reducers'

const schoolYears            = (state: AppState) => state.Schoolyear.schoolYears
const activeSchoolyear       = (state: AppState) => state.Schoolyear.activeSchoolyear

export const getSchoolYears         = createSelector(schoolYears, (schoolYears) => schoolYears)

export const getActiveSchoolYear    = createSelector(activeSchoolyear, (activeSchoolyear) => activeSchoolyear)

export const getFilteredschoolYears = createSelector(schoolYears, (schoolYears) : List[] => {
    return schoolYears.map(schoolYear => ({id: schoolYear.ID, name: `${schoolYear.school_year} ${schoolYear.semester}`}))
})