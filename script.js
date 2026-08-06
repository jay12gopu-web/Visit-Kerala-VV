document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Dynamic Glassmorphism Navbar State Handler
    // ==========================================
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ==========================================
    // 2. Mobile Hamburger Navigation Overlay Toggle
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('mobile-active');
        // Toggle Icon state between bars and X close marker
        const icon = mobileMenuBtn.querySelector('i');
        if(icon.classList.contains('fa-bars')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile drawer when clicking structural menu landing points
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('mobile-active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // ==========================================
    // 3. Apple/Singapore-Style Interactive Itinerary Tabs
    // ==========================================
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active states from all buttons & views
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // Set current target active indicators
            button.classList.add('active');
            const targetedTabId = button.getAttribute('data-tab');
            document.getElementById(targetedTabId).classList.add('active');
        });
    });

    // ==========================================
    // 4. Smooth Intersection Observer Scroll Reveal 
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Animate once for performance
            }
        });
    }, {
        threshold: 0.15, // Trigger when 15% of the element is visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // ==========================================
    // 5. High-Performance Animated Counters (Statistics)
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    const statsSection = document.getElementById('stats');
    let countersStarted = false;

    const runCounters = () => {
        counters.forEach(counter => {
            counter.innerText = '0';
            const target = +counter.getAttribute('data-target');
            const speed = target / 60; // Adjust value divisor to scale execution pace
            
            const updateCounter = () => {
                const currentVal = +counter.innerText;
                if(currentVal < target) {
                    counter.innerText = Math.ceil(currentVal + speed);
                    setTimeout(updateCounter, 25);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    };

    // Trigger calculation sequence only when stats wrap passes visible boundaries
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting && !countersStarted) {
                runCounters();
                countersStarted = true;
            }
        });
    }, { threshold: 0.4 });

    if(statsSection) {
        statsObserver.observe(statsSection);
    }

    // Keep long vacation plans easy to navigate and orient within.
    const planSectionNav = document.querySelector('.plan-section-nav');

    if (planSectionNav) {
        const planSections = [
            ['overview', document.querySelector('.route-overview')?.closest('section')],
            ['day-by-day', document.querySelector('.plan-day-list')?.closest('section')],
            ['budget', document.querySelector('.trip-budget-section')],
            ['stays', document.querySelector('.stay-options-section')],
            ['brochure', document.querySelector('.brochure-band')]
        ].filter(([, section]) => section);
        const planNavLinks = [...planSectionNav.querySelectorAll('a')];

        planSections.forEach(([id, section]) => {
            section.id = id;
        });

        const setActivePlanSection = (id) => {
            planNavLinks.forEach(link => {
                const isActive = link.getAttribute('href') === `#${id}`;
                link.classList.toggle('active', isActive);
                if (isActive) {
                    link.setAttribute('aria-current', 'location');
                } else {
                    link.removeAttribute('aria-current');
                }
            });
        };

        let planNavTicking = false;
        const updatePlanSection = () => {
            const marker = window.scrollY + 190;
            let currentSection = planSections[0][0];

            planSections.forEach(([id, section]) => {
                if (section.offsetTop <= marker) currentSection = id;
            });

            setActivePlanSection(currentSection);
            planNavTicking = false;
        };

        window.addEventListener('scroll', () => {
            if (!planNavTicking) {
                window.requestAnimationFrame(updatePlanSection);
                planNavTicking = true;
            }
        }, { passive: true });

        planNavLinks.forEach(link => {
            link.addEventListener('click', () => setActivePlanSection(link.getAttribute('href').slice(1)));
        });

        updatePlanSection();
    }

    // Expandable day schedules keep the overview clean while making every stop actionable.
    const planScheduleData = {
        'plan-3-days.html': [
            {
                place: 'Fort Kochi and Mattancherry',
                time: '2:00 PM-9:00 PM',
                transfer: 'Airport 1.5-2 hr; Ernakulam 35-50 min',
                stay: 'Fort Kochi',
                meals: 'Dinner; add a cafe stop if arriving early',
                summary: 'Keep arrival day walkable and flexible. The heritage quarter is easiest to explore after checking in and leaving the luggage behind.',
                schedule: [['2:00 PM', 'Hotel check-in and a short rest.'], ['3:30 PM', 'Walk St. Francis Church, the old streets, and the Chinese fishing-net waterfront.'], ['5:30 PM', 'Continue to Mattancherry or pause for sunset by the harbour.'], ['7:00 PM', 'Attend a pre-booked Kathakali performance, then have a Kerala-style dinner.']],
                note: 'If arrival is after 4:00 PM, keep Mattancherry for another visit and prioritise the waterfront plus the cultural show.'
            },
            {
                place: 'Kochi to Alappuzha backwaters',
                time: '8:00 AM-9:00 PM',
                transfer: '1.5-2.5 hr by road, traffic dependent',
                stay: 'Overnight houseboat, Alappuzha',
                meals: 'Breakfast, houseboat lunch, tea and dinner',
                summary: 'Leave Kochi after breakfast so the road transfer does not eat into the cruise. Confirm the jetty and boarding time with the operator one day earlier.',
                schedule: [['8:00 AM', 'Breakfast, checkout and depart from Kochi.'], ['11:30 AM', 'Reach the boarding jetty and complete houseboat check-in.'], ['1:00 PM', 'Lunch while cruising canals, paddy fields and village stretches.'], ['4:00 PM', 'Tea, photos and a quieter backwater stretch before sunset.'], ['8:00 PM', 'Dinner on board and overnight in the houseboat.']],
                note: 'Boarding points and cruise routes vary by operator. Keep a small overnight bag ready because large luggage can be awkward inside some boats.'
            },
            {
                place: 'Alappuzha to Kochi',
                time: '7:00 AM onward',
                transfer: '1.5-2.5 hr to Kochi; add airport buffer',
                stay: 'Departure day; Kochi only if extending',
                meals: 'Houseboat breakfast and lunch in Kochi',
                summary: 'Use the morning cruise as the final slow experience, then return to Kochi with enough margin for traffic and departure formalities.',
                schedule: [['7:00 AM', 'Wake on the backwaters and have breakfast on board.'], ['9:00 AM', 'Disembark, collect luggage and meet the driver.'], ['11:30 AM', 'Reach Kochi for lunch, crafts or spice shopping if time permits.'], ['3:00 PM', 'Begin the airport or railway-station transfer based on departure time.']],
                note: 'For a flight, keep a generous road and airport buffer. Skip shopping when the departure window is tight.'
            }
        ],
        'plan-5-days.html': [
            {
                place: 'Fort Kochi and Mattancherry',
                time: '2:00 PM-9:00 PM',
                transfer: 'Airport 1.5-2 hr; Ernakulam 35-50 min',
                stay: 'Fort Kochi',
                meals: 'Dinner and an optional cafe stop',
                summary: 'A light first day leaves room for delays while still giving you a proper introduction to Kochi.',
                schedule: [['2:00 PM', 'Check in and rest after the journey.'], ['4:00 PM', 'Explore Fort Kochi lanes, St. Francis Church and the waterfront.'], ['6:00 PM', 'Watch sunset near the fishing nets or browse local galleries.'], ['7:30 PM', 'Choose Kathakali or a relaxed local dinner.']],
                note: 'Late arrival? Do only the waterfront and dinner, then start the Munnar drive early the next morning.'
            },
            {
                place: 'Kochi to Munnar',
                time: '7:30 AM-7:00 PM',
                transfer: '4-5.5 hr uphill with scenic stops',
                stay: 'Munnar',
                meals: 'Breakfast, road lunch and dinner',
                summary: 'Treat the drive as part of the experience. Waterfalls, spice stalls and viewpoints can make the transfer longer than the map suggests.',
                schedule: [['7:30 AM', 'Breakfast, checkout and start the hill drive.'], ['10:30 AM', 'Short waterfall or viewpoint stop when weather and parking allow.'], ['1:00 PM', 'Lunch en route, then continue into tea country.'], ['3:30 PM', 'Check in and rest.'], ['5:00 PM', 'Take a short tea-estate or town walk before dinner.']],
                note: 'Hill roads are winding. Carry water and motion-sickness medication if needed, and avoid stacking too many stops into the transfer.'
            },
            {
                place: 'Munnar to Thekkady and Periyar',
                time: '8:00 AM-7:30 PM',
                transfer: '3-4.5 hr through plantation roads',
                stay: 'Thekkady',
                meals: 'Breakfast, lunch and dinner',
                summary: 'Use the morning for one final Munnar view, then continue to Thekkady for spice country and a pre-booked nature experience.',
                schedule: [['8:00 AM', 'Breakfast and a short tea-country viewpoint stop.'], ['10:30 AM', 'Depart for Thekkady through cardamom and plantation landscapes.'], ['2:00 PM', 'Lunch and hotel check-in.'], ['4:00 PM', 'Guided spice-garden visit or another locally available activity.'], ['7:00 PM', 'Dinner and an early night before the backwater transfer.']],
                note: 'Periyar activities have separate reporting times and availability. Confirm the chosen activity before leaving Munnar.'
            },
            {
                place: 'Thekkady to Alappuzha',
                time: '7:00 AM-9:00 PM',
                transfer: '4-5.5 hr downhill to the backwaters',
                stay: 'Overnight houseboat, Alappuzha',
                meals: 'Breakfast, houseboat lunch, tea and dinner',
                summary: 'This is an early-start transfer day. Reaching the jetty around midday protects the best part of the houseboat cruise.',
                schedule: [['7:00 AM', 'Breakfast, checkout and depart Thekkady.'], ['11:30 AM', 'Reach Alappuzha and complete houseboat boarding.'], ['1:00 PM', 'Lunch as the boat enters quieter canals.'], ['4:30 PM', 'Tea and sunset cruise.'], ['8:00 PM', 'Dinner and overnight on the water.']],
                note: 'Confirm the exact jetty, boat contact and meal preferences in advance. Carry cash for small waterside purchases.'
            },
            {
                place: 'Alappuzha to Kochi',
                time: '7:00 AM onward',
                transfer: '1.5-2.5 hr plus departure buffer',
                stay: 'Departure day',
                meals: 'Houseboat breakfast; lunch in Kochi if time allows',
                summary: 'Enjoy the last morning cruise, then make the departure connection the priority. Add shopping only when the timing is genuinely comfortable.',
                schedule: [['7:00 AM', 'Breakfast and final backwater views.'], ['9:00 AM', 'Disembark and depart for Kochi.'], ['11:30 AM', 'Optional spice, craft or waterfront stop.'], ['2:00 PM', 'Continue to the airport or railway station.']],
                note: 'Keep at least one extra traffic buffer for Kochi, especially for airport departures or weekend travel.'
            }
        ],
        'plan-5-days-students.html': [
            {
                place: 'Kochi and Fort Kochi',
                time: '1:00 PM-9:30 PM',
                transfer: 'Airport 1.5-2 hr; use ferry or group cab locally',
                stay: 'Kochi or Ernakulam',
                meals: 'Budget lunch, cafe stop and local dinner',
                summary: 'Start with a flexible afternoon that gives the group time to arrive, check in and explore without committing to an expensive full-day vehicle.',
                schedule: [['1:00 PM', 'Meet at the stay, check in and secure luggage.'], ['3:00 PM', 'Use ferry or a shared cab for Fort Kochi.'], ['4:00 PM', 'Walk the waterfront, St. Francis Church and nearby heritage streets.'], ['6:30 PM', 'Choose sunset, a cultural performance or cafe time.'], ['8:00 PM', 'Group dinner and return to the stay.']],
                note: 'Agree on one meeting point and one group leader before splitting up. Keep hostel curfews and last-ferry timings in mind.'
            },
            {
                place: 'Kochi to Munnar',
                time: '7:00 AM-7:30 PM',
                transfer: '4-5.5 hr by shared cab or group vehicle',
                stay: 'Munnar or Chinnakanal',
                meals: 'Breakfast, road lunch and dinner',
                summary: 'Make the hill transfer part of the trip, but limit roadside stops so the group reaches Munnar before evening weather reduces visibility.',
                schedule: [['7:00 AM', 'Breakfast, checkout and load the group vehicle.'], ['10:00 AM', 'One waterfall or viewpoint stop based on parking and weather.'], ['12:30 PM', 'Affordable lunch on the road.'], ['3:00 PM', 'Check in and rest.'], ['5:00 PM', 'Short tea-country walk or hostel social time.']],
                note: 'Hill roads are winding. Carry water, keep medication accessible and avoid standing or moving around inside the vehicle.'
            },
            {
                place: 'Munnar tea country',
                time: '8:00 AM-7:00 PM',
                transfer: 'Local shared vehicle; keep the circuit compact',
                stay: 'Munnar or Chinnakanal',
                meals: 'Breakfast, packed or local lunch and dinner',
                summary: 'Choose three strong stops rather than rushing between distant viewpoints: one tea experience, one viewpoint circuit and one short guided walk.',
                schedule: [['8:00 AM', 'Breakfast and depart before the main traffic.'], ['9:00 AM', 'Tea gardens and a museum or plantation visit.'], ['12:30 PM', 'Lunch near the day route.'], ['2:00 PM', 'Viewpoint circuit or short guided nature walk.'], ['5:00 PM', 'Return to town or the hostel before dusk.']],
                note: 'Use only recognised guides for walks. Weather, park rules and local closures can change the plan, so keep a low-cost indoor backup.'
            },
            {
                place: 'Munnar to Alappuzha',
                time: '6:30 AM-8:30 PM',
                transfer: '5.5-7 hr downhill, traffic dependent',
                stay: 'Alappuzha town or beach',
                meals: 'Breakfast, road lunch and coastal dinner',
                summary: 'This is the longest transfer. Start early, take a proper meal break and choose a shorter afternoon boat ride rather than paying for an overnight houseboat.',
                schedule: [['6:30 AM', 'Early breakfast and checkout.'], ['7:00 AM', 'Start the descent toward Alappuzha.'], ['12:30 PM', 'Lunch and comfort break.'], ['3:00 PM', 'Check in, then join a pre-booked shared shikara or canoe trip.'], ['6:00 PM', 'Beach sunset followed by dinner.']],
                note: 'Confirm the boat type, capacity, life jackets, meeting point and total price before boarding. Keep valuables dry.'
            },
            {
                place: 'Alappuzha to Kochi',
                time: '7:30 AM onward',
                transfer: '1.5-2.5 hr by train, bus or road',
                stay: 'Departure day',
                meals: 'Breakfast and a simple lunch',
                summary: 'Keep the last morning inexpensive and flexible, then make the Kochi connection with enough margin for group delays and luggage.',
                schedule: [['7:30 AM', 'Breakfast and an optional beach or canal-side walk.'], ['9:30 AM', 'Checkout and leave for the station or bus pickup.'], ['12:00 PM', 'Reach Kochi and have lunch if time allows.'], ['2:00 PM', 'Continue to the airport, railway station or onward stay.']],
                note: 'Book the group connection together. When flights or long-distance trains are involved, choose the earlier transfer.'
            }
        ],
        'plan-5-days-seniors.html': [
            {
                place: 'Kochi arrival',
                time: 'Arrival time-8:00 PM',
                transfer: 'Private air-conditioned car to the hotel',
                stay: 'Kochi',
                meals: 'Light meal and early dinner',
                summary: 'Protect the first day from travel fatigue. Check in, confirm room access and leave sightseeing optional.',
                schedule: [['Arrival', 'Meet the driver and travel directly to the hotel.'], ['+90 min', 'Check in, inspect the room and rest.'], ['5:30 PM', 'Optional short waterfront drive or hotel garden time.'], ['7:00 PM', 'Early dinner and a quiet evening.']],
                note: 'Keep medicines, prescriptions, water and one change of clothes in hand luggage rather than the main suitcase.'
            },
            {
                place: 'Fort Kochi by private car',
                time: '9:30 AM-7:30 PM',
                transfer: 'Short car hops with door-to-door pickup',
                stay: 'Kochi',
                meals: 'Breakfast, long lunch and early dinner',
                summary: 'Use a car between two or three selected sights, with seated breaks and a full afternoon rest before any evening programme.',
                schedule: [['9:30 AM', 'Leave after breakfast for the Fort Kochi waterfront.'], ['10:15 AM', 'Short walk near the fishing nets and St. Francis Church.'], ['12:00 PM', 'Seated museum visit or shaded cafe stop.'], ['1:00 PM', 'Long lunch, then return to the hotel to rest.'], ['6:00 PM', 'Optional seated Kathakali show with pre-arranged transport.']],
                note: 'Cobbled streets and uneven pavements are common. Ask the driver to minimise walking and confirm seating at every stop.'
            },
            {
                place: 'Kochi to Kumarakom',
                time: '9:30 AM-6:30 PM',
                transfer: '1.5-2.5 hr private road transfer',
                stay: 'Kumarakom',
                meals: 'Breakfast, hotel lunch and dinner',
                summary: 'Leave after rush hour, include one comfort stop if needed and reach the lakeside hotel before lunch or early afternoon.',
                schedule: [['9:30 AM', 'Breakfast, checkout and depart Kochi.'], ['10:45 AM', 'Optional comfort stop.'], ['12:00 PM', 'Reach Kumarakom and check in.'], ['1:00 PM', 'Lunch followed by a long rest.'], ['5:00 PM', 'Garden, lake view or a short buggy-assisted property round.']],
                note: 'Request a room near reception or dining, and confirm whether the vehicle can reach the room block without steps.'
            },
            {
                place: 'Vembanad Lake and Kumarakom',
                time: '9:30 AM-7:00 PM',
                transfer: 'Hotel pickup and a short covered cruise',
                stay: 'Kumarakom',
                meals: 'All meals at or near the resort',
                summary: 'Choose a two-hour daytime motorboat or shikara cruise with shade, stable seating and boarding assistance confirmed beforehand.',
                schedule: [['9:30 AM', 'Slow breakfast and free morning.'], ['11:00 AM', 'Board a covered boat with assistance.'], ['1:00 PM', 'Return for lunch and rest.'], ['4:30 PM', 'Optional short lakeside activity or tea.'], ['7:00 PM', 'Early dinner at the resort.']],
                note: 'Avoid a boat if boarding, weather or balance feels unsafe. A lakeside resort day is a complete alternative, not a missed experience.'
            },
            {
                place: 'Kumarakom to Kochi',
                time: '8:30 AM onward',
                transfer: '2-3 hr plus airport or station buffer',
                stay: 'Departure day',
                meals: 'Breakfast and a planned road meal if needed',
                summary: 'Make departure the only commitment. Leave enough time for a comfort stop, traffic and unhurried airport or station procedures.',
                schedule: [['8:30 AM', 'Breakfast and final packing.'], ['10:00 AM', 'Checkout and depart Kumarakom.'], ['11:15 AM', 'Planned comfort stop when needed.'], ['1:00 PM', 'Reach the airport, railway station or Kochi hotel.']],
                note: 'For flights, use the airline reporting time plus a generous road buffer. Request wheelchair assistance from the airline or station in advance when required.'
            }
        ],
        'plan-7-days.html': [
            {
                place: 'Fort Kochi, Kadamakkudy Islands and Mattancherry',
                time: '2 days',
                transfer: 'Airport 1.5-2 hr; Kadamakkudy about 45-60 min each way',
                stay: '2 nights in Fort Kochi',
                meals: 'Daily breakfast; seafood and Kerala dinner options',
                summary: 'Use the first afternoon for Fort Kochi, then give Day 2 an offbeat opening among Kadamakkudy\'s island roads before returning to Kochi\'s heritage quarter.',
                schedule: [['Day 1, 2 PM', 'Check in, walk the Fort Kochi waterfront and watch sunset.'], ['Day 1, 7 PM', 'Relaxed seafood or Kerala dinner near the heritage quarter.'], ['Day 2, 6 AM', 'Leave for Kadamakkudy for sunrise, wetlands, fishing scenes and a slow island drive or cycle.'], ['Day 2, 11 AM', 'Return for Mattancherry, the palace area and spice streets.'], ['Day 2, 6 PM', 'Kathakali performance followed by dinner.']],
                note: 'Kadamakkudy is most atmospheric early and has limited visitor infrastructure. Carry water, respect working villages and avoid blocking narrow island roads.'
            },
            {
                place: 'Kochi to Munnar and the tea country',
                time: '2 days',
                transfer: '4-5.5 hr uphill on Day 3',
                stay: '2 nights in Munnar',
                meals: 'Daily breakfast, road lunch and local dinners',
                summary: 'Day 3 is the scenic transfer; Day 4 is the unhurried highland day for tea estates, viewpoints and short walks.',
                schedule: [['Day 3, 7:30 AM', 'Leave Kochi after breakfast with one or two scenic stops.'], ['Day 3, 2 PM', 'Check in at Munnar and take a short plantation or town walk.'], ['Day 4, 8 AM', 'Start the main viewpoint and tea-country circuit.'], ['Day 4, 1 PM', 'Lunch and a tea or plantation experience.'], ['Day 4, 5 PM', 'Return before mist or rain reduces visibility.']],
                note: 'Do not try to cover every viewpoint. Choose a compact route based on weather and the location of your hotel.'
            },
            {
                place: 'Munnar to Thekkady and Periyar',
                time: '8:00 AM-8:00 PM',
                transfer: '3-4.5 hr through plantation country',
                stay: 'Thekkady',
                meals: 'Breakfast, lunch and dinner',
                summary: 'Leave Munnar after breakfast and reserve the afternoon for one confirmed Periyar-area or spice experience.',
                schedule: [['8:00 AM', 'Breakfast, checkout and depart Munnar.'], ['12:30 PM', 'Reach Thekkady, have lunch and check in.'], ['3:00 PM', 'Join a booked nature activity or guided spice-garden visit.'], ['6:30 PM', 'Browse the local market or attend a cultural programme.'], ['8:00 PM', 'Dinner near the hotel.']],
                note: 'Choose one main afternoon activity. Reporting times, weather and availability should be checked directly with the operator.'
            },
            {
                place: 'Thekkady to Munroe Island via Kollam district',
                time: '7:00 AM-9:00 PM',
                transfer: 'About 5-6.5 hr by road',
                stay: 'Munroe Island homestay',
                meals: 'Breakfast, road lunch and homestay dinner',
                summary: 'This is the route\'s offbeat backwater day: arrive in time for a small-canoe journey through narrow canals and a quiet island evening.',
                schedule: [['7:00 AM', 'Breakfast, checkout and depart Thekkady.'], ['12:30 PM', 'Lunch stop before continuing toward Munroe Island.'], ['3:00 PM', 'Check into the homestay and take a short rest.'], ['4:00 PM', 'Join a pre-booked canoe ride through palm-lined village canals.'], ['7:30 PM', 'Local dinner and overnight on the island.']],
                note: 'Use a small canoe for the narrow canals and confirm the meeting point with the homestay. Water level, rain and local conditions can change the route.'
            },
            {
                place: 'Munroe Island to Varkala and Thiruvananthapuram',
                time: '7:00 AM onward',
                transfer: 'About 1.5 hr to Varkala; 1.5-2 hr onward to airport',
                stay: 'Departure day or add one beach night',
                meals: 'Breakfast and coastal lunch',
                summary: 'Finish with Varkala\'s cliff path, beach and cafes before continuing to Thiruvananthapuram. A late flight or an extra beach night makes this day work best.',
                schedule: [['7:00 AM', 'Breakfast, an optional short island walk and checkout.'], ['9:00 AM', 'Depart Munroe Island for Varkala.'], ['10:30 AM', 'Walk the cliff path and choose beach time or a wellness session.'], ['1:30 PM', 'Coastal lunch with a generous weather buffer.'], ['4:00 PM', 'Leave for Thiruvananthapuram or check in for an added night.']],
                note: 'Do not force the coast before an early departure. Varkala is about 35 km from Munroe Island by the official activity guidance, but road time varies.'
            }
        ],
        'plan-10-days.html': [
            {
                place: 'Fort Kochi, Kadamakkudy Islands and Mattancherry',
                time: '2 days',
                transfer: 'Airport 1.5-2 hr; Kadamakkudy about 45-60 min each way',
                stay: '2 nights in Fort Kochi',
                meals: 'Daily breakfast plus two local dinners',
                summary: 'Use Day 1 for Fort Kochi, then start Day 2 in Kadamakkudy\'s quieter island landscape before returning for Mattancherry, culture and food.',
                schedule: [['Day 1, 2 PM', 'Check in and explore the Fort Kochi waterfront.'], ['Day 1, 7 PM', 'Relaxed local dinner in the heritage quarter.'], ['Day 2, 6 AM', 'Sunrise drive or cycle through Kadamakkudy\'s island roads and wetlands.'], ['Day 2, 11 AM', 'Return for Mattancherry heritage area and spice streets.'], ['Day 2, 6 PM', 'Kathakali performance and a food-led evening.']],
                note: 'Treat Kadamakkudy as a living village, not a staged attraction. Keep the visit quiet, carry water and return before midday heat.'
            },
            {
                place: 'Kochi to Munroe Island',
                time: '8:00 AM-9:00 PM',
                transfer: 'About 3.5-5 hr by road or rail connection via Kollam',
                stay: 'Munroe Island homestay',
                meals: 'Breakfast, road lunch and homestay dinner',
                summary: 'Trade the large houseboat circuit for a quieter island stay and an intimate canoe journey through narrow village waterways.',
                schedule: [['8:00 AM', 'Checkout and depart Kochi.'], ['1:00 PM', 'Reach Munroe Island, have lunch and check into the homestay.'], ['3:30 PM', 'Walk or cycle through the village at an easy pace.'], ['4:30 PM', 'Join a pre-booked small-canoe trip through the narrow canals.'], ['8:00 PM', 'Local dinner and overnight on the island.']],
                note: 'Confirm the canoe departure point and next morning pickup with the homestay. Water levels and weather can alter the canal route.'
            },
            {
                place: 'Munroe Island to Munnar and the high country',
                time: '2 days',
                transfer: 'About 5.5-7 hr uphill on Day 4',
                stay: '2 nights in Munnar',
                meals: 'Daily breakfast, road lunch and dinners',
                summary: 'Day 4 is a long scenic transfer. Keep Day 5 for the main tea-country circuit, viewpoints and a plantation experience.',
                schedule: [['Day 4, 7 AM', 'Leave Munroe Island after an early breakfast.'], ['Day 4, 1 PM', 'Lunch en route and continue into the hills.'], ['Day 4, 4:30 PM', 'Munnar check-in and a short evening walk.'], ['Day 5, 8 AM', 'Tea gardens, viewpoints and waterfall route.'], ['Day 5, 2 PM', 'Plantation experience, cafe stop and an early return.']],
                note: 'Select sights near the hotel rather than zig-zagging across Munnar. Weather can shorten the usable sightseeing window.'
            },
            {
                place: 'Munnar to Thekkady and Periyar',
                time: '8:00 AM-8:00 PM',
                transfer: '3-4.5 hr through plantation roads',
                stay: 'Thekkady',
                meals: 'Breakfast, lunch and dinner',
                summary: 'Travel through plantation country and reserve the afternoon for one confirmed spice, lake or guided nature activity.',
                schedule: [['8:00 AM', 'Breakfast, checkout and depart Munnar.'], ['12:30 PM', 'Arrive in Thekkady for lunch and check-in.'], ['3:00 PM', 'Join the chosen pre-booked activity.'], ['6:30 PM', 'Spice market, cooking experience or cultural show.'], ['8:00 PM', 'Dinner and prepare for the northbound journey.']],
                note: 'Confirm the next transfer before arrival. Thekkady to Wayanad is a major cross-state road day and needs an early start.'
            },
            {
                place: 'Thekkady to Wayanad',
                time: '2 days, including a major transfer',
                transfer: 'About 8-10 hr by road; break the trip if preferred',
                stay: '2 nights in Wayanad',
                meals: 'Daily breakfast, road lunch and dinners',
                summary: 'Day 7 is primarily a northbound transfer. Day 8 is the full Wayanad day for one compact forest, waterfall or heritage circuit.',
                schedule: [['Day 7, 6:30 AM', 'Early checkout and begin the long road transfer.'], ['Day 7, 12:30 PM', 'Planned lunch and rest stop on the route.'], ['Day 7, 5:30 PM', 'Reach Wayanad, check in and keep the evening quiet.'], ['Day 8, 8 AM', 'Start one weather-appropriate Wayanad sightseeing circuit.'], ['Day 8, 4 PM', 'Return to the stay before dark and prepare for the coast.']],
                note: 'For a gentler trip, add a transit night or use a rail/flight connection via Kochi or Kozhikode. Do not pair the long drive with major sightseeing.'
            },
            {
                place: 'Wayanad to Valiyaparamba Islands and Bekal',
                time: '2 days',
                transfer: 'About 5-7 hr to north Kasaragod, then local coastal transfers',
                stay: 'Valiyaparamba or Bekal',
                meals: 'Daily breakfast and a Malabar food experience',
                summary: 'End with north Kerala\'s less-crowded island backwaters: cruise Valiyaparamba, taste Malabar cooking and keep the final evening for Bekal Fort.',
                schedule: [['Day 9, 7:30 AM', 'Leave Wayanad after breakfast for the north coast.'], ['Day 9, 2 PM', 'Reach the Valiyaparamba area, check in and have lunch.'], ['Day 9, 4 PM', 'Take a short cruise or canoe ride through the islands and village waterways.'], ['Day 10, 8 AM', 'Slow island morning, then continue to Bekal Fort and the coast.'], ['Day 10, 1 PM', 'Lunch followed by the airport or railway transfer with a generous buffer.']],
                note: 'Organised cruises commonly use Kottappuram as an access point. Bekal pairs best with Kannur or Mangaluru connections, so confirm the departure before booking.'
            }
        ]
    };

    const currentPlanFile = window.location.pathname.split('/').pop() || 'index.html';
    const currentPlanSchedule = planScheduleData[currentPlanFile];

    if (currentPlanSchedule) {
        const dayCards = [...document.querySelectorAll('.plan-day')];

        const setDayCardOpen = (card, isOpen) => {
            const toggle = card.querySelector('.plan-day-toggle');
            const panel = card.querySelector('.plan-day-details');
            const title = card.querySelector('.plan-day-copy h2')?.textContent.trim() || 'this day';

            if (!toggle || !panel) return;

            card.classList.toggle('is-expanded', isOpen);
            toggle.setAttribute('aria-expanded', String(isOpen));
            toggle.setAttribute('aria-label', `${isOpen ? 'Hide' : 'Show'} full schedule for ${title}`);
            toggle.title = `${isOpen ? 'Hide' : 'Show'} full schedule`;
            panel.hidden = !isOpen;
        };

        dayCards.forEach((card, index) => {
            const details = currentPlanSchedule[index];
            const label = card.querySelector('.plan-day-label');
            const cardTitle = card.querySelector('.plan-day-copy h2')?.textContent.trim();

            if (!details || !label || !cardTitle) return;

            const panelId = `plan-day-details-${index + 1}`;
            const headingId = `${panelId}-heading`;
            const toggle = document.createElement('button');
            toggle.className = 'plan-day-toggle';
            toggle.type = 'button';
            toggle.setAttribute('aria-expanded', 'false');
            toggle.setAttribute('aria-controls', panelId);
            toggle.setAttribute('aria-label', `Show full schedule for ${cardTitle}`);
            toggle.title = 'Show full schedule';
            toggle.innerHTML = '<i class="fa-solid fa-chevron-down" aria-hidden="true"></i>';
            label.append(toggle);

            const panel = document.createElement('section');
            panel.className = 'plan-day-details';
            panel.id = panelId;
            panel.hidden = true;
            panel.setAttribute('aria-labelledby', headingId);

            const header = document.createElement('div');
            header.className = 'plan-day-details-header';
            const eyebrow = document.createElement('span');
            eyebrow.className = 'plan-day-details-eyebrow';
            eyebrow.textContent = 'Full Schedule';
            const heading = document.createElement('h3');
            heading.id = headingId;
            heading.textContent = `Plan your time: ${cardTitle}`;
            const summary = document.createElement('p');
            summary.textContent = details.summary;
            header.append(eyebrow, heading, summary);

            const facts = document.createElement('div');
            facts.className = 'plan-day-facts';
            const factItems = [
                ['fa-location-dot', 'Places', details.place],
                ['fa-clock', 'Suggested time', details.time],
                ['fa-car-side', 'Transfer', details.transfer],
                ['fa-bed', 'Overnight', details.stay],
                ['fa-utensils', 'Meals', details.meals]
            ];

            factItems.forEach(([iconName, factLabel, value]) => {
                const fact = document.createElement('div');
                const icon = document.createElement('i');
                const copy = document.createElement('div');
                const labelText = document.createElement('span');
                const valueText = document.createElement('strong');

                icon.className = `fa-solid ${iconName}`;
                icon.setAttribute('aria-hidden', 'true');
                labelText.textContent = factLabel;
                valueText.textContent = value;
                copy.append(labelText, valueText);
                fact.append(icon, copy);
                facts.append(fact);
            });

            const expandedBody = document.createElement('div');
            expandedBody.className = 'plan-day-details-body';
            const timeline = document.createElement('div');
            timeline.className = 'plan-day-timeline';
            const timelineHeading = document.createElement('h4');
            timelineHeading.textContent = 'Suggested Flow';
            const timelineList = document.createElement('ol');

            details.schedule.forEach(([time, activity]) => {
                const item = document.createElement('li');
                const timeText = document.createElement('time');
                const activityText = document.createElement('p');
                timeText.textContent = time;
                activityText.textContent = activity;
                item.append(timeText, activityText);
                timelineList.append(item);
            });

            timeline.append(timelineHeading, timelineList);

            const note = document.createElement('aside');
            note.className = 'plan-day-note';
            const noteIcon = document.createElement('i');
            const noteCopy = document.createElement('div');
            const noteHeading = document.createElement('h4');
            const noteText = document.createElement('p');
            noteIcon.className = 'fa-regular fa-lightbulb';
            noteIcon.setAttribute('aria-hidden', 'true');
            noteHeading.textContent = 'Plan It Better';
            noteText.textContent = details.note;
            noteCopy.append(noteHeading, noteText);
            note.append(noteIcon, noteCopy);

            expandedBody.append(timeline, note);
            panel.append(header, facts, expandedBody);
            card.append(panel);

            toggle.addEventListener('click', () => {
                const willOpen = toggle.getAttribute('aria-expanded') !== 'true';

                if (willOpen) {
                    dayCards.forEach(otherCard => {
                        if (otherCard !== card) setDayCardOpen(otherCard, false);
                    });
                }

                setDayCardOpen(card, willOpen);
            });
        });

        const mediaCredits = {
            'plan-7-days.html': 'Offbeat photographs: <a href="https://commons.wikimedia.org/wiki/File:Kadamakkudi_island_in_Kerala.jpg" target="_blank" rel="noopener">Kadamakkudy by NOORAPARAPOYIL</a> and <a href="https://commons.wikimedia.org/wiki/File:Munroe_Island_tourism.jpg" target="_blank" rel="noopener">Munroe Island by Sanu N</a>, CC BY-SA 4.0. Varkala image from Kerala Tourism.',
            'plan-10-days.html': 'Offbeat photographs: <a href="https://commons.wikimedia.org/wiki/File:Kadamakkudi_island_in_Kerala.jpg" target="_blank" rel="noopener">Kadamakkudy by NOORAPARAPOYIL</a> and <a href="https://commons.wikimedia.org/wiki/File:Munroe_Island_tourism.jpg" target="_blank" rel="noopener">Munroe Island by Sanu N</a>, CC BY-SA 4.0. Valiyaparamba image from Kerala Tourism.'
        };

        if (mediaCredits[currentPlanFile]) {
            const credit = document.createElement('p');
            credit.className = 'media-credit';
            credit.innerHTML = mediaCredits[currentPlanFile];
            document.querySelector('.plan-day-list')?.insertAdjacentElement('afterend', credit);
        }
    }

    // Indicative room bands make hotel options comparable without presenting them as live quotes.
    const hotelPriceBands = {
        'Forte Kochi': 'INR 11,000-18,000',
        'Zostel Kochi (Ernakulam)': 'INR 700-2,800',
        'The Hosteller Munnar': 'INR 700-3,500',
        'Zostel Alleppey': 'INR 700-2,800',
        'KTDC Bolgatty Palace': 'INR 6,500-12,000',
        'Punnamada Resort': 'INR 8,000-14,000',
        'KTDC Waterscapes': 'INR 6,000-10,000',
        'Coconut Lagoon': 'INR 18,000-30,000',
        'KTDC Tea County': 'INR 6,000-10,000',
        'KTDC Aranya Nivas': 'INR 5,500-9,000',
        'Spice Village': 'INR 16,000-26,000',
        'Gateway Varkala': 'INR 10,000-18,000',
        'Munroe Inn Homestay': 'INR 2,000-4,500',
        'Wayanad Wild': 'INR 16,000-25,000',
        'Taj Bekal Resort & Spa': 'INR 22,000-38,000'
    };

    document.querySelectorAll('.stay-option-card').forEach(card => {
        const hotelName = card.querySelector('h3');
        const priceBand = hotelPriceBands[hotelName?.textContent.trim()];

        if (!hotelName || !priceBand) return;

        const price = document.createElement('div');
        const amount = document.createElement('strong');
        const unit = document.createElement('span');

        price.className = 'stay-price';
        price.title = 'Indicative planning range. Check the hotel for current rates.';
        amount.textContent = priceBand;
        unit.textContent = 'typical room / night';
        price.append(amount, unit);
        hotelName.insertAdjacentElement('afterend', price);
    });

    document.querySelectorAll('.stay-booking-note p').forEach(note => {
        note.prepend('Prices shown are indicative nightly planning bands. ');
    });

    // Shared navigation and contact details keep the expanded site easy to reach from every page.
    document.querySelectorAll('.nav-links').forEach(navList => {
        if (navList.querySelector('a[href="reviews.html"]')) return;

        const reviewItem = document.createElement('li');
        const reviewLink = document.createElement('a');
        reviewLink.href = 'reviews.html';
        reviewLink.textContent = 'Reviews';
        reviewItem.append(reviewLink);
        navList.append(reviewItem);
    });

    document.querySelectorAll('.footer-links-wrapper').forEach(wrapper => {
        const footerColumn = wrapper.querySelector('.footer-column');

        if (!footerColumn || footerColumn.querySelector('a[href="reviews.html"]')) return;

        const reviewLink = document.createElement('a');
        reviewLink.href = 'reviews.html';
        reviewLink.textContent = 'Traveller Reviews';
        footerColumn.append(reviewLink);
    });

    document.querySelectorAll('.footer-bottom').forEach(footerBottom => {
        if (footerBottom.querySelector('.footer-contact')) return;

        const contact = document.createElement('a');
        contact.className = 'footer-contact';
        contact.href = 'tel:+914712321132';
        contact.innerHTML = '<i class="fa-solid fa-phone" aria-hidden="true"></i> Kerala Tourism: +91 471 232 1132';
        footerBottom.append(contact);
    });

    // Reviews are intentionally stored in the current browser because this static site has no server-side review system.
    const reviewList = document.getElementById('review-list');
    const reviewForm = document.getElementById('review-form');

    if (reviewList && reviewForm) {
        const reviewStorageKey = 'visitKeralaReviews';
        const starterReviews = [
            {
                name: 'Dr. Gayathri G',
                place: 'St. Francis CSI Church, Fort Kochi',
                rating: 4.3,
                reviewCount: '3,192 reviews',
                message: 'A must-visit landmark widely celebrated as India\'s oldest European-built church, dating back to 1503.',
                source: 'google',
                sourceUrl: 'https://www.google.com/maps/search/St.%2BFrancis%2BChurch%2C%2BKochi%2C%2BIndia'
            },
            {
                name: 'Nilima Pawar',
                place: 'The Valle Munnar',
                rating: 4.8,
                reviewCount: '1,436 reviews',
                message: 'Beautiful view of sunrise from room and excellent service received by staff.',
                source: 'google',
                sourceUrl: 'https://www.google.com/travel/hotels/entity/ChoI9tG0_YuCgvOcARoNL2cvMTFsNzJtenQ0ahAB'
            },
            {
                name: 'Aliasgar Patwa',
                place: 'The World Backwaters, Alappuzha',
                rating: 4.4,
                reviewCount: '1,874 reviews',
                message: 'A very beautiful resort with a nice location, good staff, nice food, comfy rooms.',
                source: 'google',
                sourceUrl: 'https://www.google.com/travel/hotels/entity/ChgIy9CG7N6Top5eGgwvZy8xMXljeWR2ZGwQAQ'
            },
            {
                name: 'Rushikesh Patil',
                place: 'Cliff County Varkala',
                rating: 4.1,
                reviewCount: '133 reviews',
                message: 'Great location, very close to the cliffside restaurants and shopping hub.',
                source: 'google',
                sourceUrl: 'https://www.google.com/travel/hotels/entity/ChkI14z9laHNj5lUGg0vZy8xMXY1dDM2al8zEAE'
            }
        ];

        const getStoredReviews = () => {
            try {
                const saved = JSON.parse(localStorage.getItem(reviewStorageKey));
                return Array.isArray(saved) ? saved : [];
            } catch {
                return [];
            }
        };

        const createReviewCard = review => {
            const card = document.createElement('article');
            const topLine = document.createElement('div');
            const stars = document.createElement('div');
            const quote = document.createElement('blockquote');
            const footer = document.createElement('div');
            const avatar = document.createElement('div');
            const identity = document.createElement('div');
            const name = document.createElement('strong');
            const plan = document.createElement('span');
            const initials = review.name.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase();

            card.className = `review-card reveal active ${review.source === 'google' ? 'google-review' : 'local-review'}`;
            topLine.className = 'review-card-topline';
            stars.className = 'review-stars';
            stars.setAttribute('aria-label', `${review.rating} out of 5${review.source === 'google' ? ' Google place rating' : ' stars'}`);

            for (let index = 1; index <= 5; index += 1) {
                const star = document.createElement('i');
                const difference = review.rating - (index - 1);
                star.className = difference >= 1
                    ? 'fa-solid fa-star'
                    : difference >= 0.25
                        ? 'fa-solid fa-star-half-stroke'
                        : 'fa-regular fa-star';
                star.setAttribute('aria-hidden', 'true');
                stars.append(star);
            }

            topLine.append(stars);

            if (review.source === 'google' && review.sourceUrl) {
                const sourceStamp = document.createElement('a');
                sourceStamp.className = 'review-source-stamp';
                sourceStamp.href = review.sourceUrl;
                sourceStamp.target = '_blank';
                sourceStamp.rel = 'noopener noreferrer';
                sourceStamp.title = 'Open the source on Google';
                sourceStamp.setAttribute('aria-label', `Taken from Google. Open source for ${review.place}`);
                sourceStamp.innerHTML = '<i class="fa-brands fa-google" aria-hidden="true"></i><span>Taken from Google</span>';
                topLine.append(sourceStamp);
            } else {
                const localStamp = document.createElement('span');
                localStamp.className = 'review-source-stamp local-source-stamp';
                localStamp.setAttribute('aria-label', 'Taken from here. Submitted on this website');
                localStamp.innerHTML = '<i class="fa-solid fa-location-dot" aria-hidden="true"></i><span>Taken from Here</span>';
                topLine.append(localStamp);
            }

            quote.textContent = `"${review.message}"`;
            avatar.className = 'review-avatar';
            avatar.textContent = initials;
            footer.className = 'review-card-footer';
            name.textContent = review.name;
            plan.textContent = review.place || review.plan;
            identity.append(name, plan);

            if (review.source === 'google') {
                const ratingMeta = document.createElement('small');
                ratingMeta.className = 'review-rating-meta';
                ratingMeta.textContent = `${review.rating.toFixed(1)} Google place rating${review.reviewCount ? ` | ${review.reviewCount}` : ''}`;
                identity.append(ratingMeta);
            }

            footer.append(avatar, identity);
            card.append(topLine, quote, footer);
            return card;
        };

        const renderReviews = () => {
            reviewList.replaceChildren();
            [...getStoredReviews(), ...starterReviews].forEach(review => reviewList.append(createReviewCard(review)));
        };

        renderReviews();

        reviewForm.addEventListener('submit', event => {
            event.preventDefault();
            const name = document.getElementById('review-name').value.trim();
            const plan = document.getElementById('review-plan').value;
            const rating = Number(document.querySelector('input[name="rating"]:checked')?.value || 5);
            const message = document.getElementById('review-message').value.trim();
            const status = document.getElementById('review-status');

            if (!name || !message) return;

            const reviews = getStoredReviews();
            reviews.unshift({ name, plan, rating, message });
            localStorage.setItem(reviewStorageKey, JSON.stringify(reviews));
            reviewForm.reset();
            renderReviews();
            status.textContent = 'Your review is saved on this device.';
        });
    }

    // Profile preferences stay on the visitor's device.
    const profileForm = document.getElementById('profile-form');

    if (profileForm) {
        const profileStorageKey = 'visitKeralaProfile';
        const profileNameInput = document.getElementById('profile-name');
        const profileEmailInput = document.getElementById('profile-email');
        const profileCityInput = document.getElementById('profile-city');
        const profilePaceInput = document.getElementById('profile-pace');
        const profileStatus = document.getElementById('profile-status');
        const profileReset = document.getElementById('profile-reset');
        const interestInputs = [...document.querySelectorAll('input[name="interests"]')];

        const updateProfileIdentity = (name) => {
            const displayName = name.trim() || 'Guest Traveller';
            const initials = displayName.split(/\s+/).map(part => part[0]).join('').slice(0, 2).toUpperCase();

            document.querySelectorAll('[data-profile-name]').forEach(element => {
                element.textContent = displayName;
            });

            document.querySelectorAll('[data-profile-initials]').forEach(element => {
                element.textContent = initials;
            });
        };

        const getProfile = () => {
            try {
                return JSON.parse(localStorage.getItem(profileStorageKey)) || {};
            } catch {
                return {};
            }
        };

        const storedProfile = getProfile();
        profileNameInput.value = storedProfile.name || profileNameInput.value;
        profileEmailInput.value = storedProfile.email || '';
        profileCityInput.value = storedProfile.city || '';
        profilePaceInput.value = storedProfile.pace || profilePaceInput.value;
        interestInputs.forEach(input => {
            input.checked = storedProfile.interests ? storedProfile.interests.includes(input.value) : input.checked;
        });
        updateProfileIdentity(profileNameInput.value);

        profileForm.addEventListener('submit', event => {
            event.preventDefault();
            const profile = {
                name: profileNameInput.value.trim() || 'Guest Traveller',
                email: profileEmailInput.value.trim(),
                city: profileCityInput.value.trim(),
                pace: profilePaceInput.value,
                interests: interestInputs.filter(input => input.checked).map(input => input.value)
            };

            localStorage.setItem(profileStorageKey, JSON.stringify(profile));
            updateProfileIdentity(profile.name);
            profileStatus.textContent = 'Profile saved on this device.';
        });

        profileReset.addEventListener('click', () => {
            localStorage.removeItem(profileStorageKey);
            profileForm.reset();
            updateProfileIdentity(profileNameInput.value);
            profileStatus.textContent = 'Profile reset.';
        });
    }

    // ==========================================
    // 7. Floating Kerala Travel Assistant
    // ==========================================
    const assistantWidget = document.createElement('aside');
    assistantWidget.className = 'assistant-widget';
    assistantWidget.setAttribute('aria-label', 'Kerala travel assistant');
    assistantWidget.innerHTML = `
        <section class="assistant-panel" id="kerala-assistant-panel" aria-label="Kerala travel assistant" aria-live="polite">
            <header class="assistant-header"><div class="assistant-heading"><i class="fa-solid fa-compass"></i><div><strong>Kerala Travel Guide</strong><span>Places, plans, budgets, and practical tips</span></div></div><div class="assistant-header-actions"><button class="assistant-clear" type="button" title="Clear conversation" aria-label="Clear conversation"><i class="fa-regular fa-trash-can"></i></button><button class="assistant-close" type="button" title="Close assistant" aria-label="Close assistant"><i class="fa-solid fa-xmark"></i></button></div></header>
            <div class="assistant-messages" id="assistant-messages"></div>
            <div class="assistant-composer"><div class="assistant-suggestions" id="assistant-suggestions"></div><form class="assistant-form"><input id="assistant-input" type="text" placeholder="Ask about Kerala..." autocomplete="off" aria-label="Ask a Kerala travel question"><button class="assistant-send" type="submit" title="Send question" aria-label="Send question"><i class="fa-solid fa-arrow-up"></i></button></form></div>
        </section>
        <button class="assistant-toggle" id="kerala-assistant-toggle" type="button" title="Ask Kerala Travel Assistant" aria-label="Open Kerala Travel Assistant" aria-expanded="false"><i class="fa-solid fa-wand-magic-sparkles"></i></button>`;
    document.body.append(assistantWidget);

    const assistantPanel = document.getElementById('kerala-assistant-panel');
    const assistantToggle = document.getElementById('kerala-assistant-toggle');
    const assistantClose = assistantWidget.querySelector('.assistant-close');
    const assistantClear = assistantWidget.querySelector('.assistant-clear');
    const assistantMessages = document.getElementById('assistant-messages');
    const assistantSuggestions = document.getElementById('assistant-suggestions');
    const assistantForm = assistantWidget.querySelector('.assistant-form');
    const assistantInput = document.getElementById('assistant-input');

    const assistantReplies = [
        {
            id: 'help',
            suggestion: 'What can you answer?',
            questions: ['What can you help me with?', 'What questions can I ask?', 'How does this guide work?', 'Can you help plan my Kerala trip?', 'What do you know about Kerala?'],
            terms: ['help me', 'what can you answer', 'what can i ask', 'kerala guide'],
            text: "Ask me about trip lengths, routes, destinations, budgets, hotels, transport, weather, food, safety, backwaters, beaches, culture, or offbeat places. I use a built-in Kerala travel question bank, so no account or AI service is needed.",
            link: ['itineraries.html', 'Browse all trip plans'],
            related: ['choose-plan', 'best-time', 'budget-general']
        },
        {
            id: 'contact',
            suggestion: 'Tourism contact',
            questions: ['What is the Kerala Tourism contact number?', 'Who can I call for Kerala tourism help?', 'Is there an official tourism helpline?', 'Where can I find official Kerala travel information?', 'How do I contact Kerala Tourism?'],
            terms: ['contact number', 'tourism helpline', 'call kerala tourism', 'official contact'],
            text: "The contact shown on this site is Kerala Tourism: +91 471 232 1132. For current notices, opening details, and official help, use the government tourism links on the Travel Info page.",
            link: ['travel-info.html', 'Open official travel links'],
            related: ['official-info', 'safety', 'booking']
        },
        {
            id: 'official-info',
            suggestion: 'Official information',
            questions: ['Is this the official Kerala Tourism website?', 'Where does this travel information come from?', 'Where can I verify Kerala travel details?', 'Are the timings and prices official?', 'Which government website should I check?'],
            terms: ['official website', 'government website', 'verify information', 'official information'],
            text: "Visit Kerala is an independent planning website inspired by Kerala Tourism resources. Always verify live prices, permits, weather alerts, opening hours, and transport changes on the linked official pages before booking.",
            link: ['travel-info.html', 'Verify with official sources'],
            related: ['contact', 'booking', 'best-time']
        },
        {
            id: 'choose-plan',
            suggestion: 'Choose my plan',
            questions: ['Which Kerala plan should I choose?', 'How many days are enough for Kerala?', 'What is the best Kerala itinerary?', 'Which trip length is right for me?', 'Should I choose 3, 5, 7, or 10 days?', 'Help me select a Kerala vacation plan.'],
            terms: ['which plan', 'how many days', 'best itinerary', 'choose a trip', 'trip length'],
            text: "Choose 3 days for Kochi plus one backwater night, 5 days for the classic hills-and-houseboat route, 7 days for a fuller south Kerala trip with offbeat islands, or 10 days for a wide route reaching Wayanad and north Kerala.",
            link: ['itineraries.html', 'Compare the plans'],
            related: ['plan-3', 'plan-5', 'plan-7', 'plan-10']
        },
        {
            id: 'plan-3',
            suggestion: '3-day trip',
            questions: ['What is included in the 3-day plan?', 'Can I visit Kerala in three days?', 'What should I do on a Kerala weekend?', 'Is the 3-day plan good for first-time visitors?', 'Which places are covered in three days?', 'Give me a short Kerala itinerary.'],
            terms: ['3 day', 'three day', 'short kerala trip', 'kerala weekend', 'long weekend'],
            text: "The 3-day route covers Fort Kochi and Mattancherry, then an Alappuzha houseboat night and morning cruise. It is the simplest short introduction and avoids squeezing hill stations into a weekend.",
            link: ['plan-3-days.html', 'Open the 3-day plan'],
            related: ['budget-3', 'kochi', 'houseboat']
        },
        {
            id: 'plan-5',
            suggestion: '5-day trip',
            questions: ['What is included in the 5-day plan?', 'Is five days enough for Kerala?', 'What is the best five-day Kerala route?', 'Which places are covered in five days?', 'Can I see Munnar and backwaters in five days?', 'Plan a five-day Kerala vacation.'],
            terms: ['5 day', 'five day', 'five days', 'munnar and backwaters'],
            text: "The 5-day route is the best compact classic: Kochi, Munnar, Thekkady, and Alappuzha. It gives you heritage, tea hills, spice country, and a houseboat without adding the longer north Kerala transfers.",
            link: ['plan-5-days.html', 'Open the 5-day plan'],
            related: ['budget-5', 'munnar', 'thekkady', 'alappuzha']
        },
        {
            id: 'plan-7',
            suggestion: '7-day trip',
            questions: ['What is included in the 7-day plan?', 'Is one week enough for Kerala?', 'What is the best seven-day Kerala itinerary?', 'Which offbeat places are in the 7-day plan?', 'Can I include Varkala in a one-week trip?', 'Plan a week in Kerala.'],
            terms: ['7 day', 'seven day', 'one week', 'week in kerala'],
            text: "The 7-day plan combines Fort Kochi, Kadamakkudy Islands, Munnar, Thekkady, Munroe Island, and Varkala. It is the strongest first big trip because it mixes famous highlights with quieter island experiences.",
            link: ['plan-7-days.html', 'Open the 7-day plan'],
            related: ['budget-7', 'offbeat', 'munroe', 'varkala']
        },
        {
            id: 'plan-10',
            suggestion: '10-day trip',
            questions: ['What is included in the 10-day plan?', 'What can I see in ten days in Kerala?', 'Which offbeat places are in the 10-day itinerary?', 'Can I visit north and south Kerala in ten days?', 'Is the 10-day trip too rushed?', 'Plan a long Kerala holiday.'],
            terms: ['10 day', 'ten day', 'ten days', 'long kerala trip', 'north and south kerala'],
            text: "The 10-day route goes from Kochi and Kadamakkudy to Munroe Island, Munnar, Thekkady, Wayanad, Valiyaparamba, and Bekal. It is varied but includes major transfers, so break the longest road day if you prefer a slow pace.",
            link: ['plan-10-days.html', 'Open the 10-day plan'],
            related: ['budget-10', 'offbeat', 'wayanad', 'valiyaparamba']
        },
        {
            id: 'family',
            suggestion: 'Travel with kids',
            questions: ['Is Kerala good for families?', 'Which Kerala plan is best with children?', 'What can kids do in Kerala?', 'Is a houseboat safe for children?', 'Can we travel Kerala with school-age kids?', 'Which places are family friendly?'],
            terms: ['with kids', 'with children', 'family trip', 'family friendly', 'for families'],
            text: "Kerala works well for families. Keep transfer days light, choose a houseboat with proper railings and life jackets, give Munnar two nights, and favour easy activities such as short walks, boat rides, beaches with safe conditions, and cultural shows.",
            link: ['itineraries.html', 'Compare family-friendly routes'],
            related: ['houseboat', 'beach-safety', 'plan-5']
        },
        {
            id: 'solo',
            suggestion: 'Solo travel',
            questions: ['Is Kerala good for solo travel?', 'Can I travel alone in Kerala?', 'Which route is best for a solo traveller?', 'Is Kerala safe for a woman travelling alone?', 'How should a solo visitor get around?', 'Are homestays good for solo travellers?'],
            terms: ['solo travel', 'travel alone', 'solo traveller', 'woman travelling alone', 'female solo'],
            text: "Solo travel is practical on the main Kerala route. Use reviewed stays and registered transport, share long-transfer details with someone you trust, avoid isolated areas after dark, and choose homestays or small group activities when you want local company.",
            link: ['travel-info.html', 'Read practical travel notes'],
            related: ['safety', 'transport', 'booking']
        },
        {
            id: 'couples',
            suggestion: 'Couples trip',
            questions: ['Which Kerala plan is best for couples?', 'Is Kerala good for a honeymoon?', 'Where should couples stay in Kerala?', 'What is a romantic Kerala itinerary?', 'Should couples choose Munnar or Varkala?', 'Can we book a private houseboat?'],
            terms: ['for couples', 'couples trip', 'honeymoon', 'romantic trip', 'romantic kerala'],
            text: "For couples, combine two nights in Munnar with a private backwater stay and a Varkala or Kumarakom finish. The 5-day plan is compact; the 7-day plan gives more quiet time and fewer rushed evenings.",
            link: ['plan-7-days.html', 'See the 7-day route'],
            related: ['munnar', 'houseboat', 'varkala']
        },
        {
            id: 'seniors',
            suggestion: 'Senior-friendly trip',
            questions: ['Is Kerala suitable for senior citizens?', 'Which Kerala plan is easiest for older travellers?', 'Can we avoid long walks in Kerala?', 'How can seniors travel comfortably in Kerala?', 'Which route has fewer hotel changes?', 'Is the houseboat suitable for elderly guests?'],
            terms: ['senior citizens', 'older travellers', 'elderly', 'senior friendly', 'limited walking'],
            text: "For older travellers, use a private car, choose lifts or ground-floor rooms, avoid changing hotels every night, and confirm houseboat steps and bathroom access. The 3-day route is easiest; a slowed-down 5-day route also works well.",
            link: ['plan-3-days.html', 'See the easiest route'],
            related: ['accessibility', 'transport', 'houseboat']
        },
        {
            id: 'accessibility',
            suggestion: 'Accessibility',
            questions: ['Is Kerala wheelchair accessible?', 'Which places have easy access?', 'Can someone with limited mobility use a houseboat?', 'How do I plan an accessible Kerala trip?', 'Are there many stairs on this route?', 'Can hotels arrange accessible rooms?'],
            terms: ['wheelchair', 'accessible trip', 'limited mobility', 'step free', 'mobility needs'],
            text: "Accessibility varies greatly by property, boat, and attraction. Ask hotels for exact doorway, lift, bathroom, and step details; request a vehicle with comfortable entry; and confirm the boarding arrangement before paying for any boat trip.",
            link: ['travel-info.html', 'Open planning resources'],
            related: ['seniors', 'hotel-prices', 'booking']
        },
        {
            id: 'budget-general',
            suggestion: 'Trip budget',
            questions: ['How much does a Kerala trip cost?', 'Is Kerala expensive?', 'What budget should I keep for Kerala?', 'Can I travel Kerala cheaply?', 'What is included in the plan budgets?', 'Do the budgets include flights?'],
            terms: ['trip cost', 'kerala budget', 'how expensive', 'travel cheaply', 'include flights'],
            text: "The plan budgets cover stays, travel within Kerala, meals, and core activities for one traveller sharing rooms. They exclude travel to and from Kerala. Every plan has value, comfortable, and premium estimates with a detailed breakdown.",
            link: ['itineraries.html', 'Compare plan budgets'],
            related: ['budget-3', 'budget-5', 'budget-7', 'budget-10']
        },
        {
            id: 'budget-3',
            suggestion: '3-day cost',
            questions: ['How much does the 3-day Kerala trip cost?', 'What is the budget for three days?', 'Can I do Kerala in three days under 20000 rupees?', 'What is the comfortable budget for the 3-day plan?', 'How much is a short Kochi and Alappuzha trip?'],
            terms: ['3 day cost', 'three day budget', '3 day budget', 'under 20000'],
            text: "The 3-day plan estimates INR 13,000-18,000 value, INR 24,000-34,000 comfortable, or INR 48,000-75,000 premium per traveller sharing. Peak dates and private houseboats can increase it.",
            link: ['plan-3-days.html#budget', 'See the 3-day budget'],
            related: ['plan-3', 'hotel-prices', 'houseboat']
        },
        {
            id: 'budget-5',
            suggestion: '5-day cost',
            questions: ['How much does the 5-day Kerala trip cost?', 'What is the budget for five days?', 'Can I do the 5-day plan cheaply?', 'What is the comfortable budget for five days?', 'How much is the Kochi Munnar Thekkady trip?'],
            terms: ['5 day cost', 'five day budget', '5 day budget', 'cost for five days'],
            text: "The 5-day plan estimates INR 24,000-34,000 value, INR 45,000-64,000 comfortable, or INR 88,000-135,000 premium per traveller sharing. Travel to Kerala is separate.",
            link: ['plan-5-days.html#budget', 'See the 5-day budget'],
            related: ['plan-5', 'hotel-prices', 'transport']
        },
        {
            id: 'budget-7',
            suggestion: '7-day cost',
            questions: ['How much does the 7-day Kerala trip cost?', 'What is the budget for one week?', 'How much money do I need for seven days?', 'What is the comfortable budget for the 7-day plan?', 'Is the one-week itinerary expensive?'],
            terms: ['7 day cost', 'seven day budget', 'one week budget', '7 day budget'],
            text: "The 7-day plan estimates INR 36,000-52,000 value, INR 66,000-95,000 comfortable, or INR 130,000-195,000 premium per traveller sharing. Holiday weekends can raise rates.",
            link: ['plan-7-days.html#budget', 'See the 7-day budget'],
            related: ['plan-7', 'hotel-prices', 'offbeat']
        },
        {
            id: 'budget-10',
            suggestion: '10-day cost',
            questions: ['How much does the 10-day Kerala trip cost?', 'What is the budget for ten days?', 'How much money do I need for the long trip?', 'What is the comfortable budget for the 10-day plan?', 'Is north Kerala costly to include?'],
            terms: ['10 day cost', 'ten day budget', '10 day budget', 'long trip cost'],
            text: "The 10-day plan estimates INR 58,000-82,000 value, INR 105,000-150,000 comfortable, or INR 200,000-295,000 premium per traveller sharing. Its long north-south transfers make transport a major cost.",
            link: ['plan-10-days.html#budget', 'See the 10-day budget'],
            related: ['plan-10', 'transport', 'hotel-prices']
        },
        {
            id: 'hotel-prices',
            suggestion: 'Hotels and prices',
            questions: ['Which hotels are included in the plans?', 'How much do Kerala hotels cost?', 'Where should I stay in Munnar?', 'Are hotel prices shown on the site?', 'Can I see possible stays for each plan?', 'Should I book a resort or homestay?'],
            terms: ['hotel prices', 'where to stay', 'possible hotels', 'resort or homestay', 'hotel options'],
            text: "Each trip page has a Hotels section with possible properties, locations, style tags, and indicative nightly price bands. Treat them as a shortlist and check live rates, taxes, meal plans, distance, and cancellation terms.",
            link: ['itineraries.html', 'Choose a plan and view hotels'],
            related: ['booking', 'budget-general', 'homestays']
        },
        {
            id: 'homestays',
            suggestion: 'Homestays',
            questions: ['Are homestays good in Kerala?', 'Should I stay in a homestay?', 'Where can I find village stays?', 'Is Munroe Island good for a homestay?', 'Are homestays suitable for families?'],
            terms: ['homestay', 'village stay', 'local stay', 'stay with a family'],
            text: "Homestays are especially rewarding on Munroe Island, in Wayanad, and around quieter backwater villages. Check recent reviews, room access, meal arrangements, transport pickup, and whether the host can organise local activities.",
            link: ['destination-islands.html', 'Explore island stays'],
            related: ['munroe', 'wayanad', 'booking']
        },
        {
            id: 'best-time',
            suggestion: 'Best time to visit',
            questions: ['What is the best time to visit Kerala?', 'Which month is best for Kerala?', 'When should I plan my Kerala trip?', 'Is winter a good time to visit?', 'What is Kerala like from October to March?', 'When is the tourist season?'],
            terms: ['best time', 'best month', 'when to visit', 'tourist season', 'october to march'],
            text: "October to March is usually the easiest season for a broad Kerala route, with more comfortable sightseeing weather. Hill stations can be cool, while the coast stays warmer. Always check the forecast for your exact dates.",
            link: ['travel-info.html', 'Check seasonal travel notes'],
            related: ['monsoon', 'packing', 'booking']
        },
        {
            id: 'monsoon',
            suggestion: 'Monsoon travel',
            questions: ['Can I visit Kerala during monsoon?', 'Is June a good month for Kerala?', 'What happens during heavy rain?', 'Are houseboats available in monsoon?', 'Is Kerala safe in the rainy season?', 'What can I do when it rains?'],
            terms: ['monsoon', 'rainy season', 'heavy rain', 'visit in june', 'visit in july'],
            text: "Monsoon Kerala is green and atmospheric, but rain can disrupt hill roads, boating, beach access, and outdoor activities. Keep flexible days, avoid tight transfers, check official alerts, and never enter water or trails closed by local authorities.",
            link: ['travel-info.html', 'Open weather and safety links'],
            related: ['rain-backup', 'packing', 'safety']
        },
        {
            id: 'rain-backup',
            suggestion: 'Rainy-day ideas',
            questions: ['What can we do in Kerala on a rainy day?', 'Which activities work when it rains?', 'What is a backup plan for Munnar rain?', 'What indoor attractions are there in Kochi?', 'How do I change the itinerary for bad weather?'],
            terms: ['rainy day', 'backup plan', 'bad weather plan', 'indoor activities'],
            text: "Use rainy periods for museums and cafes in Kochi, a cultural performance, a cooking experience, spice shopping, or a relaxed hotel day. In the hills, shorten viewpoint drives and avoid waterfalls or trails when conditions are unsafe.",
            link: ['experiences.html', 'Browse flexible experiences'],
            related: ['monsoon', 'kochi', 'culture']
        },
        {
            id: 'packing',
            suggestion: 'Packing list',
            questions: ['What should I pack for Kerala?', 'What clothes should I wear in Kerala?', 'Do I need a raincoat?', 'What should I carry for Munnar?', 'What footwear is best?', 'Do I need warm clothes in the hills?'],
            terms: ['what to pack', 'packing list', 'what clothes', 'raincoat', 'footwear', 'warm clothes'],
            text: "Pack light breathable clothing, modest layers for religious sites, comfortable walking shoes, sun protection, insect repellent, a reusable water bottle, and a compact rain layer. Add a light sweater for cool Munnar mornings.",
            link: ['travel-info.html', 'Read practical travel notes'],
            related: ['best-time', 'monsoon', 'health']
        },
        {
            id: 'airports',
            suggestion: 'Nearest airport',
            questions: ['Which airport should I fly to for Kerala?', 'What is the nearest airport to Munnar?', 'Which airport is best for Kochi?', 'How do I fly to Varkala?', 'Which airport works for Wayanad?', 'Can I enter through Kochi and leave from another airport?'],
            terms: ['which airport', 'nearest airport', 'fly to kerala', 'airport for munnar', 'airport for varkala'],
            text: "Kochi is the simplest gateway for the classic Kochi-Munnar-Thekkady-backwaters circuit. Thiruvananthapuram suits Varkala and the south coast. Kozhikode or Kannur may suit Wayanad and north Kerala. An open-jaw route can reduce backtracking.",
            link: ['travel-info.html', 'See arrival planning notes'],
            related: ['transport', 'route-order', 'plan-10']
        },
        {
            id: 'transport',
            suggestion: 'Getting around',
            questions: ['How do I travel around Kerala?', 'Should I hire a private car?', 'Are buses good for tourists?', 'Can I use trains between Kerala cities?', 'Is self-driving easy in Kerala?', 'How long do hill transfers take?', 'Are taxis available?', 'What is the cheapest way to travel?'],
            terms: ['getting around', 'private car', 'public bus', 'by train', 'self drive', 'taxi', 'local transport'],
            text: "Trains work well between larger cities and the coast; buses are economical; a private car is easiest for hills and multi-stop plans. Kerala road distances can look short but take longer than expected, so avoid major sightseeing after long transfers.",
            link: ['travel-info.html', 'Open transport notes'],
            related: ['airports', 'route-order', 'budget-general']
        },
        {
            id: 'route-order',
            suggestion: 'Route order',
            questions: ['What order should I visit Kerala places?', 'Should I go to Munnar or Alappuzha first?', 'How can I avoid backtracking?', 'Where should my Kerala trip start and end?', 'Can I reverse the itinerary?', 'How do I plan airport transfers?'],
            terms: ['route order', 'avoid backtracking', 'start and end', 'reverse itinerary', 'which place first'],
            text: "For a Kochi arrival, a practical classic order is Kochi, Munnar, Thekkady, then Alappuzha or Kumarakom. Continue south to Varkala and depart from Thiruvananthapuram, or return to Kochi if your ticket requires it.",
            link: ['itineraries.html', 'Compare route maps'],
            related: ['airports', 'transport', 'choose-plan']
        },
        {
            id: 'kochi',
            suggestion: 'Kochi',
            questions: ['What should I see in Kochi?', 'How many days do I need in Fort Kochi?', 'Is Kochi worth visiting?', 'What is famous in Mattancherry?', 'Where can I watch Kathakali in Kochi?', 'What food should I try in Kochi?'],
            terms: ['fort kochi', 'mattancherry', 'things to do in kochi', 'visit kochi', 'kochi famous'],
            text: "Give Kochi one or two days for the Fort Kochi waterfront, heritage streets, St. Francis Church, Mattancherry, spice lanes, cafes, and an evening cultural performance. It is also the easiest arrival base for the classic route.",
            link: ['destination-kochi.html', 'Explore Kochi'],
            related: ['culture', 'food', 'kadamakkudy']
        },
        {
            id: 'munnar',
            suggestion: 'Munnar',
            questions: ['What is Munnar famous for?', 'How many days should I stay in Munnar?', 'What can I do in Munnar?', 'Are the tea gardens worth visiting?', 'Is Munnar cold?', 'Where should I stay in Munnar?', 'Can children enjoy Munnar?'],
            terms: ['munnar', 'tea gardens', 'tea estate', 'tea plantation', 'hill station'],
            text: "Munnar is known for tea-covered hills, viewpoints, waterfalls, plantation experiences, and cool mornings. Stay at least two nights, group sights by area, and let weather decide how many viewpoints you attempt.",
            link: ['destination-munnar.html', 'Explore Munnar'],
            related: ['packing', 'plan-5', 'hotel-prices']
        },
        {
            id: 'alappuzha',
            suggestion: 'Alappuzha',
            questions: ['What is Alappuzha famous for?', 'Is Alleppey the same as Alappuzha?', 'What can I do in Alappuzha?', 'Should I stay on a houseboat?', 'How many days are enough for Alappuzha?', 'Are there beaches in Alappuzha?', 'Can I take a day cruise?'],
            terms: ['alappuzha', 'alleppey', 'alappy', 'alappuzha backwaters'],
            text: "Alappuzha, also called Alleppey, is the classic houseboat and backwater base. One overnight cruise or a day cruise plus a land stay is usually enough for a first visit.",
            link: ['destination-alappuzha.html', 'Explore Alappuzha'],
            related: ['houseboat', 'backwater-choice', 'plan-3']
        },
        {
            id: 'kumarakom',
            suggestion: 'Kumarakom',
            questions: ['What can I do in Kumarakom?', 'Is Kumarakom better than Alleppey?', 'Where should I stay near Vembanad Lake?', 'Is Kumarakom good for birdwatching?', 'How many nights should I spend in Kumarakom?', 'Can I do a backwater resort instead of a houseboat?'],
            terms: ['kumarakom', 'vembanad lake', 'bird sanctuary', 'backwater resort'],
            text: "Kumarakom suits travellers who prefer a slower lakeside resort stay, birding, and shorter cruises. Choose it over Alappuzha when comfort and a relaxed base matter more than the classic overnight houseboat route.",
            link: ['destination-kumarakom.html', 'Explore Kumarakom'],
            related: ['backwater-choice', 'houseboat', 'hotel-prices']
        },
        {
            id: 'thekkady',
            suggestion: 'Thekkady',
            questions: ['What is Thekkady famous for?', 'What can I do near Periyar?', 'Is Periyar boating worth it?', 'How many nights should I stay in Thekkady?', 'Can I visit a spice garden?', 'Will I see elephants in Periyar?', 'Is Thekkady suitable for children?'],
            terms: ['thekkady', 'periyar', 'spice garden', 'tiger reserve', 'periyar boating'],
            text: "Thekkady is the base for the Periyar landscape, spice gardens, nature activities, and cultural evenings. Plan one night, choose one main activity, and never expect guaranteed wildlife sightings.",
            link: ['experiences.html', 'Explore nature experiences'],
            related: ['wildlife', 'plan-5', 'culture']
        },
        {
            id: 'wayanad',
            suggestion: 'Wayanad',
            questions: ['What is Wayanad famous for?', 'How many days should I stay in Wayanad?', 'What can I do in Wayanad?', 'Is Wayanad good for nature lovers?', 'Can I add Wayanad to a south Kerala trip?', 'Where should I stay in Wayanad?'],
            terms: ['wayanad', 'edakkal', 'wayanad forest', 'wayanad waterfalls'],
            text: "Wayanad offers rainforest stays, plantations, caves, waterfalls, and highland scenery. Give it two or three nights. It is far from the classic south Kerala circuit, so it fits the 10-day plan better than a short trip.",
            link: ['destination-wayanad.html', 'Explore Wayanad'],
            related: ['plan-10', 'wildlife', 'hotel-prices']
        },
        {
            id: 'varkala',
            suggestion: 'Varkala',
            questions: ['What is Varkala famous for?', 'How many days should I spend in Varkala?', 'Is Varkala good for families?', 'What can I do near Varkala Cliff?', 'Should I finish my trip in Varkala?', 'Is Varkala better than Kovalam?'],
            terms: ['varkala', 'varkala cliff', 'varkala beach', 'papanasam'],
            text: "Varkala is known for its cliff-top path, sea views, cafes, and beach. One or two nights make a relaxed finish after the backwaters. Swimming conditions change, so follow lifeguards and local warnings.",
            link: ['destination-varkala-kovalam.html', 'Explore Varkala'],
            related: ['kovalam', 'beach-safety', 'plan-7']
        },
        {
            id: 'kovalam',
            suggestion: 'Kovalam',
            questions: ['What is Kovalam famous for?', 'How many days should I spend in Kovalam?', 'Is Kovalam good for children?', 'What can I see near Kovalam lighthouse?', 'Is Kovalam better than Varkala?', 'How far is Kovalam from Thiruvananthapuram?'],
            terms: ['kovalam', 'kovalam beach', 'lighthouse beach', 'kovalam lighthouse'],
            text: "Kovalam is a convenient beach base close to Thiruvananthapuram, with lighthouse views and established hotels. Pick it for easier city and airport access; pick Varkala for the cliff setting.",
            link: ['destination-varkala-kovalam.html', 'Compare the coast'],
            related: ['varkala', 'thiruvananthapuram', 'beach-safety']
        },
        {
            id: 'thiruvananthapuram',
            suggestion: 'Thiruvananthapuram',
            questions: ['What can I see in Thiruvananthapuram?', 'Is Trivandrum worth visiting?', 'Which airport is near Varkala?', 'Can I end my Kerala trip in Trivandrum?', 'What museums are in the capital?', 'How many days do I need in Thiruvananthapuram?'],
            terms: ['thiruvananthapuram', 'trivandrum', 'kerala capital', 'capital city'],
            text: "Thiruvananthapuram is Kerala's capital and a useful gateway for Varkala and Kovalam. Add a day for museums, city heritage, and local food, or use it mainly for the airport connection.",
            link: ['travel-info.html', 'Plan the south Kerala connection'],
            related: ['airports', 'varkala', 'kovalam']
        },
        {
            id: 'kadamakkudy',
            suggestion: 'Kadamakkudy',
            questions: ['What are the Kadamakkudy Islands?', 'How do I visit Kadamakkudy?', 'Is Kadamakkudy near Kochi?', 'What time should I visit Kadamakkudy?', 'Can I cycle at Kadamakkudy?', 'Is Kadamakkudy included in a plan?'],
            terms: ['kadamakkudy', 'kadamakkudy islands', 'islands near kochi'],
            text: "Kadamakkudy is a cluster of lived-in islands near Kochi with wetlands, fishing scenes, paddy fields, and narrow village roads. Visit early, carry water, travel quietly, and avoid blocking local traffic.",
            link: ['destination-islands.html', 'Explore Kerala islands'],
            related: ['offbeat', 'kochi', 'plan-7']
        },
        {
            id: 'munroe',
            suggestion: 'Munroe Island',
            questions: ['What can I do on Munroe Island?', 'Is Munroe Island worth visiting?', 'How many nights should I stay on Munroe Island?', 'Where can I take a small canoe ride?', 'Is Munroe Island better than a houseboat?', 'Can I stay in a village homestay?'],
            terms: ['munroe island', 'munro island', 'small canoe', 'ashtamudi canals'],
            text: "Munroe Island offers narrow-canal canoe trips, quiet village roads, homestays, and Ashtamudi backwater scenery. Stay one night and arrange the canoe through a reliable local host, with timing adjusted for water and weather.",
            link: ['destination-islands.html', 'Explore Munroe Island'],
            related: ['backwater-choice', 'homestays', 'plan-7']
        },
        {
            id: 'valiyaparamba',
            suggestion: 'Valiyaparamba',
            questions: ['What is Valiyaparamba?', 'Where are the north Kerala islands?', 'Is Valiyaparamba worth visiting?', 'Can I combine Bekal and Valiyaparamba?', 'How do I reach Valiyaparamba?', 'What can I do near Bekal?'],
            terms: ['valiyaparamba', 'bekal', 'north kerala islands', 'kasaragod backwaters'],
            text: "Valiyaparamba is a quieter north Kerala island-backwater area that pairs well with Bekal Fort and Malabar food. It is best for the 10-day route because reaching Kasaragod from the south takes time.",
            link: ['destination-islands.html', 'Explore the north Kerala islands'],
            related: ['plan-10', 'offbeat', 'transport']
        },
        {
            id: 'offbeat',
            suggestion: 'Offbeat places',
            questions: ['Which are the best offbeat places in Kerala?', 'Where can I avoid crowds?', 'Are there quiet islands in Kerala?', 'Which hidden places are included in the plans?', 'What is a less touristy Kerala route?', 'Can I visit villages and small canals?', 'Which plan includes offbeat destinations?'],
            terms: ['offbeat places', 'avoid crowds', 'hidden places', 'less touristy', 'quiet islands', 'unusual places'],
            text: "Start with Kadamakkudy near Kochi, Munroe Island near Kollam, and Valiyaparamba in north Kerala. The 7-day plan includes Kadamakkudy and Munroe; the 10-day plan adds Valiyaparamba and Bekal.",
            link: ['destination-islands.html', 'Explore offbeat islands'],
            related: ['plan-7', 'plan-10', 'responsible']
        },
        {
            id: 'houseboat',
            suggestion: 'Houseboats',
            questions: ['How do Kerala houseboats work?', 'Should I book an overnight houseboat?', 'What is included on a houseboat?', 'Are meals served on houseboats?', 'How do I choose a safe houseboat?', 'Is a day cruise better than an overnight cruise?', 'Do houseboats have bathrooms?', 'How early should I book a houseboat?'],
            terms: ['houseboat', 'overnight cruise', 'day cruise', 'boat cabin', 'house boat'],
            text: "An overnight houseboat usually boards around midday, cruises through the afternoon, anchors for the night, and includes meals before a morning return. Confirm the exact boat, cabin, bathroom, safety equipment, route, meal plan, and cancellation terms before paying.",
            link: ['destination-alappuzha.html', 'Plan an Alappuzha cruise'],
            related: ['backwater-choice', 'family', 'booking']
        },
        {
            id: 'backwater-choice',
            suggestion: 'Best backwaters',
            questions: ['Which backwater destination should I choose?', 'Is Alappuzha or Kumarakom better?', 'Is Munroe Island better than Alleppey?', 'Where can I take a small canoe?', 'Should I choose a resort or houseboat?', 'What is the quietest backwater experience?'],
            terms: ['best backwaters', 'alappuzha or kumarakom', 'munroe or alleppey', 'quiet backwaters', 'small canoe'],
            text: "Choose Alappuzha for the classic houseboat, Kumarakom for a lakeside resort and short cruises, or Munroe Island for a quieter homestay and small-canoe experience through narrow canals.",
            link: ['destination-islands.html', 'Compare backwater styles'],
            related: ['alappuzha', 'kumarakom', 'munroe']
        },
        {
            id: 'food',
            suggestion: 'Kerala food',
            questions: ['What food should I try in Kerala?', 'What is Kerala famous for eating?', 'What is a traditional Kerala breakfast?', 'Where can I try a Kerala sadya?', 'What snacks should I taste?', 'Is Kerala food very spicy?', 'What should kids try?'],
            terms: ['kerala food', 'what to eat', 'traditional breakfast', 'kerala sadya', 'local dishes', 'kerala snacks'],
            text: "Try appam with stew, puttu with kadala curry, dosa, idiyappam, Kerala-style fish curry, Malabar biryani, banana chips, and a vegetarian sadya. Ask for less chilli when needed and choose busy, clean restaurants.",
            link: ['experiences.html', 'Explore Kerala experiences'],
            related: ['vegetarian', 'seafood', 'kochi']
        },
        {
            id: 'vegetarian',
            suggestion: 'Vegetarian food',
            questions: ['Is vegetarian food easy to find in Kerala?', 'What vegetarian Kerala dishes should I try?', 'Can vegans eat well in Kerala?', 'Does Kerala food contain coconut?', 'Where can I get a vegetarian sadya?', 'Can restaurants handle food allergies?'],
            terms: ['vegetarian food', 'vegan food', 'food allergies', 'vegetarian sadya', 'veg options'],
            text: "Vegetarian food is easy to find. Try sadya, appam with vegetable stew, puttu with kadala curry, dosa, idiyappam, thoran, and avial. For vegan or allergy needs, ask clearly about dairy, ghee, coconut, nuts, and cross-contact.",
            link: ['experiences.html', 'Explore food and culture'],
            related: ['food', 'health', 'seafood']
        },
        {
            id: 'seafood',
            suggestion: 'Seafood',
            questions: ['Where can I eat good seafood in Kerala?', 'What Kerala fish dishes should I try?', 'Is seafood safe to eat?', 'What food is famous on the coast?', 'Can I eat seafood in Fort Kochi?', 'What is Malabar seafood like?'],
            terms: ['seafood', 'fish curry', 'coastal food', 'prawns', 'karimeen'],
            text: "Coastal Kerala is known for fish curry, prawns, pearl spot, and regionally different coconut-based preparations. Choose a busy restaurant, ask the price before ordering whole fish, and mention allergies clearly.",
            link: ['experiences.html', 'Explore Kerala cuisine'],
            related: ['food', 'kochi', 'valiyaparamba']
        },
        {
            id: 'culture',
            suggestion: 'Culture and shows',
            questions: ['Where can I watch Kathakali?', 'What cultural shows should I see?', 'What is Kalaripayattu?', 'Where can I see Theyyam?', 'What should I know before visiting a temple?', 'Is Kathakali suitable for children?', 'What festivals are famous in Kerala?', 'Can I watch a traditional performance in Kochi?'],
            terms: ['kathakali', 'kalaripayattu', 'theyyam', 'cultural show', 'traditional performance', 'kerala festival'],
            text: "Kathakali and Kalaripayattu shows are easy to add in Kochi or Thekkady. Theyyam is strongly associated with north Kerala and is seasonal. Dress respectfully at religious sites and verify entry rules and performance schedules locally.",
            link: ['experiences.html', 'Explore culture'],
            related: ['kochi', 'thekkady', 'official-info']
        },
        {
            id: 'beach-safety',
            suggestion: 'Beach safety',
            questions: ['Is it safe to swim at Kerala beaches?', 'Can children swim at Varkala?', 'Are there lifeguards at Kovalam?', 'Can I swim during monsoon?', 'Which Kerala beach is safest?', 'What do red flags on the beach mean?'],
            terms: ['safe to swim', 'beach safety', 'swim during monsoon', 'lifeguard', 'red flag'],
            text: "Sea conditions change quickly. Swim only in permitted areas, follow lifeguards and warning flags, keep children within reach, and avoid the water during rough monsoon conditions or after official warnings.",
            link: ['destination-varkala-kovalam.html', 'Explore Kerala beaches'],
            related: ['varkala', 'kovalam', 'family']
        },
        {
            id: 'wildlife',
            suggestion: 'Wildlife',
            questions: ['Where can I see wildlife in Kerala?', 'Will I definitely see elephants?', 'Is Periyar good for wildlife?', 'Are Wayanad safaris available?', 'Can I walk alone in forest areas?', 'How should I behave around wild animals?', 'Is a wildlife trip suitable for children?'],
            terms: ['see wildlife', 'see elephants', 'wild animals', 'forest safari', 'wildlife trip'],
            text: "Periyar and Wayanad are strong nature bases, but sightings are never guaranteed. Use authorised activities, follow guides, keep distance from animals, never feed them, and do not stop on roads to approach wildlife.",
            link: ['destination-wayanad.html', 'Explore Wayanad nature'],
            related: ['thekkady', 'wayanad', 'safety']
        },
        {
            id: 'safety',
            suggestion: 'Travel safety',
            questions: ['Is Kerala safe for tourists?', 'Is Kerala safe at night?', 'What safety precautions should I take?', 'Is Kerala safe for women?', 'How do I avoid travel scams?', 'What should I do in an emergency?', 'Are hill roads safe?', 'Can I trust local taxis?'],
            terms: ['is kerala safe', 'safety precautions', 'safe at night', 'avoid scams', 'emergency', 'safe for women'],
            text: "Use registered transport, keep valuables secure, avoid isolated areas late at night, share long-trip details, follow weather and local safety notices, and verify prices before accepting services. Call local emergency services when immediate help is needed.",
            link: ['travel-info.html', 'Open safety resources'],
            related: ['solo', 'health', 'official-info']
        },
        {
            id: 'health',
            suggestion: 'Health tips',
            questions: ['Do I need mosquito repellent in Kerala?', 'Is tap water safe to drink?', 'What health items should I pack?', 'How do I avoid travel sickness on hill roads?', 'Are leeches common in forests?', 'What should I do if I feel unwell?'],
            terms: ['mosquito', 'tap water', 'travel sickness', 'leeches', 'feel unwell', 'health tips'],
            text: "Carry insect repellent, drink sealed or reliably filtered water, use sun protection, and keep personal medicines with you. For winding hill roads, eat lightly and carry motion-sickness medicine recommended by your doctor. Seek local medical help for significant symptoms.",
            link: ['travel-info.html', 'Open practical information'],
            related: ['packing', 'safety', 'wildlife']
        },
        {
            id: 'language-money',
            suggestion: 'Language and money',
            questions: ['What language is spoken in Kerala?', 'Can people understand English?', 'What currency is used?', 'Are cards accepted in Kerala?', 'Should I carry cash?', 'Are ATMs easy to find?', 'Do I need to tip?', 'Can I use UPI as a tourist?'],
            terms: ['language spoken', 'speak english', 'currency', 'carry cash', 'cards accepted', 'atm', 'tipping', 'upi'],
            text: "Malayalam is the main language, and English is commonly understood in tourism settings. India uses the rupee. Cards and digital payments are common in towns, but carry some cash for villages, small boats, local buses, and network outages.",
            link: ['travel-info.html', 'Read Kerala travel basics'],
            related: ['connectivity', 'shopping', 'offbeat']
        },
        {
            id: 'connectivity',
            suggestion: 'Internet and mobile',
            questions: ['Will my phone work in Kerala?', 'Is mobile internet good in Kerala?', 'Do hotels have Wi-Fi?', 'Will I get signal in Munnar?', 'Can I use maps in remote places?', 'Should I download offline maps?'],
            terms: ['mobile internet', 'phone signal', 'wifi', 'wi fi', 'offline maps', 'network coverage'],
            text: "Mobile data is generally useful in towns, but signal can weaken in hills, forests, islands, and during bad weather. Download maps, tickets, hotel details, and driver numbers before long transfers.",
            link: ['travel-info.html', 'Open practical travel notes'],
            related: ['transport', 'offbeat', 'safety']
        },
        {
            id: 'responsible',
            suggestion: 'Responsible travel',
            questions: ['How can I travel responsibly in Kerala?', 'How should I behave in village areas?', 'Can I use plastic on backwater trips?', 'How do I respect local communities?', 'What should I avoid in offbeat places?', 'Can I photograph local people?'],
            terms: ['responsible travel', 'respect local', 'village etiquette', 'avoid plastic', 'local communities'],
            text: "Carry reusable water bottles, reduce single-use plastic, use local guides and stays, ask before photographing people, keep noise low, dress respectfully, and never block working village roads or waterways for pictures.",
            link: ['destination-islands.html', 'Visit island communities thoughtfully'],
            related: ['photography', 'offbeat', 'shopping']
        },
        {
            id: 'shopping',
            suggestion: 'Shopping',
            questions: ['What souvenirs should I buy in Kerala?', 'Where can I buy Kerala spices?', 'What is good to shop for in Kochi?', 'Can I buy tea in Munnar?', 'How do I avoid fake products?', 'Are handicrafts available?'],
            terms: ['souvenirs', 'buy spices', 'buy tea', 'shopping in kochi', 'handicrafts'],
            text: "Popular purchases include tea, spices, banana chips, coir products, crafts, and handloom items. Buy packaged food from reliable shops, compare quality and price, and keep receipts for higher-value purchases.",
            link: ['experiences.html', 'Explore local experiences'],
            related: ['kochi', 'munnar', 'responsible']
        },
        {
            id: 'photography',
            suggestion: 'Photography',
            questions: ['Where are the best photo spots in Kerala?', 'Can I use a drone in Kerala?', 'Can I photograph inside temples?', 'What time is best for backwater photos?', 'Can I take pictures of village life?', 'Where can I photograph tea gardens?'],
            terms: ['photo spots', 'photography', 'use a drone', 'take pictures', 'photograph people'],
            text: "Early morning and late afternoon suit tea hills, islands, beaches, and backwaters. Ask before photographing people, obey signs at religious and protected sites, and check current aviation and local rules before any drone use.",
            link: ['destinations.html', 'Find places to photograph'],
            related: ['responsible', 'munnar', 'offbeat']
        },
        {
            id: 'booking',
            suggestion: 'Booking advice',
            questions: ['How early should I book Kerala hotels?', 'When should I book a houseboat?', 'Should I pay the full amount in advance?', 'What should I check before booking?', 'Are cancellation policies important?', 'How can I avoid booking problems?'],
            terms: ['how early to book', 'before booking', 'pay in advance', 'cancellation policy', 'booking advice'],
            text: "Book earlier for December-January, long weekends, and limited-room stays. Confirm the exact room or boat, taxes, meals, pickup point, inclusions, child policy, cancellation terms, and a written payment receipt.",
            link: ['travel-info.html', 'Open booking resources'],
            related: ['hotel-prices', 'houseboat', 'official-info']
        }
    ];

    const assistantQuestionCount = assistantReplies.reduce((total, reply) => total + reply.questions.length, 0);
    const assistantHistoryKey = 'visitKeralaAssistantHistoryV2';
    const defaultAssistantSuggestions = ['choose-plan', 'best-time', 'budget-general', 'offbeat'];
    const assistantStopWords = new Set('a an and are can do does for from how i in is it me my of on or should the to we what when where which with you your'.split(' '));

    const normalizeAssistantText = text => {
        const numberWords = { three: '3', five: '5', seven: '7', ten: '10' };

        return text
            .toLowerCase()
            .replace(/'/g, '')
            .replace(/[^a-z0-9\s]/g, ' ')
            .replace(/\s+/g, ' ')
            .trim()
            .split(' ')
            .map(word => numberWords[word] || word)
            .join(' ');
    };

    const getAssistantTokens = text => new Set(
        normalizeAssistantText(text)
            .split(' ')
            .filter(word => word.length > 1 && !assistantStopWords.has(word))
    );

    const readAssistantHistory = () => {
        try {
            const history = JSON.parse(sessionStorage.getItem(assistantHistoryKey));
            return Array.isArray(history) ? history.slice(-24) : [];
        } catch {
            return [];
        }
    };

    const saveAssistantHistory = item => {
        try {
            const history = [...readAssistantHistory(), item].slice(-24);
            sessionStorage.setItem(assistantHistoryKey, JSON.stringify(history));
        } catch {
            // The guide still works when browser storage is disabled.
        }
    };

    const addAssistantMessage = (kind, text, link, persist = true) => {
        const message = document.createElement('div');
        message.className = 'assistant-message ' + kind;
        const paragraph = document.createElement('p');
        paragraph.textContent = text;
        message.append(paragraph);

        if (link) {
            const anchor = document.createElement('a');
            anchor.href = link[0];
            anchor.textContent = link[1];
            message.append(anchor);
        }

        assistantMessages.append(message);
        assistantMessages.scrollTop = assistantMessages.scrollHeight;

        if (persist) saveAssistantHistory({ kind, text, link: link || null });
    };

    const getAssistantEntry = id => assistantReplies.find(reply => reply.id === id);

    const renderAssistantSuggestions = ids => {
        const replies = ids
            .map(getAssistantEntry)
            .filter(Boolean)
            .slice(0, 4);

        assistantSuggestions.replaceChildren();

        replies.forEach(reply => {
            const button = document.createElement('button');
            button.className = 'assistant-suggestion';
            button.type = 'button';
            button.dataset.prompt = reply.questions[0];
            button.textContent = reply.suggestion;
            assistantSuggestions.append(button);
        });
    };

    const scoreAssistantReply = (reply, normalizedQuestion, questionTokens) => {
        let bestQuestionScore = 0;
        let termScore = 0;

        reply.questions.forEach(sampleQuestion => {
            const normalizedSample = normalizeAssistantText(sampleQuestion);

            if (normalizedSample === normalizedQuestion) {
                bestQuestionScore = Math.max(bestQuestionScore, 500);
                return;
            }

            if (
                normalizedQuestion.length >= 8 &&
                (normalizedQuestion.includes(normalizedSample) || normalizedSample.includes(normalizedQuestion))
            ) {
                bestQuestionScore = Math.max(bestQuestionScore, 140);
            }

            const sampleTokens = getAssistantTokens(normalizedSample);
            const overlap = [...questionTokens].filter(token => sampleTokens.has(token)).length;

            if (!overlap) return;

            const userCoverage = overlap / Math.max(questionTokens.size, 1);
            const sampleCoverage = overlap / Math.max(sampleTokens.size, 1);
            const overlapScore = (overlap * 12) + (userCoverage * 34) + (sampleCoverage * 20);
            bestQuestionScore = Math.max(bestQuestionScore, overlapScore);
        });

        const normalizedTerms = new Set(reply.terms.map(normalizeAssistantText));

        normalizedTerms.forEach(normalizedTerm => {
            const termTokens = normalizedTerm.split(' ').filter(Boolean);

            if (normalizedQuestion.includes(normalizedTerm)) {
                termScore += 34 + (termTokens.length * 8);
                return;
            }

            if (termTokens.length > 1 && termTokens.every(token => questionTokens.has(token))) {
                termScore += 24;
            }
        });

        return bestQuestionScore + termScore;
    };

    const getAssistantReply = (question) => {
        const normalizedQuestion = normalizeAssistantText(question);
        const questionTokens = getAssistantTokens(normalizedQuestion);
        const hasBudgetIntent = /(budget|cost|price|money|expensive|how much)/.test(normalizedQuestion);
        const durationRoutes = [
            { pattern: /\b3 days?\b/, plan: 'plan-3', budget: 'budget-3' },
            { pattern: /\b5 days?\b/, plan: 'plan-5', budget: 'budget-5' },
            { pattern: /\b(7 days?|one week)\b/, plan: 'plan-7', budget: 'budget-7' },
            { pattern: /\b10 days?\b/, plan: 'plan-10', budget: 'budget-10' }
        ];
        const audienceRoutes = [
            { pattern: /\b(kid|kids|child|children|family|families)\b/, id: 'family' },
            { pattern: /\b(solo|alone|female traveller|woman travelling)\b/, id: 'solo' },
            { pattern: /\b(couple|couples|honeymoon|romantic)\b/, id: 'couples' },
            { pattern: /\b(senior|seniors|elderly|older traveller)\b/, id: 'seniors' }
        ];

        if (/^(hi|hello|hey|namaste|good morning|good evening)$/.test(normalizedQuestion)) {
            return getAssistantEntry('help');
        }

        const durationRoute = durationRoutes.find(route => route.pattern.test(normalizedQuestion));
        if (durationRoute) return getAssistantEntry(hasBudgetIntent ? durationRoute.budget : durationRoute.plan);

        const audienceRoute = audienceRoutes.find(route => route.pattern.test(normalizedQuestion));
        if (audienceRoute) return getAssistantEntry(audienceRoute.id);

        const rankedReplies = assistantReplies
            .map(reply => ({ reply, score: scoreAssistantReply(reply, normalizedQuestion, questionTokens) }))
            .sort((left, right) => right.score - left.score);

        if (rankedReplies[0]?.score >= 38) return rankedReplies[0].reply;

        return {
            id: 'fallback',
            text: "I could not match that confidently yet. Ask about a specific place, trip length, budget, hotel, transport option, season, food, safety topic, houseboat, or offbeat island.",
            link: ['destinations.html', 'Browse Kerala destinations'],
            related: defaultAssistantSuggestions
        };
    };

    const askAssistant = (question) => {
        const cleanQuestion = question.trim();
        if (!cleanQuestion) return;

        addAssistantMessage('user', cleanQuestion);
        assistantInput.value = '';
        const typing = document.createElement('div');
        typing.className = 'assistant-message bot typing';
        typing.innerHTML = '<span></span><span></span><span></span>';
        assistantMessages.append(typing);
        assistantMessages.scrollTop = assistantMessages.scrollHeight;

        window.setTimeout(() => {
            typing.remove();
            const reply = getAssistantReply(cleanQuestion);
            addAssistantMessage('bot', reply.text, reply.link);
            renderAssistantSuggestions(reply.related || defaultAssistantSuggestions);
        }, 320);
    };

    const storedAssistantHistory = readAssistantHistory();

    if (storedAssistantHistory.length) {
        storedAssistantHistory.forEach(item => addAssistantMessage(item.kind, item.text, item.link, false));
    } else {
        addAssistantMessage(
            'bot',
            'Hi. I can answer ' + assistantQuestionCount + '+ common questions about Kerala plans, places, costs, stays, food, transport, weather, and safety.',
            null,
            false
        );
    }

    renderAssistantSuggestions(defaultAssistantSuggestions);

    assistantToggle.addEventListener('click', () => {
        const isOpen = assistantPanel.classList.toggle('is-open');
        assistantToggle.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) assistantInput.focus();
    });

    assistantClose.addEventListener('click', () => {
        assistantPanel.classList.remove('is-open');
        assistantToggle.setAttribute('aria-expanded', 'false');
        assistantToggle.focus();
    });

    assistantClear.addEventListener('click', () => {
        try {
            sessionStorage.removeItem(assistantHistoryKey);
        } catch {
            // Nothing else is needed when storage is unavailable.
        }

        assistantMessages.replaceChildren();
        addAssistantMessage(
            'bot',
            'Conversation cleared. Ask me about a Kerala place, plan, budget, hotel, route, or travel concern.',
            null,
            false
        );
        renderAssistantSuggestions(defaultAssistantSuggestions);
        assistantInput.focus();
    });

    assistantForm.addEventListener('submit', event => {
        event.preventDefault();
        askAssistant(assistantInput.value);
    });

    assistantSuggestions.addEventListener('click', event => {
        const button = event.target.closest('.assistant-suggestion');
        if (button) askAssistant(button.dataset.prompt);
    });

    window.__keralaAssistant = {
        questionCount: assistantQuestionCount,
        replyCount: assistantReplies.length,
        match: question => getAssistantReply(question).id
    };
});
