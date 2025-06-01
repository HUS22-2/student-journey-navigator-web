
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Award, Globe, Heart } from 'lucide-react';

const About = () => {
  const { t } = useLanguage();

  const stats = [
    { icon: Users, label: 'Students Helped', value: '10,000+', color: 'text-edu-blue-500' },
    { icon: Award, label: 'Success Rate', value: '95%', color: 'text-edu-purple-500' },
    { icon: Globe, label: 'Countries', value: '25+', color: 'text-edu-teal-500' },
    { icon: Heart, label: 'Years Experience', value: '10+', color: 'text-orange-500' }
  ];

  const team = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'CEO & Educational Consultant',
      image: '👩‍💼',
      description: 'PhD in International Education with 15 years of experience in student placement.'
    },
    {
      name: 'Ahmed Hassan',
      role: 'Visa & Immigration Specialist',
      image: '👨‍💼',
      description: 'Former immigration officer with expertise in European and North American visas.'
    },
    {
      name: 'Marie Dubois',
      role: 'French Education Coordinator',
      image: '👩‍🎓',
      description: 'Native French speaker specializing in French higher education system.'
    },
    {
      name: 'Mehmet Özkan',
      role: 'Turkey Education Advisor',
      image: '👨‍🎓',
      description: 'Turkish education expert with connections to top Turkish universities.'
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-edu-blue-50 to-edu-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('aboutTitle')}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('aboutDescription')}
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <stat.icon className={`h-12 w-12 mx-auto mb-4 ${stat.color}`} />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We believe that education should be accessible to everyone, regardless of their background or location. Our mission is to bridge the gap between talented students and world-class educational opportunities.
              </p>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Through personalized guidance, expert advice, and comprehensive support, we help students navigate the complex process of international education and achieve their academic dreams.
              </p>
            </div>
            <div className="bg-gradient-to-br from-edu-blue-100 to-edu-purple-100 dark:from-edu-blue-900/20 dark:to-edu-purple-900/20 rounded-2xl p-8 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Our Vision
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                To become the leading global platform connecting students with their dream universities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Experienced professionals dedicated to your educational success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-6xl mb-4">{member.image}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <div className="text-edu-blue-600 dark:text-edu-blue-400 font-medium mb-4">
                    {member.role}
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🤝',
                title: 'Trust & Integrity',
                description: 'We build lasting relationships based on honesty and transparency.'
              },
              {
                icon: '🌟',
                title: 'Excellence',
                description: 'We strive for the highest standards in everything we do.'
              },
              {
                icon: '🎯',
                title: 'Student-Centered',
                description: 'Every decision we make is focused on student success and satisfaction.'
              }
            ].map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
