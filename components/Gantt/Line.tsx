import styled from 'styled-components'

const Wrapper = styled.div`
  padding: 10px;
  border-radius: 100em;
  background: #000;
`

const Line: React.FC<{
  row: number
  range: [number | string, number | string]
}> = ({ row, range: [start, end], ...props }) => {
  return (
    <Wrapper
      style={{ gridRow: row, gridColumn: `${start} / ${end}` }}
      {...props}
    />
  )
}

export default Line
