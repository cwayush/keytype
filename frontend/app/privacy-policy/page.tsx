export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-4xl mx-auto px-8 py-12 text-neutral-300 md:border rounded-md m-10">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-400 mb-8">
          Last Updated: December 2025
        </p>
      </div>

      <section className="space-y-6">
        <p>
          At <span className="font-semibold text-white">keyType</span>, we
          respect your privacy and are committed to protecting your personal
          information. This page explains how your data is collected, used, and
          stored.
        </p>

        <h2 className="text-xl font-semibold text-white">
          Information We Collect
        </h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Email address</li>
          <li>Username</li>
          <li>Typing test performance data</li>
          <li>Number of tests started and completed</li>
          <li>Total typing time on the platform</li>
        </ul>

        <p>
          We do <strong>not</strong> collect custom typing text or unnecessary
          personal data.
        </p>

        <h2 className="text-xl font-semibold text-white">
          How Your Data Is Used
        </h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Displaying typing history and statistics</li>
          <li>Saving test results</li>
          <li>Remembering your preferences</li>
          <li>Maintaining leaderboards</li>
        </ul>

        <h2 className="text-xl font-semibold text-white">
          Data Storage & Security
        </h2>
        <p>
          Data is stored securely using a PostgreSQL database. We apply standard
          security practices to protect your information.
        </p>

        <h2 className="text-xl font-semibold text-white">Cookies & Sessions</h2>
        <p>
          Cookies help keep you logged in and remember your settings. Disabling
          cookies may affect certain features of the site.
        </p>

        <h2 className="text-xl font-semibold text-white">Policy Updates</h2>
        <p>
          This policy may change over time. Updates will always be reflected on
          this page.
        </p>

        <h2 className="text-xl font-semibold text-white">Contact</h2>
        <p>
          For any questions regarding privacy, contact us at{" "}
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
