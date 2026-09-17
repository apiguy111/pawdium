import { Link, createFileRoute } from "@tanstack/react-router";
import { LegalList, LegalPage, LegalSection } from "@/components/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Pawdium.lol" },
      {
        name: "description",
        content:
          "How Pawdium.lol collects, uses and shares information when you visit the site, submit a pet, support a pet, or place a bid.",
      },
      { property: "og:title", content: "Privacy Policy — Pawdium.lol" },
      {
        property: "og:description",
        content:
          "What Pawdium.lol collects, why it is used, and how long information is kept.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      effective="Effective August 30, 2026. Last updated August 30, 2026."
    >
      <p>
        This Privacy Policy explains how Pawdium.lol (the "Service") collects,
        uses, and shares information when you visit Pawdium, submit a pet,
        support a pet, participate in the leaderboard, place a bid, or
        otherwise use the Service.
      </p>

      <p>
        This Privacy Policy should be read together with our{" "}
        <Link to="/terms" className="text-accent underline">
          Terms of Service
        </Link>{" "}
        and{" "}
        <Link to="/rules" className="text-accent underline">
          Rules
        </Link>
        .
      </p>

      <LegalSection heading="Who is responsible">
        <p>
          The controller for personal data processed through the Service is
          <strong> Pawdium.lol</strong> ("we", "us",
          "our").
        </p>

        <LegalList
          items={[
            <>Website: https://pawdium.lol</>,
            <>Email: pawdium.lol@gmail.com</>,
            <>Address: H.No 698/9, 8th phase, KPHB Colony, Kondapur, Hyderabad-500084, Telangana, India</>,
          ]}
        />

    
      </LegalSection>

      <LegalSection heading="What we collect">
        <p>
          We try to keep Pawdium simple and collect only information needed to
          operate the leaderboard, process payments, prevent abuse, and improve
          the Service.
        </p>

        <LegalList
          items={[
            <>
              <span className="font-semibold text-foreground">
                Anonymous visitor identifier.
              </span>{" "}
              We may generate a random identifier and store it in a necessary
              browser cookie. It helps us recognize the same browser, prevent
              duplicate or abusive activity, and support basic functionality.
              It is not your name and is not intended to identify you
              personally.
            </>,
            <>
              <span className="font-semibold text-foreground">
                Pet submission information.
              </span>{" "}
              If you submit a pet, we collect the information you choose to
              provide, such as the pet name, pet photo, owner name, country,
              city, pet type, and description.
            </>,
            <>
              <span className="font-semibold text-foreground">
                Bids and leaderboard activity.
              </span>{" "}
              We may collect the pet associated with a bid, bid amount, bid
              time, leaderboard information, and payment confirmation
              identifiers.
            </>,
            <>
              <span className="font-semibold text-foreground">
                Support and engagement.
              </span>{" "}
              When you support a pet or interact with the leaderboard, we may
              record the pet involved, time of interaction, anonymous visitor
              identifier, and technical information needed to prevent abuse.
            </>,
            <>
              <span className="font-semibold text-foreground">
                Payment information.
              </span>{" "}
              Payments are processed by our third-party payment provider.
              Pawdium does not directly store your full card number, CVV, or
              other complete payment credentials. We may receive transaction
              identifiers, payment amount, currency, and payment status.
            </>,
            <>
              <span className="font-semibold text-foreground">
                Technical information.
              </span>{" "}
              Our hosting and infrastructure providers may process information
              such as IP address, browser type, operating system, device
              information, referring page, timestamps, and security or error
              information.
            </>,
            <>
              <span className="font-semibold text-foreground">
                Messages you send us.
              </span>{" "}
              If you contact us, we may keep your contact information, message,
              and related correspondence so that we can respond and maintain
              appropriate business or legal records.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection heading="Pet information we collect">
        <p>
          When you create a pet profile, you may provide:
        </p>

        <LegalList
          items={[
            "Pet name.",
            "Pet photo.",
            "Owner name.",
            "Country.",
            "City.",
            "Pet type.",
            "About your pet.",
          ]}
        />

        <p>
          Pet submissions are intended to be public. Only submit information
          that you are comfortable making publicly available.
        </p>

        <p>
          Do not submit home addresses, phone numbers, government IDs,
          financial information, passwords, or other sensitive personal
          information.
        </p>
      </LegalSection>

      <LegalSection heading="Cookies">
        <p>
          Pawdium may use a small number of cookies or similar browser
          technologies.
        </p>

        <LegalList
          items={[
            <>
              <span className="font-semibold text-foreground">
                Necessary cookies.
              </span>{" "}
              Used to support basic functionality, prevent duplicate activity,
              protect the leaderboard, detect abuse, and support bidding-related
              interactions.
            </>,
            <>
              <span className="font-semibold text-foreground">
                Preference storage.
              </span>{" "}
              Your browser or device may store preferences such as your selected
              light or dark theme.
            </>,
            <>
              <span className="font-semibold text-foreground">
                Analytics.
              </span>{" "}
              If we use analytics services, they may process information about
              visits and interactions to help us understand traffic and improve
              Pawdium.
            </>,
          ]}
        />

        <p>
          We do not use necessary cookies to serve personalized advertising.
        </p>
      </LegalSection>

      <LegalSection heading="Why we use this data">
        <LegalList
          items={[
            "To create and display pet profiles.",
            "To operate the leaderboard.",
            "To calculate and display rankings.",
            "To record bids and process payments.",
            "To display support counts and competition results.",
            "To operate daily and historical competitions.",
            "To prevent bots, fraud, manipulation, and abuse.",
            "To maintain and improve the Service.",
            "To debug technical problems and security issues.",
            "To comply with legal obligations.",
            "To resolve disputes and defend legal claims.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Legal bases for processing">
        <p>
          Depending on the circumstances and applicable law, we may process
          information on the following legal bases:
        </p>

        <LegalList
          items={[
            <>
              <span className="font-semibold text-foreground">
                Contract.
              </span>{" "}
              To provide the Service, process payments, create pet profiles,
              record bids, and provide features you request.
            </>,
            <>
              <span className="font-semibold text-foreground">
                Legitimate interests.
              </span>{" "}
              To prevent fraud and abuse, protect the Service, maintain
              leaderboard integrity, analyze usage, and defend legal claims.
            </>,
            <>
              <span className="font-semibold text-foreground">
                Legal obligation.
              </span>{" "}
              To comply with tax, accounting, legal, and regulatory
              requirements.
            </>,
            <>
              <span className="font-semibold text-foreground">
                Consent.
              </span>{" "}
              Where applicable law requires consent for a particular processing
              activity, we will rely on consent and provide the appropriate
              choices.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection heading="Public pet profiles">
        <p>
          Pet submissions on Pawdium are public.
        </p>

        <p>Depending on what you submit, other people may see:</p>

        <LegalList
          items={[
            "Pet photo.",
            "Pet name.",
            "Owner name.",
            "City.",
            "Country.",
            "Pet type.",
            "Pet description.",
            "Bid amount.",
            "Leaderboard position.",
            "Support count.",
            "Competition history.",
          ]}
        />

        <p>
          Public information may be indexed by search engines and may be copied
          or shared by other people.
        </p>

        <p>
          If you do not want information to be public, do not include it in
          your pet profile.
        </p>
      </LegalSection>

      <LegalSection heading="Pet photos">
        <p>
          When you upload a pet photo, you confirm that you have the right to
          submit and display that image.
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
          Pawdium may remove images that violate our Rules or applicable law.
        </p>
      </LegalSection>

      <LegalSection heading="Who we share information with">
        <p>
          We may share information with service providers that help us operate
          Pawdium.
        </p>

        <LegalList
          items={[
            "Payment providers — to process bids and payments.",
            "Hosting and infrastructure providers — to host the website, database, images, and application.",
            "Analytics providers — to understand traffic and improve the Service.",
            "Email providers — to send notifications or respond to requests.",
            "Security and abuse-prevention providers — to detect bots, fraud, and malicious activity.",
          ]}
        />

        <p>We may also disclose information:</p>

        <LegalList
          items={[
            "When required by law.",
            "To respond to lawful requests from authorities.",
            "To protect Pawdium, our users, or the public.",
            "To investigate fraud or abuse.",
            "To enforce our Terms or Rules.",
            "In connection with a merger, acquisition, sale, or transfer of Pawdium.",
          ]}
        />

        <p>
          We do not sell your personal information.
        </p>
      </LegalSection>

      <LegalSection heading="International processing">
        <p>
          Our service providers may process information in countries other than
          the country where you live.
        </p>

        <p>
          Where required by applicable law, we use appropriate safeguards for
          international transfers of personal information.
        </p>
      </LegalSection>

      <LegalSection heading="How long we keep it">
        <LegalList
          items={[
            "Anonymous visitor identifiers may remain for up to one year or until you clear your browser data.",
            "Public pet profiles may remain available while the profile is active and may remain in backups or historical records for a limited period after removal.",
            "Bid and payment records may be retained for accounting, tax, fraud prevention, dispute resolution, and legal obligations.",
            "Support and interaction records may be retained as reasonably necessary for leaderboard integrity and abuse prevention.",
            "Technical and security records may be retained for as long as necessary to maintain security and prevent abuse.",
          ]}
        />

        <p>
          Retention periods may vary depending on the type of information and
          applicable legal requirements.
        </p>
      </LegalSection>

      <LegalSection heading="Your rights">
        <p>
          Depending on where you live and which privacy laws apply to you, you
          may have rights to:
        </p>

        <LegalList
          items={[
            "Access personal information we hold about you.",
            "Correct inaccurate information.",
            "Request deletion of your information.",
            "Request a copy of your information.",
            "Restrict certain processing.",
            "Object to certain processing.",
            "Withdraw consent where processing is based on consent.",
            "Lodge a complaint with your applicable data-protection authority.",
          ]}
        />

        <p>
          To make a privacy request, contact us at{" "}
          <span className="text-accent">pawdium.lol@gmail.com</span>.
        </p>

        <p>
          We may need enough information to verify and locate the relevant
          information before fulfilling a request.
        </p>

        <p>
          Because Pawdium is designed to work without traditional user
          accounts, some information may be associated with an anonymous
          browser identifier rather than your name or email address.
        </p>
      </LegalSection>

      <LegalSection heading="Public content and deletion requests">
        <p>
          If you submit a pet to Pawdium, you understand that its profile is
          intended to be publicly visible.
        </p>

        <p>
          If you later want your pet profile removed, contact us. We may ask
          for enough information to confirm that you are the person who
          submitted or controls the relevant profile.
        </p>

        <p>
          Removing a profile from Pawdium does not necessarily remove copies
          that were previously shared by other people, indexed by search
          engines, or retained temporarily in backups.
        </p>
      </LegalSection>

      <LegalSection heading="Children">
        <p>
          Pawdium is intended for adults. We do not knowingly collect personal
          information from children.
        </p>

        <p>
          Because Pawdium allows public pet submissions and may involve
          real-money bidding, children should not participate in paid bidding.
        </p>

        <p>
          If you believe a child has provided personal information to Pawdium,
          contact us and we will take appropriate steps to investigate and
          delete information where required.
        </p>
      </LegalSection>

      <LegalSection heading="Security">
        <p>
          We use reasonable technical and organizational measures designed to
          protect information against unauthorized access, loss, misuse, or
          alteration.
        </p>

        <p>
          However, no internet service can guarantee absolute security.
        </p>

        <p>
          You should avoid submitting sensitive or private information to a
          public pet profile.
        </p>
      </LegalSection>

      <LegalSection heading="Changes to this Privacy Policy">
        <p>
          We may update this Privacy Policy when Pawdium's features, business
          practices, service providers, or applicable laws change.
        </p>

        <p>
          The effective and last-updated dates at the top of this page indicate
          the current version.
        </p>

        <p>
          If we make a material change, we will post the updated policy on this
          page and take any additional steps required by applicable law.
        </p>
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          For privacy questions, deletion requests, or concerns about personal
          information:
        </p>

        <LegalList
          items={[
            <>Pawdium.lol</>,
            <>Email: pawdium.lol@gmail.com</>,
            <>Website: https://pawdium.lol</>,
          ]}
        />
      </LegalSection>
    </LegalPage>
  );
}