import moment from 'moment';

function currentDate() {
  return moment.now();
}

function calculateElapsedTime({ date = moment(), dateUnit = 'minutes' } = {}) {
  return moment().diff(date, dateUnit);
}

export default { currentDate, calculateElapsedTime };
