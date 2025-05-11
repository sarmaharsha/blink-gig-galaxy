import * as React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TrendingUp, ArrowRight, Star } from 'lucide-react';

interface Collection {
  id: string;
  name: string;
  image: string;
  floorPrice: number;
  volume24h: number;
  change24h: number;
}

const collections: Collection[] = [
  {
    id: '1',
    name: 'Solana Monkey Business',
    image: 'https://arweave.net/1234567890',
    floorPrice: 45.5,
    volume24h: 1234.56,
    change24h: 12.5,
  },
  {
    id: '2',
    name: 'DeGods',
    image: 'https://arweave.net/0987654321',
    floorPrice: 32.8,
    volume24h: 987.65,
    change24h: -5.2,
  },
  {
    id: '3',
    name: 'Okay Bears',
    image: 'https://arweave.net/5678901234',
    floorPrice: 28.3,
    volume24h: 765.43,
    change24h: 8.7,
  },
];

const TrendingCollections: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const y = useTransform(scrollYProgress, [0.2, 0.4], [50, 0]);

  return (
    <motion.div 
      style={{ opacity, y }}
      className="py-16 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -10, 0],
              opacity: [0.1, 0.4, 0.1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <TrendingUp className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Trending Collections</h2>
          </div>
          <motion.button 
            whileHover={{ x: 5 }}
            className="text-purple-400 hover:text-purple-300 flex items-center gap-2 text-sm transition-colors"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0 10px 30px rgba(147, 51, 234, 0.1)" }}
              className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 hover:bg-gray-800/70 transition-all duration-300 cursor-pointer border border-gray-700/50"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 relative">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {collection.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-gray-400 text-sm">Floor</p>
                      <p className="text-green-400 font-medium">{collection.floorPrice} SOL</p>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">24h Vol</p>
                      <div className="flex items-center gap-1">
                        <p className="text-green-400 font-medium">{collection.volume24h} SOL</p>
                        <span className={`text-xs ${collection.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {collection.change24h >= 0 ? '+' : ''}{collection.change24h}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TrendingCollections; 