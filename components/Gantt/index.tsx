import moment from 'moment'
import { useMemo } from 'react'
import styled from 'styled-components'

import { getCalendar } from '../../lib/utils'
import Month from './Month'

const Wrapper = styled.div`
  --groups: 2;

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

export default () => {
  const calendar = useMemo(getCalendar, [])

  return (
    <Wrapper>
      {calendar.map(([month, days]) => (
        <Month
          key={month}
          events={[
            [moment().set('date', 2), moment().set('date', 20)],
            [moment().set('date', 4), moment().set('date', 15)]
          ]}
          {...{ month, days }}
        />
      ))}
    </Wrapper>
  )
}

