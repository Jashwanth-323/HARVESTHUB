
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { categories } from '../data';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';
import { useAppContext } from '../context/AppContext';

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { user, products } = useAppContext(); // Access products from context
  
  // Filtered categories for the landing page tiles
  const homeCategories = categories.filter(cat => cat.name === 'Vegetables' || cat.name === 'Fruits');
  
  const vegetableProducts = products.filter(p => p.category === 'Vegetables').slice(0, 4);
  const fruitProducts = products.filter(p => p.category === 'Fruits').slice(0, 4);

  const handleShopNow = () => {
    if (user) {
      navigate('/shop?view=all');
    } else {
      navigate('/auth');
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0">
          <img 
            src="https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Farmer tending to crops in a lush field at sunrise" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl md:text-6xl font-bold" dangerouslySetInnerHTML={{ __html: t('home.hero.title') }} />
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">{t('home.hero.subtitle')}</p>
          <button
            onClick={handleShopNow}
            className="mt-8 inline-block bg-primary text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-primary-dark transition-transform transform hover:scale-105 duration-300 shadow-lg"
          >
            {t('home.hero.shopNow')}
          </button>
        </div>
      </section>

      {/* Categories Section - Filtered to Vegetables and Fruits only */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-10">{t('home.categories.title')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {homeCategories.map(category => (
              <Link key={category.id} to={`/shop?category=${category.name}`} className="group relative rounded-lg overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300">
                <img src={category.imageUrl} alt={category.name} className="w-full h-56 object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <h3 className="text-3xl font-semibold text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Vegetables Section */}
      <section className="py-16 bg-light-green/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">{t('home.vegetables.title')}</h2>
            <Link to="/shop?category=Vegetables" className="text-primary font-bold hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {vegetableProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Fruits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">{t('home.fruits.title')}</h2>
            <Link to="/shop?category=Fruits" className="text-primary font-bold hover:underline">View All</Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {fruitProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to taste farm freshness?</h2>
          <Link to="/shop?view=all" className="inline-block bg-primary text-white font-bold py-4 px-10 rounded-full hover:bg-primary-dark transition-all transform hover:scale-105 shadow-xl">
             Explore Full Catalog
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
