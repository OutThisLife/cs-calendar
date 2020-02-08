import moment from 'moment'
import { useMemo } from 'react'
import styled from 'styled-components'

import { getCalendar } from '../../lib/utils'
import Month from './Month'

const Wrapper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: nowrap;
  min-width: 100%;
  height: auto;
  overflow-x: auto;
  overflow-y: hidden;
  margin: auto;
`

const Gantt: React.FC<{ schedule: moment.Moment[][] }> = ({
  schedule = []
}) => {
  const calendar = useMemo(getCalendar, [])

  return (
    <Wrapper>
      {calendar.map(([month, days]) => {
        const events = [].slice.call(schedule).map(g => {
          const f = [].slice.call(g).filter(s => s.format('MMM') === month)
          return [f.shift(), f.pop()]
        })

        return <Month key={month} {...{ month, days }} />
      })}
    </Wrapper>
  )
}

export default Gantt
