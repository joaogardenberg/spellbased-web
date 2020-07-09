import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import classNames from 'classnames'
import { isMobile } from 'react-device-detect'

const StyledCube = styled.div`
  box-sizing: border-box;
  height: 50vmin;
  perspective: 400vmin;
  transform-style: preserve-3d;
  user-select: none;
  width: 50vmin;
  .face {
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    background-image: url('/images/cube_texture.png');
    background-position: center center;
    background-size: cover;
    border: calc(2vmin) solid #000;
    border-image: url('/images/border_texture.jpg') 10% round;
    box-shadow: 0 0 0 2px #2b150e inset;
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
      transform: rotateY(180deg) translateZ(25vmin);
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
    background: 'rgb(51, 169, 82)',
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
  const [angle, setAngle] = useState(180)
  const [angles, setAngles] = useState({ x: null, y: null })

  useEffect(() => {
    if (!isMobile) {
      const onMouseMove = ({
        view: { innerWidth, innerHeight },
        clientX,
        clientY
      }) => {
        setAngles({
          x: (0.5 - clientY / innerHeight) * 90,
          y: -(0.5 - clientX / innerWidth) * 90
        })
      }

      window.addEventListener('mousemove', onMouseMove)
      return () => window.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  useEffect(() => {
    if (isMobile) {
      const timeout = setTimeout(() => {
        let newAngle = angle - 0.01

        if (newAngle <= 0) {
          newAngle = 360
        }

        setAngle(newAngle)
        setAngles({ x: 40 * Math.sin(newAngle), y: 40 * Math.cos(newAngle) })
      }, 10)
      return () => clearTimeout(timeout)
    }
  }, [angle])

  return (
    <StyledCube
      className="cube"
      style={
        angles
          ? {
              transform: classNames({
                [`rotateX(${angles.x}deg)`]: angles.x,
                [`rotateY(${angles.y}deg)`]: angles.y
              })
            }
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
