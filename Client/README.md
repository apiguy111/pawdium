# Spotlight Pet Rankings

Build the frontend for a modern pet leaderboard website called "Spotlight.lol".

I am attaching 3 reference images:

1. Leaderboard page

2. Daily page

3. About Us page

IMPORTANT:

Use the attached reference images as the PRIMARY visual source.

The final website should look as close as possible to the references in:

- overall layout

- spacing

- typography

- colors

- borders

- border radius

- shadows

- buttons

- navigation

- cards

- icons

- alignment

- proportions

- visual hierarchy

Do NOT create a different design or add your own visual style.

Do NOT make it look like a generic AI-generated SaaS website.

The 3 pages must feel like ONE consistent website.

==================================================

TECH STACK

==================================================

Use:

- React

- TypeScript

- Tailwind CSS

- Lucide React icons

Build reusable components instead of duplicating UI.

The website must be responsive, but the primary design target is DESKTOP/LANDSCAPE, matching the reference images.

Do not make the desktop layout look like a stretched mobile page.

==================================================

BRAND

==================================================

Website name:

Spotlight.lol

Theme:

- clean

- minimal

- premium

- playful

- pet-focused

- modern internet-product aesthetic

Main visual style:

- warm off-white / very light background

- dark near-black text

- soft green as the primary accent

- subtle orange accent where appropriate

- very light borders

- soft shadows

- generous whitespace

- rounded corners

Avoid:

- gradients everywhere

- excessive animations

- glassmorphism

- heavy shadows

- overly colorful UI

- generic SaaS dashboard styling

==================================================

GLOBAL HEADER

==================================================

Create one reusable header shared by all pages.

Desktop header should match the reference design.

Left side:

- Spotlight.lol logo

- simple paw icon

- "Spotlight.lol"

Navigation on the right:

- Leaderboard

- Daily

- About Us

- Search icon

- Theme toggle icon

The currently active page should have a subtle light-green pill/background around its navigation item.

Header should remain clean and spacious.

Do not add unnecessary navigation items.

==================================================

GLOBAL STATUS PILL

==================================================

Below the header, centered horizontally, show a small rounded status pill.

Example:

● 120 online · 144,063 visitors · see stats →

Use:

- small green online dot

- muted text

- rounded light background

- compact size

This should appear consistently across the pages as shown in the references.

==================================================

PAGE 1 — LEADERBOARD

==================================================

Recreate the attached Leaderboard reference image.

This is the main page.

Top area:

Large headline:

"Claim #1 and Spotlight Your Pet for $19,500"

The dollar amount should be visually emphasized in green.

Place a small "+" control beside the amount, matching the reference.

Below the heading, create the pet submission/search area.

IMPORTANT:

The submission form has these fields:

1. Pet photo upload

2. Pet name

3. Owner name

4. Country

5. City

6. Pet type dropdown

7. About your pet

Pet photo upload:

- circular upload area

- clearly looks like a profile/photo input

- use a camera/image icon

- clicking it opens the file picker

- preview the selected image inside the circle

Pet type:

Use a dropdown with common pet types such as:

- Dog

- Cat

- Bird

- Rabbit

- Hamster

- Guinea Pig

- Fish

- Turtle

- Other

The form should be visually compact and elegant.

The "About your pet" field should appear below the first row of fields.

Include a prominent button for submitting/adding the pet and starting the bid.

==================================================

LEADERBOARD FILTERS

==================================================

Below the submission area, create the filter/navigation row.

Keep it LIMITED and simple.

Filters:

- All Pets

- Dogs

- Cats

- Birds

- New Entries

- Hall of Fame

- Country

For Country, show the Indian flag 🇮🇳 for now.

The active filter should use the soft green pill style shown in the reference.

Do not add many additional categories.

==================================================

PET LEADERBOARD

==================================================

Below the filters, display the leaderboard.

Each pet should be displayed as a large horizontal card.

Each card contains:

Left:

- rank number

- circular pet image

Middle:

- pet name

- short pet description

- owner

- pet type

- country

- city

- activity/status information

Right:

- current bid amount

- small "+" action button

Example:

#1

Milo · The Dapper Boy

Golden Retriever · Hyderabad, India

Owner Alex

$19,500

Cards should have:

- large rounded corners

- thin subtle border

- very light background

- generous internal spacing

- clean typography

The #1 card should have slightly stronger visual emphasis.

The page should feel spacious, not cramped.

==================================================

PAGE 2 — DAILY

==================================================

Create a separate "/daily" page.

Use the attached Daily reference image as the exact visual reference.

Heading:

"Daily"

