import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime.js'
import duration from 'dayjs/plugin/duration.js'

// dayjs plugins
dayjs.extend(relativeTime)
dayjs.extend(duration)

const KNOWN_FORMATS = {
  onlyDate: 'ddd, MMM D',
  dateAndTime: 'ddd, MMM D - h:mm a',
  onlyTime: 'h:mm a',
  standard: 'ddd MMM YYYY, HH:mm:ss',
}

export function dateFormat(date, formatName) {
  // dayjs.format() applies ISO format by default if no format is given
  return dayjs(date).format(KNOWN_FORMATS[formatName])
}

// Displays the difference between two dates
export function getRelativeTime(from, to) {
  return dayjs(to)
    .from(from)
    .replace(/minutes?/, 'min')
    .replace(/seconds?/, 'sec')
    .trim()
}

export function durationToHours(duration) {
  return dayjs.duration(duration).asHours()
}