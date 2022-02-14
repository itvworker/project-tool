import type { VNode, ExtractPropTypes, Component } from 'vue'

export interface SlotItem {
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
    items?: (SlotItem[] | string[] | number[])[],
    onSelected?: (value?:SlotItem[] | string[] | number[])=>void
}

export type PickerOptions = Omit<PickerProps, 'id'>
export type PickerParams = Partial<PickerOptions> | string | VNode
export interface PickerHandle {
    close: () => void
}
export type PickerFn = (options?: PickerParams) => void

export type PickerSelectedFn = (opt: SlotItem[] | string[] | number[]) => void

export interface Picker extends PickerFn {
    onSelected: PickerSelectedFn
}
