import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Shield, TrendingUp, Car, Cpu, CheckCircle, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

export default function Terms() {
  return (
    <Layout>
      <div className="min-h-[calc(100vh-200px)] py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <div className="mb-8">
            <Link to="/register">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Registration
              </Button>
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <FileText className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">
              Msitiri Terms of Service
            </h1>
            <p className="text-lg text-muted-foreground">
              Empowering Kenyan buyers with fair pricing insights for second-hand vehicles & electronics
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Last updated: January 9, 2026
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-card border border-border rounded-2xl p-8 space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  1. Platform Purpose & Scope
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Msitiri is a price comparison and quality assessment platform designed specifically for Kenya's second-hand economy. Our mission is to empower Kenyan buyers with transparent pricing data and condition assessments for:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Car className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Vehicles</h3>
                      </div>
                      <ul className="space-y-1 text-sm">
                        <li>• Cars, SUVs, Vans</li>
                        <li>• Motorcycles & Scooters</li>
                        <li>• Commercial Vehicles</li>
                        <li>• Tractors & Farm Equipment</li>
                      </ul>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Cpu className="h-5 w-5 text-primary" />
                        <h3 className="font-semibold text-foreground">Electronics</h3>
                      </div>
                      <ul className="space-y-1 text-sm">
                        <li>• Smartphones & Tablets</li>
                        <li>• Laptops & Computers</li>
                        <li>• Home Appliances</li>
                        <li>• Audio/Video Equipment</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Important:</strong> Msitiri is a <strong>comparison and information platform only</strong>. We do not sell products, handle transactions, or guarantee the accuracy of listings. All transactions are between buyers and sellers directly.
                    </p>
                  </div>
                </div>
              </section>

              {/* User Responsibilities */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">2. User Account & Responsibilities</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Eligibility</h3>
                      <p>You must be at least 18 years old and legally capable of entering contracts in Kenya to use Msitiri.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Account Security</h3>
                      <p>You are responsible for maintaining the confidentiality of your login credentials and all activities under your account.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Accurate Information</h3>
                      <p>Provide accurate, current, and complete information during registration and when submitting reviews or condition reports.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-foreground">Prohibited Activities</h3>
                      <ul className="space-y-1 mt-1">
                        <li>• Misrepresenting product conditions</li>
                        <li>• Manipulating pricing data</li>
                        <li>• Posting fraudulent listings</li>
                        <li>• Harassing other users</li>
                        <li>• Violating Kenyan consumer protection laws</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              {/* Price Comparison System */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <TrendingUp className="h-6 w-6 text-primary" />
                  3. Price Comparison & Condition Assessment
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our proprietary algorithms analyze multiple data points to provide fair price estimates and condition assessments:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">For Vehicles</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Market price analysis across Kenya</li>
                        <li>• Mileage vs age comparison</li>
                        <li>• Service history assessment</li>
                        <li>• Accident & repair history</li>
                        <li>• Mechanical condition scoring</li>
                        <li>• Body & paint condition rating</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">For Electronics</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Age vs performance analysis</li>
                        <li>• Battery health assessment</li>
                        <li>• Physical condition scoring</li>
                        <li>• Functionality verification</li>
                        <li>• Warranty status consideration</li>
                        <li>• Accessories completeness</li>
                      </ul>
                    </div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Disclaimer:</strong> Our assessments are based on available data and user submissions. Always conduct your own inspection before purchasing. Prices are estimates and actual sale prices may vary.
                    </p>
                  </div>
                </div>
              </section>

              {/* Intellectual Property */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Content & Intellectual Property</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    By submitting content (reviews, photos, condition reports) to Msitiri, you grant us a non-exclusive license to use, display, and analyze this content to improve our comparison algorithms.
                  </p>
                  <p>
                    All Msitiri algorithms, pricing models, and assessment methodologies are proprietary intellectual property. You may not copy, reverse-engineer, or misuse our comparison data.
                  </p>
                </div>
              </section>

              {/* Kenyan Consumer Protection */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">5. Kenyan Law & Consumer Protection</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Msitiri operates in accordance with Kenyan laws including:
                  </p>
                  <ul className="space-y-2 pl-5">
                    <li>• Consumer Protection Act, 2012</li>
                    <li>• Data Protection Act, 2019</li>
                    <li>• Competition Act, 2010</li>
                    <li>• National Transport and Safety Authority Regulations</li>
                  </ul>
                  <p>
                    Users are responsible for complying with all applicable Kenyan laws regarding vehicle transfer, electronics sales, and consumer transactions.
                  </p>
                </div>
              </section>

              {/* Limitation of Liability */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Limitation of Liability</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Msitiri provides information and comparison tools only. We are not party to any transactions between buyers and sellers.
                  </p>
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">Important Limitations</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• We do not verify seller identity or product ownership</li>
                      <li>• We do not guarantee product condition or authenticity</li>
                      <li>• We are not responsible for transaction disputes</li>
                      <li>• Always verify logbooks, receipts, and documentation</li>
                      <li>• Consider using escrow services for large purchases</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Dispute Resolution */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Dispute Resolution</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Any disputes arising from use of Msitiri shall be governed by Kenyan law and resolved in courts within Nairobi, Kenya.
                  </p>
                  <p>
                    For transaction disputes between buyers and sellers, we recommend:
                  </p>
                  <ul className="space-y-2 pl-5">
                    <li>• Contacting the Kenya Consumer Protection Federation</li>
                    <li>• Seeking mediation through Small Claims Court</li>
                    <li>• Reporting fraudulent activity to Kenyan police</li>
                  </ul>
                </div>
              </section>

              {/* Contact */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">8. Contact & Support</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    For questions about these Terms or to report platform issues:
                  </p>
                  <div className="bg-card border border-border p-4 rounded-lg">
                    <p>
                      <strong>Msitiri Limited</strong><br />
                      Nairobi, Kenya<br />
                      <strong>Email:</strong> legal@msitiri.co.ke<br />
                      <strong>Phone:</strong> +254 711 MSITIRI (674 8474)<br />
                      <strong>Business Hours:</strong> Mon-Fri, 8:00 AM - 5:00 PM EAT
                    </p>
                  </div>
                </div>
              </section>
            </div>

            {/* Acceptance */}
            <div className="mt-8 text-center p-6 bg-primary/5 rounded-xl border border-primary/20">
              <p className="text-muted-foreground">
                By using Msitiri, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, and confirm that you are acting in compliance with Kenyan laws and regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}