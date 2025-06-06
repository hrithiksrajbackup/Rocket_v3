import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "Basic resume building tools",
    features: [
      "1 resume",
      "Basic templates",
      "Export to PDF",
      "ATS compatibility check"
    ],
    cta: "Get Started",
    highlighted: false
  },
  {
    name: "Pro",
    price: "$12",
    period: "/month",
    description: "Everything you need for job applications",
    features: [
      "Unlimited resumes",
      "All templates",
      "AI content suggestions",
      "Export to all formats",
      "Version history",
      "Job-specific tailoring",
      "Priority support"
    ],
    cta: "Upgrade to Pro",
    highlighted: true
  },
  {
    name: "Team",
    price: "$49",
    period: "/month",
    description: "For career coaches and teams",
    features: [
      "Everything in Pro",
      "5 team members",
      "Team templates",
      "Advanced analytics",
      "Client management",
      "Custom branding",
      "API access"
    ],
    cta: "Contact Sales",
    highlighted: false
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that best fits your needs. All plans include our core resume building features.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {pricingPlans.map((plan) => (
            <Card key={plan.name} className={`border ${plan.highlighted ? 'border-primary shadow-lg relative' : 'shadow-sm'}`}>
              {plan.highlighted && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.period && <span className="text-muted-foreground">{plan.period}</span>}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/signup" className="w-full">
                  <Button 
                    variant={plan.highlighted ? "default" : "outline"} 
                    className="w-full"
                  >
                    {plan.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}