import { Layout } from "@/components/layout/Layout";

const TermsOfService = () => {
  return (
    <Layout>
      <div className="bg-muted/30 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Terms of Service
          </h1>
          <p className="text-muted-foreground">Last updated: January 2025</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto prose prose-gray dark:prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground mb-4">
              By accessing and using Msitiri ("the Platform"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Description of Service</h2>
            <p className="text-muted-foreground mb-4">
              Msitiri is an online marketplace platform that connects buyers and sellers of second-hand vehicles and electronics in Kenya. We provide tools to help users evaluate products based on condition, pricing, and other attributes.
            </p>
            <p className="text-muted-foreground mb-4">
              Our services include but are not limited to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Listing and browsing of vehicles and electronics</li>
              <li>Condition scoring and price comparison tools</li>
              <li>Dealer verification services</li>
              <li>Communication tools between buyers and sellers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. User Accounts</h2>
            <p className="text-muted-foreground mb-4">
              To access certain features of the Platform, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Notify us immediately of any unauthorized use of your account</li>
              <li>Be responsible for all activities that occur under your account</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. User Conduct</h2>
            <p className="text-muted-foreground mb-4">
              When using Msitiri, you agree not to:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Post false, misleading, or fraudulent listings</li>
              <li>Misrepresent the condition or features of items</li>
              <li>Engage in harassment or abusive behavior</li>
              <li>Attempt to manipulate pricing or condition scores</li>
              <li>Use the platform for illegal activities</li>
              <li>Collect user data without authorization</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Listings and Transactions</h2>
            <p className="text-muted-foreground mb-4">
              Msitiri acts as a marketplace facilitator. We do not own, sell, or purchase any items listed on the platform. All transactions are between buyers and sellers directly.
            </p>
            <p className="text-muted-foreground mb-4">
              Sellers are responsible for:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>Accurate description of items</li>
              <li>Honest representation of item condition</li>
              <li>Compliance with local laws and regulations</li>
              <li>Fulfillment of agreed transactions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Fees and Payments</h2>
            <p className="text-muted-foreground mb-4">
              Basic listing on Msitiri is free. Premium features may be subject to fees, which will be clearly disclosed before any charges are made. Payment processing is handled by third-party providers.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Limitation of Liability</h2>
            <p className="text-muted-foreground mb-4">
              Msitiri is provided "as is" without warranties of any kind. We are not liable for:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2">
              <li>The quality, safety, or legality of listed items</li>
              <li>The accuracy of listings or user content</li>
              <li>The ability of sellers to sell or buyers to pay</li>
              <li>Any disputes between users</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Intellectual Property</h2>
            <p className="text-muted-foreground mb-4">
              All content, features, and functionality of Msitiri, including logos, design, and software, are owned by Msitiri and protected by intellectual property laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">9. Termination</h2>
            <p className="text-muted-foreground mb-4">
              We reserve the right to suspend or terminate your account at our discretion, particularly for violations of these terms. You may also close your account at any time.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">10. Governing Law</h2>
            <p className="text-muted-foreground mb-4">
              These terms are governed by the laws of Kenya. Any disputes shall be resolved in the courts of Kenya.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-foreground mb-4">11. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              For questions about these Terms of Service, please contact us at:
            </p>
            <p className="text-muted-foreground">
              Email: legal@msitiri.co.ke<br />
              Address: Nairobi, Kenya
            </p>
          </section>
        </div>
      </div>
    </Layout>
  );
};

export default TermsOfService;
