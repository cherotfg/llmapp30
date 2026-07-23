const handler = require('../../actions/get-hotel-details/index.js')

describe('get_hotel_details handler', () => {
    test('content is an array of text blocks', async () => {
        const out = await handler({ name: 'Pan Pacific Orchard, Singapore' })
        expect(Array.isArray(out.content)).toBe(true)
        expect(out.content[0]).toMatchObject({ type: 'text', text: expect.any(String) })
    })

    test('"Tell me more about Pan Pacific Orchard, Singapore" returns its details', async () => {
        const out = await handler({ name: 'Pan Pacific Orchard, Singapore' })
        expect(out.content[0].text.length).toBeGreaterThan(0)
        expect(out.content[0].text).toMatch(/Pan Pacific Orchard/i)
        expect(out.structuredContent).toBeDefined()
        expect(out.structuredContent.name).toBe('Pan Pacific Orchard, Singapore')
        expect(out.structuredContent.country).toBe('Singapore')
    })

    test('structuredContent is a flat plain object, not a bare array', async () => {
        const out = await handler({ name: 'Pan Pacific London' })
        expect(typeof out.structuredContent).toBe('object')
        expect(Array.isArray(out.structuredContent)).toBe(false)
        expect(out.structuredContent).not.toHaveProperty('item')
        expect(out.structuredContent).not.toHaveProperty('hotel')
    })

    test('partial name match resolves to the correct property', async () => {
        const out = await handler({ name: 'BELLUSTAR' })
        expect(out.structuredContent.name).toBe('BELLUSTAR TOKYO, A Pan Pacific Hotel')
        expect(out.structuredContent.country).toBe('Japan')
    })

    test('returns error message when name is missing', async () => {
        const out = await handler({})
        expect(out.content[0].text).toMatch(/name|provide/i)
        expect(out.structuredContent).toBeUndefined()
    })

    test('unknown hotel returns not-found with no structuredContent', async () => {
        const out = await handler({ name: 'Nonexistent Grand Hotel' })
        expect(out.content[0].text).toMatch(/no hotel details found|not found/i)
        expect(out.structuredContent).toBeUndefined()
    })
})
