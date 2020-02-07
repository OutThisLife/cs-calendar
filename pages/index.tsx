import flatten from 'lodash/flatten'
import { useCallback, useMemo, useState } from 'react'
import RRule from 'rrule'
import styled, { createGlobalStyle } from 'styled-components'

import Gantt from '../components/Gantt'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body, html {
    margin: 0;
    padding: 0;
  }

  html {
    font: 12px sans-serif;
  }

  ::-webkit-scrollbar {
    width: 3px;
    height: 3px;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: #000;
  }

  *:not(:hover)::-webkit-scrollbar-thumb {
    opacity: 0.2;
  }
`

const Wrapper = styled.main`
  display: flex;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 2vw;
`

export default () => {
  const [inputs, setInputs] = useState([
    'RRULE:INTERVAL=2;FREQ=WEEKLY;BYDAY=TH,FR,SA,SU;COUNT=10',
    'RRULE:FREQ=WEEKLY;INTERVAL=2;WKST=SU;COUNT=10'
  ])

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

  const onChange = useCallback(e => {
    const $form = e.currentTarget
    const r = []
    const fd = new FormData($form)

    for (const [, v] of fd.entries()) {
      r.push(v)
    }

    setInputs(r)
  }, [])

  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <Gantt />
      </Wrapper>
    </>
  )
}
