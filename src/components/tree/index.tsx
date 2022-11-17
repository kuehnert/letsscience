import React from 'react'
import sketch from './app'
import { ReactP5Wrapper } from 'react-p5-wrapper'

const TreeGen = (): JSX.Element => {
  return <ReactP5Wrapper sketch={sketch} />
}

export default TreeGen
