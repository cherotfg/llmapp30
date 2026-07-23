// TODO: Replace MOCK_DATA with a real API call.
// See the TODO block below the handler for endpoint details.
const MOCK_DATA = [
    {
        name: 'Pan Pacific Orchard, Singapore',
        description: 'Iconic Orchard Road luxury hotel with four dramatic open-air terraces and lush garden spaces.',
        image_url: 'https://www.panpacific.com/content/dam/pphg-revamp/en/global/hotels-and-resorts/ppsor-property-listing.jpg',
        category: 'Pan Pacific',
        country: 'Singapore'
    },
    {
        name: 'BELLUSTAR TOKYO, A Pan Pacific Hotel',
        description: 'Luxury high-rise hotel in Shinjuku with panoramic city views and refined Japanese hospitality.',
        image_url: 'https://www.panpacific.com/content/dam/pphg-revamp/en/global/hotels-and-resorts/ppbtk-property.jpg',
        category: 'Pan Pacific',
        country: 'Japan'
    },
    {
        name: 'Pan Pacific London',
        description: 'Contemporary luxury hotel in the City of London with a spa, pool and destination dining.',
        image_url: 'https://www.panpacific.com/content/dam/pphg-revamp/en/global/hotels-and-resorts/pplon-property-new.jpg',
        category: 'Pan Pacific',
        country: 'United Kingdom'
    },
    {
        name: 'Pan Pacific Vancouver',
        description: 'Waterfront hotel on Canada Place with harbour and mountain views in downtown Vancouver.',
        image_url: 'https://www.panpacific.com/content/dam/pphg-revamp/en/global/hotels-and-resorts/ppyvr-property.jpg',
        category: 'Pan Pacific',
        country: 'Canada'
    },
    {
        name: 'PARKROYAL COLLECTION Marina Bay, Singapore',
        description: 'Garden-in-a-hotel oasis overlooking Marina Bay with over 2,400 plants and trees.',
        image_url: 'https://www.panpacific.com/content/dam/pphg-revamp/en/global/hotels-and-resorts/prsmb-property4.jpg',
        category: 'PARKROYAL COLLECTION',
        country: 'Singapore'
    },
    {
        name: 'PARKROYAL COLLECTION Kuala Lumpur',
        description: 'Sustainable urban sanctuary in the heart of Bukit Bintang with lush greenery throughout.',
        image_url: 'https://www.panpacific.com/content/dam/pphg-revamp/en/global/hotels-and-resorts/prckul-property-2.jpg',
        category: 'PARKROYAL COLLECTION',
        country: 'Malaysia'
    },
    {
        name: 'PARKROYAL Langkawi Resort',
        description: 'Beachfront resort on Langkawi island with tropical gardens and direct access to the Andaman Sea.',
        image_url: 'https://www.panpacific.com/content/dam/pphg-revamp/en/global/hotels-and-resorts/prlgk-property.jpg',
        category: 'PARKROYAL',
        country: 'Malaysia'
    },
    {
        name: 'Advance Purchase',
        description: 'Plan ahead and save up to 20% on your stay when you book early.',
        image_url: 'https://www.panpacific.com/content/dam/pphg-revamp/en/global/offers/advance-purchase/2026/Global_EvergreenOffer_AdvPur_Masthead.jpg',
        category: 'Rooms and Suites',
        country: 'Multiple',
        is_deal: true,
        discount_percentage: 'Up to 20% OFF'
    },
    {
        name: 'Family Escape',
        description: 'Family offer with daily breakfast, children amenities and more across selected properties.',
        image_url: 'https://www.panpacific.com/content/dam/pphg-revamp/en/global/offers/family-escape/2026/Global_Offer_Family_Masthead.jpg',
        category: 'Rooms and Suites',
        country: 'Multiple',
        is_deal: true
    },
    {
        name: 'Wake Up to More',
        description: 'A full breakfast to begin each day with ease, included with your stay.',
        image_url: 'https://www.panpacific.com/content/dam/pphg-revamp/en/global/offers/wake-up-more/Global_EvergreenOffer_BnB_Masthead.jpg',
        category: 'Rooms and Suites',
        country: 'Multiple',
        is_deal: true
    }
]

module.exports = async ({ category = '' } = {}) => {
    const filter = typeof category === 'string' ? category.trim().toLowerCase() : ''

    const results = MOCK_DATA.filter((offer) => {
        if (filter && String(offer.category || '').toLowerCase() !== filter) return false
        return true
    })

    if (results.length === 0) {
        return {
            content: [{ type: 'text', text: `No current offers found${category ? ` in category "${category}"` : ''}.` }],
            // structuredContent.offers — derived from action name "get_current_offers" (bare array outputSchema rule)
            structuredContent: { offers: [] }
        }
    }

    const summary = category
        ? `Found ${results.length} current Pan Pacific offer${results.length === 1 ? '' : 's'} in "${category}".`
        : `Found ${results.length} current Pan Pacific stay offers and packages.`

    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent.offers — derived from action name "get_current_offers" (bare array outputSchema rule)
        structuredContent: { offers: results }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/offers?category=${category}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Authentication: check the website's developer docs or network requests
 *   captured during browsing for the correct auth header pattern.
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/offers?category=${encodeURIComponent(category)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
