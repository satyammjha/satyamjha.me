'use client'

import * as React from "react"
import Image from 'next/image'
import { Linkedin, Globe, Quote } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export const testimonials = [
  {
    quote: "Satyam delivered exactly what we needed—an intuitive and visually appealing platform. His commitment to excellence and ability to understand our requirements made the entire process smooth and efficient. A great experience overall!",
    name: "Ashish Kanojia",
    title: "CEO, Gigabyte Coders",
    site: "https://gigabytecoders.com",
    img: '/ashishKanojiya.jpg',
  },
  {
    quote: "Satyam perfectly captured the essence of our brand with his creative approach. The website he developed is not only professional but also user-friendly, helping us attract more clients. His work exceeded all expectations!",
    name: "Aman Kumar",
    title: "Founder, Shehnai Event Management",
    site: "https://shehnaievent.in/",
    img: '/aman.png',
  },
];

export default function TestimonialCarousel() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Client Testimonials
          </h2>
          <p className="text-muted-foreground">What people say about working with me</p>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-2">
                  <Card className="h-full">
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                     
                      <div className="w-full flex flex-col items-center space-y-4">
                        <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-muted">
                          {testimonial.img ? (
                            <Image
                              src={testimonial.img}
                              alt={testimonial.name}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, 33vw"
                            />
                          ) : (
                            <div className="h-full w-full bg-muted flex items-center justify-center">
                              <Quote className="h-8 w-8 text-muted-foreground" />
                            </div>
                          )}
                        </div>

                        <div className="text-center space-y-1">
                          <h3 className="text-lg font-medium text-foreground">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.title}
                          </p>
                          {testimonial.site && (
                            <a
                              href={testimonial.site}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                            >
                              {testimonial.site.includes('linkedin') ? (
                                <Linkedin className="h-4 w-4" />
                              ) : (
                                <Globe className="h-4 w-4" />
                              )}
                              <span className="sr-only">Visit website</span>
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="w-full mt-4 flex-1 relative">
                        <Quote className="h-6 w-6 text-muted-foreground/30 absolute -top-2 left-0" />
                        <blockquote className="text-sm md:text-base leading-relaxed text-foreground/90 italic">
                          "{testimonial.quote}"
                        </blockquote>
                        <Quote className="h-6 w-6 text-muted-foreground/30 rotate-180 absolute -bottom-2 right-0" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* <div className="mt-6 flex justify-center">
            <CarouselPrevious variant="ghost" className="rounded-full" />
            <CarouselNext variant="ghost" className="rounded-full" />
          </div> */}
        </Carousel>
      </div>
    </section>
  )
}