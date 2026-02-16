import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Phone, MessageCircle, MapPin, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_CONFIG } from "@/lib/contact";
import { BlogSubmitForm } from "@/components/BlogSubmitForm";

export default function BlogDetail() {
  return (
    <div className="min-h-screen bg-white pt-20">
      <Helmet>
        <title>Serving Delhi Since 2006 | AquaShield Blog</title>
      </Helmet>

      {/* Hero Section */}
      <div className="h-[400px] bg-slate-900 relative flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1544976766-383738555815?auto=format&fit=crop&q=80" 
          alt="RO Service" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="relative z-20 max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">
              Serving Delhi Since 2006 — 100,000+ Happy Customers
            </h1>
            <div className="flex flex-wrap justify-center gap-6 text-blue-100 font-medium">
              <span className="flex items-center gap-2">
                <Users className="w-4 h-4" /> Posted by AquaShield
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="w-4 h-4" /> Serving Delhi NCR since 2006
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="prose prose-slate lg:prose-lg max-w-none mb-16"
        >
          <p className="lead text-xl text-slate-600 mb-8 font-medium">
            For nearly two decades, AquaShield has been the bedrock of reliable water purification in the capital. Our journey began with a simple mission: to ensure every home in Delhi has access to pure, safe drinking water.
          </p>

          <div className="bg-blue-50 border-l-4 border-primary p-8 rounded-r-2xl my-12">
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" /> Our Reach & Impact
            </h3>
            <p className="text-slate-700 font-medium mb-4">
              We are proud to have served over <strong>100,000+ customers</strong> across the residential and industrial sectors. Our dedicated team provides doorstep service in all major areas:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600">
              <li className="flex items-center gap-2"><strong>South Delhi:</strong> Chhatarpur, Saket, Malviya Nagar, Vasant Vihar, Hauz Khas, Green Park, RK Puram, Vasant Kunj</li>
              <li><strong>Gurgaon:</strong> All sectors and corporate hubs</li>
              <li><strong>Noida:</strong> Residential and industrial zones</li>
              <li><strong>Faridabad:</strong> Complete city coverage</li>
            </ul>
          </div>

          <p className="text-slate-600 leading-relaxed mb-6">
            Water quality in Delhi NCR varies significantly from one area to another. Whether you are dealing with high TDS levels in Gurgaon or chemical impurities in industrial zones, our technicians come prepared with the right filters and expertise. We don't just repair; we educate our customers on how to maintain their systems for long-term health.
          </p>
          
          <p className="text-slate-600 leading-relaxed mb-6">
            Our commitment to quality is backed by our decades of experience. We use only genuine spare parts and follow a strict hygiene-first protocol during every service visit.
          </p>
        </motion.div>

        {/* CTA Box */}
        <section className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white text-center mb-16 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-display font-bold mb-6">Need RO service in your area?</h3>
            <p className="text-xl text-blue-100 mb-10 max-w-xl mx-auto">
              Call or WhatsApp us for same-day doorstep service within 1 hour.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <a href={`tel:${CONTACT_CONFIG.phone.full}`}>
                <Button size="lg" className="bg-white text-slate-900 hover:bg-blue-50 font-bold px-8">
                  <Phone className="w-5 h-5 mr-2" /> Call {CONTACT_CONFIG.phone.display}
                </Button>
              </a>
              <a href={CONTACT_CONFIG.whatsapp.link} target="_blank" rel="noreferrer">
                <Button size="lg" className="bg-green-500 hover:bg-green-600 border-none font-bold px-8">
                  <MessageCircle className="w-5 h-5 mr-2" /> WhatsApp Now
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Submit Form */}
        <div className="border-t pt-16">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-4 text-slate-900 text-center">Submit Your Review</h2>
            <p className="text-slate-600 text-center mb-10">Help others by sharing your AquaShield experience.</p>
            <BlogSubmitForm />
          </div>
        </div>
      </div>
    </div>
  );
}
