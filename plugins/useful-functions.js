import moment from 'moment'

export function mapDates(data) {

  //moment.locale('en-US')
  let dates = data.dates
  let format = data.format

  if(format == null || format == '' || format == 'undefined') {
    format = 'll'
  }

  return dates.map((date) => {
    return moment(date).format(format)
  });

}

export function mapDate(date, format) {
  if(format == null || format == '' || format == 'undefined') {
    format = 'll'
  }
  return moment(date).format(format)
}
