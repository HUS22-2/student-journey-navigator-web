
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

const Testimonials = () => {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: 'Amira Hassan',
      country: 'Egypt',
      university: 'Sorbonne University, France',
      program: 'Master in International Relations',
      image: '👩‍🎓',
      rating: 5,
      testimonial: 'EduConsult made my dream of studying in Paris a reality. From application to visa, they guided me through every step. I am now pursuing my Master\'s at Sorbonne University!',
      year: '2023'
    },
    {
      name: 'Omar Al-Rashid',
      country: 'Jordan',
      university: 'University of Toronto, Canada',
      program: 'PhD in Computer Science',
      image: '👨‍💻',
      rating: 5,
      testimonial: 'The team helped me secure a full scholarship for my PhD in Canada. Their expertise in scholarship applications is outstanding. Highly recommended!',
      year: '2023'
    },
    {
      name: 'Fatima Benali',
      country: 'Morocco',
      university: 'Bogazici University, Turkey',
      program: 'Bachelor in Engineering',
      image: '👩‍🔬',
      rating: 5,
      testimonial: 'Thanks to EduConsult, I\'m now studying engineering in Istanbul. They helped me with everything from university selection to finding accommodation.',
      year: '2024'
    },
    {
      name: 'Ahmed Mahmoud',
      country: 'Tunisia',
      university: 'McGill University, Canada',
      program: 'Master in Business Administration',
      image: '👨‍💼',
      rating: 5,
      testimonial: 'Professional service and excellent guidance. They helped me get into one of Canada\'s top business schools. Forever grateful!',
      year: '2023'
    },
    {
      name: 'Layla Al-Zahra',
      country: 'Lebanon',
      university: 'Sciences Po, France',
      program: 'Master in Public Policy',
      image: '👩‍⚖️',
      rating: 5,
      testimonial: 'EduConsult\'s team understood my goals perfectly and matched me with the ideal program. Their support during the visa process was invaluable.',
      year: '2024'
    },
    {
      name: 'Youssef Khoury',
      country: 'Syria',
      university: 'Istanbul Technical University, Turkey',
      program: 'Master in Architecture',
      image: '👨‍🎨',
      rating: 5,
      testimonial: 'From documentation to enrollment, EduConsult handled everything professionally. I\'m now pursuing my passion for architecture in Istanbul.',
      year: '2023'
    }
  ];

  const stats = [
    { label: t('successRate'), value: '95%', description: t('ofStudentsAccepted') },
    { label: t('scholarships'), value: '$2M+', description: t('scholarshipsSecured') },
    { label: 'Universities', value: '500+', description: t('partnerUniversities') },
    { label: 'Countries', value: '25+', description: t('studyDestinations') }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-edu-blue-50 to-edu-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('studentSuccessStories')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('hearFromStudents')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <div className="text-4xl font-bold text-gradient">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">{stat.label}</div>
                <div className="text-sm text-gray-600 dark:text-gray-300">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 card-hover">
                <CardContent className="pt-6">
                  {/* Rating */}
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                    "{testimonial.testimonial}"
                  </p>

                  {/* Student Info */}
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{testimonial.image}</span>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          From {testimonial.country}
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 space-y-1">
                      <div className="text-sm font-medium text-edu-blue-600 dark:text-edu-blue-400">
                        {testimonial.program}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {testimonial.university}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Class of {testimonial.year}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              {t('videoTestimonials')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('watchStudentExperiences')}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[1, 2].map((video, index) => (
              <div key={index} className="relative">
                <div className="bg-gradient-to-br from-edu-blue-100 to-edu-purple-100 dark:from-edu-blue-900/20 dark:to-edu-purple-900/20 rounded-2xl p-8 text-center h-64 flex items-center justify-center">
                  <div>
                    <div className="text-6xl mb-4">🎥</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {t('studentSuccessStory')} #{video}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('watchHowWeHelped')}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-edu-blue-500 to-edu-purple-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t('readyToWriteStory')}
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            {t('joinThousandsOfStudents')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 text-white p-6 max-w-md">
              <CardContent className="text-center pt-0">
                <div className="text-4xl mb-2">📞</div>
                <h3 className="font-bold mb-2">{t('freeConsultation')}</h3>
                <p className="text-blue-100 text-sm">
                  {t('bookThirtyMinuteCall')}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
