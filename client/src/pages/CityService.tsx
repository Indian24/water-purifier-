import { useRoute } from "wouter";
import { Helmet } from "react-helmet";
import { ServiceForm } from "@/components/ServiceForm";
import { useTechnicians } from "@/hooks/use-technicians";
import { MapPin, CheckCircle, Star } from "lucide-react";

export default function CityService() {
  const [, params] = useRoute("/service/:city");
  const city = (params?.city || "Delhi").charAt(0).toUpperCase() + (params?.city || "delhi").slice(1);
  
  const { data: technicians } = useTechnicians(city);

  return (
    <>
      <Helmet>
        <title>RO Service in {city} | Installation, Repair & AMC | AquaShield</title>
        <meta name="description" content={`Expert RO water purifier repair and installation service in ${city}. Certified technicians, genuine parts, same day visit.`} />
      </Helmet>

      {/* City Hero */}
      <div className="bg-slate-900 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex items-center gap-2 text-primary-foreground/80 mb-4">
            <MapPin className="w-4 h-4" />
            <span className="uppercase tracking-wider text-sm font-medium">Available in {city}</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Expert RO Service in {city}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mb-8">
            Get your water purifier serviced by {city}'s top-rated technicians. 
            We cover all areas including {city} North, South, East, and West.
          </p>
          <div className="flex gap-8 text-sm font-medium">
            <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> 4 Hour Response</div>
            <div className="flex items-center gap-2"><CheckCircle className="w-5 h-5 text-green-400" /> 30 Day Warranty</div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-6">Why Choose AquaShield in {city}?</h2>
            <div className="prose prose-lg text-slate-600 mb-12">
              <p>
                We understand the water quality in {city} varies from area to area. Our technicians are equipped with TDS meters
                to check your input water and recommend the right filters (RO, UV, or UF).
              </p>
              <p>
                Whether you live in an apartment or independent house, our {city} team ensures hassle-free installation
                and prompt repair services.
              </p>
            </div>

            <h3 className="text-xl font-bold mb-6">Available Technicians in {city}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {technicians?.map(tech => (
                <div key={tech.id} className="bg-white p-6 rounded-xl border border-border shadow-sm flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center font-bold text-primary">
                    {tech.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold">{tech.name}</h4>
                    <div className="flex items-center text-sm text-yellow-500 mb-2">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="ml-1 font-medium">{tech.rating}</span>
                    </div>
                    <p className="text-xs text-slate-500">Serving: {tech.areas?.join(", ")}</p>
                  </div>
                </div>
              ))}
              {!technicians?.length && (
                <p className="text-muted-foreground italic">Searching for available technicians...</p>
              )}
            </div>
          </div>

          {/* Sidebar Form */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <ServiceForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
