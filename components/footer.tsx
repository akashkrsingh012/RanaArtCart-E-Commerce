import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground border-t border-border">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold mb-3">ranaartcart</h3>
            <p className="text-sm opacity-80">Supporting artisans and connecting handmade art to the world.</p>
            <div className="flex gap-3 mt-4">
              <Facebook size={18} className="hover:opacity-70 cursor-pointer transition-opacity" />
              <Twitter size={18} className="hover:opacity-70 cursor-pointer transition-opacity" />
              <Instagram size={18} className="hover:opacity-70 cursor-pointer transition-opacity" />
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-3">Company</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="hover:opacity-100 cursor-pointer">About Us</li>
              <li className="hover:opacity-100 cursor-pointer">Careers</li>
              <li className="hover:opacity-100 cursor-pointer">Blog</li>
              <li className="hover:opacity-100 cursor-pointer">Press</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li className="hover:opacity-100 cursor-pointer">Contact Us</li>
              <li className="hover:opacity-100 cursor-pointer">Shipping Info</li>
              <li className="hover:opacity-100 cursor-pointer">Returns</li>
              <li className="hover:opacity-100 cursor-pointer">FAQ</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3">Contact</h4>
            <div className="space-y-2 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>1-800-ARTISAN</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} />
                <span>hello@ranaartcart.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground border-opacity-20 pt-8 flex flex-col md:flex-row items-center justify-between text-sm opacity-80">
          <p>&copy; 2025 ranaartcart. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-100">
              Privacy Policy
            </a>
            <a href="#" className="hover:opacity-100">
              Terms of Service
            </a>
            <a href="#" className="hover:opacity-100">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
