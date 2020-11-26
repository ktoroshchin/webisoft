import { ISelectOption } from './VehicleForm'
import { IndexableObject } from './VehicleRegistration'

/**
 * Function generates years 
 * @param startYear Current year
 * @param endYear Latest year to choose
 */
export const yearList = (startYear: number, endYear: number): ISelectOption[] => {
  const options = []
  for(let i = startYear; i >= startYear-endYear; i--){
    options.push({ text: i.toString(), value: i.toString()})
  }
  return options
}

/**
 * Function filters model list by car make
 * @param models Available models
 * @param make Car make 
 */
export const modelList = (models: IndexableObject, make: string): ISelectOption[] => {
  return models[make] as ISelectOption[]
}

/**
 * Function filters trim list by car model
 * @param trims Available trims
 * @param model Car model
 */
export const trimList = (trims: IndexableObject, model: string): ISelectOption[] => {
  return trims[model] as ISelectOption[]
}

