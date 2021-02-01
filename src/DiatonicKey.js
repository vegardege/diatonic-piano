import React from 'react'

export function DiatonicKey(props) {
  return <path className={`diatonic-key-${props.note}
                           diatonic-key-${props.note}${props.octaveNum}`}
               d={`M0 0 l0 390 c0 0 0 10 10 10 l80 0 c0 0 10 0 10 -10 l0 -390 Z`}
               fill='#fff'
               stroke='#000'
               strokeWidth={props.strokeWidth} />
}
