import { expect, test } from 'claude-code/testing'
import { readable, route } from '../hooks/register'

const typed = (text: string) => ({ text, origin: { kind: 'composer' } })

test('ask mode offers every typed prompt, and @hedwig skips the question', async () => {
  expect(route(typed('What is Moderna’s float?'), 'ask')).toEqual({ question: 'What is Moderna’s float?', prefixed: false })
  expect(route(typed('@hedwig What is Moderna’s float?'), 'ask')).toEqual({ question: 'What is Moderna’s float?', prefixed: true })
  expect(route(typed('@Hedwig: lead program of Alterity?'), 'ask')).toEqual({ question: 'lead program of Alterity?', prefixed: true })
})

test('prefix mode offers only @hedwig prompts; off offers none', async () => {
  expect(route(typed('fix the failing test'), 'prefix')).toBe('claude')
  expect(route(typed('@hedwig is MRNA a biotech?'), 'prefix')).toEqual({ question: 'is MRNA a biotech?', prefixed: true })
  expect(route(typed('@hedwig is MRNA a biotech?'), 'off')).toBe('claude')
})

test('what the person did not type between turns goes to Claude', async () => {
  expect(route({ ...typed('/compact'), command: { name: 'compact' } }, 'ask')).toBe('claude')
  expect(route({ ...typed('note'), isMeta: true }, 'ask')).toBe('claude')
  expect(route({ ...typed('also this'), turnId: 't1' }, 'ask')).toBe('claude')
  expect(route({ ...typed('what is this?'), attachments: [{}] }, 'ask')).toBe('claude')
  expect(route({ text: 'from a peer', origin: { kind: 'peer' } }, 'ask')).toBe('claude')
  expect(route(typed('@hedwig   '), 'ask')).toBe('claude')
})

test('the answer reads as text, with its sources', async () => {
  expect(readable('{"answer":"yes","sources":[{"cite":"SEC 10-K 2025","target":"sec.gov/x"}]}'))
    .toBe('yes\n\nSources:\n• SEC 10-K 2025 — sec.gov/x')
  expect(readable('{"answer":{"value":12.5}}')).toBe('{"value":12.5}')
  expect(readable('not json')).toBe('not json')
})
