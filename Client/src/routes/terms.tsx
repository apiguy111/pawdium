import { Link, createFileRoute } from "@tanstack/react-router";
import { LegalList, LegalPage, LegalSection } from "@/components/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Pawdium.lol" },
      {
        name: "description",
        content:
          "The terms that govern access to Pawdium.lol, its public pet leaderboard, pet profiles, bidding, support, and competitions.",
      },
      { property: "og:title", content: "Terms of Service — Pawdium.lol" },
      {
        property: "og:description",
        content:
          "Terms governing pet submissions, leaderboard ranking, bidding, support, and competitions on Pawdium.lol.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <LegalPage
      title="Terms of Service"
      effective="Effective August 30, 2026. Last updated August 30, 2026."
    >
      <p>
        These Terms of Service ("Terms") govern access to and use of Pawdium.lol
        (the "Service"), including the public pet leaderboard, pet profiles,
        daily boards, bidding, support features, and related services.
      </p>

      <p>
        By visiting the Service, submitting a pet, supporting a pet, placing a
        bid, or completing a payment, you agree to these Terms and to our{" "}
        <Link to="/privacy" className="text-accent underline">
          Privacy Policy
        </Link>
        .
      </p>

      <p>
        If you do not agree with these Terms, do not use the Service or
        participate in paid bidding.
      </p>

      <LegalSection heading="Operator and contact">
        <p>
          The Service is operated by <strong>[your legal name / company name]</strong>{" "}
          ("we", "us", "our").
        </p>

        <p>
          The Service is provided through{" "}
          <span className="text-accent">https://pawdium.lol</span>.
        </p>

        <LegalList
          items={[
            <>Email: pawdium.lol@gmail.com</>,
            <>Address: 6969/9, 8th phase, KPHB Colony, Kondapur, Hyderabad-500084, Telangana, India</>,
          ]}
        />

        <p>
          These Terms work together with our{" "}
          <Link to="/rules" className="text-accent underline">
            Rules
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-accent underline">
            Privacy Policy
          </Link>
          . If there is a conflict between these Terms and the Rules, these
          Terms control.
        </p>
      </LegalSection>

      <LegalSection heading="What Pawdium is">
        <p>
          Pawdium is a public entertainment platform where people can submit
          pets and compete for positions on public leaderboards.
        </p>

        <p>Users can:</p>

        <LegalList
          items={[
            "Submit a pet.",
            "Display a pet photo and information.",
            "Support pets.",
            "Participate in competitions.",
            "Place bids.",
            "Compete for higher paid ranking positions.",
            "View daily and historical rankings.",
          ]}
        />

        <p>
          A payment on Pawdium purchases ranking placement or another clearly
          described paid feature, according to the Rules and information
          displayed before checkout.
        </p>

        <p>
          A payment does not guarantee that a pet will remain at a particular
          position. Other users may place higher qualifying bids.
        </p>

        <p>Pawdium does not guarantee:</p>

        <LegalList
          items={[
            "Popularity.",
            "Votes or support.",
            "Followers.",
            "Traffic.",
            "Social-media attention.",
            "Fame.",
            "Monetary return.",
            "Sponsorship.",
            "Adoption.",
            "Any particular outcome from participating.",
          ]}
        />

        <p>
          Pawdium is an entertainment and competition platform. A pet's
          position on a paid leaderboard is not an objective statement that the
          pet is better, cuter, healthier, or more valuable than another pet.
        </p>
      </LegalSection>

      <LegalSection heading="Eligibility">
        <LegalList
          items={[
            "You must be at least 18 years old to place a paid bid.",
            "You must have the legal capacity to enter into a binding agreement.",
            "You must provide accurate information when required.",
            "You must comply with applicable laws.",
          ]}
        />

        <p>
          If you submit a pet on behalf of another person, you represent that
          you have permission to do so.
        </p>

        <p>
          If you use Pawdium on behalf of a business or organization, you
          represent that you have authority to bind that organization.
        </p>

        <p>
          We may restrict access to the Service where required by applicable
          law, sanctions, payment-provider requirements, or security concerns.
        </p>
      </LegalSection>

      <LegalSection heading="Pet submissions">
        <p>
          You may submit a pet by providing information such as:
        </p>

        <LegalList
          items={[
            "Pet photo.",
            "Pet name.",
            "Owner name.",
            "Country.",
            "City.",
            "Pet type.",
            "Description or 'About your pet' information.",
          ]}
        />

        <p>
          You are responsible for the information you submit.
        </p>

        <p>You represent that:</p>

        <LegalList
          items={[
            "The information is accurate to the best of your knowledge.",
            "You have the right to submit the pet and associated information.",
            "You have permission to use any uploaded photograph.",
            "Your submission does not violate another person's rights.",
            "Your submission does not contain unlawful or prohibited material.",
          ]}
        />

        <p>
          Pawdium does not verify every pet, owner, photograph, or claim
          submitted by users.
        </p>
      </LegalSection>

      <LegalSection heading="Public pet profiles">
        <p>
          Pet profiles are intended to be public.
        </p>

        <p>Depending on the information provided, a profile may display:</p>

        <LegalList
          items={[
            "Pet name.",
            "Pet photograph.",
            "Owner name.",
            "City.",
            "Country.",
            "Pet type.",
            "Pet description.",
            "Leaderboard position.",
            "Bid amount.",
            "Support count.",
            "Competition history.",
          ]}
        />

        <p>
          You should not submit information that you do not want publicly
          available.
        </p>

        <p>Do not submit:</p>

        <LegalList
          items={[
            "Home addresses.",
            "Telephone numbers.",
            "Government identification.",
            "Financial information.",
            "Passwords.",
            "Private information belonging to another person.",
          ]}
        />

        <p>
          We may remove or restrict information that violates these Terms, our
          Rules, or applicable law.
        </p>
      </LegalSection>

      <LegalSection heading="How ranking works">
        <p>
          The ranking mechanism is described in our{" "}
          <Link to="/rules" className="text-accent underline">
            Rules
          </Link>{" "}
          and in the information displayed before a bid is submitted.
        </p>

        <LegalList
          items={[
            "Higher qualifying bids can result in higher paid ranking.",
            "A bid must satisfy the minimum amount required for the relevant position.",
            "Matching another pet's bid does not necessarily move your pet above it.",
            "Ranking may change when another user places a higher qualifying bid.",
            "Daily competitions may use separate time periods.",
            "Completed payments are counted according to the applicable board's rules.",
          ]}
        />

        <p>
          Your paid rank is determined by the applicable bidding rules.
          Community support does not automatically change paid ranking.
        </p>

        <p>
          A high ranking does not mean that Pawdium considers a pet objectively
          superior to another pet.
        </p>
      </LegalSection>

      <LegalSection heading="Bidding and payments">
        <p>
          Paid bidding is processed through our third-party payment provider.
          Payment-provider terms may also apply to your transaction.
        </p>

        <p>
          The price, minimum bid, required increment, currency, and other
          relevant information will be displayed before you complete payment.
        </p>

        <LegalList
          items={[
            "A bid is considered confirmed only after successful payment confirmation.",
            "Your bid determines your paid leaderboard position according to the applicable ranking rules.",
            "Other users may place higher qualifying bids and move their pets above yours.",
            "Raising an existing bid may charge only the difference where the applicable bidding rules allow it.",
            "Completed bids are non-refundable unless a refund is required by applicable law.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="No refunds">
        <p>
          Unless required by applicable law, completed bids and paid ranking
          purchases are final and non-refundable.
        </p>

        <p>You will not normally receive a refund because:</p>

        <LegalList
          items={[
            "Another pet outbids yours.",
            "Your pet loses a competition.",
            "Your pet's rank decreases.",
            "Your pet receives fewer supporters than expected.",
            "Your pet receives fewer views than expected.",
            "You change your mind.",
            "The leaderboard changes.",
            "A daily competition ends.",
            "The Service temporarily becomes unavailable.",
            "Your submission is later removed because it violated these Terms or Rules.",
          ]}
        />

        <p>
          Where applicable law provides a mandatory refund, withdrawal,
          cancellation, or other consumer right that cannot legally be
          excluded, that right remains unaffected.
        </p>
      </LegalSection>

      <LegalSection heading="Support and community activity">
        <p>
          Pawdium may allow visitors to support pets or otherwise interact with
          pet profiles.
        </p>

        <p>
          Support is a community interaction and does not represent a
          guarantee, endorsement, certification, or factual judgment by
          Pawdium.
        </p>

        <LegalList
          items={[
            "Automated support may be removed.",
            "Duplicate support may be removed.",
            "Fraudulent activity may be removed.",
            "Manipulated engagement may be removed.",
            "Pawdium may use technical measures to protect the integrity of the leaderboard.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Your warranties">
        <p>
          By submitting a pet, uploading content, supporting a pet, or placing a
          bid, you represent and warrant that:
        </p>

        <LegalList
          items={[
            "You have the necessary rights and permissions.",
            "Your submission is truthful and not intentionally misleading.",
            "You are not impersonating another person.",
            "You are not using someone else's pet or identity without authorization.",
            "Your content does not violate applicable law.",
            "Your content does not infringe copyright, trademark, privacy, publicity, or other rights.",
            "Your use of Pawdium does not involve fraud or unlawful activity.",
            "Your payment information is authorized for the transaction.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Prohibited content and use">
        <p>You may not use Pawdium to:</p>

        <LegalList
          items={[
            "Upload stolen or unauthorized pet photographs.",
            "Impersonate another person or pet owner.",
            "Submit fraudulent or deliberately misleading information.",
            "Upload sexually explicit or pornographic content.",
            "Upload hateful, threatening, or harassing content.",
            "Promote animal cruelty or abuse.",
            "Exploit or endanger animals.",
            "Upload content involving child sexual exploitation.",
            "Infringe copyright, trademark, privacy, publicity, or other rights.",
            "Upload malware or malicious code.",
            "Conduct scams or fraudulent schemes.",
            "Manipulate bids or support counts through bots or automated systems.",
            "Interfere with the Service.",
            "Circumvent rate limits or security controls.",
            "Attempt to access another user's private information.",
            "Reverse engineer the Service except where applicable law expressly permits it.",
            "Use automated scraping to create a competing service without our permission.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Animal welfare">
        <p>
          Pawdium is intended to celebrate pets and responsible pet ownership.
        </p>

        <p>You may not use the Service to promote, encourage, or profit from:</p>

        <LegalList
          items={[
            "Animal abuse or cruelty.",
            "Animal fighting.",
            "Intentional injury.",
            "Dangerous exploitation of animals.",
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
            "The content violates these Terms.",
            "The content violates the Rules.",
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
          necessary. Removal for violating these Terms does not automatically
          create a right to a refund.
        </p>
      </LegalSection>

      <LegalSection heading="User-generated content">
        <p>
          You retain ownership of photographs, descriptions, and other
          original content you submit to Pawdium.
        </p>

        <p>
          By submitting content, you grant Pawdium a worldwide,
          non-exclusive, royalty-free licence to host, reproduce, resize,
          format, display, distribute, and otherwise use that content as
          reasonably necessary to:
        </p>

        <LegalList
          items={[
            "Operate Pawdium.",
            "Display pet profiles.",
            "Display leaderboards.",
            "Promote Pawdium.",
            "Create previews or share cards.",
            "Maintain backups and archives.",
            "Improve the Service.",
          ]}
        />

        <p>
          This licence continues for as long as reasonably necessary for those
          purposes, including where content remains in backups or historical
          records.
        </p>

        <p>
          You can request removal of your pet profile or submitted content by
          contacting us.
        </p>
      </LegalSection>

      <LegalSection heading="No endorsement">
        <p>
          A pet's appearance on Pawdium does not mean that Pawdium:
        </p>

        <LegalList
          items={[
            "Endorses the pet.",
            "Endorses the owner.",
            "Verifies the pet's information.",
            "Considers the pet objectively superior.",
            "Guarantees the accuracy of the submitted information.",
          ]}
        />

        <p>
          Likewise, a high ranking or large number of supporters does not
          constitute a certification or professional assessment of the pet.
        </p>

        <p>
          Pawdium is a game and community leaderboard, not a professional
          pet-rating service.
        </p>
      </LegalSection>

      <LegalSection heading="Third-party links and services">
        <p>
          Pawdium may use third-party services for:
        </p>

        <LegalList
          items={[
            "Payment processing.",
            "Hosting.",
            "Image storage.",
            "Analytics.",
            "Security.",
            "Email.",
            "Authentication or verification.",
          ]}
        />

        <p>
          Third-party services have their own terms and privacy policies.
        </p>

        <p>
          We are not responsible for third-party websites, services, products,
          or content. When you follow an external link, you leave Pawdium and
          are subject to that destination's terms and policies.
        </p>
      </LegalSection>

      <LegalSection heading="Availability and changes">
        <p>
          We provide Pawdium on an "as-is" and "as-available" basis to the
          extent permitted by law.
        </p>

        <p>The Service may occasionally be:</p>

        <LegalList
          items={[
            "Unavailable.",
            "Delayed.",
            "Inaccurate.",
            "Interrupted.",
            "Affected by bugs.",
            "Affected by third-party outages.",
          ]}
        />

        <p>We may change, suspend, or discontinue features including:</p>

        <LegalList
          items={[
            "Leaderboards.",
            "Daily competitions.",
            "Bidding mechanics.",
            "Support systems.",
            "Categories.",
            "Ranking rules.",
            "Submission limits.",
            "Payment options.",
          ]}
        />

        <p>
          If we make material changes to these Terms, we will update the date at
          the top of this page.
        </p>
      </LegalSection>

      <LegalSection heading="Disclaimers">
        <p>
          To the fullest extent permitted by applicable law, Pawdium disclaims
          warranties, express or implied, including warranties of:
        </p>

        <LegalList
          items={[
            "Merchantability.",
            "Fitness for a particular purpose.",
            "Availability.",
            "Accuracy.",
            "Reliability.",
            "Non-infringement.",
          ]}
        />

        <p>We do not guarantee that:</p>

        <LegalList
          items={[
            "The Service will always be available.",
            "Rankings will always be error-free.",
            "Support counts will always be perfectly accurate.",
            "Submitted pet information will be accurate.",
            "Images will remain available.",
            "A pet will remain at a particular rank.",
            "Your participation will generate attention or any financial benefit.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Limitation of liability">
        <p>
          Nothing in these Terms excludes or limits liability that cannot
          legally be excluded or limited under applicable law.
        </p>

        <p>
          To the maximum extent permitted by law, Pawdium and its operators will
          not be responsible for:
        </p>

        <LegalList
          items={[
            "Indirect losses.",
            "Incidental damages.",
            "Consequential damages.",
            "Loss of profits.",
            "Loss of data.",
            "Loss of goodwill.",
            "Loss of expected attention or traffic.",
            "Losses caused by third-party services.",
          ]}
        />

        <p>
          To the extent permitted by law, our total liability relating to a
          paid transaction will be limited to the amount you paid for the
          specific transaction giving rise to the claim.
        </p>

        <p>
          Nothing in these Terms limits liability for matters that applicable
          law does not permit us to limit.
        </p>
      </LegalSection>

      <LegalSection heading="Indemnification">
        <p>
          To the extent permitted by applicable law, you agree to defend,
          indemnify, and hold harmless Pawdium and its operators, employees,
          contractors, and service providers from claims, damages, losses,
          liabilities, and reasonable costs arising from:
        </p>

        <LegalList
          items={[
            "Your use of Pawdium.",
            "Your pet submission.",
            "Your uploaded content.",
            "Your violation of these Terms or Rules.",
            "Your violation of another person's rights.",
            "Your fraudulent or unlawful activity.",
            "Your misuse of the Service.",
          ]}
        />

        <p>
          We may take control of the defense of a claim where appropriate, and
          you agree to reasonably cooperate.
        </p>
      </LegalSection>

      <LegalSection heading="Governing law">
        <p>
          These Terms will be governed by the laws of{" "}
          <strong>India</strong>, without regard
          to its conflict-of-law rules.
        </p>

        <p>
          If you are a consumer and mandatory laws in your country provide you
          with rights that cannot be excluded by these Terms, those rights
          remain unaffected.
        </p>

        <p>
          Any dispute will be subject to the courts having jurisdiction under
          applicable law.
        </p>
      </LegalSection>

      <LegalSection heading="General">
        <LegalList
          items={[
            "If any provision of these Terms is found to be unenforceable, the remaining provisions will continue in effect.",
            "Our failure to enforce a provision does not constitute a waiver of that provision.",
            "You may not transfer your rights or obligations under these Terms without our consent, except where applicable law permits it.",
            "We may transfer these Terms in connection with a merger, acquisition, restructuring, or sale of Pawdium.",
            "These Terms, together with the Rules, Privacy Policy, and checkout information, constitute the agreement between you and Pawdium regarding the Service.",
            "Third-party providers used by Pawdium operate independently and may have their own terms and policies.",
          ]}
        />
      </LegalSection>

      <LegalSection heading="Contact">
        <p>
          Questions about these Terms can be sent to:
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