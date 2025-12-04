import type { Story } from '@ladle/react'
import { NoteList, scale } from 'kamasi'
import { useState } from 'react'
import { Piano } from './Piano.js'

export const Default: Story = () => (
  <div>
    <div style={{ width: '600px' }}>
      <Piano />
    </div>
    <div
      style={{
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#666',
        marginTop: '10px',
      }}
    >
      <p>Default piano, no modifications</p>
    </div>
  </div>
)

export const ThreeOctaves: Story = () => (
  <div>
    <div style={{ width: '800px' }}>
      <Piano octaves={3} />
    </div>
    <div
      style={{
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#666',
        marginTop: '10px',
      }}
    >
      <p>Piano with three octaves</p>
    </div>
  </div>
)

export const PressedKeys: Story = () => (
  <div>
    <div style={{ width: '600px' }}>
      <Piano pressed={['F4', 'A4', 'C#5']} />
    </div>
    <div
      style={{
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#666',
        marginTop: '10px',
      }}
    >
      <p>
        <strong>Pressed:</strong> F4, A4, C#5
      </p>
    </div>
  </div>
)

export const HighlightedScale: Story = () => (
  <div>
    <div style={{ width: '600px' }}>
      <Piano highlighted={scale('D blues minor')} />
    </div>
    <div
      style={{
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#666',
        marginTop: '10px',
      }}
    >
      <p>
        <strong>Highlighted:</strong> D blues minor scale
      </p>
    </div>
  </div>
)

export const PressedAndHighlighted: Story = () => (
  <div>
    <div style={{ width: '600px' }}>
      <Piano
        pressed={['C4', 'E4', 'G4']}
        highlighted={['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4']}
      />
    </div>
    <div
      style={{
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#666',
        marginTop: '10px',
      }}
    >
      <p>
        <strong>Pressed:</strong> C4, E4, G4 (C major chord)
      </p>
      <p>
        <strong>Highlighted:</strong> C4-B4 (C major scale)
      </p>
    </div>
  </div>
)

export const Interactive: Story = () => {
  const [pressed, setPressed] = useState<string[]>([])
  const [highlighted, setHighlighted] = useState<string[]>([])

  return (
    <div>
      <div style={{ width: '600px', marginBottom: '20px' }}>
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
          <p>Click keys to toggle pressed state. Hover or Tab to highlight.</p>
        </div>
      </div>
    </div>
  )
}

export const WithKeyboardShortcuts: Story = () => {
  const [pressed, setPressed] = useState<string[]>([])

  return (
    <div>
      <div style={{ width: '800px', marginBottom: '20px' }}>
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

export const SynchronizedPianos: Story = () => {
  const [pressed, setPressed] = useState(new NoteList())
  const [highlighted, setHighlighted] = useState(new NoteList())

  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <div style={{ width: '600px' }}>
          <Piano
            pressed={pressed}
            highlighted={highlighted}
            focusable={true}
            onClick={n => setPressed(state => state.toggle(n))}
            onMouseEnter={n => setHighlighted(new NoteList([n]))}
            onMouseLeave={() => setHighlighted(new NoteList())}
          />
        </div>
      </div>
      <div>
        <div style={{ width: '600px' }}>
          <Piano
            pressed={pressed.transpose('P5')}
            highlighted={highlighted.transpose('P5')}
          />
        </div>
      </div>
      <div
        style={{
          marginTop: '20px',
          fontFamily: 'monospace',
          fontSize: '12px',
          color: '#666',
        }}
      >
        <p>Click or hover keys on the top piano to toggle pressed state.</p>
        <p>The bottom mirrors the top transposed by a perfect fifth.</p>
      </div>
    </div>
  )
}
