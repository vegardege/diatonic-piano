import type { Story } from '@ladle/react'
import { useState } from 'react'
import { Piano } from './Piano.js'
import './styles.css'

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
      <p>
        Default piano after importing <code>styles.css</code>
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
          <p>Click keys to toggle pressed. Hover or Tab to highlight.</p>
        </div>
      </div>
    </div>
  )
}

export const GreenColors: Story = () => (
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
    <div
      style={{
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#666',
        marginTop: '10px',
      }}
    >
      <p>Custom green color scheme using CSS variables</p>
    </div>
  </div>
)

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
    <div
      style={{
        fontFamily: 'monospace',
        fontSize: '12px',
        color: '#666',
        marginTop: '10px',
      }}
    >
      <p>Rainbow-colored individual keys using CSS class selectors</p>
    </div>
  </div>
)
