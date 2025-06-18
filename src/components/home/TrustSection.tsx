
import { partners } from '@/data/homeData';

export default function TrustSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-muted-foreground font-medium">Trusted by owner-operators and small fleets nationwide</p>
        </div>
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-60">
          {partners.map((partner, index) => (
            <div key={index} className="text-lg font-bold text-muted-foreground hover:opacity-100 transition-opacity">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
