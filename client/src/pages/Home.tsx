import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { ServiceForm } from "@/components/ServiceForm";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Clock, Wrench, ArrowRight, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { CONTACT_CONFIG } from "@/lib/contact";
import { EmailLink } from "@/components/EmailLink";
import AMCPlans from "@/components/AMCPlans";
import SparePartsTable from "@/components/SparePartsTable";
import ServiceCharges from "@/components/ServiceCharges";

import { ResponsiveBg } from "@/components/Background/ResponsiveBg";

export default function Home() {
  const { data: products } = useProducts({ sort: 'newest' });
  const { data: pricing } = useQuery<any[]>({ queryKey: ["/api/pricing"] });
  const { data: spareParts } = useQuery<any[]>({ queryKey: ["/api/spare-parts"] });
  const { data: amcPlans } = useQuery<any[]>({ queryKey: ["/api/amc-plans"] });

  const brands = ["Aquafresh", "Kent", "Aquaguard", "Livpure", "Purit", "Eureka Forbes", "LG", "Bluestar", "AO Smith", "Nasaka"];
  const locations = ["Delhi", "Noida", "Gurgaon", "Dwarka", "Saket", "Uttam Nagar", "Rohini", "South Ex", "CP", "Ghaziabad", "Faridabad"];

  return (
    <>
      <Helmet>
        <title>Fast, Reliable RO Repair & Installation in Delhi NCR | AquaShield</title>
        <meta name="description" content="Get fast RO repair, installation & AMC across Delhi NCR. Trusted technicians, genuine parts, and a price-match guarantee. Call +91 8700762477." />
      </Helmet>

      {/* Hero Section */}
      <ResponsiveBg 
        name="pexels-chuck-3500006_1770009381899"
        className="pt-16 pb-24 lg:pt-32 lg:pb-40"
        overlayClassName="bg-gradient-to-br from-slate-900/60 via-slate-900/40 to-white/10"
        parallax
        aria-label="AquaShield hero — fast RO repair and installation in Delhi NCR"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white lg:text-slate-900"
            >
              <div className="inline-flex items-center gap-2 bg-blue-100/90 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                <ShieldCheck className="w-4 h-4" />
                Trusted & Verified Service
              </div>
              <h1 className="font-display font-extrabold text-5xl lg:text-7xl tracking-tight mb-6">
                Fast, Reliable RO Repair & Installation in Delhi NCR
              </h1>
              <p className="text-lg mb-4 leading-relaxed max-w-lg opacity-90">
                Doorstep repair, installation, and AMC — hygiene-first technicians, same-day service (often within 1 hour).
              </p>
              <div className="mb-8">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
                  Price Match Guarantee — we'll match or beat any price
                </span>
              </div>
              <div className="flex flex-wrap gap-4">
                <a href={`tel:${CONTACT_CONFIG.phone.full}`}>
                  <Button size="lg" className="rounded-full px-8 h-14 text-lg shadow-xl shadow-primary/20">
                    <Phone className="w-5 h-5 mr-2" /> Call Now
                  </Button>
                </a>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg bg-white/20 backdrop-blur-md text-white border-white/40 hover:bg-white/30">
                    Book RO Repair Service
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <img 
                src="https://images.unsplash.com/photo-1544976766-383738555815?auto=format&fit=crop&q=80" 
                alt="RO Repair Service" 
                className="rounded-3xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-2xl shadow-xl z-20 max-w-xs">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-full text-green-600">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Hygiene First</p>
                    <p className="text-xs text-slate-500">Trained & Verified Techs</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </ResponsiveBg>

      {/* Main Content Sections (AMC -> Spare Parts -> Service Charges) */}
      <ResponsiveBg 
        name="pexels-sebastians-2853937_1770009381899"
        className="py-24"
        overlayClassName="bg-white/90"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AMCPlans />
          <SparePartsTable />
          <ServiceCharges />
        </div>
      </ResponsiveBg>

      {/* Brands Grid */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-center mb-16">Brands We Repair</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {brands.map((brand, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl text-center font-bold text-slate-700 shadow-sm">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-center mb-12">Service Locations</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {locations.map((loc, i) => (
              <Link key={i} href={`/service/${loc.toLowerCase()}`}>
                <span className="px-4 py-2 bg-slate-100 rounded-full text-sm font-medium hover:bg-primary hover:text-white transition-colors cursor-pointer">
                  {loc}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-display font-bold mb-8">Pure Drinking Water Guarantee</h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Book your appointment today and get expert RO service within 1 hour.
          </p>
              <div className="flex flex-wrap justify-center gap-6">
                <a href={`tel:${CONTACT_CONFIG.phone.full}`}>
                  <Button size="lg" className="bg-white text-primary hover:bg-blue-50">
                    <Phone className="w-5 h-5 mr-2" /> Call {CONTACT_CONFIG.phone.display}
                  </Button>
                </a>
                <EmailLink subject="Booking RO Service">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white border-none">
                    Email Support
                  </Button>
                </EmailLink>
                <a href={CONTACT_CONFIG.whatsapp.link} target="_blank" rel="noreferrer">
                  <Button size="lg" className="bg-green-500 hover:bg-green-600 border-none">
                    <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Now
                  </Button>
                </a>
              </div>
        </div>
      </section>
    </>
  );
}
