import { MessageSquare, Phone } from 'lucide-react';

export default function WhatsAppButton() {
  const phoneNumber = '+919403103966'; // Replace with real company number
  const message = encodeURIComponent('Hello Nasr Infrastructure team, I would like to schedule a consultation regarding an architectural/construction project.');
  const whatsappUrl = `https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${message}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 group">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg hover:shadow-[#25D366]/40 hover:scale-110 transition-all duration-300 animate-bounce cursor-pointer"
        aria-label="Contact us on WhatsApp"
      >
        {/* Pulsing Aura ring */}
        <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366]/40 animate-ping opacity-75" />
        
        {/* Message Square icon */}
        <MessageSquare className="h-6 w-6 relative z-10" />
      </a>
      
      {/* Tooltip */}
      <span className="absolute left-16 top-1/2 -translate-y-1/2 ml-2 px-3 py-1.5 text-xs font-semibold text-white bg-charcoal-dark border border-gray-800 rounded-sm shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none uppercase tracking-wider">
        Chat via WhatsApp
      </span>
    </div>
  );
}
