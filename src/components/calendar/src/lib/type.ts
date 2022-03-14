export interface Calendars {
    year: number,
    month: number,
    day: number,
    ymd: string,
    disabled: boolean,
    type: string,
    timeNode: string,
    week: number
}

export interface OutCalendar {
    year: number,
    month: number,
    minDate: string,
    maxDate: string,
    disabled: (value?:string)=>boolean,
    endType?: string,
    startWeek?: number
}

export interface Position {
    x: number,
    y: number
}

export interface Section{
    x: number[],
    y: number[]
}