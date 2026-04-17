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

  const artworks = Array.from({ length: 21 }, (_, index) => ({
    image: `/images/showcase-${index}.png`,
    title: `Showcase ${index + 1}`
  }));

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