from pathlib import Path
from urllib.request import Request, urlopen

from reportlab.lib.colors import HexColor, white
from reportlab.lib.pagesizes import A4
from reportlab.lib.utils import ImageReader
from reportlab.pdfbase.pdfmetrics import stringWidth
from reportlab.pdfgen import canvas


ROOT = Path(__file__).parent
OUTPUT = ROOT / "brochures"
ASSETS = ROOT / "tmp" / "brochures"
PAGE_WIDTH, PAGE_HEIGHT = A4
GREEN = HexColor("#0A3222")
GOLD = HexColor("#C5A059")
INK = HexColor("#1C1C1C")
MUTED = HexColor("#646464")

PLANS = [
    {
        "file": "kerala-3-day-kochi-backwaters.pdf",
        "label": "SHORT VACATION",
        "title": "3-Day Kochi + Backwaters",
        "summary": "Heritage lanes, a cultural evening, and one unhurried night on Kerala's backwaters.",
        "route": "Kochi  /  Fort Kochi  /  Mattancherry  /  Alappuzha",
        "image": "images/tourists-valiyaparamba.webp",
        "days": [
            ("DAY 1", "Arrive in Kochi", "Fort Kochi, Mattancherry, Chinese fishing nets, and an optional Kathakali evening."),
            ("DAY 2", "Alappuzha Houseboat", "Cruise the canals and paddy fields, then stay on the backwaters."),
            ("DAY 3", "Morning on the Water", "Breakfast afloat, a return to Kochi, and time for spices or crafts before departure."),
        ],
        "budget": [
            ("VALUE", "INR 13,000-18,000", "Simple stays, shared transfers and a standard shared houseboat."),
            ("COMFORTABLE", "INR 24,000-34,000", "Well-rated hotels, private transfer and a better houseboat cabin."),
            ("PREMIUM", "INR 48,000-75,000", "Heritage accommodation, chauffeur travel and a premium private houseboat."),
        ],
        "audience": "Families / Children / First-Time Visitors / Couples",
        "travel": [("Kochi to Alappuzha", "1.5-2 hr"), ("Alappuzha to Kochi", "1.5-2 hr")],
    },
    {
        "file": "kerala-5-day-hills-houseboat.pdf",
        "label": "BALANCED ESCAPE",
        "title": "5-Day Hills + Houseboat",
        "summary": "A first-timer Kerala loop: tea country, spice landscapes, and a complete backwater experience.",
        "route": "Kochi  /  Munnar  /  Thekkady  /  Alappuzha",
        "image": "68.jpg",
        "days": [
            ("DAY 1", "Kochi Arrival", "A gentle heritage walk through Fort Kochi or Mattancherry after arrival."),
            ("DAY 2", "Munnar", "Tea estates, viewpoints, and a cool highland stay."),
            ("DAY 3", "Thekkady", "Spice garden, Periyar region, and a nature-based experience."),
            ("DAY 4", "Alappuzha", "Houseboat cruise through canals and village scenery."),
            ("DAY 5", "Return to Kochi", "Morning cruise and onward connection from Kochi."),
        ],
        "budget": [
            ("VALUE", "INR 24,000-34,000", "Simple stays, shared transport, local meals and a standard houseboat."),
            ("COMFORTABLE", "INR 45,000-64,000", "Comfortable resorts, private car and an upgraded houseboat."),
            ("PREMIUM", "INR 88,000-135,000", "Premium hill resorts, chauffeur travel and a luxury houseboat."),
        ],
        "audience": "Families / Children / Nature Lovers / First-Time Visitors",
        "travel": [("Kochi to Munnar", "4-5 hr"), ("Munnar to Thekkady", "3-4 hr"), ("Thekkady to Alappuzha", "4-5 hr"), ("Alappuzha to Kochi", "1.5-2 hr")],
    },
    {
        "file": "kerala-7-day-classic.pdf",
        "label": "CLASSIC + OFFBEAT",
        "title": "7-Day Islands, Hills + Coast",
        "summary": "Kerala's classic hills with Kadamakkudy and Munroe Island woven into the journey, followed by Varkala.",
        "route": "Kochi  /  Kadamakkudy  /  Munnar  /  Thekkady  /  Munroe  /  Varkala",
        "image": "images/munroe-island-canoe.jpg",
        "days": [
            ("DAYS 1-2", "Kochi + Kadamakkudy", "Fort Kochi heritage, a Kadamakkudy sunrise, Mattancherry, and an evening cultural performance."),
            ("DAYS 3-4", "Munnar", "Tea gardens, waterfalls, viewpoints, and plantation scenery."),
            ("DAY 5", "Thekkady", "Periyar region, spice gardens, and a relaxed outdoor activity."),
            ("DAY 6", "Munroe Island", "Small-canoe ride through narrow village canals followed by a homestay night."),
            ("DAY 7", "Varkala", "Cliff walk, beach or Ayurveda session, then departure from Thiruvananthapuram."),
        ],
        "budget": [
            ("VALUE", "INR 36,000-52,000", "Simple stays, shared or public transport and local restaurants."),
            ("COMFORTABLE", "INR 66,000-95,000", "Well-rated stays, private car and selected guided experiences."),
            ("PREMIUM", "INR 130,000-195,000", "Heritage and luxury resorts, chauffeur travel and private experiences."),
        ],
        "audience": "Families / Nature Lovers / First-Time Visitors / Photography Lovers",
        "travel": [("Kochi to Kadamakkudy", "45-60 min"), ("Kochi to Munnar", "4-5 hr"), ("Munnar to Thekkady", "3-4 hr"), ("Thekkady to Munroe Island", "4-5 hr"), ("Munroe Island to Varkala", "1.5-2 hr")],
    },
    {
        "file": "kerala-10-day-deep-dive.pdf",
        "label": "OFFBEAT DEEP DIVE",
        "title": "10-Day Kerala North + South",
        "summary": "A longer journey linking three quieter island experiences with Kerala's hills, forests, Malabar food, and coast.",
        "route": "Kochi  /  Kadamakkudy  /  Munroe  /  Munnar  /  Thekkady  /  Wayanad  /  Valiyaparamba  /  Bekal",
        "image": "images/tourists-valiyaparamba.webp",
        "days": [
            ("DAYS 1-2", "Kochi + Kadamakkudy", "Heritage coast, Kadamakkudy sunrise, food, galleries, and Kerala performance culture."),
            ("DAY 3", "Munroe Island", "Small-canoe journey through narrow village waterways and a homestay night."),
            ("DAYS 4-5", "Munnar", "Unhurried tea country, valley walks, and misty viewpoints."),
            ("DAY 6", "Thekkady", "Spices, forest country, and the Periyar region."),
            ("DAYS 7-8", "Wayanad", "Forest, waterfalls, plantations, and a highland reset."),
            ("DAYS 9-10", "Valiyaparamba + Bekal", "Island-backwater cruise, Malabar food, and a final coastal evening near Bekal Fort."),
        ],
        "budget": [
            ("VALUE", "INR 58,000-82,000", "Simple stays, public transport where practical and shared activities."),
            ("COMFORTABLE", "INR 105,000-150,000", "Comfortable resorts, mostly private travel and guided nature experiences."),
            ("PREMIUM", "INR 200,000-295,000", "Luxury resorts, dedicated chauffeur, premium meals and private excursions."),
        ],
        "audience": "Nature Lovers / Adventure Travellers / Photography Lovers / Offbeat Explorers",
        "travel": [("Kochi to Kadamakkudy", "45-60 min"), ("Kochi to Munroe Island", "3.5-4.5 hr"), ("Munroe Island to Munnar", "5-6 hr"), ("Munnar to Thekkady", "3-4 hr"), ("Thekkady to Wayanad", "8-10 hr"), ("Wayanad to Valiyaparamba", "4.5-6 hr"), ("Valiyaparamba to Bekal", "1.5-2 hr")],
    },
]


