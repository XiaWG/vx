const getNewDate = (date) => {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  let hour = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  return {year, month, day, hour, minutes, seconds}
}

const getDate = ({year, month, day, hour, minutes, seconds}) => {
  return new Date(year, month, day, hour, minutes, seconds)
}

export {
  getNewDate,
  getDate
}