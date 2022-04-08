export interface Location {
    from: { 
        pathname: string
    }
}

export interface List {
    id: number
    name: string
}

export interface IDepartment {
    id: number
    name: string
    description: string
    courses: Array<string>
}

export interface IFaculty {
    id: number,
    firstName: string
    lastName: string
    Subject: string[]
    Classes: number
}