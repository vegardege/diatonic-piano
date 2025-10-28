import type { Story } from '@ladle/react'
import { NoteList } from 'kamasi'
import { useState } from 'react'
import { Octave } from './Octave.js'
import './styles.css'

export const DefaultOctave: Story = () => (
  <svg width="800" height="450" viewBox="0 0 708 408">
    <Octave
      octaveNum={4}
      pressed={new NoteList()}
      highlighted={new NoteList()}
      focusable={false}
      onClick={note => console.log('Clicked:', note)}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
      onFocus={() => {}}
      onBlur={() => {}}
    />
  </svg>
)

DefaultOctave.meta = {
  description: 'Single octave (octave 4)',
}

export const PressedChord: Story = () => (
  <svg width="800" height="450" viewBox="0 0 708 408">
    <Octave
      octaveNum={4}
      pressed={new NoteList(['C4', 'E4', 'G4'])}
      highlighted={new NoteList()}
      focusable={false}
      onClick={note => console.log('Clicked:', note)}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
      onFocus={() => {}}
      onBlur={() => {}}
    />
  </svg>
)

PressedChord.meta = {
  description: 'C major chord pressed in octave 4',
}

export const HighlightedScale: Story = () => (
  <svg width="800" height="450" viewBox="0 0 708 408">
    <Octave
      octaveNum={4}
      pressed={new NoteList()}
      highlighted={new NoteList(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'])}
      focusable={false}
      onClick={note => console.log('Clicked:', note)}
      onMouseEnter={() => {}}
      onMouseLeave={() => {}}
      onFocus={() => {}}
      onBlur={() => {}}
    />
  </svg>
)

HighlightedScale.meta = {
  description: 'C major scale highlighted',
}

export const InteractiveOctave: Story = () => {
  const [pressed, setPressed] = useState<string[]>([])
  const [highlighted, setHighlighted] = useState<string[]>([])

  return (
    <div>
      <svg width="800" height="450" viewBox="0 0 708 408">
        <Octave
          octaveNum={4}
          pressed={new NoteList(pressed)}
          highlighted={new NoteList(highlighted)}
          focusable={false}
          onClick={note => {
            setPressed(prev =>
              prev.includes(note)
                ? prev.filter(n => n !== note)
                : [...prev, note],
            )
          }}
          onMouseEnter={note => setHighlighted([note])}
          onMouseLeave={() => setHighlighted([])}
          onFocus={() => {}}
          onBlur={() => {}}
        />
      </svg>
      <div style={{ marginTop: '20px', fontFamily: 'monospace' }}>
        <div>
          <strong>Pressed:</strong> {pressed.join(', ') || 'none'}
        </div>
        <div>
          <strong>Highlighted:</strong> {highlighted.join(', ') || 'none'}
        </div>
      </div>
    </div>
  )
}

InteractiveOctave.meta = {
  description: 'Interactive octave - click to toggle, hover to highlight',
}

export const DifferentOctaves: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <div>
      <h3 style={{ margin: '0 0 10px 0' }}>Octave 3</h3>
      <svg width="800" height="450" viewBox="0 0 708 408">
        <Octave
          octaveNum={3}
          pressed={new NoteList(['C3'])}
          highlighted={new NoteList()}
          focusable={false}
          onClick={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          onFocus={() => {}}
          onBlur={() => {}}
        />
      </svg>
    </div>
    <div>
      <h3 style={{ margin: '0 0 10px 0' }}>Octave 4</h3>
      <svg width="800" height="450" viewBox="0 0 708 408">
        <Octave
          octaveNum={4}
          pressed={new NoteList(['C4'])}
          highlighted={new NoteList()}
          focusable={false}
          onClick={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          onFocus={() => {}}
          onBlur={() => {}}
        />
      </svg>
    </div>
    <div>
      <h3 style={{ margin: '0 0 10px 0' }}>Octave 5</h3>
      <svg width="800" height="450" viewBox="0 0 708 408">
        <Octave
          octaveNum={5}
          pressed={new NoteList(['C5'])}
          highlighted={new NoteList()}
          focusable={false}
          onClick={() => {}}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
          onFocus={() => {}}
          onBlur={() => {}}
        />
      </svg>
    </div>
  </div>
)

DifferentOctaves.meta = {
  description: 'Comparison of different octave numbers',
}
