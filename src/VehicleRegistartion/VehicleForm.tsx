import * as React from 'react'
import { Button, Checkbox, CheckboxProps, DropdownProps, Form, InputOnChangeData, Segment } from 'semantic-ui-react'
import './VehicleForm.css'
import { IndexableObject } from './VehicleRegistration'

export interface ISelectOption {
  text: string
  value: string
}

export interface IVehicleFormItems {
  label: string
  initialValue: string | boolean
  options?: ISelectOption[]
  onChange?: (data: CheckboxProps | DropdownProps | InputOnChangeData) => void
  text?: string
}

interface IVehicleFormProps {
  items: IVehicleFormItems[]
  onClick: () => Promise<void>
  vehicleData: IndexableObject
}

export const VehicleForm = (props: IVehicleFormProps): React.ReactElement => {
  const { items, onClick, vehicleData } = props

  /**
   * Functions check if fields are not empty
   * @param data Form data
   */
  const isButtonDisabled = (data: IndexableObject): boolean => {
    let disabled = true
    for (const property in data) {
      if(data[property]) {
        if(property === 'condition' && data[property]) {
          disabled = false
        }
      } 
    } 
    return disabled
  }

  const renderFields = (fieldsData: IVehicleFormItems[]): React.ReactElement[] => {
    const fields = fieldsData.map((element, index) => {
      if(element.label === 'odometer') {
        return (
          <Form.Input
            placeholder={element.label.charAt(0).toUpperCase() + element.label.slice(1)}
            key={index}
            id={element.label}
            onChange={(e,data): void => element.onChange ? element.onChange(data) : undefined}
          />
        )
      }
      if(element.label === 'maxloan') {
        return (
          <Segment className='maxloan'><p>Maximum Repair Loan: ${element.initialValue}</p></Segment>
        )
      }
      if(element.label === 'condition') {
        return (
          <Checkbox
            className='condition'
            key={index}
            id={element.label}
            label={element.text}
            onChange={(e,data): void => element.onChange ? element.onChange(data) : undefined}
          />
        )
      }
      return (  
        <Form.Select
          fluid
          placeholder={element.label.charAt(0).toUpperCase() + element.label.slice(1)}
          key={index}
          id={element.label}
          options={element.options ? element.options : []}
          onChange={(e,data): void => element.onChange ? element.onChange(data) : undefined}
        />
      )
    })

    return fields
  }

  return (
    <div className='form_container'>
      <Form className='vehicle_form'>
        <h4 className='vehicle_form_header'>Tell us about your vehicle</h4>
        {renderFields(items)}
        <div className='btn-container'>
          <Button disabled={isButtonDisabled(vehicleData)} onClick={onClick} className='btn_continue' color='teal'>CONTINUE</Button>
        </div>
      </Form>
    </div>
  )
}