import React from 'react'
import { render, screen } from '@testing-library/react'
import EventCard from '../EventCard'

// Mock next/image - uses createElement to avoid JSX in mock
jest.mock('next/image', () => {
  const React = require('react')
  return {
    __esModule: true,
    default: (props) => React.createElement('img', { alt: props.alt, src: props.src }),
  }
})

describe('EventCard', () => {
  it('renders event title and description', () => {
    render(
      <EventCard
        title="Test Event"
        desc="Test description"
        image="/test.png"
        date="March 15, 2026"
      />
    )
    expect(screen.getByText('Test Event')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('March 15, 2026')).toBeInTheDocument()
  })

  it('renders as link when id is provided', () => {
    render(
      <EventCard
        id="event-123"
        title="Test Event"
        desc="Test description"
        image="/test.png"
        date="March 15, 2026"
      />
    )
    const link = screen.getByRole('link', { name: /test event/i })
    expect(link).toHaveAttribute('href', '/events/event-123')
    expect(screen.getByText('Learn more →')).toBeInTheDocument()
  })

  it('renders as div when no id', () => {
    const { container } = render(
      <EventCard
        title="Test Event"
        desc="Test description"
        image="/test.png"
        date="March 15, 2026"
      />
    )
    expect(container.querySelector('a')).not.toBeInTheDocument()
    expect(screen.queryByText('Learn more →')).not.toBeInTheDocument()
  })
})
