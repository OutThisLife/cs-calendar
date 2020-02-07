import moment from 'moment'

moment.locale('en')

export const getMonths = () => moment.monthsShort()

export const getDays = (date: moment.MomentInput) =>
  [...Array(moment(date).daysInMonth()).keys()].reduce(
    (acc, d) => ({
      ...acc,
      [d + 1]: moment(moment(date).set('day', d)).format('dd')
    }),
    {}
  )

export const getCalendar = () =>
  Object.entries<moment.Moment[]>(
    moment.monthsShort().reduce((acc, m) => {
      const now = moment().set('month', m as any)

      return {
        ...acc,
        [m]: [...Array(now.daysInMonth()).keys()].map(d =>
          moment(now).set('date', d + 1)
        )
      }
    }, {})
  )
