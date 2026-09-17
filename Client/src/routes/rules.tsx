import { createFileRoute } from "@tanstack/react-router";
import { LegalList, LegalPage, LegalSection } from "@/components/LegalPage";

export const Route = createFileRoute("/rules")({
  head: () => ({
    meta: [
      { title: "Rules — Pawdium.lol Pet Leaderboard" },
      {
        name: "description",
        content:
          "How Pawdium works: pet submissions, leaderboard ranking, bidding, support, daily competitions, and fair-play rules.",
      },
      { property: "og:title", content: "Rules — Pawdium.lol" },
      {
        property: "og:description",
        content:
          "How ranking, bidding, pet submissions, and competitions work on Pawdium.lol.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RulesPage,
});

function RulesPage() {
  return (
    <LegalPage title="Rules">
      <p>
        Pawdium is a public leaderboard for pets. Add your pet, tell the world
        who they are, and compete for a place on the podium. You can support
        pets, watch them climb, or bid to move your own pet higher. Your bid
        determines your paid rank — nothing else.
      </p>

      <LegalSection heading="The boards">
        <p>
          Pawdium has different boards showing pet rankings over different
          periods.
        </p>

        <LegalList
          items={[
            <>
              <span className="text-accent">All-time</span> is the main
              leaderboard. Your highest active bid determines your position and
              stays on the board until another pet takes the spot or you raise
              your bid.
            </>,
            <>
              <span className="text-accent">Today</span> shows the competition
              for the current 24-hour period. Pets compete for the top spots
              during the day.
            </>,
            <>
              <span className="text-accent">Daily</span> is a calendar-day
              competition. Each day starts at midnight UTC and ends at midnight
              UTC. When the day ends, that day's results are frozen as an
              archive.
            </>,
            <>
              <span className="text-accent">Hall of Fame</span> contains pets
              that have achieved notable milestones, such as winning a daily
              competition or reaching #1.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection heading="How ranking works">
        <LegalList
          items={[
            "A new pet can enter the leaderboard with a minimum bid of $1.",
            "Bids are made in whole US dollars.",
            "To take #1, your bid must be at least $1 higher than the current #1 bid.",
            "You do not have to challenge #1. A lower bid places your pet at the highest position that amount qualifies for.",
            "If two pets have the same bid, the pet that reached that amount first keeps the higher position.",
            "If your pet is already on the leaderboard, you can submit another bid to raise its position.",
            // "When raising an existing bid, you pay only the difference between your current bid and your new bid.",
            "Another pet cannot take your position simply by matching your bid. They must exceed it according to the current minimum increment.",
            "Your pet's rank can change whenever another pet places a qualifying higher bid.",
            "Daily competitions may use their own time periods and ranking rules.",
            "Bidding determines paid ranking. Community support does not change a pet's paid rank.",
          ]}
        />

        <p>
          Your paid rank does not mean that your pet is objectively better,
          cuter, healthier, or more valuable than another pet. Pawdium is an
          entertainment and community leaderboard.
        </p>
      </LegalSection>

      <LegalSection heading="What you can add">
        <p>
          You can submit a real pet that you own or have permission to
          represent.
        </p>

        <LegalList
          items={[
            "Pet photo",
            "Pet name",
            "Owner name",
            "Country",
            "City",
            "Pet type",
            "A short description about your pet",
          ]}
        />

        <p>Available pet types may include:</p>

        <LegalList
          items={[
            "Dogs",
            "Cats",
            "Birds",
            "Rabbits",
            "Hamsters",
            "Guinea pigs",
            "Fish",
            "Turtles",
            "Other pets",
          ]}
        />

        <p>
          One pet should have one primary leaderboard entry. Do not create
          multiple entries for the same pet simply to occupy several positions.
        </p>
      </LegalSection>

      <LegalSection heading="What you cannot add">
        <LegalList
          items={[
            "Someone else's pet without permission.",
            "Images that you do not have the right to use.",
            "Fake pets or deliberately misleading information.",
            "Content involving animal abuse, cruelty, or exploitation.",
            "Sexual, explicit, hateful, violent, or illegal content.",
            "Private or sensitive personal information about yourself or another person.",
            "Exact home addresses or other unnecessary location information.",
            "Content impersonating another person or organization.",
            "Duplicate pet entries created to manipulate rankings.",
          ]}
        />

        <p>
          Pawdium may remove pet profiles or content that violate these rules.
        </p>
      </LegalSection>

      <LegalSection heading="Community support">
        <p>
          Anyone can support a pet without creating an account. Support is a
          way to show that you like a pet and help it gain community popularity.
        </p>

        <LegalList
          items={[
            "Supporting a pet does not change its paid rank.",
            "Support counts may be displayed publicly.",
            "Suspicious or automated support may be removed.",
            "Duplicate or fraudulent interactions may be removed.",
            "Pawdium may limit or block activity that appears to manipulate support counts.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Pet information">
        <p>
          Pet profiles are public. Information submitted to Pawdium may be
          displayed to visitors and may be indexed or shared by others.
        </p>

        <LegalList
          items={[
            "Pet name",
            "Pet photo",
            "Owner name",
            "City",
            "Country",
            "Pet type",
            "Pet description",
            "Bid amount",
            "Leaderboard position",
            "Support count",
            "Competition history",
          ]}
        />

        <p>
          Only submit information that you are comfortable making public.
          Pawdium does not recommend including an exact home address, phone
          number, or other sensitive information.
        </p>
      </LegalSection>

      <LegalSection heading="Pet photos">
        <p>
          By uploading a pet photo, you confirm that you have the right to use
          and display that image.
        </p>

        <LegalList
          items={[
            "Do not upload photographs you do not have permission to use.",
            "Do not upload private photographs belonging to someone else.",
            "Do not upload images containing sensitive personal information.",
            "Do not upload illegal or prohibited content.",
          ]}
        />

        <p>
          Pawdium may remove images that violate these Rules or applicable law.
        </p>
      </LegalSection>

      <LegalSection heading="Bidding and payments">
        <p>
          Paid bidding is processed through our third-party payment provider.
          The minimum bid, required increment, currency, and other applicable
          terms are shown before you complete a payment.
        </p>

        <LegalList
          items={[
            "A bid is confirmed only after successful payment confirmation.",
            "Your bid determines your paid leaderboard position according to the applicable ranking rules.",
            "Other users may place higher qualifying bids and move their pets above yours.",
            "Raising an existing bid charges only the difference where the applicable bidding rules allow it.",
            "Completed bids are non-refundable unless a refund is required by applicable law.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Fair play">
        <p>
          Pawdium is meant to be fun. Do not use automated or deceptive methods
          to manipulate the leaderboard or support counts.
        </p>

        <LegalList
          items={[
            "Bots or automated bidding.",
            "Fake identities or impersonation.",
            "Stolen pet photos.",
            "Artificially generated support or engagement.",
            "Duplicate pet submissions.",
            "Attempts to bypass rate limits or security controls.",
            "Attempts to interfere with the Service.",
            "Fraudulent payments or payment manipulation.",
          ]}
        />

        <p>
          Pawdium may remove fraudulent activity, freeze suspicious bids,
          remove duplicate or fake pets, restrict abusive users, or correct
          leaderboard errors.
        </p>
      </LegalSection>

      <LegalSection heading="Animal welfare">
        <p>
          Pawdium exists to celebrate pets and responsible pet ownership.
        </p>

        <LegalList
          items={[
            "Animal abuse or cruelty.",
            "Animal fighting.",
            "Intentional injury or dangerous exploitation of animals.",
            "Illegal animal trafficking.",
            "Neglect or other serious harm to animals.",
          ]}
        />

        <p>
          Content involving serious animal-welfare concerns may be removed and,
          where appropriate, reported to relevant authorities.
        </p>
      </LegalSection>

      <LegalSection heading="Our right to remove content">
        <p>
          Pawdium may refuse, hide, edit, restrict, or remove a pet profile,
          bid, support activity, image, or other content when reasonably
          necessary.
        </p>

        <LegalList
          items={[
            "The content violates these Rules.",
            "The content violates the Terms of Service.",
            "The content violates applicable law.",
            "Fraud or manipulation is suspected.",
            "A legitimate rights violation is reported.",
            "The submission creates security, legal, or reputational risk.",
            "The information appears misleading or impersonating.",
            "The content threatens the integrity of the leaderboard.",
          ]}
        />

        <p>
          We may take action with or without prior notice where reasonably
          necessary. Removal for violating these Rules does not automatically
          create a right to a refund.
        </p>
      </LegalSection>

      <LegalSection heading="The simple rule">
        <p>
          Add your pet. Pick your spot. Make your bid. Then let the internet
          discover your pet. 🐾
        </p>

        <p>
          The higher your qualifying bid, the higher your paid rank. Community
          support is separate — it shows who the internet is rooting for.
        </p>
      </LegalSection>
    </LegalPage>
  );
}