import { useMemo } from 'react'
import styled from 'styled-components'

import { getCalendar } from '../../lib/utils'

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

const Month = styled.section`
  position: relative;
  display: grid;
  grid-template-columns: repeat(var(--cols), 1fr);
  grid-template-rows: repeat(5, 1fr);
  align-items: flex-start;
  padding: 0 5rem 20rem;

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
    }
  }
`

const Timeline = styled.div`
  padding: 10px;
  border-radius: 100em;
  background: #000;
`

export default () => {
  const calendar = useMemo(getCalendar, [])

  return (
    <Wrapper>
      {calendar.map(([k, v]) => (
        <Month key={k} style={{ '--cols': v.length } as any}>
          <header>
            <h2>
              {k}, {v[0].year()}
            </h2>

            <nav>
              {v.map(d => (
                <span key={+d}>
                  {d.format('dd')}
                  <br />
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
            <Timeline style={{ gridRow: 4, gridColumn: '2 / span 10' }} />
            <Timeline style={{ gridRow: 5, gridColumn: '2 / span 5' }} />
          </main>
        </Month>
      ))}
    </Wrapper>
  )
}
