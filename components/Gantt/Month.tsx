import moment from 'moment'
import { useMemo } from 'react'
import styled from 'styled-components'

import Line from './Line'

const Wrapper = styled.section`
  position: relative;
  display: grid;
  align-items: flex-start;
  padding: 0 5rem 15rem;

  + section {
    border-left: 4px double #000;
  }

  header,
  nav,
  main {
    display: contents;
  }

  header {
    h2 {
      grid-row: 1;
      grid-column: 1 / -1;
      font-size: 2.5rem;
      margin: 0 0 0.2em;
    }

    nav span {
      grid-row: 2;
      position: relative;
      display: block;
      color: #595959;
      font-size: 1rem;
      text-align: center;
      padding: 0 0.7em;

      &:before {
        z-index: -1;
        content: '';
        display: block;
        position: absolute;
        top: -4px;
        right: 2px;
        bottom: -40rem;
        left: 2px;
        border-top: 1px solid #f6e9e9;
      }

      &:nth-child(even):before {
        border-right: 1px solid #f6e9e9;
        background: #f7f7f7;
      }

      small {
        display: block;
      }
    }
  }
`

const Month: React.FC<{
  month: string
  days: moment.Moment[]
  events: moment.Moment[][]
}> = ({ month, days, events = [] }) => (
  <Wrapper
    style={{
      gridTemplateColumns: `repeat(${days.length}, 1fr)`,
      gridTemplateRows: 'repeat(5, 1fr)'
    }}>
    <header>
      <h2>
        {month}, {days[0].year()}
      </h2>

      <nav>
        {days.map(d => (
          <span key={+d}>
            {d.format('dd')}
            <small>
              {d
                .date()
                .toString()
                .padStart(2, '0')}
            </small>
          </span>
        ))}
      </nav>
    </header>

    <main>
      {events.map(([start, end], i) => (
        <Line
          key={i}
          row={5 * (i + 1)}
          range={[start.date(), end.date() + 1]}
        />
      ))}
    </main>
  </Wrapper>
)

export default Month
