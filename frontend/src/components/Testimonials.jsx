import React from 'react'
import { getTestimonialImage } from '../utils/imageUtils'

export default function Testimonials() {
  const testimonials = [
    {
      quote: "I've been a client of this financial services company for over a year now, and the experience has been fantastic. As a busy software developer, I appreciate the ease of use of their trading platform. Highly recommend this platform for both beginners and experienced investors!",
      name: "Aarav Sharma",
      role: "Software Developer",
      rating: 5
    },
    {
      quote: "As someone who's relatively new to the world of finance, I found this company to be an excellent partner on my investment journey. The educational resources they provide have been instrumental in helping me understand the intricacies of intraday trading and equity transactions.",
      name: "Priya Kapoor",
      role: "Marketing Executive",
      rating: 5
    },
    {
      quote: "I've been in the financial industry for several years, and I can confidently say that this company stands out for its professionalism and range of services. The accuracy of their market analysis tools has significantly contributed to the success of my investment strategies.",
      name: "Rajesh Patel",
      role: "Chartered Accountant",
      rating: 5
    }
  ]

  return (
    <section id="testimonials" className="py-16 sm:py-20 lg:py-24 bg-black relative overflow-hidden">
      {/* Abstract Design Background */}
      <div className="absolute inset-0 abstract-bg-2"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black mb-4 text-white">
            Clients <span className="text-primary">Review</span>
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto"></div>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            See what our clients think about us
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="group relative bg-gradient-to-br from-dark-gray to-black border-2 border-primary/20 p-8 sm:p-10 rounded-2xl hover:border-primary hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 overflow-hidden"
            >
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-tr-full"></div>
              
              <div className="relative z-10">
                {/* Quote Icon */}
                <div className="mb-6">
                  <svg className="w-12 h-12 text-primary/30" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.984zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.432.917-3.995 3.638-3.995 5.849h3.983v10h-9.984z"/>
                  </svg>
                </div>
                
                {/* Rating Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                
                {/* Quote */}
                <p className="text-base sm:text-lg text-gray-300 leading-relaxed mb-6 italic">
                  "{testimonial.quote}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-primary/20">
                  <div className="relative flex-shrink-0">
                    <div className="absolute inset-0 bg-primary/20 rounded-full blur-md"></div>
                    <img 
                      src={getTestimonialImage(testimonial.name)} 
                      alt={testimonial.name}
                      className="relative w-16 h-16 rounded-full object-cover border-2 border-primary/30 group-hover:border-primary transition-all duration-300"
                      onError={(e) => {
                        e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=ff6b35&color=000&size=128`
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-white text-lg">{testimonial.name}</p>
                    <p className="text-sm text-primary mt-1">— {testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

