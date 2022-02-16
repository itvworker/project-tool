import type { VNode } from 'vue'

export interface PickerSlotItem {
    label?: string,
    value: number | string,
    disabled?: boolean,
    type?: number | string,
    data?: any
}

export interface PickerProps{
    modelValue?: boolean,
    mask?: boolean,
    defaultValue?: string[] | number [],
    output?: (item: any) => string,
    items?: (PickerSlotItem [] | string[] | number[])[],
    onSelected?: (value?:PickerSlotItem[] | string[] | number[])=>void
}

export type PickerItems = (PickerSlotItem[] | string[] | number[])[]
export type PickerOptions = Omit<PickerProps, 'id'>
export type PickerParams = Partial<PickerOptions> | string | VNode
export interface PickerHandle {
    close: () => void
}
export type PickerFn = (options?: PickerParams) => void

export type PickerSelectedFn = (opt: PickerSlotItem[] | string[] | number[]) => void

export interface Picker extends PickerFn {
    onSelected: PickerSelectedFn
}
