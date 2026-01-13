export default function TermsAndConditionsPage() {
  return (
    <main className="max-w-4xl mx-auto px-8 py-12 text-neutral-300 md:border rounded-md m-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Terms & Conditions
        </h1>
        <p className="text-sm text-neutral-400 mb-8">
          Last Updated: December 2025
        </p>
      </div>

      <section className="space-y-6">
        <p>
          Welcome to <span className="font-semibold text-white">keyType</span>.
          By accessing or using our services, you agree to the following terms.
        </p>

        <h2 className="text-xl font-semibold text-white">
          Account Responsibility
        </h2>
        <p>
          You are responsible for maintaining the security of your account and
          all activities performed under it.
        </p>

        <h2 className="text-xl font-semibold text-white">Acceptable Use</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>No illegal or abusive behavior</li>
          <li>No exploitation, cheating, or automation</li>
          <li>No harassment or harmful content</li>
          <li>No privacy or intellectual property violations</li>
        </ul>

        <h2 className="text-xl font-semibold text-white">Platform Integrity</h2>
        <p>
          Any attempt to manipulate leaderboards, disrupt services, or bypass
          security measures may result in account termination.
        </p>

        <h2 className="text-xl font-semibold text-white">Privacy</h2>
        <p>
          Your use of keyType is governed by our Privacy Policy. Any misuse of
          user data is strictly prohibited.
        </p>

        <h2 className="text-xl font-semibold text-white">Disclaimer</h2>
        <p>
          keyType is provided on an “as is” basis without warranties of any
          kind. Use of the service is at your own risk.
        </p>

        <h2 className="text-xl font-semibold text-white">Updates to Terms</h2>
        <p>
          These terms may change over time. Continued use means acceptance of
          updated terms.
        </p>

        <h2 className="text-xl font-semibold text-white">Contact</h2>
        <p>
          Questions? Contact us at{" "}
          <a
            href="mailto:support@keytype.club"
            className="text-blue-500 hover:underline"
          >
            support@keytype.club
          </a>
        </p>
      </section>
    </main>
  );
}
