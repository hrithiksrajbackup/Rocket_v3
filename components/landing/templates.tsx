import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import Link from "next/link";

const templates = [
  {
    id: "professional",
    name: "Professional",
    description: "A clean, traditional design perfect for corporate roles",
    imageUrl: "https://images.pexels.com/photos/8867281/pexels-photo-8867281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "blue"
  },
  {
    id: "modern",
    name: "Modern",
    description: "Contemporary design with a creative touch",
    imageUrl: "https://images.pexels.com/photos/8867265/pexels-photo-8867265.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "teal"
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Clean and straightforward for maximum readability",
    imageUrl: "https://images.pexels.com/photos/8867432/pexels-photo-8867432.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "gray"
  },
  {
    id: "executive",
    name: "Executive",
    description: "Sophisticated design for senior positions",
    imageUrl: "https://images.pexels.com/photos/8867274/pexels-photo-8867274.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    color: "indigo"
  }
];

export function Templates() {
  return (
    <section id="templates" className="py-20 bg-muted/30">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            Professional Resume Templates
          </h2>
          <p className="text-muted-foreground text-lg">
            Choose from our collection of ATS-compatible templates designed to impress employers across all industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {templates.map((template) => (
            <Card key={template.id} className="overflow-hidden border shadow-sm hover:shadow-md transition-all group">
              <div className="aspect-[3/4] relative overflow-hidden">
                <img
                  src={template.imageUrl}
                  alt={template.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-4">
                  <Link href={`/builder?template=${template.id}`}>
                    <Button variant="secondary" size="sm" className="gap-2">
                      <Eye className="h-4 w-4" />
                      Use Template
                    </Button>
                  </Link>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium">{template.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{template.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/builder">
            <Button variant="outline" size="lg">
              View All Templates
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}