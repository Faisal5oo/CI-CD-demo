import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AppRoutes } from '../App.jsx'

describe('AetherFlow', () => {
  it('renders the application shell with primary navigation', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <AppRoutes />
      </MemoryRouter>,
    )

    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /^home$/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /architecture/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /live status/i })).toBeInTheDocument()
  })
})