Below it, a short explanation:

"Each UTC day gets its own board. Rank is what you spent that day.

Today stays live until midnight UTC, then the day closes."

Use a two-column desktop layout.

LEFT:

Current day's leaderboard.

RIGHT:

Previous daily boards.

Current day card should show:

- date

- Live badge

- number of pets/listings

- short status text

- top 3 pets

- rank

- pet image

- pet name

- location

- owner

- highest bid

Bottom of the current-day card:

- "Claim a rank"

- "Show all ranks"

RIGHT COLUMN:

Display previous days as compact cards.

Each card:

- calendar icon

- date

- "Closed"

- number of pets

- chevron

Keep this page visually very close to the Daily reference.

==================================================

PAGE 3 — ABOUT US

==================================================

Create a separate "/about" page.

Use the attached About Us reference image as the exact visual reference.

Heading:

"About Us"

Create a short introduction explaining the concept of Spotlight.lol.

Use the same visual hierarchy as the reference:

- large heading

- short intro

- highlighted rules/mission card

- statistics section

- community/message section

- founder section

IMPORTANT:

Do NOT copy text from the reference verbatim.

Use original wording with the same meaning.

For example, communicate the idea that:

- Spotlight.lol started as a simple experiment

- the community determines who gets attention

- the rules are intentionally simple

- pets and their owners are the center of the platform

Create a "Our Journey So Far" statistics section.

Show 3 statistics cards such as:

- Visitors

- Total Bids

- Highest Bid

Use realistic placeholder values for now.

Then create a "More Than Numbers" section describing the community.

At the bottom create a founder section with:

- circular profile image placeholder

- Founder label

- founder name

- short description

Do not use the founder information from the reference image as real data.

Use placeholder content that can easily be replaced later.

==================================================

IMPORTANT DESIGN RULES

==================================================

All 3 pages must look like the same product.

Use the SAME:

- font

- font weights

- green accent

- orange accent

- border style

- card radius

- button style

- icon style

- spacing system

- header

- status pill

- overall visual language

Do not redesign individual pages independently.

==================================================

RESPONSIVE DESIGN

==================================================

Desktop/landscape is the PRIMARY target.

At desktop widths:

- use the wide layout shown in the references

- keep content centered

- use generous horizontal whitespace

- do not make everything full-width

At tablet/mobile:

- stack columns appropriately

- make navigation responsive

- make forms stack vertically

- keep cards readable

- preserve the same visual style

But do NOT optimize the desktop design around mobile first.

==================================================

INTERACTIONS

==================================================

Implement basic frontend interactions.

Navigation:

- Leaderboard → "/"

- Daily → "/daily"

- About Us → "/about"

Theme button:

- toggle light/dark mode

- preserve the same design language in dark mode

Search:

- clicking search opens a small search interface

- allow searching pets by pet name

Pet submission:

- photo upload works

- image preview works

- form fields work

- pet type dropdown works

- submit button adds the pet to the local leaderboard

Filters:

- All Pets

- Dogs

- Cats

- Birds

- New Entries

- Hall of Fame

- Country

They should filter the displayed mock data.

Bidding:

For now implement frontend-only bidding using mock/local state.

When the user clicks the "+" / bid action:

- show a simple bid interaction

- update the displayed bid locally

Do NOT implement real payment processing yet.

==================================================

DATA

==================================================

Use mock pet data.

Include different:

- dogs

- cats

- birds

- other animals

- Indian cities

- international cities

Use realistic pet names and short descriptions.

Make sure pet images are circular.

==================================================

CODE QUALITY

==================================================

Create reusable components such as:

- Header

- StatusPill

- PetSubmissionForm

- PetCard

- Leaderboard

- FilterBar

- BidButton

- DailyBoard

- PreviousDayCard

- StatCard

- Footer

Keep the code clean and maintainable.

Do not duplicate large blocks of JSX.

Use TypeScript types for:

- Pet

- Bid

- DailyBoard

- Filter

==================================================

FINAL REQUIREMENT

==================================================

Before finishing, compare the implementation visually against ALL THREE attached reference images.

Pay particular attention to:

- horizontal spacing

- vertical spacing

- font sizes

- card dimensions

- border radius

- button dimensions

- alignment

- header positioning

- status pill positioning

- green/orange accent usage

- overall whitespace

The result should feel like a carefully designed real product, NOT a generic Lovable template.

Do not add features that are not requested.

Do not add extra sections.

Do not change the overall design direction.

Build the three pages as one polished, consistent frontend.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3c5e6428-7deb-4ffd-9327-ffe660f58f76).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
