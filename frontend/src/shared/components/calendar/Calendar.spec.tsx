import { act, render, screen } from '@testing-library/react'
import { describe, expect, vi} from 'vitest'

import Calendar from './Calendar'

const setStartDateMock = vi.fn()

describe('Calendar > handleIncreaseYear', () => {
  it('Handle set next year', async () => {
    const wrapper = render (
      <Calendar 
        setStartDate={setStartDateMock}
        startDate={new Date('Mon Jun 12 2020 13:00:00')}
      />
    )

    const iconForward = wrapper.container.querySelector('[data-test="iconBack"]') as HTMLButtonElement

    act(() => {
      iconForward.click()
    })

    expect(setStartDateMock).toHaveBeenCalledWith(new Date('2019-06-12 13:00:00'))
  })

  it('Handle set previous year', () => {
    const wrapper = render (
      <Calendar 
        setStartDate={setStartDateMock}
        startDate={new Date('Mon Jun 12 2020 13:00:00')}
      />
    )

    const iconForward = wrapper.container.querySelector('[data-test="iconForward"]') as HTMLButtonElement

    act(() => {
      iconForward.click()
    })

    expect(setStartDateMock).toHaveBeenCalledWith(new Date('2021-06-12 13:00:00'))
  })
})