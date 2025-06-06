import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const testimonials = [
  {
    quote: "ResumeAI helped me land interviews at three top tech companies. The AI suggestions made my experience descriptions much more impactful.",
    author: "Sarah Johnson",
    title: "Software Engineer",
    avatar: "SJ"
  },
  {
    quote: "I was struggling to make my resume stand out until I found this tool. The ATS checker feature ensured my resume wasn't getting filtered out.",
    author: "Michael Chen",
    title: "Marketing Manager",
    avatar: "MC"
  },
  {
    quote: "As someone changing careers, I needed help highlighting transferable skills. The AI content suggestions were incredibly helpful for this.",
    author: "Jessica Rivera",
    title: "UX Designer",
    avatar: "JR"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            What Our Users Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Join thousands of job seekers who have successfully landed interviews with resumes created using our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border shadow-sm h-full flex flex-col">
              <CardContent className="pt-6 flex-grow">
                <div className="mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="text-yellow-500 inline-block">★</span>
                  ))}
                </div>
                <blockquote className="text-muted-foreground italic">
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}