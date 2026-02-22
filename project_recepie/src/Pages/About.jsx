import React from 'react'

const About = () => {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-950 to-black text-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-4 bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
            About Abest Food
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover the art of cooking with our curated collection of recipes from chefs around the world.
          </p>
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4 text-white">Our Mission</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              At Abest Food, we believe cooking is more than just preparing meals — it's an art form, a cultural experience, and a way to connect with others.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed">
              We bring you authentic recipes from talented chefs worldwide, making it easy for anyone to create delicious, restaurant-quality dishes at home.
            </p>
          </div>
          <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-2xl p-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-amber-400">✓</span>
                <div>
                  <h3 className="font-bold text-white">Global Recipes</h3>
                  <p className="text-sm text-gray-400">Cuisines from every corner of the world</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-amber-400">✓</span>
                <div>
                  <h3 className="font-bold text-white">Expert Chefs</h3>
                  <p className="text-sm text-gray-400">Recipes crafted by professional chefs</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-2xl font-bold text-amber-400">✓</span>
                <div>
                  <h3 className="font-bold text-white">Easy to Follow</h3>
                  <p className="text-sm text-gray-400">Clear instructions for all skill levels</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold mb-8 text-center text-white">Why Choose Abest Food?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-amber-500/50 transition">
              <div className="text-4xl font-bold text-amber-400 mb-3">24+</div>
              <h3 className="text-xl font-bold text-white mb-2">Recipes</h3>
              <p className="text-gray-400">A growing collection of handpicked recipes for every occasion.</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-amber-500/50 transition">
              <div className="text-4xl font-bold text-amber-400 mb-3">🌍</div>
              <h3 className="text-xl font-bold text-white mb-2">World Class</h3>
              <p className="text-gray-400">Recipes from talented chefs spanning multiple cuisines and styles.</p>
            </div>
            <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-amber-500/50 transition">
              <div className="text-4xl font-bold text-amber-400 mb-3">⚡</div>
              <h3 className="text-xl font-bold text-white mb-2">Quick & Easy</h3>
              <p className="text-gray-400">Find recipes by category, time, or difficulty level with ease.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-gray-700 rounded-2xl p-12 mb-16">
          <h2 className="text-4xl font-bold text-white mb-6 text-center">Our Team</h2>
          <p className="text-lg text-gray-300 text-center max-w-3xl mx-auto">
            Abest Food is built by food enthusiasts and developers passionate about making great recipes accessible to everyone. We're constantly working to improve the platform and bring you the best culinary experiences.
          </p>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Cook?</h3>
          <p className="text-gray-300 mb-6">Start exploring our recipes and create something amazing today.</p>
          <div className="flex gap-4 justify-center">
            <a href="/recipes" className="bg-amber-500 text-black px-8 py-3 rounded-lg font-bold hover:bg-amber-400 transition">
              Explore Recipes
            </a>
            <a href="/create" className="bg-gray-800 border border-gray-700 text-white px-8 py-3 rounded-lg font-bold hover:border-amber-500 transition">
              Share Your Recipe
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}

export default About
