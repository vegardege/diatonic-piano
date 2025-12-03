import type { Story } from '@ladle/react'
import { NoteList, scale } from 'kamasi'
import { useState } from 'react'
import { Piano } from './Piano.js'
import './styles.css'

export const Default: Story = () => (
  <div style={{ width: '600px' }}>
    <Piano />
  </div>
)

Default.meta = {
  description: 'Default piano with 2 octaves',
}

export const ThreeOctaves: Story = () => (
  <div style={{ width: '800px' }}>
    <Piano octaves={3} />
  </div>
)

ThreeOctaves.meta = {
  description: 'Piano with three octaves',
}

export const PressedKeys: Story = () => (
  <div style={{ width: '600px' }}>
    <Piano pressed={['F4', 'A4', 'C#5']} />
  </div>
)

PressedKeys.meta = {
  description: 'C major chord (C4, E4, G4) pressed',
}

export const HighlightedScale: Story = () => (
  <div style={{ width: '600px' }}>
    <Piano highlighted={scale('D blues minor')} />
  </div>
)

HighlightedScale.meta = {
  description: 'C major scale highlighted',
}

export const PressedAndHighlighted: Story = () => (
  <div style={{ width: '600px' }}>
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

WithKeyboardShortcuts.meta = {
  description: 'Piano with keyboard shortcuts enabled',
}

export const CustomColors: Story = () => (
  <div style={{ width: '600px' }} className="custom-colors-piano">
    <Piano pressed={['C4', 'E4', 'G4']} />
    <style>{`
      .custom-colors-piano {
        --piano-key-diatonic-fill: #f0f0f0;
        --piano-key-diatonic-pressed-fill: #4CAF50;
        --piano-key-diatonic-highlighted-fill: #81C784;
        --piano-key-diatonic-stroke: #333;
        --piano-key-chromatic-fill: #333;
        --piano-key-chromatic-pressed-fill: #4CAF50;
        --piano-key-chromatic-highlighted-fill: #81C784;
      }
    `}</style>
  </div>
)

CustomColors.meta = {
  description: 'Piano with custom green color scheme using CSS variables',
}

export const RainbowKeys: Story = () => (
  <div style={{ width: '600px' }} className="rainbow-piano">
    <Piano />
    <style>{`
      .rainbow-piano {
        --piano-key-diatonic-stroke: #999;
        --piano-key-stroke-width: 2;
      }
      .rainbow-piano .diatonic-piano-key-G4 { fill: #F898A4; }
      .rainbow-piano .diatonic-piano-key-A4 { fill: #FCDA9C; }
      .rainbow-piano .diatonic-piano-key-B4 { fill: #F7FAA1; }
      .rainbow-piano .diatonic-piano-key-C5 { fill: #B4F6A4; }
      .rainbow-piano .diatonic-piano-key-D5 { fill: #9BE0F1; }
      .rainbow-piano .diatonic-piano-key-E5 { fill: #A2ACEB; }
    `}</style>
  </div>
)

RainbowKeys.meta = {
  description: 'Rainbow-colored keys using CSS (no !important needed!)',
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
        Click keys on the top piano to toggle pressed state. The bottom piano
        mirrors the top one, transposed by a perfect fifth (P5).
      </div>
    </div>
  )
}

SynchronizedPianos.meta = {
  description:
    'Two synchronized pianos with transposition (from README example)',
}
