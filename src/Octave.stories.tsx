import type { Story } from '@ladle/react'
import { NoteList } from 'kamasi'
import { useState } from 'react'
import { Octave } from './Octave.js'
import './styles.css'

export const DefaultOctave: Story = () => (
  <svg width="300" viewBox="0 0 708 408">
    <Octave
      octaveNum={4}
      pressed={new NoteList()}
      highlighted={new NoteList()}
      interactive={false}
      onPress={note => console.log('Clicked:', note)}
      onHighlightStart={() => {}}
      onHighlightEnd={() => {}}
    />
  </svg>
)

export const PressedChord: Story = () => (
  <svg width="300" viewBox="0 0 708 408">
    <Octave
      octaveNum={4}
      pressed={new NoteList(['C4', 'E4', 'G4'])}
      highlighted={new NoteList()}
      interactive={false}
      onPress={note => console.log('Clicked:', note)}
      onHighlightStart={() => {}}
      onHighlightEnd={() => {}}
    />
  </svg>
)

export const HighlightedScale: Story = () => (
  <svg width="300" viewBox="0 0 708 408">
    <Octave
      octaveNum={4}
      pressed={new NoteList()}
      highlighted={new NoteList(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4'])}
      interactive={false}
      onPress={note => console.log('Clicked:', note)}
      onHighlightStart={() => {}}
      onHighlightEnd={() => {}}
    />
  </svg>
)

export const InteractiveOctave: Story = () => {
  const [pressed, setPressed] = useState<string[]>([])
  const [highlighted, setHighlighted] = useState<string[]>([])

  return (
    <div>
      <svg width="300" viewBox="0 0 708 408">
        <Octave
          octaveNum={4}
          pressed={new NoteList(pressed)}
          highlighted={new NoteList(highlighted)}
          interactive={true}
          onPress={note => {
            setPressed(prev =>
              prev.includes(note)
                ? prev.filter(n => n !== note)
                : [...prev, note],
            )
          }}
          onHighlightStart={note => setHighlighted([note])}
          onHighlightEnd={() => setHighlighted([])}
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

export const DifferentOctaves: Story = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <div>
      <h3 style={{ margin: '0 0 10px 0' }}>Octave 3</h3>
      <svg width="300" viewBox="0 0 708 408">
        <Octave
          octaveNum={3}
          pressed={new NoteList(['C3'])}
          highlighted={new NoteList()}
          interactive={false}
          onPress={() => {}}
          onHighlightStart={() => {}}
          onHighlightEnd={() => {}}
        />
      </svg>
    </div>
    <div>
      <h3 style={{ margin: '0 0 10px 0' }}>Octave 4</h3>
      <svg width="300" viewBox="0 0 708 408">
        <Octave
          octaveNum={4}
          pressed={new NoteList(['C4'])}
          highlighted={new NoteList()}
          interactive={false}
          onPress={() => {}}
          onHighlightStart={() => {}}
          onHighlightEnd={() => {}}
        />
      </svg>
    </div>
    <div>
      <h3 style={{ margin: '0 0 10px 0' }}>Octave 5</h3>
      <svg width="300" viewBox="0 0 708 408">
        <Octave
          octaveNum={5}
          pressed={new NoteList(['C5'])}
          highlighted={new NoteList()}
          interactive={false}
          onPress={() => {}}
          onHighlightStart={() => {}}
          onHighlightEnd={() => {}}
        />
      </svg>
    </div>
  </div>
)
