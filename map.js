(() => {
    'use strict';

    const destinations = {
        kochi: {
            name: 'Kochi',
            coordinates: [9.9312, 76.2673],
            category: 'Cities & heritage',
            categoryKey: 'city',
            icon: 'fa-city',
            description: 'Kerala\'s major coastal gateway, combining city connections, harbour views and easy access to heritage quarters.',
            url: 'destination-kochi.html',
            planUrl: 'plan-3-days.html',
            rail: true,
            coast: true
        },
        'fort-kochi': {
            name: 'Fort Kochi',
            coordinates: [9.9658, 76.2421],
            category: 'Cities & heritage',
            categoryKey: 'city',
            icon: 'fa-landmark',
            description: 'A walkable waterfront quarter known for layered maritime history, art spaces and Chinese fishing nets.',
            url: 'destination-kochi.html',
            planUrl: 'plan-3-days.html',
            rail: false,
            coast: true
        },
        kadamakkudy: {
            name: 'Kadamakkudy',
            coordinates: [10.0583, 76.2459],
            category: 'Backwaters & islands',
            categoryKey: 'water',
            icon: 'fa-water',
            description: 'A quiet cluster of islands, wetlands and village roads just beyond central Kochi.',
            image: 'images/destinations/kadamakkudy-official.webp',
            url: 'destination-kadamakkudy.html',
            planUrl: 'plan-7-days.html',
            rail: false,
            coast: true
        },
        munnar: {
            name: 'Munnar',
            coordinates: [10.0889, 77.0595],
            category: 'Hills',
            categoryKey: 'hills',
            icon: 'fa-mountain-sun',
            description: 'Highland tea country with cool air, plantation views and winding mountain roads.',
            image: '68.jpg',
            url: 'destination-munnar.html',
            planUrl: 'plan-5-days.html',
            rail: false,
            hill: true
        },
        thekkady: {
            name: 'Thekkady',
            coordinates: [9.6031, 77.1615],
            category: 'Wildlife & nature',
            categoryKey: 'nature',
            icon: 'fa-tree',
            description: 'The gateway to Periyar landscapes, spice gardens and forest-fringed lake experiences.',
            image: 'tourists-thekkady-boating.webp',
            url: 'destination-thekkady.html',
            planUrl: 'plan-5-days.html',
            rail: false,
            hill: true
        },
        alappuzha: {
            name: 'Alappuzha',
            coordinates: [9.4981, 76.3388],
            category: 'Backwaters & islands',
            categoryKey: 'water',
            icon: 'fa-sailboat',
            description: 'Kerala\'s classic houseboat centre, surrounded by canals, paddy fields and Vembanad backwaters.',
            url: 'destination-alappuzha.html',
            planUrl: 'plan-3-days.html',
            rail: true,
            coast: true
        },
        kumarakom: {
            name: 'Kumarakom',
            coordinates: [9.6175, 76.4301],
            category: 'Backwaters & islands',
            categoryKey: 'water',
            icon: 'fa-water',
            description: 'A relaxed Vembanad Lake village for birdlife, waterfront stays and daytime cruises.',
            url: 'destination-kumarakom.html',
            planUrl: 'plan-5-days-seniors.html',
            rail: false
        },
        'munroe-island': {
            name: 'Munroe Island',
            coordinates: [8.9946, 76.6060],
            category: 'Backwaters & islands',
            categoryKey: 'water',
            icon: 'fa-person-swimming',
            description: 'A village island landscape where small canoe trips pass through narrow canals and coconut groves.',
            image: 'images/destinations/munroe-island-official.webp',
            url: 'destination-munroe-island.html',
            planUrl: 'plan-7-days.html',
            rail: true
        },
        varkala: {
            name: 'Varkala',
            coordinates: [8.7379, 76.7163],
            category: 'Beaches',
            categoryKey: 'beach',
            icon: 'fa-umbrella-beach',
            description: 'A cliff-backed coastal town with beach walks, sea views and a relaxed traveller atmosphere.',
            image: 'Varkala-Beach.webp',
            url: 'destination-varkala-kovalam.html',
            planUrl: 'plan-7-days.html',
            rail: true,
            coast: true
        },
        kovalam: {
            name: 'Kovalam',
            coordinates: [8.4004, 76.9787],
            category: 'Beaches',
            categoryKey: 'beach',
            icon: 'fa-umbrella-beach',
            description: 'A well-known beach area south of Thiruvananthapuram, recognised for its lighthouse coast.',
            image: 'tourists-kovalam-beach.webp',
            url: 'destination-varkala-kovalam.html',
            planUrl: 'plan-7-days.html',
            rail: false,
            coast: true
        },
        poovar: {
            name: 'Poovar',
            coordinates: [8.3214, 77.0707],
            category: 'Backwaters & islands',
            categoryKey: 'water',
            icon: 'fa-water',
            description: 'A southern estuary where the Neyyar River meets the Arabian Sea, with mangroves and a boat-access sandbar.',
            image: 'images/destinations/poovar-official.webp',
            url: 'destination-poovar.html',
            planUrl: 'plan-7-days.html',
            rail: false,
            coast: true
        },
        thiruvananthapuram: {
            name: 'Thiruvananthapuram',
            aliases: ['Trivandrum'],
            coordinates: [8.5241, 76.9366],
            category: 'Cities & heritage',
            categoryKey: 'city',
            icon: 'fa-building-columns',
            description: 'Kerala\'s capital and southern transport hub, close to museums, heritage areas and coastal routes.',
            url: 'destination-thiruvananthapuram.html',
            planUrl: 'plan-7-days.html',
            rail: true,
            coast: true
        },
        wayanad: {
            name: 'Wayanad',
            coordinates: [11.6087, 76.0834],
            category: 'Wildlife & nature',
            categoryKey: 'nature',
            icon: 'fa-tree',
            description: 'A forested northern plateau of plantations, waterfalls, caves and wildlife landscapes.',
            url: 'destination-wayanad.html',
            planUrl: 'plan-10-days.html',
            rail: false,
            hill: true
        },
        kozhikode: {
            name: 'Kozhikode',
            coordinates: [11.2588, 75.7804],
            category: 'Cities & heritage',
            categoryKey: 'city',
            icon: 'fa-city',
            description: 'A Malabar coastal city known for food traditions, historic trade and access to Wayanad.',
            url: 'destination-kozhikode.html',
            planUrl: 'plan-10-days.html',
            rail: true,
            coast: true
        },
        kannur: {
            name: 'Kannur',
            coordinates: [11.8745, 75.3704],
            category: 'Cities & heritage',
            categoryKey: 'city',
            icon: 'fa-masks-theater',
            description: 'A northern coastal city associated with Theyyam, forts, beaches and Malabar culture.',
            url: 'destination-kannur.html',
            planUrl: 'plan-10-days.html',
            rail: true,
            coast: true
        },
        valiyaparamba: {
            name: 'Valiyaparamba',
            coordinates: [12.1034, 75.1629],
            category: 'Backwaters & islands',
            categoryKey: 'water',
            icon: 'fa-water',
            description: 'A quieter north Kerala backwater region of islands, estuaries and village boat journeys.',
            image: 'images/destinations/valiyaparamba-official.webp',
            url: 'destination-valiyaparamba.html',
            planUrl: 'plan-10-days.html',
            rail: false,
            coast: true
        },
        bekal: {
            name: 'Bekal',
            coordinates: [12.3910, 75.0349],
            category: 'Beaches',
            categoryKey: 'beach',
            icon: 'fa-fort-awesome',
            description: 'A northern coastal finish centred on Bekal Fort, sea views and a quieter beach landscape.',
            url: 'destination-bekal.html',
            planUrl: 'plan-10-days.html',
            rail: true,
            coast: true
        }
    };

    const stopLibrary = {
        mattancherry: { name: 'Mattancherry', description: 'A historic trading quarter beside Fort Kochi.', why: 'Spice streets, heritage buildings and Jew Town fit naturally before the waterfront.', duration: '45-90 min' },
        vypin: { name: 'Vypin waterfront', description: 'A harbour-side island connection near old Kochi.', why: 'A useful pause for ferry views and a different perspective on the port.', duration: '30-45 min' },
        moolampilly: { name: 'Moolampilly', description: 'A small island settlement on the Kadamakkudy approach.', why: 'The wetlands and village roads signal the shift from city to island landscape.', duration: '20-30 min' },
        pizhala: { name: 'Pizhala', description: 'A low-lying island village among waterways and paddy fields.', why: 'It is a quiet place to slow down before continuing deeper into Kadamakkudy.', duration: '30-45 min' },
        varapuzha: { name: 'Varapuzha', description: 'A riverside town north of Kochi.', why: 'Convenient for a short refreshment or rest stop before the final island roads.', duration: '20-30 min' },
        cheeyappara: { name: 'Cheeyappara Waterfalls', description: 'A roadside cascade on the Kochi-Munnar climb.', why: 'It breaks the uphill journey and introduces the Western Ghats landscape.', duration: '20-30 min' },
        valara: { name: 'Valara Waterfalls', description: 'A green roadside waterfall area near the highland route.', why: 'A brief scenic pause before the steeper plantation roads.', duration: '15-25 min' },
        adimali: { name: 'Adimali', description: 'A busy plantation town below Munnar.', why: 'A practical place for food, fuel and a comfort break before the final climb.', duration: '30-45 min' },
        marari: { name: 'Marari coast', description: 'A quieter beach area north of Alappuzha.', why: 'A short coastal detour can balance the city-to-backwater journey.', duration: '45-75 min' },
        cherthala: { name: 'Cherthala', description: 'A well-connected town between Kochi and Alappuzha.', why: 'Useful for refreshments and a short rest before entering backwater country.', duration: '20-30 min' },
        vaikom: { name: 'Vaikom', description: 'A temple town and backwater gateway north of Kumarakom.', why: 'Its lake-side setting makes a natural pause on the approach to Vembanad.', duration: '45-60 min' },
        thanneermukkom: { name: 'Thanneermukkom Bund', description: 'A water-control structure across Vembanad Lake.', why: 'It offers a clear view of the scale and working landscape of the backwaters.', duration: '25-40 min' },
        kumarakomBird: { name: 'Kumarakom Bird Sanctuary area', description: 'A green wetland edge beside Vembanad Lake.', why: 'A calm introduction to local birdlife before checking into Kumarakom.', duration: '45-90 min' },
        thrissur: { name: 'Thrissur', description: 'A central Kerala cultural city on the northbound corridor.', why: 'It is a practical meal and rest stop with temples and heritage nearby.', duration: '45-90 min' },
        ponnani: { name: 'Ponnani', description: 'A historic river-and-sea town on the Malabar coast.', why: 'The estuary landscape adds a coastal pause to the long northbound drive.', duration: '30-45 min' },
        kadalundi: { name: 'Kadalundi', description: 'An estuary and bird habitat south of Kozhikode.', why: 'A peaceful nature break before entering the city.', duration: '45-75 min' },
        lockhart: { name: 'Lockhart Gap', description: 'A highland viewpoint south of Munnar.', why: 'Wide valley views make it one of the most rewarding short pauses on this route.', duration: '20-30 min' },
        pooppara: { name: 'Pooppara', description: 'A small plantation settlement among cardamom hills.', why: 'It gives the journey a quiet local stop between the better-known hill towns.', duration: '20-30 min' },
        anakkara: { name: 'Anakkara', description: 'A spice-growing village near Thekkady.', why: 'A pre-arranged spice-garden visit can introduce the region before arrival.', duration: '45-75 min' },
        kuttikkanam: { name: 'Kuttikkanam', description: 'A cool hill settlement on the descent from Thekkady.', why: 'It is a sensible tea and rest stop before the lower roads.', duration: '25-40 min' },
        kottayam: { name: 'Kottayam', description: 'A central Kerala town linking the hills and Vembanad region.', why: 'A practical meal, rail or comfort stop on longer hill-to-backwater journeys.', duration: '30-60 min' },
        champakulam: { name: 'Champakulam', description: 'A Kuttanad village beside backwater channels.', why: 'Village scenery and waterways provide a gentle introduction to Alappuzha.', duration: '45-60 min' },
        thenmala: { name: 'Thenmala', description: 'A forested area with reservoir scenery in southern Kerala.', why: 'It adds a nature break to the long descent towards Kollam district.', duration: '45-75 min' },
        punalur: { name: 'Punalur', description: 'A riverside town between the high ranges and Kollam.', why: 'A useful food and rest stop before the final lowland stretch.', duration: '30-45 min' },
        karunagappally: { name: 'Karunagappally', description: 'A coastal town between Alappuzha and Kollam.', why: 'Convenient for refreshments before turning towards Munroe Island.', duration: '20-30 min' },
        sasthamkotta: { name: 'Sasthamkotta Lake', description: 'Kerala\'s largest freshwater lake, near the Munroe approach.', why: 'A calm landscape stop that genuinely fits the backwater route.', duration: '30-45 min' },
        kollam: { name: 'Kollam', description: 'A historic port city on Ashtamudi Lake.', why: 'It is a logical meal stop and a useful transition from backwaters to coast.', duration: '45-75 min' },
        paravurLake: { name: 'Paravur Lake', description: 'A lake-and-sea landscape north of Varkala.', why: 'The water views create a gentle stop before the beach town.', duration: '30-45 min' },
        kappil: { name: 'Kappil Beach & backwaters', description: 'A narrow meeting point of lake, road and Arabian Sea.', why: 'It is a scenic, low-effort pause close to Varkala.', duration: '30-45 min' },
        anchuthengu: { name: 'Anchuthengu', description: 'A coastal heritage area south of Varkala.', why: 'The fort and fishing-village landscape add history to the beach road.', duration: '40-60 min' },
        vizhinjam: { name: 'Vizhinjam', description: 'A working coastal area beside Kovalam.', why: 'Harbour and lighthouse views make a short final coastal stop.', duration: '30-45 min' },
        vellayani: { name: 'Vellayani Lake', description: 'A freshwater lake near southern Thiruvananthapuram.', why: 'A quiet landscape break away from city traffic.', duration: '30-45 min' },
        thamarassery: { name: 'Thamarassery', description: 'The town at the foot of the Wayanad ghat road.', why: 'A practical place to pause before the winding climb.', duration: '20-30 min' },
        lakkidi: { name: 'Lakkidi View Point', description: 'A high viewpoint near the top of Thamarassery Pass.', why: 'It marks the arrival onto Wayanad\'s plateau with broad valley views.', duration: '20-30 min' },
        pookode: { name: 'Pookode Lake', description: 'A small forest-fringed lake near Vythiri.', why: 'A gentle stop after the climb, especially for families.', duration: '45-75 min' },
        kappad: { name: 'Kappad Beach', description: 'A historic beach north of Kozhikode.', why: 'A coastal detour adds sea views without leaving the northbound corridor for long.', duration: '40-60 min' },
        vadakara: { name: 'Vadakara', description: 'A north Malabar town on the Kozhikode-Kannur road.', why: 'A practical meal and rest stop on the longer coastal transfer.', duration: '30-45 min' },
        muzhappilangad: { name: 'Muzhappilangad Beach', description: 'A long beach south of Kannur.', why: 'It is a popular coastal pause before entering Kannur city.', duration: '45-60 min' },
        payyanur: { name: 'Payyanur', description: 'A northern Kerala town between Kannur and Kasaragod districts.', why: 'Useful for food and supplies before the quieter backwater roads.', duration: '30-45 min' },
        kavvayi: { name: 'Kavvayi backwaters', description: 'A northern backwater landscape near Payyanur.', why: 'It gives a genuine preview of the island geography around Valiyaparamba.', duration: '45-75 min' },
        nileshwaram: { name: 'Nileshwaram', description: 'A cultural town and backwater gateway in Kasaragod district.', why: 'A good break for local food and a quieter view of north Kerala life.', duration: '35-50 min' },
        kanhangad: { name: 'Kanhangad', description: 'A well-connected town just south of Bekal.', why: 'A practical final rest stop before the fort and beach area.', duration: '25-40 min' }
    };

    const edges = [
        ['kochi', 'fort-kochi', 6, 30, ['mattancherry', 'vypin']],
        ['kochi', 'kadamakkudy', 29, 50, ['moolampilly', 'pizhala', 'varapuzha']],
        ['kochi', 'munnar', 125, 240, ['cheeyappara', 'valara', 'adimali']],
        ['kochi', 'alappuzha', 55, 105, ['cherthala', 'marari']],
        ['kochi', 'kumarakom', 51, 120, ['vaikom', 'thanneermukkom', 'kumarakomBird']],
        ['kochi', 'kozhikode', 182, 300, ['thrissur', 'ponnani', 'kadalundi']],
        ['munnar', 'thekkady', 83, 180, ['lockhart', 'pooppara', 'anakkara']],
        ['thekkady', 'alappuzha', 138, 240, ['kuttikkanam', 'kottayam', 'champakulam']],
        ['thekkady', 'munroe-island', 145, 240, ['kuttikkanam', 'thenmala', 'punalur']],
        ['alappuzha', 'kumarakom', 23, 75, ['champakulam', 'thanneermukkom', 'kumarakomBird']],
        ['alappuzha', 'munroe-island', 75, 120, ['karunagappally', 'sasthamkotta']],
        ['munroe-island', 'varkala', 42, 90, ['kollam', 'paravurLake', 'kappil']],
        ['varkala', 'kovalam', 52, 90, ['anchuthengu', 'thiruvananthapuram', 'vizhinjam']],
        ['kovalam', 'poovar', 17, 40, ['vizhinjam']],
        ['kovalam', 'thiruvananthapuram', 17, 35, ['vizhinjam', 'vellayani']],
        ['kozhikode', 'wayanad', 71, 150, ['thamarassery', 'lakkidi', 'pookode']],
        ['kozhikode', 'kannur', 92, 150, ['kappad', 'vadakara', 'muzhappilangad']],
        ['kannur', 'valiyaparamba', 42, 75, ['payyanur', 'kavvayi']],
        ['kannur', 'bekal', 75, 135, ['payyanur', 'nileshwaram', 'kanhangad']],
        ['valiyaparamba', 'bekal', 42, 75, ['nileshwaram', 'kanhangad']]
    ];

    const plans = [
        { id: 'three-day', name: '3-Day Kochi + Backwaters', duration: '3 days', pace: 'Compact', url: 'plan-3-days.html', destinations: ['kochi', 'fort-kochi', 'alappuzha'], categories: ['city', 'water'] },
        { id: 'five-day', name: '5-Day Hills + Houseboat', duration: '5 days', pace: 'Balanced', url: 'plan-5-days.html', destinations: ['kochi', 'munnar', 'thekkady', 'alappuzha'], categories: ['city', 'hills', 'nature', 'water'] },
        { id: 'seven-day', name: '7-Day Classic + Offbeat Kerala', duration: '7 days', pace: 'Balanced', url: 'plan-7-days.html', destinations: ['kochi', 'fort-kochi', 'kadamakkudy', 'munnar', 'thekkady', 'munroe-island', 'varkala'], categories: ['city', 'hills', 'nature', 'water', 'beach'] },
        { id: 'ten-day', name: '10-Day Kerala Deep Dive', duration: '10 days', pace: 'Active', url: 'plan-10-days.html', destinations: ['kochi', 'kadamakkudy', 'munroe-island', 'munnar', 'thekkady', 'wayanad', 'valiyaparamba', 'bekal'], categories: ['city', 'hills', 'nature', 'water', 'beach'] },
        { id: 'student', name: '5-Day Kerala Student Plan', duration: '5 days', pace: 'Active', url: 'plan-5-days-students.html', destinations: ['kochi', 'munnar', 'alappuzha'], categories: ['city', 'hills', 'water'], specialised: true },
        { id: 'senior', name: '5-Day Easy-Paced Senior Plan', duration: '5 days', pace: 'Gentle', url: 'plan-5-days-seniors.html', destinations: ['kochi', 'kumarakom'], categories: ['city', 'water'], specialised: true }
    ];

    const categoryMeta = {
        hills: { label: 'Hills', markerClass: 'marker-hills', icon: 'fa-mountain-sun' },
        water: { label: 'Backwaters & islands', markerClass: 'marker-water', icon: 'fa-water' },
        beach: { label: 'Beaches', markerClass: 'marker-beach', icon: 'fa-umbrella-beach' },
        city: { label: 'Cities & heritage', markerClass: 'marker-city', icon: 'fa-landmark' },
        nature: { label: 'Wildlife & nature', markerClass: 'marker-nature', icon: 'fa-tree' }
    };

    const graph = {};
    edges.forEach(([from, to, distance, minutes, stops]) => {
        graph[from] ||= [];
        graph[to] ||= [];
        graph[from].push({ to, distance, minutes, stops });
        graph[to].push({ to: from, distance, minutes, stops: [...stops].reverse() });
    });

    let map = null;
    let routeLayer = null;
    let terminalLayer = null;
    let mapMarkers = {};
    let forceFallbackRouting = new URLSearchParams(window.location.search).get('routing') === 'fallback';

    const elements = {};
    const allDestinationBounds = Object.values(destinations).map(destination => destination.coordinates);

    const roundToQuarterHour = minutes => Math.max(15, Math.round(minutes / 15) * 15);

    const formatDuration = minutes => {
        const rounded = roundToQuarterHour(minutes);
        const hours = Math.floor(rounded / 60);
        const remaining = rounded % 60;
        if (!hours) return `${remaining} min`;
        if (!remaining) return `${hours} hr`;
        return `${hours} hr ${remaining} min`;
    };

    const escapeHtml = value => String(value)
        .replaceAll('&', '&amp;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;')
        .replaceAll('"', '&quot;')
        .replaceAll("'", '&#039;');

    function findDestinationId(value) {
        const candidate = String(value || '').trim().toLowerCase();
        return Object.entries(destinations).find(([, destination]) => {
            if (destination.name.toLowerCase() === candidate) return true;
            return destination.aliases?.some(alias => alias.toLowerCase() === candidate);
        })?.[0] || null;
    }

    function shortestFallbackRoute(fromId, toId) {
        const distance = Object.fromEntries(Object.keys(destinations).map(id => [id, Infinity]));
        const previous = {};
        const visited = new Set();
        distance[fromId] = 0;

        while (visited.size < Object.keys(destinations).length) {
            const current = Object.keys(distance)
                .filter(id => !visited.has(id))
                .sort((a, b) => distance[a] - distance[b])[0];

            if (!current || !Number.isFinite(distance[current])) break;
            if (current === toId) break;
            visited.add(current);

            (graph[current] || []).forEach(edge => {
                const candidate = distance[current] + edge.minutes;
                if (candidate < distance[edge.to]) {
                    distance[edge.to] = candidate;
                    previous[edge.to] = { from: current, edge };
                }
            });
        }

        if (!previous[toId] && fromId !== toId) return null;

        const path = [toId];
        const routeEdges = [];
        let cursor = toId;
        while (cursor !== fromId) {
            const step = previous[cursor];
            if (!step) return null;
            routeEdges.unshift(step.edge);
            cursor = step.from;
            path.unshift(cursor);
        }

        const totalDistance = routeEdges.reduce((sum, edge) => sum + edge.distance, 0);
        const totalMinutes = routeEdges.reduce((sum, edge) => sum + edge.minutes, 0);
        const stopIds = routeEdges.flatMap(edge => edge.stops);

        return {
            path,
            edges: routeEdges,
            distance: totalDistance,
            minutes: totalMinutes,
            stopIds,
            coordinates: path.map(id => destinations[id].coordinates)
        };
    }

    async function getRoadRoute(fromId, toId, fallback) {
        if (forceFallbackRouting) throw new Error('Fallback routing requested');

        const from = destinations[fromId].coordinates;
        const to = destinations[toId].coordinates;
        const controller = new AbortController();
        const timeout = window.setTimeout(() => controller.abort(), 9000);
        const url = `https://router.project-osrm.org/route/v1/driving/${from[1]},${from[0]};${to[1]},${to[0]}?overview=full&geometries=geojson&steps=false&alternatives=false`;

        try {
            const response = await fetch(url, { signal: controller.signal });
            if (!response.ok) throw new Error(`Routing service returned ${response.status}`);
            const data = await response.json();
            if (data.code !== 'Ok' || !data.routes?.[0]) throw new Error('No road route returned');
            const roadRoute = data.routes[0];
            const liveMinutes = roadRoute.duration / 60;
            const planningMinutes = roundToQuarterHour(Math.max(liveMinutes * 1.25, fallback.minutes));

            return {
                source: 'live',
                distance: Math.round(roadRoute.distance / 1000),
                minutes: planningMinutes,
                coordinates: roadRoute.geometry.coordinates.map(([longitude, latitude]) => [latitude, longitude])
            };
        } finally {
            window.clearTimeout(timeout);
        }
    }

    function routeTypeFor(fromId, toId) {
        const pair = [destinations[fromId], destinations[toId]];
        if (pair.some(destination => destination.hill || ['hills', 'nature'].includes(destination.categoryKey))) return 'Hill road';
        if (pair.every(destination => destination.categoryKey === 'city') && pair.every(destination => !destination.coast)) return 'City route';
        if (pair.some(destination => destination.categoryKey === 'water')) return 'Backwater connection';
        if (pair.some(destination => destination.coast || destination.categoryKey === 'beach')) return 'Coastal road';
        return 'City route';
    }

    function recommendedMethod(fromId, toId, routeType, distance) {
        const pair = [destinations[fromId], destinations[toId]];
        if (routeType === 'Hill road') return 'Private car or taxi';
        if (routeType === 'Backwater connection') return pair.some(destination => destination.categoryKey === 'water') ? 'Car plus local boat' : 'Private car or taxi';
        if (distance >= 80 && pair.every(destination => destination.rail)) return 'Train or private car';
        if (routeType === 'Coastal road' && distance >= 70) return 'Train or private car';
        return 'Private car or taxi';
    }

    function routeStops(fallback, fromId, toId) {
        const unique = [];
        fallback.stopIds.forEach(id => {
            if (stopLibrary[id] && !unique.includes(id)) unique.push(id);
        });

        fallback.path.slice(1, -1).forEach(id => {
            const destination = destinations[id];
            if (!destination) return;
            const syntheticId = `destination-${id}`;
            if (!stopLibrary[syntheticId]) {
                stopLibrary[syntheticId] = {
                    name: destination.name,
                    description: destination.description,
                    why: `This route naturally passes through ${destination.name}, making it a practical place for a meal or an overnight break.`,
                    duration: '45-90 min'
                };
            }
            if (!unique.includes(syntheticId)) unique.push(syntheticId);
        });

        const chosen = unique.slice(0, 3).map(id => stopLibrary[id]);
        if (chosen.length >= 2) return chosen;

        const from = destinations[fromId];
        const to = destinations[toId];
        return [
            ...chosen,
            { name: `${from.name} departure area`, description: 'Use the departure area for water, snacks and a comfort break.', why: 'Starting prepared reduces unnecessary stops once the road becomes busier or more winding.', duration: '15-20 min' },
            { name: `${to.name} arrival area`, description: 'Pause before hotel check-in or the final local transfer.', why: 'It gives travellers time to confirm directions and arrival arrangements.', duration: '15-30 min' }
        ].slice(0, 3);
    }

    function journeyOverview(fromId, toId, type, fallback) {
        const from = destinations[fromId];
        const to = destinations[toId];
        const direction = to.coordinates[0] > from.coordinates[0] ? 'north' : 'south';
        const waypoints = fallback.path.slice(1, -1).map(id => destinations[id].name);
        const via = waypoints.length ? ` The fallback planning corridor passes via ${waypoints.join(', ')}.` : '';
        const experiences = {
            'Hill road': 'Expect changing elevations, plantation scenery and winding sections as the road approaches the Western Ghats.',
            'Backwater connection': 'The journey shifts between town roads, village landscapes, waterways and narrow last-mile approaches.',
            'Coastal road': 'Expect a mix of coastal towns, busy junctions and glimpses of Kerala\'s Arabian Sea landscape.',
            'City route': 'The route links urban neighbourhoods and heritage areas, where traffic conditions can shape the journey.'
        };
        return `Travel ${direction} from ${from.name} to ${to.name} on an approximate ${type.toLowerCase()}. ${experiences[type]}${via}`;
    }

    function travelAdvice(fromId, toId, type, distance, minutes) {
        const advice = [];
        const pair = [destinations[fromId], destinations[toId]];

        if (type === 'Hill road') {
            advice.push(['fa-road', 'Hill roads can be narrow and winding. Use an experienced driver and avoid rushing after dark.']);
            advice.push(['fa-tablets', 'Travellers prone to motion sickness should carry their usual medicine and sit where the road is easiest to see.']);
        }
        if (type === 'Coastal road' || pair.some(destination => destination.coast)) {
            advice.push(['fa-traffic-light', 'Allow extra time near cities and beach towns, especially on weekends and public holidays.']);
        }
        if (type === 'Backwater connection') {
            advice.push(['fa-bridge-water', 'Confirm the final approach with the stay or boat operator; island and jetty roads can be narrow.']);
        }
        if (distance >= 120 || minutes >= 210) {
            advice.push(['fa-sun', 'Leave by about 7:00-8:00 AM so the longest road section is completed in daylight.']);
            advice.push(['fa-mug-hot', 'Plan a proper rest stop every 90-120 minutes, particularly for children and senior travellers.']);
        } else {
            advice.push(['fa-clock', 'A morning departure usually leaves more flexibility for stops and changing road conditions.']);
        }
        advice.push(['fa-cloud-rain', 'During the monsoon, check current weather and local advisories before departure and allow a larger time buffer.']);
        advice.push(['fa-people-roof', minutes > 240 ? 'This is a demanding same-day transfer for families and senior travellers; consider an overnight break.' : 'The route is generally manageable for families when comfort breaks and meal stops are planned.']);
        return advice.slice(0, 6);
    }

    function transportOptions(fromId, toId, type, distance) {
        const from = destinations[fromId];
        const to = destinations[toId];
        const options = [
            ['fa-car-side', 'Private car or taxi', type === 'Hill road' ? 'The most flexible option for viewpoints, comfort stops and winding-road pacing.' : 'The simplest option for luggage, intermediate stops and direct hotel transfers.'],
            ['fa-bus-simple', 'Bus', 'Public and private buses serve many Kerala towns; check current operator timings and change points before travel.']
        ];

        if (from.rail && to.rail && type !== 'Hill road') {
            options.push(['fa-train', 'Train', 'Practical for many coastal and city connections, followed by a local taxi or bus at the destination.']);
        } else if ((from.rail || to.rail) && distance >= 100) {
            options.push(['fa-train', 'Train plus road transfer', 'A rail segment may reduce road time, but hill and island destinations still need a final taxi or bus connection.']);
        }

        if (type === 'Backwater connection' || [fromId, toId].some(id => ['fort-kochi', 'kadamakkudy', 'alappuzha', 'kumarakom', 'munroe-island', 'valiyaparamba'].includes(id))) {
            options.push(['fa-sailboat', 'Boat or ferry', 'Useful for selected local sightseeing or short connections; verify current operating conditions locally.']);
        }

        return options.slice(0, 4);
    }

    function matchingPlan(fromId, toId) {
        const from = destinations[fromId];
        const to = destinations[toId];
        return plans
            .map((plan, index) => {
                const fromMatch = plan.destinations.includes(fromId);
                const toMatch = plan.destinations.includes(toId);
                let score = (fromMatch ? 7 : 0) + (toMatch ? 7 : 0);
                score += plan.categories.includes(from.categoryKey) ? 1 : 0;
                score += plan.categories.includes(to.categoryKey) ? 1 : 0;
                if (!plan.specialised) score += 1;
                if (fromMatch && toMatch) score += Math.max(0, 5 - plan.destinations.length * 0.25);
                return { ...plan, score, index, fromMatch, toMatch };
            })
            .sort((a, b) => b.score - a.score || a.index - b.index)[0];
    }

    function markerPopup(id, destination) {
        const image = destination.image ? `<img src="${escapeHtml(destination.image)}" alt="${escapeHtml(destination.name)} landscape" loading="lazy">` : '';
        const actionText = destination.url.startsWith('destination-') ? 'View Destination' : 'View Matching Plan';
        return `<article class="destination-popup">${image}<div class="destination-popup-copy"><span>${escapeHtml(destination.category)}</span><h3>${escapeHtml(destination.name)}</h3><p>${escapeHtml(destination.description)}</p><a href="${escapeHtml(destination.url || destination.planUrl)}">${actionText} <i class="fa-solid fa-arrow-right-long" aria-hidden="true"></i></a></div></article>`;
    }

    function markerIcon(destination) {
        const meta = categoryMeta[destination.categoryKey];
        return L.divIcon({
            className: 'map-marker-wrap',
            html: `<span class="map-marker ${meta.markerClass}" role="img" aria-label="${escapeHtml(destination.name)}, ${escapeHtml(meta.label)} marker"><i class="fa-solid ${meta.icon}" aria-hidden="true"></i></span>`,
            iconSize: [42, 42],
            iconAnchor: [21, 38],
            popupAnchor: [0, -36]
        });
    }

    function terminalIcon(label, isDestination = false) {
        return L.divIcon({
            className: 'map-marker-wrap',
            html: `<span class="route-terminal-marker${isDestination ? ' is-destination' : ''}" aria-label="${isDestination ? 'Destination' : 'Start'} marker">${label}</span>`,
            iconSize: [44, 44],
            iconAnchor: [22, 22]
        });
    }

    function setMapUnavailable(message) {
        elements.mapLoading.hidden = true;
        elements.mapUnavailable.hidden = false;
        if (message) elements.mapUnavailable.querySelector('p').textContent = message;
    }

    function initialiseMap() {
        if (!window.L) {
            setMapUnavailable('Map tiles could not load. The route planner below remains available with curated planning estimates.');
            return;
        }

        map = L.map('kerala-map', { zoomControl: true, scrollWheelZoom: false, keyboard: true, minZoom: 6, maxZoom: 16 });
        const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap contributors</a>'
        });

        let successfulTiles = 0;
        let tileFailureTimer = null;
        tiles.on('tileload', () => {
            successfulTiles += 1;
            elements.mapLoading.hidden = true;
            elements.mapUnavailable.hidden = true;
        });
        tiles.on('tileerror', () => {
            window.clearTimeout(tileFailureTimer);
            tileFailureTimer = window.setTimeout(() => {
                if (!successfulTiles) setMapUnavailable('Map tiles are not available right now. Route summaries and curated fallback information still work below.');
            }, 2500);
        });
        tiles.addTo(map);

        Object.entries(destinations).forEach(([id, destination]) => {
            const marker = L.marker(destination.coordinates, {
                icon: markerIcon(destination),
                title: destination.name,
                keyboard: true,
                alt: `${destination.name}, ${destination.category}`
            }).addTo(map);
            marker.bindPopup(markerPopup(id, destination), { maxWidth: 270, minWidth: 220 });
            marker.on('popupopen', () => marker.getElement()?.querySelector('.map-marker')?.classList.add('is-active'));
            marker.on('popupclose', () => marker.getElement()?.querySelector('.map-marker')?.classList.remove('is-active'));
            mapMarkers[id] = marker;
        });

        map.fitBounds(allDestinationBounds, { padding: [34, 34] });
        map.attributionControl.setPrefix(false);
        window.setTimeout(() => {
            elements.mapLoading.hidden = true;
            if (!successfulTiles) setMapUnavailable('Map tiles are not available right now. Route summaries and curated fallback information still work below.');
        }, 5000);

        window.setTimeout(() => {
            document.querySelector('.leaflet-control-zoom-in')?.setAttribute('aria-label', 'Zoom map in');
            document.querySelector('.leaflet-control-zoom-out')?.setAttribute('aria-label', 'Zoom map out');
        }, 0);
    }

    function clearRouteLayers() {
        if (!map) return;
        if (routeLayer) map.removeLayer(routeLayer);
        if (terminalLayer) map.removeLayer(terminalLayer);
        routeLayer = null;
        terminalLayer = null;
    }

    function drawRoute(coordinates, fromId, toId) {
        if (!map) return;
        clearRouteLayers();
        routeLayer = L.polyline(coordinates, {
            color: '#c5a059',
            weight: 6,
            opacity: 0.95,
            lineCap: 'round',
            lineJoin: 'round',
            className: 'journey-route-line'
        }).addTo(map);
        terminalLayer = L.layerGroup([
            L.marker(destinations[fromId].coordinates, { icon: terminalIcon('A'), title: `Start: ${destinations[fromId].name}` }),
            L.marker(destinations[toId].coordinates, { icon: terminalIcon('B', true), title: `Destination: ${destinations[toId].name}` })
        ]).addTo(map);
        map.fitBounds(routeLayer.getBounds(), { padding: [54, 54], maxZoom: 11 });
    }

    function renderStops(stops) {
        elements.stops.innerHTML = stops.map(stop => `<article class="journey-stop"><span>${escapeHtml(stop.duration)}</span><h4>${escapeHtml(stop.name)}</h4><p>${escapeHtml(stop.description)}</p><strong>${escapeHtml(stop.why)}</strong></article>`).join('');
    }

    function renderList(target, entries, transport = false) {
        target.innerHTML = entries.map(entry => {
            if (transport) return `<li><i class="fa-solid ${escapeHtml(entry[0])}" aria-hidden="true"></i><span><strong>${escapeHtml(entry[1])}:</strong> ${escapeHtml(entry[2])}</span></li>`;
            return `<li><i class="fa-solid ${escapeHtml(entry[0])}" aria-hidden="true"></i><span>${escapeHtml(entry[1])}</span></li>`;
        }).join('');
    }

    function renderJourney(fromId, toId, route, fallback) {
        const from = destinations[fromId];
        const to = destinations[toId];
        const type = routeTypeFor(fromId, toId);
        const method = recommendedMethod(fromId, toId, type, route.distance);
        const plan = matchingPlan(fromId, toId);
        const stops = routeStops(fallback, fromId, toId);

        elements.summaryFrom.textContent = from.name;
        elements.summaryTo.textContent = to.name;
        elements.summaryDistance.textContent = `${route.distance} km`;
        elements.summaryTime.textContent = formatDuration(route.minutes);
        elements.summaryMethod.textContent = method;
        elements.summaryType.textContent = type;
        elements.journeyHeading.textContent = `${from.name} to ${to.name}`;
        elements.overview.textContent = journeyOverview(fromId, toId, type, fallback);
        elements.routeSource.innerHTML = route.source === 'live'
            ? '<i class="fa-solid fa-circle-check" aria-hidden="true"></i> Road geometry via OSRM'
            : '<i class="fa-solid fa-shield" aria-hidden="true"></i> Curated fallback route';

        renderStops(stops);
        renderList(elements.advice, travelAdvice(fromId, toId, type, route.distance, route.minutes));
        renderList(elements.transport, transportOptions(fromId, toId, type, route.distance), true);

        elements.planTitle.textContent = plan.name;
        elements.planDuration.textContent = plan.duration;
        elements.planPace.textContent = `${plan.pace} pace`;
        elements.planReason.textContent = plan.fromMatch && plan.toMatch
            ? `This itinerary includes both ${from.name} and ${to.name}, making it the closest match for the selected journey.`
            : `This itinerary includes ${plan.fromMatch ? from.name : plan.toMatch ? to.name : 'similar Kerala landscapes'} and follows the closest mix of experiences to this route.`;
        elements.planLink.href = plan.url;

        elements.popular.hidden = true;
        elements.results.hidden = false;
        elements.results.classList.remove('is-appearing');
        window.requestAnimationFrame(() => elements.results.classList.add('is-appearing'));

        return { from: from.name, to: to.name, distance: route.distance, minutes: route.minutes, type, method, plan: plan.name, url: plan.url, source: route.source };
    }

    async function showRoute(fromId, toId, options = {}) {
        const { scroll = true, preferFallback = false } = options;
        if (!destinations[fromId] || !destinations[toId]) throw new Error('Choose two supported Kerala destinations.');
        if (fromId === toId) throw new Error('Starting point and destination must be different.');

        const fallback = shortestFallbackRoute(fromId, toId);
        if (!fallback) throw new Error('A planning route is not available for this pair. Try another destination.');

        elements.message.textContent = 'Calculating an approximate road route...';
        let route;
        const previousForceFallback = forceFallbackRouting;
        if (preferFallback) forceFallbackRouting = true;

        try {
            route = await getRoadRoute(fromId, toId, fallback);
            elements.message.textContent = 'Road route ready. Times include a planning buffer for Kerala conditions.';
        } catch {
            route = { source: 'fallback', distance: fallback.distance, minutes: fallback.minutes, coordinates: fallback.coordinates };
            elements.message.textContent = 'Live routing is unavailable, so a curated approximate route is shown.';
        } finally {
            forceFallbackRouting = previousForceFallback;
        }

        drawRoute(route.coordinates, fromId, toId);
        const summary = renderJourney(fromId, toId, route, fallback);
        if (scroll) {
            elements.results.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
        }
        return summary;
    }

    function clearRoute() {
        elements.from.value = '';
        elements.to.value = '';
        elements.message.textContent = '';
        elements.results.hidden = true;
        elements.results.classList.remove('is-appearing');
        elements.popular.hidden = false;
        clearRouteLayers();
        if (map) map.fitBounds(allDestinationBounds, { padding: [34, 34] });
    }

    function cacheElements() {
        Object.assign(elements, {
            form: document.getElementById('route-planner'),
            from: document.getElementById('route-from'),
            to: document.getElementById('route-to'),
            swap: document.getElementById('route-swap'),
            clear: document.getElementById('route-clear'),
            message: document.getElementById('route-message'),
            datalist: document.getElementById('kerala-destinations'),
            mapLoading: document.getElementById('map-loading'),
            mapUnavailable: document.getElementById('map-unavailable'),
            popular: document.getElementById('popular-journeys'),
            results: document.getElementById('journey-results'),
            routeSource: document.getElementById('route-source'),
            summaryFrom: document.getElementById('summary-from'),
            summaryTo: document.getElementById('summary-to'),
            summaryDistance: document.getElementById('summary-distance'),
            summaryTime: document.getElementById('summary-time'),
            summaryMethod: document.getElementById('summary-method'),
            summaryType: document.getElementById('summary-type'),
            journeyHeading: document.getElementById('journey-heading'),
            overview: document.getElementById('journey-overview'),
            stops: document.getElementById('journey-stops'),
            advice: document.getElementById('journey-advice'),
            transport: document.getElementById('journey-transport'),
            planTitle: document.getElementById('matching-plan-title'),
            planDuration: document.getElementById('matching-plan-duration'),
            planPace: document.getElementById('matching-plan-pace'),
            planReason: document.getElementById('matching-plan-reason'),
            planLink: document.getElementById('matching-plan-link')
        });
    }

    function bindPlanner() {
        elements.datalist.innerHTML = Object.values(destinations)
            .sort((a, b) => a.name.localeCompare(b.name))
            .map(destination => `<option value="${escapeHtml(destination.name)}">${escapeHtml(destination.category)}</option>`)
            .join('');

        elements.form.addEventListener('submit', async event => {
            event.preventDefault();
            const fromId = findDestinationId(elements.from.value);
            const toId = findDestinationId(elements.to.value);

            if (!fromId || !toId) {
                elements.message.textContent = 'Choose both places from the supported destination list.';
                (!fromId ? elements.from : elements.to).focus();
                return;
            }
            if (fromId === toId) {
                elements.message.textContent = 'Starting point and destination must be different.';
                elements.to.focus();
                return;
            }

            try {
                await showRoute(fromId, toId);
            } catch (error) {
                elements.message.textContent = error.message;
            }
        });

        elements.swap.addEventListener('click', () => {
            const fromValue = elements.from.value;
            elements.from.value = elements.to.value;
            elements.to.value = fromValue;
            elements.message.textContent = elements.from.value || elements.to.value ? 'Starting point and destination swapped.' : '';
        });

        elements.clear.addEventListener('click', clearRoute);

        [elements.from, elements.to].forEach(input => {
            input.addEventListener('change', () => {
                const fromId = findDestinationId(elements.from.value);
                const toId = findDestinationId(elements.to.value);
                elements.message.textContent = fromId && toId && fromId === toId ? 'Starting point and destination must be different.' : '';
            });
        });

        document.querySelectorAll('[data-route-from][data-route-to]').forEach(button => {
            button.addEventListener('click', async () => {
                const fromId = button.dataset.routeFrom;
                const toId = button.dataset.routeTo;
                elements.from.value = destinations[fromId].name;
                elements.to.value = destinations[toId].name;
                try {
                    await showRoute(fromId, toId);
                } catch (error) {
                    elements.message.textContent = error.message;
                }
            });
        });
    }

    async function initialiseFromQuery() {
        const parameters = new URLSearchParams(window.location.search);
        const fromId = findDestinationId(parameters.get('from'));
        const toId = findDestinationId(parameters.get('to'));
        const requestedPlan = plans.find(plan => plan.id === parameters.get('plan'));

        if (!parameters.has('from') && !parameters.has('to')) return;
        if (!fromId || !toId || fromId === toId) {
            elements.message.textContent = 'The recommended route could not be opened automatically. Choose two supported Kerala destinations below.';
            return;
        }

        elements.from.value = destinations[fromId].name;
        elements.to.value = destinations[toId].name;
        try {
            await showRoute(fromId, toId, { scroll: false });
            if (requestedPlan) elements.message.textContent = `${elements.message.textContent} Opened from the ${requestedPlan.name} recommendation.`;
        } catch (error) {
            elements.message.textContent = error.message;
        }
    }

    function initialise() {
        cacheElements();
        bindPlanner();
        initialiseMap();

        window.KeralaMapPlanner = {
            destinations,
            plans,
            showRoute,
            clearRoute,
            findDestinationId,
            shortestFallbackRoute,
            setFallbackMode(enabled) { forceFallbackRouting = Boolean(enabled); }
        };
        void initialiseFromQuery();
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise);
    else initialise();
})();
