import { expect, test } from 'claude-code/testing'
import { SURE, worthJudging, yesOf } from '../hooks/register'

// What HedwigAI's ask answered on 2026-11-14 for prompts like these.
const judged = (yes: number) => JSON.stringify({ answer: yes >= 0.5 ? 'yes' : 'no', kind: 'given_choice', probabilities: { yes, no: 1 - yes } })

test('only a sure yes is offered', async () => {
  expect(yesOf(judged(0.92)) >= SURE).toBe(true) // the latest Form D raise of a company
  expect(yesOf(judged(0.96)) >= SURE).toBe(true) // is a company still hiring for a role
  expect(yesOf(judged(0.45)) >= SURE).toBe(false) // what a CLI flag does: checkable, not HedwigAI's data
  expect(yesOf(judged(0)) >= SURE).toBe(false) // fix a test and push
})

test('an unreadable judge is a no', async () => {
  expect(yesOf('upstream error')).toBe(0)
  expect(yesOf('{"answer":"yes"}')).toBe(0)
})

test('a word or two, a long paste or code is not sent to the judge', async () => {
  expect(worthJudging('yes')).toBe(false)
  expect(worthJudging('continue please')).toBe(false)
  expect(worthJudging('is stripe hiring rust engineers?')).toBe(true)
  expect(worthJudging('x '.repeat(900))).toBe(false)
  expect(worthJudging('why does this fail ```let x = 1```')).toBe(false)
})
