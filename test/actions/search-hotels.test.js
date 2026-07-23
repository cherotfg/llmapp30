const handler = require('../../actions/search-hotels/index.js')

describe('search_hotels handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({})
        expect(out).toHaveProperty('content')
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Show me Pan Pacific hotels in Singapore" returns matching hotels', async () => {
        const out = await handler({ brand: 'Pan Pacific', country: 'Singapore' })
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.hotels.length).toBeGreaterThan(0)
        expect(out.structuredContent.hotels.every((h) => h.country === 'Singapore')).toBe(true)
        expect(out.structuredContent.hotels.every((h) => h.category === 'Pan Pacific')).toBe(true)
    })

    test('happy path with no filters returns all non-deal properties', async () => {
        const out = await handler({})
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.structuredContent.hotels.length).toBe(7)
    })

    test('structuredContent is a plain object, not a bare array', async () => {
        const out = await handler({})
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(Array.isArray(out.structuredContent.hotels)).toBe(true)
    })

    test('excludes items flagged as is_deal', async () => {
        const out = await handler({})
        expect(out.structuredContent.hotels.some((h) => h.is_deal === true)).toBe(false)
    })

    test('filters by country', async () => {
        const out = await handler({ country: 'Malaysia' })
        expect(out.structuredContent.hotels.every((h) => h.country === 'Malaysia')).toBe(true)
        expect(out.structuredContent.hotels.length).toBeGreaterThan(0)
    })

    test('filters by brand', async () => {
        const out = await handler({ brand: 'PARKROYAL COLLECTION' })
        expect(out.structuredContent.hotels.every((h) => h.category === 'PARKROYAL COLLECTION')).toBe(true)
    })

    test('returns empty results with a clear message for no matches', async () => {
        const out = await handler({ country: 'Antarctica' })
        expect(out.structuredContent.hotels).toEqual([])
        expect(out.content[0].text).toMatch(/no .*(propert|hotel|found)/i)
    })
})
