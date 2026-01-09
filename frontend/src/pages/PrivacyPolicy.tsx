import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Lock, Eye, Shield, Database, UserCheck, MapPin, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

export default function Privacy() {
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
              <Lock className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">
              Msitiri Privacy Policy
            </h1>
            <p className="text-lg text-muted-foreground">
              Protecting your data while empowering your purchasing decisions in Kenya's second-hand market
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              Compliant with Kenya's Data Protection Act, 2019
            </p>
          </div>

          {/* Content */}
          <div className="prose prose-lg max-w-none">
            <div className="bg-card border border-border rounded-2xl p-8 space-y-8">
              {/* Introduction */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-primary" />
                  1. Our Commitment to Kenyan Users
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    At Msitiri, we are committed to protecting your privacy in accordance with Kenya's Data Protection Act, 2019. This policy explains how we collect, use, and safeguard your information as you use our price comparison platform for second-hand vehicles and electronics in Kenya.
                  </p>
                  <div className="bg-primary/5 border border-primary/20 p-4 rounded-lg">
                    <p className="text-sm">
                      <strong>Data Protection Officer:</strong> We have appointed a Data Protection Officer registered with the Office of the Data Protection Commissioner (ODPC) in Kenya.
                    </p>
                  </div>
                </div>
              </section>

              {/* Information Collection */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <Database className="h-6 w-6 text-primary" />
                  2. Information We Collect
                </h2>
                <div className="space-y-6 text-muted-foreground">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Personal Identification Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Required for Registration</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Full name (as per Kenyan ID)</li>
                          <li>• Email address</li>
                          <li>• Phone number (Kenyan format)</li>
                          <li>• County of residence</li>
                        </ul>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <h4 className="font-medium text-foreground mb-2">Optional Information</h4>
                        <ul className="space-y-1 text-sm">
                          <li>• Profile picture</li>
                          <li>• Preferred vehicle types</li>
                          <li>• Budget ranges</li>
                          <li>• Location preferences</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Transaction & Usage Data</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <h4 className="font-medium text-foreground">Location Data</h4>
                        </div>
                        <p className="text-sm">
                          We collect approximate location data (county level) to provide localized price comparisons and dealer information across Kenya.
                        </p>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-primary" />
                          <h4 className="font-medium text-foreground">Search & Comparison Data</h4>
                        </div>
                        <p className="text-sm">
                          Your search history, viewed listings, price comparisons, and saved items help us improve our algorithms and provide better recommendations.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Product Assessment Data</h3>
                    <p className="text-sm">
                      When you submit condition reports or reviews for vehicles/electronics, we collect:
                    </p>
                    <ul className="space-y-1 text-sm mt-2 pl-5">
                      <li>• Product photos (with metadata removed)</li>
                      <li>• Condition descriptions</li>
                      <li>• Price paid information (optional)</li>
                      <li>• Dealer/seller ratings</li>
                      <li>• Transaction experience feedback</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Information */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Information</h2>
                <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Core Platform Functions</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Provide accurate price comparisons across Kenyan markets</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Generate condition assessments for vehicles & electronics</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Personalize search results based on your preferences</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Send price drop alerts and market updates</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Platform Improvement</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Train our pricing algorithms with anonymized data</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Analyze market trends in Kenya's second-hand economy</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Improve fraud detection and user verification</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                        <span>Develop new features for Kenyan buyers</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Sharing in Kenya */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">4. Data Sharing Within Kenya</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We may share anonymized, aggregated data with:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2 text-sm">Kenyan Authorities</h3>
                      <p className="text-xs">When required by law (courts, police, ODPC)</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2 text-sm">Research Partners</h3>
                      <p className="text-xs">Universities studying Kenya's second-hand economy</p>
                    </div>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h3 className="font-semibold text-foreground mb-2 text-sm">Service Providers</h3>
                      <p className="text-xs">Kenyan hosting, payment, and analytics partners</p>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4 rounded-lg">
                    <h3 className="font-semibold text-foreground mb-2">What We Never Share</h3>
                    <ul className="space-y-1 text-sm">
                      <li>• Your personal contact information with sellers</li>
                      <li>• Your exact location data</li>
                      <li>• Your search history with third parties</li>
                      <li>• Your financial information (we don't store payment details)</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Your Rights Under Kenyan Law */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <UserCheck className="h-6 w-6 text-primary" />
                  5. Your Rights Under Data Protection Act, 2019
                </h2>
                <div className="grid md:grid-cols-2 gap-6 text-muted-foreground">
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Access & Control Rights</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Eye className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Right to Access:</strong> Request copies of your personal data
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Eye className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Right to Rectification:</strong> Correct inaccurate personal data
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Eye className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Right to Erasure:</strong> Request deletion of your data
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Eye className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Right to Restrict Processing:</strong> Limit how we use your data
                        </div>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className="font-semibold text-foreground">Additional Protections</h3>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Eye className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Right to Data Portability:</strong> Receive your data in usable format
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Eye className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Right to Object:</strong> Object to certain data processing
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Eye className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Rights Related to Automated Decision Making:</strong> Understand and challenge algorithmic decisions
                        </div>
                      </li>
                      <li className="flex items-start gap-2">
                        <Eye className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <div>
                          <strong>Right to Lodge Complaints:</strong> With the ODPC Kenya
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Data Security */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">6. Data Security & Storage</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    We implement robust security measures in compliance with Kenyan data protection standards:
                  </p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">Technical Measures</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• End-to-end encryption for sensitive data</li>
                        <li>• Secure servers located in Kenya</li>
                        <li>• Regular security audits and penetration testing</li>
                        <li>• Multi-factor authentication for admin access</li>
                      </ul>
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">Organizational Measures</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Data Protection Officer oversight</li>
                        <li>• Employee data protection training</li>
                        <li>• Strict access controls and logging</li>
                        <li>• Incident response procedures</li>
                      </ul>
                    </div>
                  </div>
                  <p className="text-sm">
                    All personal data is stored on servers within Kenya, in compliance with data localization considerations under Kenyan law.
                  </p>
                </div>
              </section>

              {/* Contact Information */}
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-4">7. Contact Our Data Protection Team</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    To exercise your rights or for privacy-related inquiries:
                  </p>
                  <div className="bg-card border border-border p-6 rounded-lg">
                    <div className="space-y-3">
                      <div>
                        <h3 className="font-semibold text-foreground">Data Protection Officer</h3>
                        <p className="text-sm">
                          Msitiri Limited<br />
                          Attention: Data Protection Officer<br />
                          Nairobi, Kenya
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Contact Details</h3>
                        <p className="text-sm">
                          <strong>Email:</strong> dpo@msitiri.co.ke<br />
                          <strong>Phone:</strong> +254 711 674 8474 (Data Protection Line)<br />
                          <strong>ODPC Registration:</strong> DPO-XXXX-XXXX
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">Office of the Data Protection Commissioner</h3>
                        <p className="text-sm">
                          For independent oversight, you may contact:<br />
                          Office of the Data Protection Commissioner Kenya<br />
                          P.O. Box 30920-00100, Nairobi<br />
                          Tel: +254 202 210 173<br />
                          Email: info@odpc.go.ke
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Updates & Compliance */}
            <div className="mt-8 space-y-4">
              <div className="p-6 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-foreground mb-2">Our Compliance Commitment</h3>
                <p className="text-sm text-muted-foreground">
                  Msitiri is fully committed to compliance with Kenya's Data Protection Act, 2019. We regularly review and update our practices to ensure ongoing compliance with Kenyan data protection standards and regulations.
                </p>
              </div>
              <div className="text-center text-sm text-muted-foreground">
                <p>
                  This Privacy Policy is effective from January 9, 2026. We will notify users of any material changes through platform announcements and email notifications where required by law.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}