def fetch_cover(url, name):
    local_path = ROOT / url
    if local_path.exists():
        return local_path
    ASSETS.mkdir(parents=True, exist_ok=True)
    target = ASSETS / name
    if target.exists():
        return target
    try:
        request = Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urlopen(request, timeout=20) as response:
            target.write_bytes(response.read())
        return target
    except Exception:
        return None


def fit_line(text, font, size, max_width):
    if stringWidth(text, font, size) <= max_width:
        return [text]
    words = text.split()
    lines, current = [], ""
    for word in words:
        next_line = f"{current} {word}".strip()
        if stringWidth(next_line, font, size) <= max_width:
            current = next_line
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_wrapped(c, text, x, y, width, font="Helvetica", size=10, leading=15, color=MUTED):
    c.setFillColor(color)
    c.setFont(font, size)
    for line in fit_line(text, font, size, width):
        c.drawString(x, y, line)
        y -= leading
    return y


def draw_cover(c, plan, image_path):
    c.setFillColor(GREEN)
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    if image_path:
        c.saveState()
        c.setFillColor(GREEN)
        c.rect(0, PAGE_HEIGHT * 0.40, PAGE_WIDTH, PAGE_HEIGHT * 0.60, fill=1, stroke=0)
        c.drawImage(ImageReader(str(image_path)), 0, PAGE_HEIGHT * 0.40, width=PAGE_WIDTH, height=PAGE_HEIGHT * 0.60, mask="auto", preserveAspectRatio=True, anchor="c")
        c.setFillColor(HexColor("#0A3222"))
        c.setFillAlpha(0.55)
        c.rect(0, PAGE_HEIGHT * 0.40, PAGE_WIDTH, PAGE_HEIGHT * 0.60, fill=1, stroke=0)
        c.restoreState()

    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(52, PAGE_HEIGHT - 70, "VISIT KERALA  /  VACATION PLAN")
    c.setFillColor(white)
    c.setFont("Times-Bold", 31)
    y = PAGE_HEIGHT * 0.33
    for line in fit_line(plan["title"], "Times-Bold", 31, PAGE_WIDTH - 104):
        c.drawString(52, y, line)
        y -= 37
    y -= 7
    y = draw_wrapped(c, plan["summary"], 52, y, PAGE_WIDTH - 104, size=12, leading=18, color=white)
    c.setFillColor(GOLD)
    c.rect(52, 82, PAGE_WIDTH - 104, 1, fill=1, stroke=0)
    c.setFillColor(white)
    c.setFont("Helvetica", 9)
    c.drawString(52, 60, "Route: " + plan["route"])
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 8)
    c.drawRightString(PAGE_WIDTH - 52, 60, "STUDENT PROJECT  /  NOT OFFICIAL")
    c.showPage()


