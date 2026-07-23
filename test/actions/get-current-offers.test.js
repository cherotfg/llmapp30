const handler = require('../../actions/get-current-offers/index.js')

describe('get_current_offers handler', () => {
    test('returns content block shape on happy path', async () => {
        const out = await handler({})
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"What stay offers does Pan Pacific have right now?" returns offers', async () => {
        const out = await handler({})
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.offers.length).toBeGreaterThan(0)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({})
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(Array.isArray(out.structuredContent.offers)).toBe(true)
    })

    test('handles missing args object without throwing', async () => {
        const out = await handler()
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.structuredContent.offers.length).toBeGreaterThan(0)
    })

    test('filters by category', async () => {
        const out = await handler({ category: 'Rooms and Suites' })
        const offers = out.structuredContent.offers
        expect(offers.length).toBeGreaterThan(0)
        expect(offers.every((o) => o.category === 'Rooms and Suites')).toBe(true)
    })

    test('unknown category returns no offers with a clear message', async () => {
        const out = await handler({ category: 'Nonexistent Category' })
        expect(out.structuredContent.offers).toEqual([])
        expect(out.content[0].text).toMatch(/no current offers/i)
    })
})
