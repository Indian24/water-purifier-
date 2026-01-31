import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { ServiceForm } from "@/components/ServiceForm";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Clock, Wrench, ArrowRight } from "lucide-react";

export default function Home() {
  const { data: products } = useProducts({ sort: 'newest' });

  return (
    <>
      <Helmet>
        <title>AquaShield | Best RO Water Purifiers & Service in Delhi NCR</title>
        <meta name="description" content="Trusted RO service, repair, and installation in Delhi, Noida, Gurgaon. Buy premium water purifiers with 1 year warranty." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-white pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="absolute top-0 right-0 -z-10 opacity-30 translate-x-1/3 -translate-y-1/3">
          <div className="w-[800px] h-[800px] rounded-full bg-blue-200 blur-3xl" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-blue-100 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                <ShieldCheck className="w-4 h-4" />
                ISO 9001:2015 Certified
              </div>
              <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tight text-slate-900 mb-6">
                Pure Water. <br/>
                <span className="text-primary">Pure Life.</span>
              </h1>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
                Aqua Grand+ 8500 is our best and most sold water purifier, offering advanced multi-stage filtration, high TDS removal, and safe drinking water for families.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/products">
                  <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-xl shadow-primary/20">
                    View Products
                  </Button>
                </Link>
                <Link href="/service/delhi">
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg bg-white/50 backdrop-blur-sm">
                    Book Service
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
               {/* Hero image: Modern kitchen with water glass */}
              <img 
                src="https://images.unsplash.com/photo-1544976766-383738555815?auto=format&fit=crop&q=80" 
                alt="Pure Water" 
                className="rounded-3xl shadow-2xl relative z-10 animate-float"
              />
              {/* Decorative elements */}
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">1 Year Warranty</p>
                    <p className="text-xs text-slate-500">On all products & parts</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: "Genuine Parts", desc: "100% authentic spare parts with hologram warranty seals." },
              { icon: Clock, title: "Same Day Service", desc: "Book before 12 PM and get service by 6 PM same day." },
              { icon: Wrench, title: "Expert Technicians", desc: "Background verified, trained, and certified professionals." }
            ].map((feature, i) => (
              <div key={i} className="bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:border-primary/20 transition-all">
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-primary mb-6">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Products */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Best Sellers</h2>
              <p className="text-slate-600">Top rated water purifiers chosen by families like yours.</p>
            </div>
            <Link href="/products" className="hidden md:flex items-center text-primary font-bold hover:gap-2 transition-all">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products ? (
              products.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              // Loading skeletons
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-96 bg-white rounded-2xl animate-pulse" />
              ))
            )}
          </div>
          
          <div className="mt-8 md:hidden text-center">
             <Link href="/products">
              <Button variant="outline">View All Products</Button>
             </Link>
          </div>
        </div>
      </section>

      {/* CTA / Lead Form */}
      <section className="py-24 bg-primary overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="text-white">
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Need expert help?</h2>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                Whether you need a new installation, filter change, or repair, our experts are here to help. 
                Fill out the form and we'll call you back within 15 minutes.
              </p>
              <ul className="space-y-4">
                {["Free Water Quality Check", "Transparent Pricing", "30 Days Service Warranty"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium">
                    <div className="bg-white/20 p-1 rounded-full"><ShieldCheck className="w-4 h-4" /></div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ServiceForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
