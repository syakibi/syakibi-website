import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card.jsx';
import { Button } from '@/components/ui/button.jsx';

const CommissionsPage = () => {
  const ychItems = [
    {
      title: 'YCH Emotes',
      description: 'Custom emotes featuring your character in various expressions and poses.',
      price: '$20 for a pack of 10 emotes',
      image: '/images/ych-emotes.png'
    },
    {
      title: 'YCH Head Illustrations',
      description: 'Detailed head illustrations of your character with custom expressions and styling.',
      price: '$40',
      image: '/images/ych-head.png'
    },
    {
      title: 'YCH Full Body Illustrations',
      description: 'Complete full-body illustrations showcasing your character in dynamic poses.',
      price: '$80',
      image: '/images/ych-fullbody.png'
    },
    {
      title: 'YCH Chibify',
      description: 'Adorable chibi-style illustrations of your character in cute, simplified form.',
      price: '$30',
      image: '/images/ych-chibify.png'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Commissions - Syakibi</title>
        <meta name="description" content="Request custom art commissions for character designs, illustrations, emote packs, and stream graphics." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                  YCH Marketplace
                </h1>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                  Discover unique "Your Character Here" commissions. Bring your character to life with custom artwork tailored just for you.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-20"
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Available YCH Commissions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                  {ychItems.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Card className="h-full flex flex-col">
                        <CardHeader className="p-0">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-48 object-cover rounded-t-lg"
                            onError={(e) => {
                              e.target.src = '/images/placeholder.png'; // Fallback image
                            }}
                          />
                        </CardHeader>
                        <CardContent className="flex-1 p-6">
                          <CardTitle className="text-xl mb-2">{item.title}</CardTitle>
                          <CardDescription className="text-sm leading-relaxed mb-4">
                            {item.description}
                          </CardDescription>
                          <div className="text-2xl font-bold text-primary">
                            {item.price}
                          </div>
                        </CardContent>
                        <CardFooter className="p-6 pt-0">
                          <Button className="w-full" size="lg">
                            Commission Now
                          </Button>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CommissionsPage;