import * as React from 'react'
import { CheckboxProps, DropdownProps, InputOnChangeData } from 'semantic-ui-react'
import { modelList, trimList, yearList } from './helperFunctions'
import { IProgressBarItem, ProgressMenu } from './ProgressMenu'
import { IVehicleFormItems, VehicleForm } from './VehicleForm'
import './VehicleRegistration.css'
import { vehicleRegistrationApi } from './VehicleRegistrationApi'

export interface IndexableObject {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any
}

const vehicleInitialData: IndexableObject = {
  year: '',
  make: '',
  model: '',
  trim: '',
  odometer: '',
  maxloan: '3000',
  condition: false
}

const modelOptions: IndexableObject = {
  suzuki: [{ text: 'Grand Vitara', value: 'grandVitara' }, { text: 'Liana', value: 'liana'}],
  toyota: [{ text: 'Camry', value: 'camry' }, { text: 'Prius', value: 'prius' }]
}

const trimOptions: IndexableObject= {
  grandVitara: [{ text: 'GR', value: 'gr' }, { text: 'GRE', value: 'gre'}],
  liana: [{ text: 'LN', value: 'ln' }, { text: 'LNE', value: 'lne' }],
  camry: [{text: 'SE', value: 'se' }, {text: 'LTE', value: 'lte' }],
  prius: [{text: 'ENERGY', value: 'energy' }, {text: 'ENERGY+', value: 'energy+' }]
}

const CONDITION = `
  A FIX4 repair loan is NOT applicable on accessories such 
  as audio systems, mats, lift kits, window tints, etc or
  any uninstalled parts or equipment.
`

export const VehicleRegistartion = (): React.ReactElement => {
  const currentTime = new Date()
  const currentYear = currentTime.getFullYear()
  const YEARS_TO_END = 30
  const [vehicleData, setVehicleData] = React.useState(vehicleInitialData)

  const vehicleFormOnChange = (data: DropdownProps | InputOnChangeData | CheckboxProps): void => {
    const { id, value, checked } = data
    setVehicleData({
      ...vehicleData,
      [id]: value ? value : checked
    })
  }

  const handleContinueClick = (): Promise<void> => {
    return vehicleRegistrationApi.submitVehicleData(vehicleData)
  }

  const progressBarItems: IProgressBarItem[] = [
    { label: 'Vehicle' },
    { label: 'Garage' },
    { label: 'Repair' },
    { label: 'Confirmation'}
  ]
  
  const vehicleFormItems: IVehicleFormItems[] = [
    { label: 'year', initialValue: vehicleData.year as string, options: yearList(currentYear, YEARS_TO_END), onChange: vehicleFormOnChange },
    { label: 'make', initialValue: vehicleData.make as string, options: [{text: 'Suzuki', value: 'suzuki'}, {text: 'Toyota', value: 'toyota'}], onChange: vehicleFormOnChange },
    { label: 'model', initialValue: vehicleData.model as string, options: modelList(modelOptions, vehicleData.make), onChange: vehicleFormOnChange },
    { label: 'trim', initialValue: vehicleData.trim as string, options: trimList(trimOptions, vehicleData.model), onChange: vehicleFormOnChange },
    { label: 'odometer', initialValue: vehicleData.odometer as string, onChange: vehicleFormOnChange },
    { label: 'maxloan', initialValue: vehicleData.maxloan as string },
    { label: 'condition', initialValue: vehicleData.condition as boolean, text: CONDITION, onChange: vehicleFormOnChange }
  ]
  

  return (
    <div className='main_container'>
      <ProgressMenu items={progressBarItems} />
      <div className='form_main_container'>
        <VehicleForm items={vehicleFormItems} vehicleData={vehicleData} onClick={handleContinueClick}/>
      </div>
    </div>
  )
}