// import { it } from 'vitest'
import { FormMain } from '../../src/forms'
import { render, screen, userEvent, waitForElementToBeRemoved } from '../utils/test-utils'

it("simple add", async () => {
    render(<FormMain/>)
    const plusBtn = await screen.findByRole("button", {name: "plus icon"})
    expect(plusBtn).toBeInTheDocument()
})