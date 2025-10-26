import type { Story } from '@ladle/react'
import { NoteList } from 'kamasi'
import { useState } from 'react'
import { Piano } from './Piano.js'

export const Default: Story = () => (
  <div style={{ width: '600px', height: '200px' }}>
    <Piano />
  </div>
)

Default.meta = {
  description: 'Default piano with 2 octaves',
}

export const ThreeOctaves: Story = () => (
  <div style={{ width: '800px', height: '200px' }}>
    <Piano octaves={3} />
  </div>
)

ThreeOctaves.meta = {
  description: 'Piano with three octaves',
}

export const PressedKeys: Story = () => (
  <div style={{ width: '600px', height: '200px' }}>
    <Piano pressed={['C4', 'E4', 'G4']} />
  </div>
)

PressedKeys.meta = {
  description: 'C major chord (C4, E4, G4) pressed',
}

export const HighlightedScale: Story = () => (
  <div style={{ width: '600px', height: '200px' }}>
    <Piano
      highlighted={
        new NoteList(['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'])
      }
    />
  </div>
)

HighlightedScale.meta = {
  description: 'C major scale highlighted',
}

export const PressedAndHighlighted: Story = () => (
  <div style={{ width: '600px', height: '200px' }}>
    <Piano
      pressed={['C4', 'E4', 'G4']}
      highlighted={['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']}
    />
  </div>
)

PressedAndHighlighted.meta = {
  description: 'C major chord pressed with C major scale highlighted',
}

export const Interactive: Story = () => {
  const [pressed, setPressed] = useState<string[]>([])
  const [highlighted, setHighlighted] = useState<string[]>([])

  return (
    <div>
      <div style={{ width: '600px', height: '200px', marginBottom: '20px' }}>
        <Piano
          pressed={pressed}
          highlighted={highlighted}
          focusable={true}
          onClick={note => {
            setPressed(prev =>
              prev.includes(note)
                ? prev.filter(n => n !== note)
                : [...prev, note],
            )
          }}
          onMouseEnter={note => setHighlighted([note])}
          onMouseLeave={() => setHighlighted([])}
          onFocus={note => setHighlighted([note])}
          onBlur={() => setHighlighted([])}
        />
      </div>
      <div style={{ fontFamily: 'monospace' }}>
        <div>
          <strong>Pressed:</strong> {pressed.join(', ') || 'none'}
        </div>
        <div>
          <strong>Highlighted:</strong> {highlighted.join(', ') || 'none'}
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          Click keys to toggle pressed state. Hover to highlight.
        </div>
      </div>
    </div>
  )
}

Interactive.meta = {
  description: 'Interactive piano - click to press, hover to highlight',
}

export const WithKeyboardShortcuts: Story = () => {
  const [pressed, setPressed] = useState<string[]>([])

  return (
    <div>
      <div style={{ width: '800px', height: '200px', marginBottom: '20px' }}>
        <Piano
          octaves={3}
          pressed={pressed}
          keyboardShortcuts={true}
          onClick={note => {
            setPressed(prev =>
              prev.includes(note)
                ? prev.filter(n => n !== note)
                : [...prev, note],
            )
          }}
        />
      </div>
      <div style={{ fontFamily: 'monospace' }}>
        <div>
          <strong>Pressed:</strong> {pressed.join(', ') || 'none'}
        </div>
        <div style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          <div>Use keyboard to play notes:</div>
          <div>Q-U: Octave 3 (white keys)</div>
          <div>A-J: Octave 4 (white keys)</div>
          <div>Z-M: Octave 5 (white keys)</div>
          <div>Shift + key: Sharp/black key</div>
        </div>
      </div>
    </div>
  )
}

WithKeyboardShortcuts.meta = {
  description: 'Piano with keyboard shortcuts enabled',
}

export const CustomColors: Story = () => (
  <div style={{ width: '600px', height: '200px' }}>
    <Piano
      pressed={['C4', 'E4', 'G4']}
      style={{
        diatonic: {
          fill: '#f0f0f0',
          pressed: '#4CAF50',
          highlighted: '#81C784',
          stroke: '#333',
        },
        chromatic: {
          fill: '#333',
          pressed: '#4CAF50',
          highlighted: '#81C784',
        },
      }}
    />
  </div>
)

CustomColors.meta = {
  description: 'Piano with custom green color scheme',
}

export const Stylophone: Story = () => (
  <div style={{ width: '600px', height: '100px' }}>
    <Piano
      style={{
        diatonic: {
          fill: '#ccc',
          rx: 0,
          height: 175,
          strokeWidth: 3,
        },
        chromatic: {
          fill: '#ccc',
          rx: 25,
          width: 100,
          height: 100,
          strokeWidth: 3,
        },
      }}
    />
  </div>
)

Stylophone.meta = {
  description: 'Stylophone-inspired design from README',
}

export const RainbowKeys: Story = () => (
  <div style={{ width: '600px', height: '200px' }}>
    <Piano
      style={{
        diatonic: {
          stroke: '#999',
          strokeWidth: 2,
        },
      }}
    />
    <style>{`
      .diatonic-piano-key-G4 { fill: #F898A4 !important; }
      .diatonic-piano-key-A4 { fill: #FCDA9C !important; }
      .diatonic-piano-key-B4 { fill: #F7FAA1 !important; }
      .diatonic-piano-key-C5 { fill: #B4F6A4 !important; }
      .diatonic-piano-key-D5 { fill: #9BE0F1 !important; }
      .diatonic-piano-key-E5 { fill: #A2ACEB !important; }
    `}</style>
  </div>
)

RainbowKeys.meta = {
  description: 'Rainbow-colored keys using CSS (from README)',
}
