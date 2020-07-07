import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import { isMobile } from 'react-device-detect'

const StyledCube = styled.div`
  box-sizing: border-box;
  height: 50vmin;
  perspective: 400vmin;
  transform-style: preserve-3d;
  width: 50vmin;
  .face {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    border: calc(0.4vmin) solid #000;
    box-sizing: inherit;
    color: #fff;
    display: flex;
    font-size: 5vmin;
    height: 100%;
    justify-content: center;
    position: absolute;
    text-align: center;
    text-transform: uppercase;
    text-shadow: 0 0.5vmin #000, 0 -0.5vmin #000, 0.5vmin 0 #000,
      -0.5vmin 0 #000, 0.4vmin 0.4vmin #000, -0.4vmin -0.4vmin #000,
      0.4vmin -0.4vmin #000, -0.4vmin 0.4vmin #000;
    font-weight: 700;
    width: 100%;
    &.front {
      transform: translateZ(25vmin);
    }
    &.back {
      /* Mirrored on purpose */
      transform: translateZ(-25vmin);
      /* transform: rotateY(180deg) translateZ(25vmin); */
    }
    &.left {
      transform: rotateY(-90deg) translateZ(25vmin);
    }
    &.right {
      transform: rotateY(90deg) translateZ(25vmin);
    }
    &.top {
      transform: rotateX(90deg) translateZ(25vmin);
    }
    &.bottom {
      transform: rotateX(-90deg) translateZ(25vmin);
    }
  }
`

const faces = [
  {
    position: 'front',
    background: 'rgba(51, 169, 82, 0.95)',
    content: 'Spellbased'
  },
  {
    position: 'back',
    background: 'rgb(249, 122, 4)',
    content: "You'll love it"
  },
  {
    position: 'left',
    background: 'rgb(234, 68, 53)',
    content: 'Under development'
  },
  {
    position: 'right',
    background: 'rgb(66, 133, 243)',
    content: 'Under development'
  },
  {
    position: 'top',
    background: 'rgb(251, 189, 4)',
    content: 'Under development'
  },
  {
    position: 'bottom',
    background: 'rgb(143, 67, 242)',
    content: 'Under development'
  }
]

export default function Cube() {
  const [angles, setAngles] = useState(null)

  useEffect(() => {
    let event
    let callback

    if (isMobile) {
      event = 'deviceorientation'

      callback = (e) => {
        console.warn(e)
      }
    } else {
      event = 'mousemove'

      callback = ({ view: { innerWidth, innerHeight }, clientX, clientY }) => {
        setAngles({
          x: (0.5 - clientY / innerHeight) * 90,
          y: -(0.5 - clientX / innerWidth) * 90
        })
      }
    }

    window.addEventListener(event, callback)
    return () => window.removeEventListener(event, callback)
  }, [])

  return (
    <StyledCube
      className="cube"
      style={
        angles
          ? { transform: `rotateX(${angles.x}deg) rotateY(${angles.y}deg)` }
          : {}
      }
    >
      {faces.map(({ position, background, content }, index) => (
        <div
          key={index}
          className={classNames('face', position)}
          style={{ backgroundColor: background }}
        >
          {content}
        </div>
      ))}
    </StyledCube>
  )
}