def draw_plan_page(c, plan):
    c.setFillColor(HexColor("#FAF7F2"))
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    c.setFillColor(GREEN)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(48, PAGE_HEIGHT - 48, plan["label"])
    c.setFont("Times-Bold", 23)
    c.drawString(48, PAGE_HEIGHT - 81, plan["title"])
    c.setStrokeColor(GOLD)
    c.setLineWidth(2)
    c.line(48, PAGE_HEIGHT - 95, PAGE_WIDTH - 48, PAGE_HEIGHT - 95)
    y = PAGE_HEIGHT - 130
    for number, place, detail in plan["days"]:
        if y < 145:
            c.setFillColor(HexColor("#FAF7F2"))
            c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
            c.setFillColor(GREEN)
            c.setFont("Helvetica-Bold", 8)
            c.drawString(48, PAGE_HEIGHT - 48, plan["label"] + "  /  CONTINUED")
            y = PAGE_HEIGHT - 88
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(48, y, number)
        c.setFillColor(INK)
        c.setFont("Times-Bold", 15)
        c.drawString(120, y - 2, place)
        y = draw_wrapped(c, detail, 120, y - 21, PAGE_WIDTH - 168, size=10, leading=14, color=MUTED)
        y -= 18
        c.setStrokeColor(HexColor("#D8D5D0"))
        c.setLineWidth(0.6)
        c.line(120, y, PAGE_WIDTH - 48, y)
        y -= 18
    c.setFillColor(GREEN)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(48, 82, "PLANNING NOTE")
    draw_wrapped(c, "Treat this brochure as a flexible route idea. Check current opening times, weather, transport, and official Kerala Tourism guidance before booking.", 48, 64, PAGE_WIDTH - 96, size=9, leading=13)
    c.setFillColor(GREEN)
    c.setFont("Helvetica", 8)
    c.drawRightString(PAGE_WIDTH - 48, 28, "www.keralatourism.org")
    c.showPage()


def draw_budget_page(c, plan):
    c.setFillColor(HexColor("#FAF7F2"))
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    c.setFillColor(GREEN)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(48, PAGE_HEIGHT - 48, "FAMILY BUDGET ESTIMATE")
    c.setFont("Times-Bold", 23)
    c.drawString(48, PAGE_HEIGHT - 81, "Estimated Total For A Family Of Four")
    c.setStrokeColor(GOLD)
    c.setLineWidth(2)
    c.line(48, PAGE_HEIGHT - 95, PAGE_WIDTH - 48, PAGE_HEIGHT - 95)

    y = PAGE_HEIGHT - 142
    for label, price, detail in plan["budget"]:
        c.setFillColor(GOLD)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(48, y, label)
        c.setFillColor(INK)
        c.setFont("Times-Bold", 18)
        c.drawString(48, y - 27, price)
        y = draw_wrapped(c, detail, 48, y - 49, PAGE_WIDTH - 96, size=10, leading=15, color=MUTED)
        y -= 26
        c.setStrokeColor(HexColor("#D8D5D0"))
        c.setLineWidth(0.6)
        c.line(48, y, PAGE_WIDTH - 48, y)
        y -= 31

    c.setFillColor(GREEN)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(48, 168, "WHAT THE ESTIMATE MEANS")
    note = ("Budget estimate for two adults and two children. It includes accommodation, local transport, meals, "
            "and selected activities unless stated otherwise. Travel to and from Kerala is not included. Prices "
            "may vary depending on season, taxes, hotel category, availability, and booking platform.")
    draw_wrapped(c, note, 48, 148, PAGE_WIDTH - 96, size=9, leading=13, color=MUTED)
    c.setFillColor(GREEN)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(48, 62, "Planning estimate only - not a guaranteed package price.")
    c.setFont("Helvetica", 8)
    c.drawRightString(PAGE_WIDTH - 48, 28, "Visit Kerala student exhibition project | Not an official tourism website")
    c.showPage()


