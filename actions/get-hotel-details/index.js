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

module.exports = async ({ name = '' }) => {
    if (!name || typeof name !== 'string' || !name.trim()) {
        return {
            content: [{ type: 'text', text: 'Please provide the name of the hotel or resort to retrieve details for.' }]
        }
    }

    const query = name.trim().toLowerCase()
    let item = MOCK_DATA.find((h) => h.name.toLowerCase() === query)
    if (!item) {
        item = MOCK_DATA.find((h) => h.name.toLowerCase().includes(query))
    }

    if (!item) {
        return {
            content: [{ type: 'text', text: `No hotel details found for: ${name.trim()}` }]
        }
    }

    const summary = `${item.name} — ${item.category} property in ${item.country}. ${item.description}`
    return {
        content: [{ type: 'text', text: summary }],
        // structuredContent — flat single-object detail shape (widget reads sc directly, no wrapper key)
        structuredContent: { ...item }
    }
}

/*
 * TODO: Replace MOCK_DATA with a real API call.
 *
 * Suggested endpoint pattern (update based on actual site API):
 *   GET ${process.env.API_BASE_URL}/hotels?name=${encodeURIComponent(name)}
 *
 * Environment variables to configure:
 *   API_BASE_URL   Base URL of the website's API
 *   API_KEY        API key if required (add to .env and app.config.yaml)
 *
 * Example fetch:
 *   const res = await fetch(
 *     `${process.env.API_BASE_URL}/hotels?name=${encodeURIComponent(name)}`,
 *     { headers: { 'Authorization': `Bearer ${process.env.API_KEY}` } }
 *   )
 *   if (!res.ok) throw new Error(`API error: ${res.status}`)
 *   return await res.json()
 */
