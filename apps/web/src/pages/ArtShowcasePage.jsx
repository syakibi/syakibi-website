import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import ArtCard from '@/components/ArtCard.jsx';

const ArtShowcasePage = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const artworks = [
    { image: 'https://i.postimg.cc/bG3kJtgN/showcase-0.png', title: 'Showcase 1' },
    { image: 'https://i.postimg.cc/ns0BzD2L/showcase-1.png', title: 'Showcase 2' },
    { image: 'https://i.postimg.cc/WDXg3k8F/showcase-2.png', title: 'Showcase 3' },
    { image: '/images/showcase-3.png', title: 'Showcase 4' },
    { image: 'https://i.postimg.cc/62qRGpb0/showcase-4.png', title: 'Showcase 5' },
    { image: 'https://i.postimg.cc/dk3dTVNr/showcase-5.png', title: 'Showcase 6' },
    { image: 'https://i.postimg.cc/tZJPV4v3/showcase-6.png', title: 'Showcase 7' },
    { image: 'https://i.postimg.cc/7Gh7TZtg/showcase-7.png', title: 'Showcase 8' },
    { image: 'https://i.postimg.cc/dkfCRcg8/showcase-8.png', title: 'Showcase 9' },
    { image: 'https://i.postimg.cc/TLsbjvBq/showcase-9.png', title: 'Showcase 10' },
    { image: 'https://i.postimg.cc/gX7hyb1M/showcase-10.png', title: 'Showcase 11' },
    { image: 'https://i.postimg.cc/LYWPkFG0/showcase-11.png', title: 'Showcase 12' },
    { image: 'https://i.postimg.cc/tZc6dG88/showcase-12.png', title: 'Showcase 13' },
    { image: 'https://i.postimg.cc/ftPd7Q16/showcase-13.png', title: 'Showcase 14' },
    { image: 'https://i.postimg.cc/64GvY1NF/showcase-14.png', title: 'Showcase 15' },
    { image: 'https://i.postimg.cc/XGP5K6Tj/showcase-15.png', title: 'Showcase 16' },
    { image: 'https://i.postimg.cc/tnVx2mjR/showcase-16.png', title: 'Showcase 17' },
    { image: 'https://i.postimg.cc/zHRg0Pr3/showcase-17.png', title: 'Showcase 18' },
    { image: 'https://i.postimg.cc/jCWPxCJg/showcase-18.png', title: 'Showcase 19' },
    { image: 'https://i.postimg.cc/hhJTDhdR/showcase-19.png', title: 'Showcase 20' },
    { image: 'https://i.postimg.cc/xqkMfqzc/showcase-20.png', title: 'Showcase 21' }
  ];

  const filteredArtworks = artworks;

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredArtworks.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredArtworks.length) % filteredArtworks.length);
  };

  return (
    <>
      <Helmet>
        <title>Works - Syakibi</title>
        <meta name="description" content="Browse my portfolio of digital art, character designs, and illustrations. Commission work available." />
      </Helmet>

      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1">
          <section className="py-20 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto text-center mb-16"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ letterSpacing: '-0.02em' }}>
                  Art gallery
                </h1>
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                  Explore my collection of digital art, character designs, and creative illustrations.
                </p>
              </motion.div>

              <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
                {filteredArtworks.map((artwork, index) => (
                  <div key={index} className="break-inside-avoid">
                    <ArtCard
                      image={artwork.image}
                      title={artwork.title}
                      category="Showcase"
                      onClick={() => openLightbox(index)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />

        <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
          <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
            <div className="relative">
              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative aspect-[4/3] flex items-center justify-center">
                <img
                  src={filteredArtworks[currentImageIndex]?.image}
                  alt={filteredArtworks[currentImageIndex]?.title}
                  className="max-h-[80vh] w-auto object-contain"
                />

                <button
                  onClick={prevImage}
                  className="absolute left-4 p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute right-4 p-3 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-all duration-200"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {filteredArtworks[currentImageIndex]?.title}
                </h3>
                <p className="text-white/60 text-sm">
                  {currentImageIndex + 1} of {filteredArtworks.length}
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default ArtShowcasePage;