def draw_route_planning_page(c, plan):
    c.setFillColor(HexColor("#FAF7F2"))
    c.rect(0, 0, PAGE_WIDTH, PAGE_HEIGHT, fill=1, stroke=0)
    c.setFillColor(GREEN)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(48, PAGE_HEIGHT - 48, "ROUTE PLANNING")
    c.setFont("Times-Bold", 23)
    c.drawString(48, PAGE_HEIGHT - 81, "Who It Suits + Time On The Road")
    c.setStrokeColor(GOLD)
    c.setLineWidth(2)
    c.line(48, PAGE_HEIGHT - 95, PAGE_WIDTH - 48, PAGE_HEIGHT - 95)

    y = PAGE_HEIGHT - 137
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(48, y, "PERFECT FOR")
    y = draw_wrapped(c, plan["audience"], 48, y - 24, PAGE_WIDTH - 96, font="Times-Bold", size=13, leading=18, color=GREEN)
    y -= 24

    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(48, y, "APPROXIMATE ROAD TRAVEL TIME")
    y -= 25
    for route, duration in plan["travel"]:
        c.setFillColor(INK)
        c.setFont("Helvetica", 10)
        c.drawString(48, y, route)
        c.setFont("Helvetica-Bold", 10)
        c.drawRightString(PAGE_WIDTH - 48, y, duration)
        c.setStrokeColor(HexColor("#D8D5D0"))
        c.setLineWidth(0.5)
        c.line(48, y - 8, PAGE_WIDTH - 48, y - 8)
        y -= 28

    y -= 8
    c.setFillColor(GOLD)
    c.setFont("Helvetica-Bold", 8)
    c.drawString(48, y, "SEASON GUIDE")
    y -= 25
    for season, description in [("OCT-MAR", "Best overall season"), ("JUN-SEP", "Monsoon experience"), ("APR-MAY", "Warmer weather")]:
        c.setFillColor(GREEN)
        c.setFont("Helvetica-Bold", 9)
        c.drawString(48, y, season)
        c.setFillColor(MUTED)
        c.setFont("Helvetica", 9)
        c.drawString(122, y, description)
        y -= 22

    note = "Travel times are approximate. Traffic, weather, road conditions and stops may change journey times. Coastal, hill and northern conditions can differ, and weather is not guaranteed."
    if plan["file"] == "kerala-10-day-deep-dive.pdf":
        note += " Thekkady to Wayanad is a particularly long transfer; consider a route break, train or flight combination."
    c.setFillColor(GREEN)
    c.setFont("Helvetica-Bold", 9)
    c.drawString(48, 118, "IMPORTANT")
    draw_wrapped(c, note, 48, 99, PAGE_WIDTH - 96, size=9, leading=13, color=MUTED)
    c.setFont("Helvetica", 8)
    c.drawRightString(PAGE_WIDTH - 48, 28, "Visit Kerala student exhibition project | Not an official tourism website")
    c.showPage()


def create_brochure(plan):
    OUTPUT.mkdir(parents=True, exist_ok=True)
    cover = fetch_cover(plan["image"], plan["file"].replace(".pdf", ".jpg"))
    c = canvas.Canvas(str(OUTPUT / plan["file"]), pagesize=A4)
    c.setTitle(plan["title"] + " | Visit Kerala")
    c.setAuthor("Visit Kerala concept website")
    draw_cover(c, plan, cover)
    draw_plan_page(c, plan)
    draw_route_planning_page(c, plan)
    draw_budget_page(c, plan)
    c.save()


for plan in PLANS:
    create_brochure(plan)
    print(f"Created {plan['file']}")
