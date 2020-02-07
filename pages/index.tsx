import flatten from 'lodash/flatten'
import { useCallback, useMemo, useState } from 'react'
import RRule from 'rrule'
import styled from 'styled-components'

const Wrapper = styled.div`
  font-family: monospace;

  form {
    position: sticky;
    top: 0;
    display: flex;
    align-items: center;
    padding: 2vw;

    input {
      font-family: monospace;
      padding: 0.1em 0.3em;

      + input {
        margin-left: 1em;
      }
    }
  }
`

const MonthWrapper = styled.div`
  position: relative;
  margin-top: 1.5vw;
  padding: 2vw;

  h2 {
    position: sticky;
    top: 2px;
  }

  > div {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    align-items: center;
    justify-content: space-between;
    grid-gap: 2em;
    padding: 0.2em 0.4em;
  }

  .evt-1 {
    background: yellow;
  }

  .evt-2 {
    background: orange;
  }

  .evt-3 {
    background: red;
  }
`

export default () => {
  const [inputs, setInputs] = useState([
    'RRULE:INTERVAL=2;FREQ=WEEKLY;BYDAY=TH,FR,SA,SU;COUNT=10',
    'RRULE:FREQ=WEEKLY;INTERVAL=2;WKST=SU;COUNT=10'
  ])

  const onChange = useCallback(e => {
    const $form = e.currentTarget
    const r = []
    const fd = new FormData($form)

    for (const [, v] of fd.entries()) {
      r.push(v)
    }

    setInputs(r)
  }, [])

  const res = useMemo(
    () =>
      flatten(
        inputs.map(c =>
          RRule.fromString(c)
            .all()
            .map(t => new Date(t.setHours(0, 0, 0)))
        )
      ),
    [inputs]
  )

  return (
    <Wrapper>
      <form method="post" action="javascript:;" {...{ onChange }}>
        {inputs.map((defaultValue, i) => (
          <input
            key={i}
            type="text"
            name={`c${i}`}
            placeholder={`Custody ${i}`}
            {...{ defaultValue }}
          />
        ))}
      </form>

      {[...Array(12).keys()]
        .filter(i => i >= new Date().getMonth())
        .map(m => (
          <Month key={m} t={new Date(new Date().setMonth(m))} {...{ res }} />
        ))}
    </Wrapper>
  )
}

const Month = ({ t, res }: { t: Date; res: Date[] }) => {
  const m = t.getMonth()
  const y = t.getFullYear()

  return (
    <MonthWrapper>
      <h2>{t.toLocaleDateString('default', { month: 'long' })}</h2>

      <div>
        {[...Array(new Date(y, m, 0).getDate()).keys()]
          .map(i => new Date(y, m, i))
          .map(d => (
            <div
              key={+d}
              className={`evt-${res.filter(t => +d === +t).length}`}>
              {d.getDate()}
            </div>
          ))}
      </div>
    </MonthWrapper>
  )
}
