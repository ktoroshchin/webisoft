import { IndexableObject } from './VehicleRegistration'

class VehicleRegistrationApi {

  private processVehicleData(data: IndexableObject): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('Success')
      }, 5000)
    })
  }

  public submitVehicleData(data: IndexableObject): Promise<void> {
    return this.processVehicleData(data)
      .then(result => console.log(result))
      .catch(error => console.log(error))
  }
}

export const vehicleRegistrationApi = new VehicleRegistrationApi()