import type { PickerSlotItem } from '../../Picker/src/type'

export interface PickerTimeProps{
    defaultValue?:string,
    type?: string
    modelValue?: boolean,
    startDate?: string,
    endDate?: string,
    disableOption?:(value: PickerSlotItem) => boolean,
    loop?: boolean,
    minStep?: number,
    format?:string | null,
    onSelected?: (value: string) => void
}

export type PickerItems = (PickerSlotItem[] | string[] | number[])[]
export type PickerTimeOptions = Omit<PickerTimeProps, 'id'>
