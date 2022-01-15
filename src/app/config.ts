let serverUrlEnv = ""

//localhost
if (window.location.hostname.indexOf("localhost") > -1) {
  serverUrlEnv = "http://localhost:8000"
} else {
  //server
  serverUrlEnv = window.location.origin
}

export const snackbarTime = 5000
export const commonErrMsg = "Something went wrong. Please try again!"
export const serverUrl = serverUrlEnv
export const cuisines = [
  {value: 'veg-3', viewValue: 'Veg Restaurants'},
  {value: 'non-veg-4', viewValue: 'Non-Veg Restaurants'},
  {value: 'indian-0', viewValue: 'Indian'},
  {value: 'thai-1', viewValue: 'Thai'},
  {value: 'british-2', viewValue: 'British'},
]