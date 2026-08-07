(() => {
    const PLAN_DATA = {
        'three-day': {
            name: '3-Day Kochi + Backwaters',
            route: 'Kochi → Fort Kochi → Alappuzha → Kochi',
            pageUrl: 'plan-3-days.html',
            days: 3,
            nights: 2,
            hotelNights: 1,
            bases: 2,
            routeIntensity: 'Low',
            transportUnits: 2.1,
            activityUnits: 2.4,
            paidActivities: ['Kochi heritage or cultural visit', 'overnight backwater cruise'],
            cruise: 'overnight',
            cruiseFactor: 1,
            seasonalSensitivity: 1.08,
            majorTransfers: false,
            studentShared: false,
            seniorFocused: false,
            accessibilityRelevant: true
        },
        'five-day': {
            name: '5-Day Hills + Houseboat',
            route: 'Kochi → Munnar → Thekkady → Alappuzha → Kochi',
            pageUrl: 'plan-5-days.html',
            days: 5,
            nights: 4,
            hotelNights: 3,
            bases: 4,
            routeIntensity: 'Moderate',
            transportUnits: 4.7,
            activityUnits: 4.6,
            paidActivities: ['tea and spice-country visits', 'wildlife-region activity', 'overnight houseboat'],
            cruise: 'overnight',
            cruiseFactor: 1,
            seasonalSensitivity: 1.1,
            majorTransfers: false,
            studentShared: false,
            seniorFocused: false,
            accessibilityRelevant: true
        },
        'seven-day': {
            name: '7-Day Classic + Offbeat Kerala',
            route: 'Kochi → Kadamakkudy → Munnar → Thekkady → Munroe Island → Varkala',
            pageUrl: 'plan-7-days.html',
            days: 7,
            nights: 6,
            hotelNights: 6,
            bases: 6,
            routeIntensity: 'Moderate-high',
            transportUnits: 7.2,
            activityUnits: 6.4,
            paidActivities: ['heritage and plantation visits', 'wildlife-region activity', 'Munroe Island canoe'],
            cruise: 'canoe',
            cruiseFactor: 0.9,
            seasonalSensitivity: 1.12,
            majorTransfers: true,
            studentShared: false,
            seniorFocused: false,
            accessibilityRelevant: true
        },
        'ten-day': {
            name: '10-Day Kerala Deep Dive',
            route: 'Kochi → Kadamakkudy → Munroe Island → Munnar → Thekkady → Wayanad → Valiyaparamba → Bekal',
            pageUrl: 'plan-10-days.html',
            days: 10,
            nights: 9,
            hotelNights: 9,
            bases: 8,
            routeIntensity: 'High',
            transportUnits: 13,
            activityUnits: 9,
            paidActivities: ['heritage and nature visits', 'wildlife-region activities', 'northern backwater cruise'],
            cruise: 'day',
            cruiseFactor: 1.25,
            seasonalSensitivity: 1.14,
            majorTransfers: true,
            studentShared: false,
            seniorFocused: false,
            accessibilityRelevant: true
        },
        student: {
            name: '5-Day Kerala Student Plan',
            route: 'Kochi → Munnar → Alappuzha → Kochi',
            pageUrl: 'plan-5-days-students.html',
            days: 5,
            nights: 4,
            hotelNights: 4,
            bases: 3,
            routeIntensity: 'Moderate',
            transportUnits: 4.2,
            activityUnits: 4.2,
            paidActivities: ['Kochi culture', 'Munnar group activities', 'daytime backwater cruise'],
            cruise: 'day',
            cruiseFactor: 0.75,
            seasonalSensitivity: 1.04,
            majorTransfers: false,
            studentShared: true,
            seniorFocused: false,
            accessibilityRelevant: true
        },
        senior: {
            name: '5-Day Easy-Paced Senior Plan',
            route: 'Kochi → Kumarakom → Kochi',
            pageUrl: 'plan-5-days-seniors.html',
            days: 5,
            nights: 4,
            hotelNights: 4,
            bases: 2,
            routeIntensity: 'Low',
            transportUnits: 3.8,
            activityUnits: 3.2,
            paidActivities: ['short Kochi heritage visits', 'covered daytime backwater cruise'],
            cruise: 'day',
            cruiseFactor: 1,
            seasonalSensitivity: 1.08,
            majorTransfers: false,
            studentShared: false,
            seniorFocused: true,
            accessibilityRelevant: true
        }
    };

    // Central 2026 planning assumptions. These are broad market bands, not live quotes.
    const TIERS = {
        value: {
            name: 'Value',
            icon: 'fa-wallet',
            description: 'Simple stays, practical transport and standard experiences.',
            roomRate: 2800,
            extraBedRate: 800,
            mealRate: 600,
            activityRate: 340,
            transportMultiplier: 0.72,
            overnightCabin: 10800,
            dayCruise: 4200,
            canoeRate: 550,
            lowerSpread: 0.07,
            upperSpread: 0.1,
            contingencyLow: 0.08,
            contingencyHigh: 0.11
        },
        comfortable: {
            name: 'Comfortable',
            icon: 'fa-bed',
            description: 'Well-rated hotels, easier transfers and a more relaxed trip.',
            roomRate: 5600,
            extraBedRate: 1400,
            mealRate: 1100,
            activityRate: 650,
            transportMultiplier: 1,
            overnightCabin: 16800,
            dayCruise: 8200,
            canoeRate: 850,
            lowerSpread: 0.07,
            upperSpread: 0.13,
            contingencyLow: 0.1,
            contingencyHigh: 0.13
        },
        premium: {
            name: 'Premium',
            icon: 'fa-gem',
            description: 'Upscale stays, private transport and upgraded experiences.',
            roomRate: 12200,
            extraBedRate: 2400,
            mealRate: 1900,
            activityRate: 1250,
            transportMultiplier: 1.28,
            overnightCabin: 28200,
            dayCruise: 15400,
            canoeRate: 1450,
            lowerSpread: 0.06,
            upperSpread: 0.16,
            contingencyLow: 0.12,
            contingencyHigh: 0.16
        }
    };

    const VEHICLES = [
        { id: 'sedan', name: 'Sedan', capacity: 3, dailyRate: 3200 },
        { id: 'mpv', name: 'SUV or MPV', capacity: 6, dailyRate: 4300 },
        { id: 'tempo', name: 'Tempo Traveller', capacity: 10, dailyRate: 5900 },
        { id: 'large', name: 'Larger Traveller or multiple vehicles', capacity: 12, dailyRate: 8200 }
    ];

    const MONTHS = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const ASSISTANCE = {
        none: { label: 'No special assistance', allowance: [0, 0, 0], vehicleUpgrade: 0 },
        reduced: { label: 'Reduced walking preferred', allowance: [1800, 3200, 5200], vehicleUpgrade: 0 },
        wheelchair: { label: 'Wheelchair-accessible arrangements', allowance: [6500, 10500, 17500], vehicleUpgrade: 1 },
        private: { label: 'Private vehicle required', allowance: [2500, 4200, 6800], vehicleUpgrade: 0 }
    };

    const ROOM_PREFERENCES = {
        practical: 'Choose the most practical arrangement',
        fewer: 'Fewer rooms where possible',
        privacy: 'More privacy',
        seniorShared: 'One shared separate room for senior travellers',
        seniorIndividual: 'Individual room for each senior traveller'
    };

    const TIER_IDS = Object.keys(TIERS);
    const ENQUIRY_STORAGE_KEY = 'visitKeralaSelectedEstimate';
    const PRICING_REVIEW_DATE = 'August 2026';
    const roundHundred = value => Math.max(0, Math.round(value / 100) * 100);
    const clamp = (value, minimum, maximum) => Math.min(maximum, Math.max(minimum, value));
    const plural = (count, singular, pluralForm = `${singular}s`) => `${count} ${count === 1 ? singular : pluralForm}`;
    const formatCurrency = value => `\u20b9${Math.round(value).toLocaleString('en-IN')}`;
    const formatRange = range => `${formatCurrency(range.lower)}-${formatCurrency(range.upper)}`;

    const normaliseGroup = raw => {
        const adults = clamp(Number(raw.adults) || 0, 0, 10);
        const seniors = clamp(Number(raw.seniors) || 0, 0, 10);
        const children = clamp(Number(raw.children) || 0, 0, 10);
        const infants = clamp(Number(raw.infants) || 0, 0, 10);
        const childAges = Array.from({ length: children }, (_, index) => clamp(Number(raw.childAges?.[index] ?? 7), 3, 11));
        const infantAges = Array.from({ length: infants }, (_, index) => clamp(Number(raw.infantAges?.[index] ?? 1), 0, 2));
        return { adults, seniors, children, infants, childAges, infantAges };
    };

    const validateInput = raw => {
        const group = normaliseGroup(raw);
        const total = group.adults + group.seniors + group.children + group.infants;
        const guardians = group.adults + group.seniors;
        const errors = [];
        if (!total) errors.push('Add at least one traveller.');
        if (total && !group.adults && !group.seniors && !group.children) errors.push('A group cannot consist only of infants.');
        if (group.children && !guardians) errors.push('Children and infants must travel with an adult or senior.');
        if (total > 12) errors.push('This estimator currently supports groups of up to 12 travellers.');
        if (!Number.isInteger(Number(raw.month)) || Number(raw.month) < 1 || Number(raw.month) > 12) errors.push('Choose a travel month.');
        if (group.childAges.some(age => age < 3 || age > 11)) errors.push('Each child age must be between 3 and 11.');
        if (group.infantAges.some(age => age < 0 || age > 2)) errors.push('Each infant age must be between 0 and 2.');
        if (!Object.hasOwn(ROOM_PREFERENCES, raw.roomPreference || 'practical')) errors.push('Choose a supported room arrangement.');
        if (group.seniors && !Object.hasOwn(ASSISTANCE, raw.assistance || 'none')) errors.push('Choose a supported assistance option.');
        return { valid: !errors.length, errors, group, total, guardians };
    };

    const getSeason = (month, holidayPeak = false) => {
        const monthNumber = Number(month);
        if (holidayPeak) return { id: 'holiday', label: 'Holiday peak', multiplier: 1.4, note: 'Major holiday or Christmas/New Year adjustment' };
        if ([6, 7, 8].includes(monthNumber)) return { id: 'monsoon', label: 'Monsoon / value season', multiplier: 0.88, note: 'Lower-demand monsoon planning band' };
        if (monthNumber === 9) return { id: 'regular', label: 'Early regular season', multiplier: 0.97, note: 'Transitional September planning band' };
        if ([11, 12, 1].includes(monthNumber)) return { id: 'peak', label: 'Peak season', multiplier: 1.18, note: 'Higher-demand winter planning band' };
        return { id: 'regular', label: 'Regular season', multiplier: 1, note: 'Standard planning band' };
    };

    const childRoomWeight = age => age <= 5 ? 0.25 : age <= 8 ? 0.45 : 0.7;
    const childMealWeight = age => age <= 5 ? 0.42 : age <= 8 ? 0.56 : 0.72;
    const childActivityWeight = age => age <= 5 ? 0.32 : age <= 8 ? 0.5 : 0.7;
    const infantMealWeight = age => age === 2 ? 0.14 : age === 1 ? 0.08 : 0.03;

    const calculateRooms = (rawGroup, roomPreference = 'practical', planId = 'three-day') => {
        const group = normaliseGroup(rawGroup);
        const plan = PLAN_DATA[planId] || PLAN_DATA['three-day'];
        const coreGuests = group.adults + group.seniors;
        const childUnits = group.childAges.reduce((total, age) => total + childRoomWeight(age), 0);
        const seniorSpecific = ['seniorShared', 'seniorIndividual'].includes(roomPreference) && group.seniors;
        let rooms;
        let childDrivenRooms = 0;

        if (seniorSpecific) {
            const seniorRooms = roomPreference === 'seniorIndividual' ? group.seniors : 1;
            const otherUnits = group.adults + childUnits;
            const otherRooms = otherUnits ? Math.max(1, Math.ceil(otherUnits / 2.55), Math.ceil(group.adults / 2)) : 0;
            rooms = seniorRooms + otherRooms;
            childDrivenRooms = Math.max(0, otherRooms - Math.ceil(group.adults / 2));
        } else if (plan.studentShared && roomPreference !== 'privacy') {
            rooms = Math.max(1, Math.ceil((coreGuests + childUnits) / (roomPreference === 'fewer' ? 4.5 : 4)));
        } else {
            const capacity = roomPreference === 'fewer' ? 3.25 : roomPreference === 'privacy' ? 1.85 : 2.55;
            rooms = Math.max(1, Math.ceil((coreGuests + childUnits) / capacity), Math.ceil(coreGuests / 2));
            childDrivenRooms = Math.max(0, rooms - Math.ceil(coreGuests / 2));
        }

        const olderChildren = group.childAges.filter(age => age >= 7).length;
        const extraBeds = roomPreference === 'privacy' ? 0 : Math.max(0, olderChildren - (childDrivenRooms * 2));
        const cabinCapacity = roomPreference === 'fewer' ? 3.5 : roomPreference === 'privacy' ? 2 : 3.1;
        const cabinUnits = coreGuests + group.childAges.reduce((total, age) => total + (age <= 5 ? 0.25 : age <= 8 ? 0.45 : 0.65), 0);
        let cabins = plan.cruise === 'overnight' ? Math.max(1, Math.ceil(cabinUnits / cabinCapacity)) : 0;
        if (plan.cruise === 'overnight' && seniorSpecific) {
            const seniorCabins = roomPreference === 'seniorIndividual' ? group.seniors : 1;
            const otherCabins = group.adults || group.children ? Math.max(1, Math.ceil((group.adults + (childUnits * 0.7)) / 2)) : 0;
            cabins = Math.max(cabins, seniorCabins + otherCabins);
        }

        return { rooms, cabins, extraBeds, childDrivenRooms, childUnits: Number(childUnits.toFixed(2)) };
    };

    const selectVehicle = (rawGroup, assistance = 'none') => {
        const group = normaliseGroup(rawGroup);
        const total = group.adults + group.seniors + group.children + group.infants;
        const luggageSpace = total >= 4 ? 0.5 : 0;
        const infantSpace = group.infants ? 0.5 + (group.infants * 0.25) : 0;
        const passengerLoad = group.adults + group.seniors + group.children + (group.infants * 0.75) + luggageSpace + infantSpace;
        let index = VEHICLES.findIndex(vehicle => passengerLoad <= vehicle.capacity);
        if (index < 0) index = VEHICLES.length - 1;
        if (assistance === 'wheelchair') index = Math.min(VEHICLES.length - 1, index + ASSISTANCE.wheelchair.vehicleUpgrade);
        return { ...VEHICLES[index], passengerLoad: Number(passengerLoad.toFixed(2)) };
    };

    const categoryRange = (amount, tier) => {
        if (!amount) return { lower: 0, upper: 0 };
        const lower = roundHundred(amount * (1 - tier.lowerSpread));
        const upper = Math.max(lower + 100, roundHundred(amount * (1 + tier.upperSpread)));
        return { lower, upper };
    };

    const addRanges = ranges => ranges.reduce((total, range) => ({ lower: total.lower + range.lower, upper: total.upper + range.upper }), { lower: 0, upper: 0 });

    const calculateTier = (plan, input, group, season, rooms, vehicle, tierId) => {
        const tier = TIERS[tierId];
        const tierIndex = TIER_IDS.indexOf(tierId);
        const assistance = group.seniors ? (input.assistance || 'none') : 'none';
        const assistanceData = ASSISTANCE[assistance];
        const seasonEffect = 1 + ((season.multiplier - 1) * plan.seasonalSensitivity);
        const studentRoomDiscount = plan.studentShared ? (tierId === 'value' ? 0.68 : tierId === 'comfortable' ? 0.76 : 0.88) : 1;
        const wheelchairRoomFactor = assistance === 'wheelchair' ? 1.06 : 1;
        const accommodationBase = rooms.rooms * plan.hotelNights * tier.roomRate * seasonEffect * studentRoomDiscount * wheelchairRoomFactor;
        const childExtraBedsBase = rooms.extraBeds * plan.hotelNights * tier.extraBedRate * seasonEffect;

        const mealUnits = group.adults
            + (group.seniors * 0.9)
            + group.childAges.reduce((total, age) => total + childMealWeight(age), 0)
            + group.infantAges.reduce((total, age) => total + infantMealWeight(age), 0);
        const mealsBase = mealUnits * plan.days * tier.mealRate;

        const activityUnits = group.adults
            + (group.seniors * 0.82)
            + group.childAges.reduce((total, age) => total + childActivityWeight(age), 0)
            + (group.infants * 0.04);
        const experiencesBase = activityUnits * plan.activityUnits * tier.activityRate;

        const forcePrivate = plan.seniorFocused || assistance === 'private' || assistance === 'wheelchair';
        const transportMultiplier = forcePrivate ? Math.max(1, tier.transportMultiplier) : tier.transportMultiplier;
        const transportSeasonEffect = 1 + ((season.multiplier - 1) * 0.28);
        const studentTransportFactor = plan.studentShared && group.adults + group.seniors + group.children >= 6 ? 0.88 : 1;
        const transportBase = vehicle.dailyRate * plan.transportUnits * transportMultiplier * transportSeasonEffect * studentTransportFactor;

        const cruiseGuests = group.adults + group.seniors + group.childAges.reduce((total, age) => total + childActivityWeight(age), 0) + (group.infants * 0.05);
        let cruiseBase = 0;
        if (plan.cruise === 'overnight') {
            const overflowGuests = Math.max(0, cruiseGuests - (rooms.cabins * 2));
            const extraGuestRate = [1200, 1650, 2100][tierIndex];
            cruiseBase = ((rooms.cabins * tier.overnightCabin) + (overflowGuests * extraGuestRate)) * seasonEffect * plan.cruiseFactor;
        } else if (plan.cruise === 'day') {
            const boats = Math.max(1, Math.ceil(cruiseGuests / 8));
            cruiseBase = ((tier.dayCruise * boats) + (cruiseGuests * [280, 420, 650][tierIndex])) * seasonEffect * plan.cruiseFactor;
        } else if (plan.cruise === 'canoe') {
            cruiseBase = Math.max(1800, cruiseGuests * tier.canoeRate) * seasonEffect * plan.cruiseFactor;
        }

        const accessibilityBase = assistanceData.allowance[tierIndex];
        const central = {
            accommodation: accommodationBase,
            childExtraBeds: childExtraBedsBase,
            transport: transportBase,
            meals: mealsBase,
            experiences: experiencesBase,
            cruise: cruiseBase,
            accessibility: accessibilityBase
        };
        const ranges = Object.fromEntries(Object.entries(central).map(([category, amount]) => [category, categoryRange(amount, tier)]));
        const beforeContingency = addRanges(Object.values(ranges));
        ranges.contingency = {
            lower: roundHundred(beforeContingency.lower * tier.contingencyLow),
            upper: roundHundred(beforeContingency.upper * tier.contingencyHigh)
        };
        const total = addRanges(Object.values(ranges));
        const payingTravellers = Math.max(1, group.adults + group.seniors + group.children);

        return {
            id: tierId,
            name: tier.name,
            description: tier.description,
            icon: tier.icon,
            ranges,
            total,
            perPayingTraveller: roundHundred(((total.lower + total.upper) / 2) / payingTravellers)
        };
    };

    const groupSummary = (group, month, holidayPeak) => {
        const parts = [];
        if (group.adults) parts.push(plural(group.adults, 'adult'));
        if (group.children) parts.push(`${plural(group.children, 'child', 'children')} aged ${group.childAges.join(' and ')}`);
        if (group.seniors) parts.push(plural(group.seniors, 'senior traveller'));
        if (group.infants) parts.push(`${plural(group.infants, 'infant')} aged ${group.infantAges.join(' and ')}`);
        parts.push(holidayPeak ? `${MONTHS[month - 1]} holiday travel` : `${MONTHS[month - 1]} travel`);
        return parts.join(' \u00b7 ');
    };

    const calculateEstimate = (planId, rawInput) => {
        const plan = PLAN_DATA[planId];
        if (!plan) throw new Error('Unknown Kerala plan.');
        const validation = validateInput(rawInput);
        if (!validation.valid) throw new Error(validation.errors.join(' '));
        const input = {
            ...rawInput,
            month: Number(rawInput.month),
            holidayPeak: Boolean(rawInput.holidayPeak),
            roomPreference: rawInput.roomPreference || 'practical',
            assistance: validation.group.seniors ? (rawInput.assistance || 'none') : 'none'
        };
        const group = validation.group;
        const season = getSeason(input.month, input.holidayPeak);
        const rooms = calculateRooms(group, input.roomPreference, planId);
        const vehicle = selectVehicle(group, input.assistance);
        const tiers = Object.fromEntries(TIER_IDS.map(tierId => [tierId, calculateTier(plan, input, group, season, rooms, vehicle, tierId)]));
        const totalTravellers = group.adults + group.seniors + group.children + group.infants;
        const assumptions = [
            groupSummary(group, input.month, input.holidayPeak),
            `${rooms.rooms} ${rooms.rooms === 1 ? 'hotel room' : 'hotel rooms'} for ${plan.hotelNights} ${plan.hotelNights === 1 ? 'night' : 'nights'}`,
            rooms.extraBeds ? `${plural(rooms.extraBeds, 'child extra bed')} across ${plan.hotelNights} hotel ${plan.hotelNights === 1 ? 'night' : 'nights'}` : 'No separate child extra-bed charge under this room arrangement',
            plan.cruise === 'overnight' ? `${plural(rooms.cabins, 'houseboat cabin')}` : plan.cruise === 'day' ? 'One day-cruise allowance' : plan.cruise === 'canoe' ? 'One local canoe-experience allowance' : 'No cruise included',
            `${vehicle.name} with luggage and infant-space allowance where relevant`,
            `Age-sensitive allowance for ${plan.paidActivities.join(', ')}`,
            `${season.label}: ${season.multiplier.toFixed(2)}x seasonal multiplier`,
            `${ROOM_PREFERENCES[input.roomPreference]}`,
            input.assistance !== 'none' ? `${ASSISTANCE[input.assistance].label} allowance included` : 'No accessibility surcharge added',
            `${plan.routeIntensity} route intensity across ${plan.bases} bases`,
            'Category uncertainty plus 8%-16% taxes and contingency, depending on tier'
        ];

        return {
            planId,
            plan,
            input,
            group,
            season,
            rooms,
            vehicle,
            tiers,
            totalTravellers,
            groupSummary: groupSummary(group, input.month, input.holidayPeak),
            assumptions,
            disclaimer: 'This tool provides a planning estimate, not a booking quotation. Actual prices depend on travel dates, availability, hotel policies, child-age policies, room arrangements, transport operators and selected services.'
        };
    };

    const categoryLabels = {
        accommodation: 'Accommodation',
        childExtraBeds: 'Child extra beds',
        transport: 'Local transport',
        meals: 'Meals',
        experiences: 'Experiences and entry fees',
        accessibility: 'Accessibility allowance',
        contingency: 'Taxes and contingency'
    };

    const cruiseLabel = plan => plan.cruise === 'overnight'
        ? 'Overnight houseboat'
        : plan.cruise === 'day'
            ? 'Day cruise'
            : plan.cruise === 'canoe'
                ? 'Canoe experience'
                : 'No cruise included';

    const serialiseRange = range => ({
        minimum: range.lower,
        maximum: range.upper,
        formatted: formatRange(range)
    });

    const createEnquiryPayload = (estimate, selectedTier) => {
        if (!estimate?.plan || estimate.totalTravellers < 1) throw new Error('A valid personalised estimate is required.');
        if (!TIER_IDS.includes(selectedTier)) throw new Error('Choose a supported comfort tier.');
        const tier = estimate.tiers[selectedTier];
        if (!tier?.total || tier.total.lower < 0 || tier.total.upper < tier.total.lower) throw new Error('The selected estimate is incomplete.');
        const rangeFor = category => serialiseRange(tier.ranges[category] || { lower: 0, upper: 0 });
        const assistanceId = estimate.input.assistance || 'none';
        const privateTransportRequired = estimate.plan.seniorFocused || ['private', 'wheelchair'].includes(assistanceId);

        return {
            version: 1,
            createdAt: new Date().toISOString(),
            plan: {
                id: estimate.planId,
                name: estimate.plan.name,
                duration: `${estimate.plan.days} days`,
                days: estimate.plan.days,
                nights: estimate.plan.nights,
                hotelNights: estimate.plan.hotelNights,
                route: estimate.plan.route,
                itineraryPageUrl: estimate.plan.pageUrl,
                budgetSectionReturnUrl: `${estimate.plan.pageUrl}?budget=${selectedTier}#budget`
            },
            selectedBudget: {
                tierId: tier.id,
                tierName: tier.name,
                estimatedMinimumAmount: tier.total.lower,
                estimatedMaximumAmount: tier.total.upper,
                formattedEstimateRange: formatRange(tier.total),
                pricingAssumptionsReviewDate: PRICING_REVIEW_DATE
            },
            travellers: {
                adults: estimate.group.adults,
                seniorTravellers: estimate.group.seniors,
                children: estimate.group.children,
                infants: estimate.group.infants,
                childAges: [...estimate.group.childAges],
                infantAges: [...estimate.group.infantAges],
                totalTravellerCount: estimate.totalTravellers
            },
            travelDetails: {
                selectedTravelMonth: MONTHS[estimate.input.month - 1],
                selectedTravelMonthNumber: estimate.input.month,
                holidayOrPeakPeriodSelected: Boolean(estimate.input.holidayPeak),
                seasonLabel: estimate.season.label,
                seasonalMultiplier: estimate.season.multiplier
            },
            accommodation: {
                roomPreferenceId: estimate.input.roomPreference,
                roomPreference: ROOM_PREFERENCES[estimate.input.roomPreference],
                calculatedHotelRooms: estimate.rooms.rooms,
                calculatedExtraBeds: estimate.rooms.extraBeds,
                houseboatCabins: estimate.rooms.cabins,
                hotelNights: estimate.plan.hotelNights
            },
            transportAndAssistance: {
                assistanceRequirementId: assistanceId,
                assistanceRequirement: ASSISTANCE[assistanceId]?.label || ASSISTANCE.none.label,
                privateTransportRequired,
                recommendedVehicle: estimate.vehicle.name,
                passengerLoadAssumption: estimate.vehicle.passengerLoad
            },
            waterExperience: {
                id: estimate.plan.cruise,
                label: cruiseLabel(estimate.plan)
            },
            estimateBreakdown: {
                accommodation: rangeFor('accommodation'),
                childExtraBeds: rangeFor('childExtraBeds'),
                localTransport: rangeFor('transport'),
                meals: rangeFor('meals'),
                experiencesAndEntryFees: rangeFor('experiences'),
                waterExperience: rangeFor('cruise'),
                accessibilityAllowance: rangeFor('accessibility'),
                taxesAndContingency: rangeFor('contingency'),
                finalTotal: serialiseRange(tier.total)
            },
            assumptions: [...estimate.assumptions],
            disclaimer: estimate.disclaimer
        };
    };

    const renderAgeSelectors = (container, type, ages) => {
        const isChild = type === 'child';
        const minimum = isChild ? 3 : 0;
        const maximum = isChild ? 11 : 2;
        const label = isChild ? 'Child' : 'Infant';
        container.innerHTML = ages.map((age, index) => `
            <label class="budget-age-field" for="budget-${type}-age-${index}">
                <span>${label} ${index + 1} age</span>
                <select id="budget-${type}-age-${index}" data-age-type="${type}" data-age-index="${index}">
                    ${Array.from({ length: maximum - minimum + 1 }, (_, offset) => minimum + offset).map(option => `<option value="${option}"${option === age ? ' selected' : ''}>${option}</option>`).join('')}
                </select>
            </label>
        `).join('');
        container.hidden = !ages.length;
    };

    const tierCardMarkup = (tier, preferredTier, plan) => {
        const breakdown = Object.entries(tier.ranges)
            .filter(([category, range]) => category !== 'accessibility' || range.upper > 0)
            .filter(([category, range]) => category !== 'childExtraBeds' || range.upper > 0)
            .map(([category, range]) => `<li><span>${category === 'cruise' ? cruiseLabel(plan) : categoryLabels[category]}</span><strong>${formatRange(range)}</strong></li>`)
            .join('');
        return `
            <article class="group-budget-card ${tier.id}${preferredTier === tier.id ? ' is-preferred' : ''}">
                <div class="group-budget-card-heading">
                    <span class="group-budget-icon"><i class="fa-solid ${tier.icon}" aria-hidden="true"></i></span>
                    <div><span>${tier.name}</span><p>${tier.description}</p></div>
                    ${preferredTier === tier.id ? '<strong class="budget-preferred-badge">Your plan-finder choice</strong>' : ''}
                </div>
                <h3>${formatRange(tier.total)}</h3>
                <strong class="budget-group-total-label">Estimated total for your entire group</strong>
                <p class="budget-per-person">Approximately ${formatCurrency(tier.perPayingTraveller)} per paying traveller</p>
                <ul class="group-budget-breakdown">${breakdown}<li class="total"><span>Total estimated group cost</span><strong>${formatRange(tier.total)}</strong></li></ul>
                <button class="budget-confirm-estimate" type="button" data-budget-confirm="${tier.id}" aria-label="Confirm ${tier.name} estimate for the ${plan.name} plan"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Confirm This Estimate</button>
            </article>
        `;
    };

    const resultMarkup = (estimate, preferredTier) => {
        const studentNote = estimate.plan.studentShared
            ? '<p class="budget-plan-note"><i class="fa-solid fa-user-group" aria-hidden="true"></i> This student-plan estimate assumes shared accommodation and group transport where practical.</p>'
            : '';
        const seniorNote = estimate.plan.seniorFocused
            ? '<p class="budget-plan-note"><i class="fa-solid fa-notes-medical" aria-hidden="true"></i> This estimate does not include medicines, medical equipment, nursing assistance or medical treatment.</p>'
            : '';
        return `
            <div class="budget-result-header">
                <div><span class="subtitle">Indicative 2026 Planning Range</span><h2>Your Group Budget</h2><p>${estimate.groupSummary}</p></div>
                <div class="budget-result-actions">
                    <button type="button" data-budget-edit><i class="fa-solid fa-pen" aria-hidden="true"></i> Edit Traveller Details</button>
                    <button type="button" data-budget-reset><i class="fa-solid fa-rotate-left" aria-hidden="true"></i> Start Over</button>
                    <button type="button" data-budget-print><i class="fa-solid fa-print" aria-hidden="true"></i> Print Budget Summary</button>
                    <button type="button" data-budget-copy><i class="fa-regular fa-copy" aria-hidden="true"></i> Copy Budget Summary</button>
                </div>
            </div>
            <div class="budget-result-meta" aria-label="Budget assumptions summary">
                <div><i class="fa-solid fa-users" aria-hidden="true"></i><span>Travellers</span><strong>${estimate.totalTravellers}</strong></div>
                <div><i class="fa-solid fa-bed" aria-hidden="true"></i><span>Rooms / water experience</span><strong>${estimate.rooms.rooms} / ${estimate.plan.cruise === 'overnight' ? `${estimate.rooms.cabins} cabin${estimate.rooms.cabins === 1 ? '' : 's'}` : cruiseLabel(estimate.plan)}</strong></div>
                <div><i class="fa-solid fa-car-side" aria-hidden="true"></i><span>Vehicle</span><strong>${estimate.vehicle.name}</strong></div>
                <div><i class="fa-regular fa-moon" aria-hidden="true"></i><span>Nights</span><strong>${estimate.plan.nights}</strong></div>
                <div><i class="fa-solid fa-route" aria-hidden="true"></i><span>Selected plan</span><strong>${estimate.plan.name}</strong></div>
                <div><i class="fa-regular fa-calendar" aria-hidden="true"></i><span>Season</span><strong>${estimate.season.label}</strong></div>
            </div>
            ${studentNote}${seniorNote}
            <div class="group-budget-grid">${TIER_IDS.map(tierId => tierCardMarkup(estimate.tiers[tierId], preferredTier, estimate.plan)).join('')}</div>
            <div class="budget-inclusions-grid">
                <section><h3><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Included in this estimate</h3><ul><li>Accommodation and calculated child extra beds</li><li>Local transport within Kerala</li><li>Estimated meals</li><li>Main itinerary experiences</li><li>${cruiseLabel(estimate.plan)}</li><li>Approximate taxes and contingency</li></ul></section>
                <section><h3><i class="fa-solid fa-circle-xmark" aria-hidden="true"></i> Not included</h3><ul><li>Flights or trains to and from Kerala</li><li>Shopping and personal expenses</li><li>Optional activities not listed</li><li>Travel insurance</li><li>Medical treatment and medicines</li><li>Live booking fees or major unexpected route changes</li></ul></section>
            </div>
            <details class="budget-method" data-budget-method>
                <summary aria-expanded="false">How was this calculated? <i class="fa-solid fa-chevron-down" aria-hidden="true"></i></summary>
                <div><p>The estimate uses separate accommodation, child extra-bed, transport, meal, age-sensitive activity, water-experience and contingency calculations. It is not a multiplied per-person package price.</p><ul>${estimate.assumptions.map(assumption => `<li>${assumption}</li>`).join('')}</ul><p><strong>Pricing assumptions last reviewed: August 2026.</strong></p></div>
            </details>
            <p class="budget-estimator-disclaimer"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> ${estimate.disclaimer}</p>
            <p class="budget-copy-status" data-budget-copy-status role="status" aria-live="polite"></p>
        `;
    };

    const summaryText = estimate => {
        const tierLines = TIER_IDS.map(tierId => {
            const tier = estimate.tiers[tierId];
            return `${tier.name}: ${formatRange(tier.total)} total for the group`;
        });
        return [
            `${estimate.plan.name} - Indicative 2026 Budget`,
            estimate.groupSummary,
            `${estimate.rooms.rooms} room(s); ${estimate.rooms.extraBeds} child extra bed(s); ${estimate.rooms.cabins ? `${estimate.rooms.cabins} houseboat cabin(s)` : cruiseLabel(estimate.plan)}; ${estimate.vehicle.name}`,
            `${estimate.season.label} (${estimate.season.multiplier.toFixed(2)}x)`,
            ...tierLines,
            `Included: accommodation, calculated child extra beds, local Kerala transport, estimated meals, listed experiences, ${cruiseLabel(estimate.plan).toLowerCase()}, taxes and contingency.`,
            'Excluded: travel to/from Kerala, shopping, personal expenses, insurance, medical costs, optional activities and live booking fees.',
            estimate.disclaimer
        ].join('\n');
    };

    const formMarkup = (plan, state, preferredTier) => `
        <div class="section-header budget-estimator-heading">
            <span class="subtitle">Personalised Trip Cost</span>
            <h2 class="title">Estimate Your Kerala Trip Budget</h2>
            <div class="divider"></div>
            <p class="section-intro">Tell us who is travelling and we will estimate the total cost for your group across Value, Comfortable and Premium travel styles.</p>
        </div>
        ${preferredTier ? `<p class="budget-query-note"><i class="fa-solid fa-compass" aria-hidden="true"></i> Your plan finder selected <strong>${TIERS[preferredTier].name}</strong>. We will highlight that tier while still showing all three options.</p>` : ''}
        <form class="budget-estimator-form" data-budget-form novalidate>
            <fieldset class="budget-form-panel">
                <legend><span>01</span> Who is travelling?</legend>
                <div class="budget-traveller-grid">
                    ${[
                        ['adults', 'Adults', 'Age 12-59', 'fa-user'],
                        ['children', 'Children', 'Age 3-11', 'fa-child-reaching'],
                        ['seniors', 'Senior Travellers', 'Age 60 and above', 'fa-person-cane'],
                        ['infants', 'Infants', 'Age 0-2', 'fa-baby']
                    ].map(([id, label, description, icon]) => `
                        <div class="budget-traveller-row">
                            <span class="budget-traveller-icon"><i class="fa-solid ${icon}" aria-hidden="true"></i></span>
                            <label for="budget-${id}"><strong>${label}</strong><small>${description}</small></label>
                            <div class="budget-stepper">
                                <button type="button" data-budget-count="${id}" data-delta="-1" aria-label="Remove one ${label.toLowerCase()}"><i class="fa-solid fa-minus" aria-hidden="true"></i></button>
                                <input id="budget-${id}" name="${id}" type="number" min="0" max="10" value="${state[id]}" inputmode="numeric" aria-label="Number of ${label.toLowerCase()}">
                                <button type="button" data-budget-count="${id}" data-delta="1" aria-label="Add one ${label.toLowerCase()}"><i class="fa-solid fa-plus" aria-hidden="true"></i></button>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="budget-age-grid" data-child-ages hidden></div>
                <div class="budget-age-grid" data-infant-ages hidden></div>
                <p class="budget-policy-note">Hotels, houseboats and activity providers may use different child-age policies. These age groups are used only for planning estimates.</p>
            </fieldset>
            <fieldset class="budget-form-panel">
                <legend><span>02</span> Travel period and room preference</legend>
                <div class="budget-preference-grid">
                    <label for="budget-month"><span>When are you travelling?</span><select id="budget-month" name="month" required><option value="">Choose travel month</option>${MONTHS.map((month, index) => `<option value="${index + 1}"${Number(state.month) === index + 1 ? ' selected' : ''}>${month}</option>`).join('')}</select><small>Travel dates significantly affect hotel, houseboat and transport costs.</small></label>
                    <label for="budget-room-preference"><span>Preferred room arrangement</span><select id="budget-room-preference" name="roomPreference">${Object.entries(ROOM_PREFERENCES).map(([value, label]) => `<option value="${value}"${state.roomPreference === value ? ' selected' : ''}>${label}</option>`).join('')}</select><small>Rooms and cabins are calculated from occupancy, not multiplied per person.</small></label>
                </div>
                <label class="budget-holiday-check"><input type="checkbox" name="holidayPeak"${state.holidayPeak ? ' checked' : ''}><span><strong>Major festival, long weekend, Christmas or New Year period</strong><small>Use the highest seasonal planning adjustment.</small></span></label>
                <div class="budget-assistance" data-budget-assistance${state.seniors ? '' : ' hidden'}>
                    <label for="budget-assistance"><span>Do senior travellers need additional assistance?</span><select id="budget-assistance" name="assistance">${Object.entries(ASSISTANCE).map(([value, option]) => `<option value="${value}"${state.assistance === value ? ' selected' : ''}>${option.label}</option>`).join('')}</select><small>Being over 60 does not add a cost. An allowance is added only when an assistance option is selected.</small></label>
                </div>
            </fieldset>
            ${plan.studentShared ? '<p class="budget-plan-note"><i class="fa-solid fa-user-group" aria-hidden="true"></i> This student-plan estimate assumes shared accommodation and group transport where practical.</p>' : ''}
            ${plan.seniorFocused ? '<p class="budget-plan-note"><i class="fa-solid fa-notes-medical" aria-hidden="true"></i> This estimate excludes medicines, medical equipment, nursing assistance and medical treatment.</p>' : ''}
            <p class="budget-form-error" data-budget-error role="alert" aria-live="assertive" tabindex="-1"></p>
            <div class="budget-form-actions"><button class="budget-estimate-button" type="submit"><i class="fa-solid fa-calculator" aria-hidden="true"></i> Estimate My Budget</button></div>
            <p class="budget-estimator-disclaimer"><i class="fa-solid fa-circle-info" aria-hidden="true"></i> This tool provides a planning estimate, not a booking quotation. Actual prices depend on travel dates, availability, hotel policies, child-age policies, room arrangements, transport operators and selected services. <strong>Pricing assumptions last reviewed: August 2026.</strong></p>
        </form>
        <div class="budget-loading" data-budget-loading role="status" aria-live="polite" hidden><span class="budget-loading-icon"><i class="fa-solid fa-leaf" aria-hidden="true"></i></span><strong>Calculating accommodation, local transport, meals and experiences...</strong></div>
        <section class="budget-estimator-result" data-budget-result tabindex="-1" aria-live="polite" hidden></section>
    `;

    const mountEstimator = root => {
        const planId = root.dataset.planId;
        const plan = PLAN_DATA[planId];
        if (!plan) return;
        const queryTier = new URLSearchParams(window.location.search).get('budget');
        const preferredTier = TIER_IDS.includes(queryTier) ? queryTier : '';
        const state = {
            adults: 2,
            children: 0,
            seniors: 0,
            infants: 0,
            childAges: [],
            infantAges: [],
            month: '',
            holidayPeak: false,
            roomPreference: 'practical',
            assistance: 'none'
        };
        root.innerHTML = `<div class="container budget-estimator-container">${formMarkup(plan, state, preferredTier)}</div>`;
        const form = root.querySelector('[data-budget-form]');
        const result = root.querySelector('[data-budget-result]');
        const loading = root.querySelector('[data-budget-loading]');
        const error = root.querySelector('[data-budget-error]');
        const childAgesContainer = root.querySelector('[data-child-ages]');
        const infantAgesContainer = root.querySelector('[data-infant-ages]');
        const assistanceContainer = root.querySelector('[data-budget-assistance]');
        let latestEstimate = null;

        const syncCounts = () => {
            ['adults', 'children', 'seniors', 'infants'].forEach(type => {
                const input = form.elements[type];
                const value = clamp(Number(input.value) || 0, 0, 10);
                input.value = value;
                state[type] = value;
            });
            state.childAges = Array.from({ length: state.children }, (_, index) => state.childAges[index] ?? 7);
            state.infantAges = Array.from({ length: state.infants }, (_, index) => state.infantAges[index] ?? 1);
            renderAgeSelectors(childAgesContainer, 'child', state.childAges);
            renderAgeSelectors(infantAgesContainer, 'infant', state.infantAges);
            assistanceContainer.hidden = !state.seniors;
            if (!state.seniors) {
                state.assistance = 'none';
                form.elements.assistance.value = 'none';
            }
        };

        const readForm = () => {
            syncCounts();
            state.childAges = [...root.querySelectorAll('[data-age-type="child"]')].map(select => Number(select.value));
            state.infantAges = [...root.querySelectorAll('[data-age-type="infant"]')].map(select => Number(select.value));
            state.month = form.elements.month.value;
            state.holidayPeak = form.elements.holidayPeak.checked;
            state.roomPreference = form.elements.roomPreference.value;
            state.assistance = state.seniors ? form.elements.assistance.value : 'none';
            return { ...state, childAges: [...state.childAges], infantAges: [...state.infantAges] };
        };

        root.addEventListener('click', event => {
            const confirmButton = event.target.closest('[data-budget-confirm]');
            if (confirmButton && latestEstimate) {
                try {
                    const tierId = confirmButton.dataset.budgetConfirm;
                    const payload = createEnquiryPayload(latestEstimate, tierId);
                    sessionStorage.setItem(ENQUIRY_STORAGE_KEY, JSON.stringify(payload));
                    window.location.assign(`trip-enquiry.html?plan=${encodeURIComponent(payload.plan.id)}&tier=${encodeURIComponent(tierId)}`);
                } catch {
                    const status = result.querySelector('[data-budget-copy-status]');
                    if (status) status.textContent = 'The estimate could not be prepared. Recalculate the budget and try again.';
                }
                return;
            }
            const counter = event.target.closest('[data-budget-count]');
            if (counter) {
                const type = counter.dataset.budgetCount;
                const input = form.elements[type];
                input.value = clamp((Number(input.value) || 0) + Number(counter.dataset.delta), 0, 10);
                syncCounts();
                error.textContent = '';
                input.focus();
                return;
            }
            if (event.target.closest('[data-budget-edit]')) {
                result.hidden = true;
                form.hidden = false;
                root.querySelector('.budget-estimator-heading').hidden = false;
                form.elements.adults.focus();
                root.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });
                return;
            }
            if (event.target.closest('[data-budget-reset]')) {
                Object.assign(state, { adults: 0, children: 0, seniors: 0, infants: 0, childAges: [], infantAges: [], month: '', holidayPeak: false, roomPreference: 'practical', assistance: 'none' });
                form.reset();
                form.elements.adults.value = 0;
                form.elements.children.value = 0;
                form.elements.seniors.value = 0;
                form.elements.infants.value = 0;
                form.elements.month.value = '';
                syncCounts();
                result.hidden = true;
                form.hidden = false;
                root.querySelector('.budget-estimator-heading').hidden = false;
                error.textContent = '';
                form.elements.adults.focus();
                return;
            }
            if (event.target.closest('[data-budget-print]') && latestEstimate) {
                document.body.classList.add('budget-printing');
                window.print();
                window.setTimeout(() => document.body.classList.remove('budget-printing'), 300);
                return;
            }
            if (event.target.closest('[data-budget-copy]') && latestEstimate) {
                const status = result.querySelector('[data-budget-copy-status]');
                const text = summaryText(latestEstimate);
                const fallback = () => {
                    const textarea = document.createElement('textarea');
                    textarea.value = text;
                    textarea.setAttribute('readonly', '');
                    textarea.style.position = 'fixed';
                    textarea.style.opacity = '0';
                    document.body.appendChild(textarea);
                    textarea.select();
                    const copied = document.execCommand('copy');
                    textarea.remove();
                    return copied;
                };
                const copyPromise = navigator.clipboard?.writeText ? navigator.clipboard.writeText(text).then(() => true).catch(fallback) : Promise.resolve(fallback());
                copyPromise.then(copied => { status.textContent = copied ? 'Budget summary copied.' : 'Copy was unavailable. Use Print Budget Summary instead.'; });
            }
        });

        form.addEventListener('input', event => {
            if (event.target.matches('input[type="number"]')) syncCounts();
            if (event.target.matches('[data-age-type]')) {
                const ages = event.target.dataset.ageType === 'child' ? state.childAges : state.infantAges;
                ages[Number(event.target.dataset.ageIndex)] = Number(event.target.value);
            }
            error.textContent = '';
        });

        form.addEventListener('submit', event => {
            event.preventDefault();
            const input = readForm();
            const validation = validateInput(input);
            if (!validation.valid) {
                error.textContent = validation.errors.join(' ');
                error.focus?.();
                return;
            }
            error.textContent = '';
            form.setAttribute('aria-busy', 'true');
            form.querySelector('button[type="submit"]').disabled = true;
            form.hidden = true;
            loading.hidden = false;
            const delay = window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 720;
            window.setTimeout(() => {
                latestEstimate = calculateEstimate(planId, input);
                result.innerHTML = resultMarkup(latestEstimate, preferredTier);
                const method = result.querySelector('[data-budget-method]');
                const methodSummary = method.querySelector('summary');
                method.addEventListener('toggle', () => methodSummary.setAttribute('aria-expanded', String(method.open)));
                loading.hidden = true;
                form.hidden = true;
                form.removeAttribute('aria-busy');
                form.querySelector('button[type="submit"]').disabled = false;
                root.querySelector('.budget-estimator-heading').hidden = true;
                result.hidden = false;
                result.focus();
            }, delay);
        });

        syncCounts();
    };

    const predefinedCases = () => [
        { id: 1, planId: 'three-day', input: { adults: 1, children: 0, seniors: 0, infants: 0, month: 3, roomPreference: 'practical' } },
        { id: 2, planId: 'five-day', input: { adults: 2, children: 2, childAges: [6, 10], seniors: 0, infants: 0, month: 10, roomPreference: 'practical' } },
        { id: 3, planId: 'seven-day', input: { adults: 2, children: 0, seniors: 0, infants: 1, infantAges: [1], month: 3, roomPreference: 'practical' } },
        { id: 4, planId: 'five-day', input: { adults: 2, children: 0, seniors: 2, infants: 0, month: 10, roomPreference: 'practical', assistance: 'reduced' } },
        { id: 5, planId: 'ten-day', input: { adults: 4, children: 0, seniors: 0, infants: 0, month: 7, roomPreference: 'fewer' } },
        { id: 6, planId: 'seven-day', input: { adults: 6, children: 2, childAges: [6, 10], seniors: 0, infants: 0, month: 11, roomPreference: 'privacy' } },
        { id: 7, planId: 'student', input: { adults: 8, children: 0, seniors: 0, infants: 0, month: 7, roomPreference: 'fewer' } },
        { id: 8, planId: 'senior', input: { adults: 0, children: 0, seniors: 2, infants: 0, month: 10, roomPreference: 'seniorShared', assistance: 'private' } },
        { id: 9, planId: 'five-day', input: { adults: 2, children: 2, childAges: [6, 10], seniors: 0, infants: 0, month: 12, holidayPeak: true, roomPreference: 'practical' } }
    ];

    const runValidationTests = () => {
        const invalidCases = [
            { id: 10, input: { adults: 0, children: 2, childAges: [6, 10], seniors: 0, infants: 0, month: 3 } },
            { id: 11, input: { adults: 0, children: 0, seniors: 0, infants: 2, infantAges: [1, 2], month: 3 } },
            { id: 12, input: { adults: 10, children: 3, childAges: [6, 8, 10], seniors: 0, infants: 0, month: 3 } }
        ];
        const results = invalidCases.map(testCase => ({ id: testCase.id, passed: !validateInput({ roomPreference: 'practical', ...testCase.input }).valid }));
        return { cases: results.length, passed: results.filter(result => result.passed).length, results };
    };

    const runAllTests = () => {
        const failures = [];
        let calculations = 0;
        const coreCases = predefinedCases();
        Object.keys(PLAN_DATA).forEach(planId => {
            coreCases.slice(0, 6).concat(coreCases[8]).forEach(testCase => {
                calculations += 1;
                try {
                    const estimate = calculateEstimate(planId, testCase.input);
                    const totals = TIER_IDS.map(tierId => estimate.tiers[tierId].total);
                    TIER_IDS.forEach(tierId => {
                        const tier = estimate.tiers[tierId];
                        const sum = addRanges(Object.values(tier.ranges));
                        if (!Number.isFinite(tier.total.lower) || !Number.isFinite(tier.total.upper)) failures.push({ planId, caseId: testCase.id, issue: 'Non-finite total' });
                        if (tier.total.lower < 0 || tier.total.upper <= tier.total.lower) failures.push({ planId, caseId: testCase.id, issue: 'Invalid total range' });
                        if (sum.lower !== tier.total.lower || sum.upper !== tier.total.upper) failures.push({ planId, caseId: testCase.id, issue: 'Category sum mismatch' });
                    });
                    if (!(totals[0].lower <= totals[1].lower && totals[1].lower <= totals[2].lower)) failures.push({ planId, caseId: testCase.id, issue: 'Tier ordering failure' });
                    if (!estimate.groupSummary || !estimate.assumptions.length || !summaryText(estimate)) failures.push({ planId, caseId: testCase.id, issue: 'Incomplete print data' });
                } catch (error) {
                    failures.push({ planId, caseId: testCase.id, issue: error.message });
                }
            });
        });
        coreCases.slice(6, 8).forEach(testCase => {
            calculations += 1;
            try { calculateEstimate(testCase.planId, testCase.input); } catch (error) { failures.push({ planId: testCase.planId, caseId: testCase.id, issue: error.message }); }
        });

        const adultMeals = TIERS.comfortable.mealRate;
        if (!(infantMealWeight(1) < childMealWeight(6) && childMealWeight(6) < 1)) failures.push({ issue: 'Age meal factors are not ordered' });
        if (!(0.04 < childActivityWeight(6) && childActivityWeight(6) < 1)) failures.push({ issue: 'Age activity factors are not ordered' });
        if (adultMeals <= 0 || formatCurrency(105000) !== '\u20b91,05,000') failures.push({ issue: 'Currency formatting failure' });
        const smallVehicle = selectVehicle({ adults: 2, seniors: 0, children: 0, infants: 0 });
        const largeVehicle = selectVehicle({ adults: 8, seniors: 0, children: 2, childAges: [7, 10], infants: 0 });
        if (smallVehicle.id === largeVehicle.id || largeVehicle.capacity < 10) failures.push({ issue: 'Vehicle scaling failure' });
        const privateSmallVehicle = selectVehicle({ adults: 2, seniors: 0, children: 0, infants: 0 }, 'private');
        const wheelchairVehicle = selectVehicle({ adults: 2, seniors: 0, children: 0, infants: 0 }, 'wheelchair');
        if (privateSmallVehicle.id !== 'sedan') failures.push({ issue: 'Private small group was unnecessarily upgraded from a sedan' });
        if (wheelchairVehicle.capacity <= smallVehicle.capacity) failures.push({ issue: 'Wheelchair space did not upgrade vehicle capacity' });
        const smallGroup = calculateEstimate('five-day', { adults: 1, seniors: 0, children: 0, infants: 0, month: 3, roomPreference: 'practical' });
        const largerGroup = calculateEstimate('five-day', { adults: 4, seniors: 0, children: 2, childAges: [6, 10], infants: 0, month: 3, roomPreference: 'practical' });
        if (largerGroup.tiers.comfortable.total.lower <= smallGroup.tiers.comfortable.total.lower) failures.push({ issue: 'Group totals do not scale' });

        const adultBaseline = calculateEstimate('three-day', { adults: 2, seniors: 0, children: 0, infants: 0, month: 3, roomPreference: 'practical' });
        const infantGroup = calculateEstimate('three-day', { adults: 2, seniors: 0, children: 0, infants: 1, infantAges: [1], month: 3, roomPreference: 'practical' });
        const childGroup = calculateEstimate('three-day', { adults: 2, seniors: 0, children: 1, childAges: [6], infants: 0, month: 3, roomPreference: 'practical' });
        const adultGroup = calculateEstimate('three-day', { adults: 3, seniors: 0, children: 0, infants: 0, month: 3, roomPreference: 'practical' });
        if (!(infantGroup.tiers.value.ranges.meals.lower < childGroup.tiers.value.ranges.meals.lower
            && childGroup.tiers.value.ranges.meals.lower < adultGroup.tiers.value.ranges.meals.lower)) failures.push({ issue: 'Age-sensitive meal totals are not ordered' });
        if (!(infantGroup.tiers.value.ranges.experiences.lower < childGroup.tiers.value.ranges.experiences.lower
            && childGroup.tiers.value.ranges.experiences.lower < adultGroup.tiers.value.ranges.experiences.lower)) failures.push({ issue: 'Age-sensitive activity totals are not ordered' });
        if (infantGroup.tiers.value.ranges.accommodation.lower !== adultBaseline.tiers.value.ranges.accommodation.lower) failures.push({ issue: 'Infant incorrectly increased room cost' });
        const youngChild = calculateEstimate('five-day', { adults: 2, seniors: 0, children: 1, childAges: [3], infants: 0, month: 3, roomPreference: 'practical' });
        const olderChild = calculateEstimate('five-day', { adults: 2, seniors: 0, children: 1, childAges: [11], infants: 0, month: 3, roomPreference: 'practical' });
        if (olderChild.tiers.comfortable.total.lower <= youngChild.tiers.comfortable.total.lower) failures.push({ issue: 'Child age does not affect total' });
        const monsoon = calculateEstimate('five-day', { adults: 2, seniors: 0, children: 0, infants: 0, month: 7, roomPreference: 'practical' });
        const peak = calculateEstimate('five-day', { adults: 2, seniors: 0, children: 0, infants: 0, month: 12, roomPreference: 'practical' });
        const holiday = calculateEstimate('five-day', { adults: 2, seniors: 0, children: 0, infants: 0, month: 12, holidayPeak: true, roomPreference: 'practical' });
        if (!(monsoon.tiers.comfortable.total.lower < peak.tiers.comfortable.total.lower
            && peak.tiers.comfortable.total.lower < holiday.tiers.comfortable.total.lower)) failures.push({ issue: 'Seasonal totals are not ordered' });
        const sharedSeniorRooms = calculateRooms({ adults: 0, seniors: 2, children: 0, infants: 0 }, 'seniorShared', 'senior');
        const individualSeniorRooms = calculateRooms({ adults: 0, seniors: 2, children: 0, infants: 0 }, 'seniorIndividual', 'senior');
        if (sharedSeniorRooms.rooms !== 1) failures.push({ issue: 'Shared senior room preference did not use one room' });
        if (individualSeniorRooms.rooms !== 2) failures.push({ issue: 'Individual senior room preference did not use two rooms' });
        const extraBedEstimate = calculateEstimate('five-day', { adults: 2, seniors: 0, children: 1, childAges: [7], infants: 0, month: 3, roomPreference: 'practical' });
        const fullRoomChildEstimate = calculateEstimate('five-day', { adults: 2, seniors: 0, children: 1, childAges: [11], infants: 0, month: 3, roomPreference: 'practical' });
        if (!extraBedEstimate.rooms.extraBeds || extraBedEstimate.tiers.value.ranges.childExtraBeds.lower <= 0) failures.push({ issue: 'Child extra-bed charge was not included' });
        if (fullRoomChildEstimate.rooms.childDrivenRooms && fullRoomChildEstimate.tiers.value.ranges.childExtraBeds.lower > 0) failures.push({ issue: 'Child room and extra bed were double-counted' });
        if (cruiseLabel(PLAN_DATA['seven-day']) !== 'Canoe experience' || cruiseLabel(PLAN_DATA['three-day']) !== 'Overnight houseboat' || cruiseLabel(PLAN_DATA['ten-day']) !== 'Day cruise') failures.push({ issue: 'Plan-specific water-experience labels are incorrect' });
        if (Object.values(PLAN_DATA).some(plan => !plan.name || !plan.route || !plan.pageUrl || !plan.days || !plan.nights || !plan.routeIntensity || !plan.transportUnits || !plan.activityUnits || !plan.paidActivities?.length || !plan.accessibilityRelevant)) failures.push({ issue: 'Incomplete plan pricing data' });

        let enquiryCases = 0;
        Object.keys(PLAN_DATA).forEach(planId => {
            const input = planId === 'student'
                ? { adults: 4, seniors: 0, children: 0, infants: 0, month: 8, roomPreference: 'fewer' }
                : planId === 'senior'
                    ? { adults: 0, seniors: 2, children: 0, infants: 0, month: 10, roomPreference: 'seniorShared', assistance: 'private' }
                    : { adults: 2, seniors: 0, children: 2, childAges: [6, 10], infants: 0, month: 11, roomPreference: 'practical' };
            const estimate = calculateEstimate(planId, input);
            TIER_IDS.forEach(tierId => {
                enquiryCases += 1;
                try {
                    const payload = createEnquiryPayload(estimate, tierId);
                    if (payload.plan.id !== planId || payload.selectedBudget.tierId !== tierId) failures.push({ planId, tierId, issue: 'Enquiry selection mismatch' });
                    if (payload.selectedBudget.formattedEstimateRange !== formatRange(estimate.tiers[tierId].total)) failures.push({ planId, tierId, issue: 'Enquiry total mismatch' });
                    if (payload.travellers.totalTravellerCount !== estimate.totalTravellers || !payload.plan.budgetSectionReturnUrl.endsWith(`#budget`)) failures.push({ planId, tierId, issue: 'Incomplete enquiry transfer' });
                } catch (error) {
                    failures.push({ planId, tierId, issue: error.message });
                }
            });
        });

        const validation = runValidationTests();
        validation.results.filter(result => !result.passed).forEach(result => failures.push({ caseId: result.id, issue: 'Validation case was not blocked' }));
        return { calculations, enquiryCases, validationCases: validation.cases, invariantChecks: 19, passed: calculations + enquiryCases + validation.cases + 19 - failures.length, failures };
    };

    const testingApi = {
        plans: PLAN_DATA,
        tiers: TIERS,
        enquiryStorageKey: ENQUIRY_STORAGE_KEY,
        calculate: calculateEstimate,
        createEnquiryPayload,
        calculateRooms,
        selectVehicle,
        cruiseLabel,
        seasonForMonth: getSeason,
        formatCurrency,
        validate: validateInput,
        runValidationTests,
        runPredefinedTests: () => predefinedCases().map(testCase => ({ id: testCase.id, result: calculateEstimate(testCase.planId, testCase.input) })),
        runAllTests
    };
    window.__keralaBudgetEstimator = testingApi;

    if (new URLSearchParams(window.location.search).get('qa') === 'budget') {
        const qaResult = runAllTests();
        document.documentElement.dataset.budgetEstimatorQa = JSON.stringify({
            ...qaResult,
            failures: qaResult.failures.slice(0, 20)
        });
    }

    const initialise = () => document.querySelectorAll('[data-budget-estimator]').forEach(mountEstimator);
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise);
    else initialise();
})();
