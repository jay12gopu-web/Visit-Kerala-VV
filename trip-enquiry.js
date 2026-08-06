(() => {
    const ESTIMATE_STORAGE_KEY = 'visitKeralaSelectedEstimate';
    const PENDING_STORAGE_KEY = 'visitKeralaEnquiryPending';
    const PREFERENCES_STORAGE_KEY = 'visitKeralaTripPreferences';
    const PLAN_OPTIONS = {
        'three-day': { name: '3-Day Kochi + Backwaters', pageUrl: 'plan-3-days.html' },
        'five-day': { name: '5-Day Hills + Houseboat', pageUrl: 'plan-5-days.html' },
        'seven-day': { name: '7-Day Classic + Offbeat Kerala', pageUrl: 'plan-7-days.html' },
        'ten-day': { name: '10-Day Kerala Deep Dive', pageUrl: 'plan-10-days.html' },
        student: { name: '5-Day Kerala Student Plan', pageUrl: 'plan-5-days-students.html' },
        senior: { name: '5-Day Easy-Paced Senior Plan', pageUrl: 'plan-5-days-seniors.html' }
    };
    const TIER_OPTIONS = { value: 'Value', comfortable: 'Comfortable', premium: 'Premium' };
    const BREAKDOWN_ROWS = [
        ['accommodation', 'Accommodation'],
        ['childExtraBeds', 'Child extra beds'],
        ['localTransport', 'Local transport'],
        ['meals', 'Meals'],
        ['experiencesAndEntryFees', 'Experiences and entry fees'],
        ['waterExperience', 'Houseboat, cruise or canoe'],
        ['accessibilityAllowance', 'Accessibility allowance'],
        ['taxesAndContingency', 'Taxes and contingency'],
        ['finalTotal', 'Total estimated range']
    ];

    const safeJsonRead = (storage, key) => {
        try { return JSON.parse(storage.getItem(key)); } catch { return null; }
    };
    const isCount = value => Number.isInteger(value) && value >= 0 && value <= 12;
    const isRange = range => range
        && Number.isFinite(range.minimum)
        && Number.isFinite(range.maximum)
        && range.minimum >= 0
        && range.maximum >= range.minimum
        && typeof range.formatted === 'string'
        && range.formatted.length <= 50;
    const validLocalPlanUrl = value => typeof value === 'string' && /^plan-[a-z0-9-]+\.html(?:\?[^#]*)?(?:#budget)?$/i.test(value);

    const validateEstimatePayload = payload => {
        if (!payload || payload.version !== 1 || !payload.plan || !payload.selectedBudget) return false;
        const knownPlan = PLAN_OPTIONS[payload.plan.id];
        const knownTier = TIER_OPTIONS[payload.selectedBudget.tierId];
        if (!knownPlan || !knownTier || payload.plan.name !== knownPlan.name || payload.selectedBudget.tierName !== knownTier) return false;
        if (!validLocalPlanUrl(payload.plan.itineraryPageUrl) || !validLocalPlanUrl(payload.plan.budgetSectionReturnUrl)) return false;
        if (!Number.isInteger(payload.plan.days) || payload.plan.days < 1 || payload.plan.days > 30) return false;
        if (!Number.isInteger(payload.plan.nights) || payload.plan.nights < 0 || payload.plan.nights > 29) return false;
        if (typeof payload.plan.route !== 'string' || !payload.plan.route.trim() || payload.plan.route.length > 400) return false;

        const travellers = payload.travellers || {};
        if (![travellers.adults, travellers.seniorTravellers, travellers.children, travellers.infants, travellers.totalTravellerCount].every(isCount)) return false;
        if (travellers.adults + travellers.seniorTravellers + travellers.children + travellers.infants !== travellers.totalTravellerCount || travellers.totalTravellerCount < 1) return false;
        if (!Array.isArray(travellers.childAges) || travellers.childAges.length !== travellers.children || travellers.childAges.some(age => !Number.isInteger(age) || age < 3 || age > 11)) return false;
        if (!Array.isArray(travellers.infantAges) || travellers.infantAges.length !== travellers.infants || travellers.infantAges.some(age => !Number.isInteger(age) || age < 0 || age > 2)) return false;

        const accommodation = payload.accommodation || {};
        if (![accommodation.calculatedHotelRooms, accommodation.calculatedExtraBeds, accommodation.houseboatCabins, accommodation.hotelNights].every(isCount)) return false;
        if (typeof accommodation.roomPreference !== 'string' || accommodation.roomPreference.length > 120) return false;
        const transport = payload.transportAndAssistance || {};
        if (typeof transport.recommendedVehicle !== 'string' || !transport.recommendedVehicle || transport.recommendedVehicle.length > 100) return false;
        if (!Number.isFinite(transport.passengerLoadAssumption) || transport.passengerLoadAssumption < 0) return false;
        if (typeof transport.assistanceRequirement !== 'string' || transport.assistanceRequirement.length > 120) return false;
        if (typeof payload.waterExperience?.label !== 'string' || payload.waterExperience.label.length > 100) return false;
        if (typeof payload.travelDetails?.selectedTravelMonth !== 'string' || !Number.isFinite(payload.travelDetails?.seasonalMultiplier) || payload.travelDetails.seasonalMultiplier <= 0) return false;
        if (!Array.isArray(payload.assumptions) || !payload.assumptions.length || payload.assumptions.some(item => typeof item !== 'string' || item.length > 300)) return false;
        if (typeof payload.selectedBudget.pricingAssumptionsReviewDate !== 'string' || !payload.selectedBudget.pricingAssumptionsReviewDate) return false;
        if (!BREAKDOWN_ROWS.every(([key]) => isRange(payload.estimateBreakdown?.[key]))) return false;
        return payload.selectedBudget.estimatedMinimumAmount === payload.estimateBreakdown.finalTotal.minimum
            && payload.selectedBudget.estimatedMaximumAmount === payload.estimateBreakdown.finalTotal.maximum
            && payload.selectedBudget.formattedEstimateRange === payload.estimateBreakdown.finalTotal.formatted;
    };

    const travellerSummary = travellers => {
        const parts = [];
        if (travellers.adults) parts.push(`${travellers.adults} adult${travellers.adults === 1 ? '' : 's'}`);
        if (travellers.seniorTravellers) parts.push(`${travellers.seniorTravellers} senior traveller${travellers.seniorTravellers === 1 ? '' : 's'}`);
        if (travellers.children) parts.push(`${travellers.children} ${travellers.children === 1 ? 'child' : 'children'}`);
        if (travellers.infants) parts.push(`${travellers.infants} infant${travellers.infants === 1 ? '' : 's'}`);
        return parts.join(', ');
    };

    const setText = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.textContent = String(value);
    };

    const buildEmailFields = (payload, contact, submittedAt = new Date()) => {
        const travellers = payload.travellers;
        const accommodation = payload.accommodation;
        const transport = payload.transportAndAssistance;
        const travel = payload.travelDetails;
        const breakdown = payload.estimateBreakdown;
        return {
            'Full Name': contact.fullName,
            'Email Address': contact.email,
            'Phone Number': contact.phone,
            'Departure City': contact.departureCity || 'Not provided',
            'Additional Message': contact.message || 'No additional message',
            'Selected Plan': payload.plan.name,
            'Duration': payload.plan.duration,
            'Main Route': payload.plan.route,
            'Itinerary Page': new URL(payload.plan.itineraryPageUrl, window.location.href).href,
            'Budget Return Page': new URL(payload.plan.budgetSectionReturnUrl, window.location.href).href,
            'Selected Comfort Tier': payload.selectedBudget.tierName,
            'Estimated Minimum (INR)': payload.selectedBudget.estimatedMinimumAmount,
            'Estimated Maximum (INR)': payload.selectedBudget.estimatedMaximumAmount,
            'Estimated Group Budget': payload.selectedBudget.formattedEstimateRange,
            'Travel Month': travel.selectedTravelMonth,
            'Peak-period Selection': travel.holidayOrPeakPeriodSelected ? 'Yes' : 'No',
            'Season': travel.seasonLabel,
            'Seasonal Multiplier': `${Number(travel.seasonalMultiplier).toFixed(2)}x`,
            'Adults': travellers.adults,
            'Senior Travellers': travellers.seniorTravellers,
            'Children': travellers.children,
            'Infants': travellers.infants,
            'Child Ages': travellers.childAges.length ? travellers.childAges.join(', ') : 'None',
            'Infant Ages': travellers.infantAges.length ? travellers.infantAges.join(', ') : 'None',
            'Total Travellers': travellers.totalTravellerCount,
            'Room Preference': accommodation.roomPreference,
            'Hotel Rooms': accommodation.calculatedHotelRooms,
            'Child Extra Beds': accommodation.calculatedExtraBeds,
            'Houseboat Cabins': accommodation.houseboatCabins,
            'Hotel Nights': accommodation.hotelNights,
            'Assistance Requirement': transport.assistanceRequirement,
            'Private Transport Required': transport.privateTransportRequired ? 'Yes' : 'No',
            'Recommended Vehicle': transport.recommendedVehicle,
            'Passenger-load Assumption': transport.passengerLoadAssumption,
            'Water-experience Type': payload.waterExperience.label,
            'Accommodation Range': breakdown.accommodation.formatted,
            'Extra-bed Range': breakdown.childExtraBeds.formatted,
            'Local Transport Range': breakdown.localTransport.formatted,
            'Meals Range': breakdown.meals.formatted,
            'Experiences and Entry Fees': breakdown.experiencesAndEntryFees.formatted,
            'Water-experience Range': breakdown.waterExperience.formatted,
            'Accessibility Allowance': breakdown.accessibilityAllowance.formatted,
            'Taxes and Contingency': breakdown.taxesAndContingency.formatted,
            'Final Estimate Range': breakdown.finalTotal.formatted,
            'Submitted Date and Time': submittedAt.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
            'Source Page URL': window.location.href,
            'Pricing Assumptions Reviewed': payload.selectedBudget.pricingAssumptionsReviewDate,
            'Calculation Assumptions': payload.assumptions.join(' | '),
            'Enquiry Status': 'Trip enquiry only - not a confirmed booking; no payment collected.'
        };
    };

    const initialiseSuccessPage = () => {
        const successPage = document.querySelector('[data-enquiry-success]');
        if (!successPage) return false;
        const parameters = new URLSearchParams(window.location.search);
        const providerRedirect = /^https:\/\/formsubmit\.co(?:\/|$)/i.test(document.referrer);
        const confirmed = parameters.get('submitted') === '1'
            && sessionStorage.getItem(PENDING_STORAGE_KEY) === '1'
            && providerRedirect;
        if (confirmed) {
            sessionStorage.removeItem(ESTIMATE_STORAGE_KEY);
            sessionStorage.removeItem(PENDING_STORAGE_KEY);
            document.title = 'Trip Enquiry Sent | Visit Kerala';
            setText('enquiry-success-kicker', 'Enquiry Received');
            setText('enquiry-success-title', 'Trip Enquiry Sent');
            setText('enquiry-success-message', 'Thank you. Your Kerala trip enquiry has been sent for review. This is not a confirmed booking, and no payment has been collected.');
        } else {
            setText('enquiry-success-kicker', 'No Submission Detected');
            setText('enquiry-success-title', 'No recent enquiry found');
            setText('enquiry-success-message', 'This status page only confirms enquiries sent through the Visit Kerala estimate form. Choose a plan and calculate a budget to begin.');
        }
        return true;
    };

    const initialiseEnquiryPage = () => {
        const form = document.getElementById('trip-enquiry-form');
        if (!form) return;
        const planSelect = document.getElementById('enquiry-plan');
        const tierSelect = document.getElementById('enquiry-tier');
        const submitButton = document.getElementById('enquiry-submit');
        const submitLabel = submitButton.querySelector('span');
        const contactFields = document.getElementById('enquiry-contact-fields');
        const status = document.getElementById('enquiry-form-status');
        const warning = document.getElementById('enquiry-outdated-warning');
        const emptyState = document.getElementById('enquiry-empty-state');
        const summaryContent = document.getElementById('enquiry-summary-content');
        const hiddenFields = document.getElementById('enquiry-hidden-fields');
        const message = document.getElementById('enquiry-message');
        const messageCount = document.getElementById('enquiry-message-count');
        const parameters = new URLSearchParams(window.location.search);
        const storedPayload = safeJsonRead(sessionStorage, ESTIMATE_STORAGE_KEY);
        const payload = validateEstimatePayload(storedPayload) ? storedPayload : null;
        let submitting = false;

        const updateRecalculateLink = () => {
            const plan = PLAN_OPTIONS[planSelect.value];
            const tier = TIER_OPTIONS[tierSelect.value] ? tierSelect.value : 'comfortable';
            const href = plan ? `${plan.pageUrl}?budget=${tier}#budget` : 'itineraries.html';
            document.getElementById('enquiry-recalculate-link').href = href;
            document.getElementById('enquiry-change-link').href = href;
        };

        const updateSelectionState = () => {
            updateRecalculateLink();
            const current = Boolean(payload) && planSelect.value === payload.plan.id && tierSelect.value === payload.selectedBudget.tierId;
            warning.hidden = current || !payload;
            submitButton.disabled = !current || submitting;
            if (payload && !current) status.textContent = 'Restore the original plan and comfort tier, or recalculate the budget before sending.';
            else if (!submitting) status.textContent = '';
            return current;
        };

        const showPayload = () => {
            planSelect.value = payload.plan.id;
            tierSelect.value = payload.selectedBudget.tierId;
            setText('summary-plan', payload.plan.name);
            setText('summary-duration', `${payload.plan.days} days / ${payload.plan.nights} nights`);
            setText('summary-tier', payload.selectedBudget.tierName);
            setText('summary-route', payload.plan.route);
            setText('summary-budget', payload.selectedBudget.formattedEstimateRange);
            setText('summary-month', `${payload.travelDetails.selectedTravelMonth} - ${payload.travelDetails.seasonLabel}`);
            setText('summary-travellers', `${payload.travellers.totalTravellerCount} (${travellerSummary(payload.travellers)})`);
            setText('summary-rooms', `${payload.accommodation.calculatedHotelRooms} hotel room${payload.accommodation.calculatedHotelRooms === 1 ? '' : 's'}`);
            setText('summary-extra-beds', payload.accommodation.calculatedExtraBeds);
            setText('summary-vehicle', payload.transportAndAssistance.recommendedVehicle);
            setText('summary-water', payload.waterExperience.label);
            setText('summary-assistance', payload.transportAndAssistance.assistanceRequirement);
            setText('breakdown-room-preference', payload.accommodation.roomPreference);
            setText('breakdown-cabins', payload.accommodation.houseboatCabins);
            setText('breakdown-passenger-load', `${payload.transportAndAssistance.passengerLoadAssumption} traveller-space units`);
            setText('breakdown-season', payload.travelDetails.seasonLabel);
            setText('breakdown-review-date', payload.selectedBudget.pricingAssumptionsReviewDate);
            const breakdownList = document.getElementById('enquiry-breakdown-list');
            breakdownList.replaceChildren(...BREAKDOWN_ROWS.map(([key, label]) => {
                const row = document.createElement('div');
                const term = document.createElement('dt');
                const value = document.createElement('dd');
                term.textContent = label;
                value.textContent = payload.estimateBreakdown[key].formatted;
                if (key === 'finalTotal') row.className = 'total';
                row.append(term, value);
                return row;
            }));
            document.getElementById('enquiry-subject').value = `New Visit Kerala Trip Enquiry - ${payload.plan.name} - ${payload.selectedBudget.tierName}`;
            emptyState.hidden = true;
            summaryContent.hidden = false;
            contactFields.disabled = false;
            const preferences = safeJsonRead(localStorage, PREFERENCES_STORAGE_KEY) || {};
            const nameInput = document.getElementById('enquiry-name');
            const cityInput = document.getElementById('enquiry-city');
            if (!nameInput.value && typeof preferences.name === 'string') nameInput.value = preferences.name.slice(0, 80);
            if (!cityInput.value && typeof preferences.city === 'string') cityInput.value = preferences.city.slice(0, 80);
            updateSelectionState();
        };

        const showMissingEstimate = () => {
            const queryPlan = PLAN_OPTIONS[parameters.get('plan')] ? parameters.get('plan') : '';
            const queryTier = TIER_OPTIONS[parameters.get('tier')] ? parameters.get('tier') : '';
            planSelect.value = queryPlan;
            tierSelect.value = queryTier;
            emptyState.hidden = false;
            summaryContent.hidden = true;
            contactFields.disabled = true;
            submitButton.disabled = true;
            status.textContent = 'A valid personalised estimate is required before an enquiry can be sent.';
            updateRecalculateLink();
        };

        const clearFieldError = input => {
            input.removeAttribute('aria-invalid');
            const error = document.getElementById(`${input.id}-error`);
            if (error) error.textContent = '';
        };
        const setFieldError = (input, text) => {
            input.setAttribute('aria-invalid', 'true');
            const error = document.getElementById(`${input.id}-error`);
            if (error) error.textContent = text;
        };
        const validateContactForm = () => {
            const name = document.getElementById('enquiry-name');
            const email = document.getElementById('enquiry-email');
            const phone = document.getElementById('enquiry-phone');
            const city = document.getElementById('enquiry-city');
            const inputs = [name, email, phone, city, message];
            inputs.forEach(clearFieldError);
            let firstInvalid = null;
            const invalid = (input, text) => { setFieldError(input, text); if (!firstInvalid) firstInvalid = input; };
            if (name.value.trim().length < 2 || name.value.trim().length > 80) invalid(name, 'Enter a full name between 2 and 80 characters.');
            if (!email.value.trim() || !email.checkValidity()) invalid(email, 'Enter a valid email address.');
            const phoneDigits = phone.value.replace(/\D/g, '');
            if (phoneDigits.length < 7 || phoneDigits.length > 15) invalid(phone, 'Enter a phone number containing 7 to 15 digits.');
            if (city.value.length > 80) invalid(city, 'Keep the departure city under 80 characters.');
            if (message.value.length > 1000) invalid(message, 'Keep the additional message under 1,000 characters.');
            if (!payload || !validateEstimatePayload(payload) || !updateSelectionState()) {
                status.textContent = 'The selected estimate is missing or outdated. Recalculate it before sending.';
                if (!firstInvalid) firstInvalid = planSelect;
            }
            firstInvalid?.focus();
            return !firstInvalid;
        };

        const contactValues = () => ({
            fullName: document.getElementById('enquiry-name').value.trim(),
            email: document.getElementById('enquiry-email').value.trim(),
            phone: document.getElementById('enquiry-phone').value.trim(),
            departureCity: document.getElementById('enquiry-city').value.trim(),
            message: message.value.trim()
        });

        const populateHiddenFields = contact => {
            hiddenFields.replaceChildren();
            const fields = buildEmailFields(payload, contact);
            Object.entries(fields).forEach(([name, value]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = name;
                input.value = String(value);
                hiddenFields.append(input);
            });
        };

        planSelect.addEventListener('change', updateSelectionState);
        tierSelect.addEventListener('change', updateSelectionState);
        message.addEventListener('input', () => {
            messageCount.textContent = `${message.value.length} / 1000`;
            clearFieldError(message);
        });
        form.querySelectorAll('input, textarea').forEach(input => input.addEventListener('input', () => clearFieldError(input)));
        document.getElementById('enquiry-breakdown').addEventListener('toggle', event => {
            event.currentTarget.querySelector('summary').setAttribute('aria-expanded', String(event.currentTarget.open));
        });

        form.addEventListener('submit', event => {
            if (submitting) {
                event.preventDefault();
                return;
            }
            if (!validateContactForm()) {
                event.preventDefault();
                return;
            }
            submitting = true;
            populateHiddenFields(contactValues());
            submitButton.disabled = true;
            submitButton.setAttribute('aria-busy', 'true');
            submitLabel.textContent = 'Sending Enquiry…';
            status.textContent = 'Sending your trip enquiry…';
            sessionStorage.setItem(PENDING_STORAGE_KEY, '1');
        });

        if (payload) showPayload(); else showMissingEstimate();
        window.__keralaTripEnquiry = { validateEstimatePayload, buildEmailFields, payload, updateSelectionState };
    };

    const initialise = () => {
        if (initialiseSuccessPage()) return;
        initialiseEnquiryPage();
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initialise);
    else initialise();
})();
