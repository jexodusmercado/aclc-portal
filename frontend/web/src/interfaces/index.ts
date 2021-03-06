export interface Location {
    from: { 
        pathname: string
    }
}

export interface List {
    id: number | string
    name?: string
}

export interface ListWithAvatar extends List {
    avatar?: string
}
export interface IFaculty {
    id: number,
    firstName: string
    lastName: string
    Subject: string[]
    Classes: number
}

export interface IMenu {
    name: string
    href: string
    icon: (props: React.SVGProps<SVGSVGElement>) => JSX.Element
    end: boolean
}

export interface IPayload {
    onSuccess?: () => void
    onFailed?: () => void
}