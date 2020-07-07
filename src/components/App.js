import React from 'react'
import styled from 'styled-components'
import Cube from './Cube'

const StyledApp = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 100%;
  width: 100%;
`

export default function App() {
  return (
    <StyledApp className="app">
      <Cube />
    </StyledApp>
  )
}
