import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { useCart } from "@/hooks/use-cart";
import { ShoppingCart, Menu, X, Phone, User, LogOut, Droplets } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Layout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { itemCount } = useCart();
  const [location] = useLocation();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Services", href: "/service/delhi" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-body">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4 text-xs md:text-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" /> +91 87007 62477
            </span>
            <span className="hidden sm:inline">Delhi's Trusted RO Experts</span>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <span className="hidden sm:inline">Welcome, {user.firstName || 'User'}</span>
            ) : (
              <Link href="/api/login" className="hover:underline">Login / Register</Link>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-primary/10 p-2 rounded-lg">
                <Droplets className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display font-bold text-xl leading-none text-foreground">AquaShield</h1>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Pure Water Solutions</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    location === item.href ? "text-primary font-bold" : "text-foreground/80"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                      {itemCount}
                    </span>
                  )}
                </Button>
              </Link>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      {user.profileImageUrl ? (
                        <img src={user.profileImageUrl} alt="Avatar" className="w-8 h-8 rounded-full" />
                      ) : (
                        <User className="w-5 h-5" />
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>
                    {user.email?.includes('admin') && ( // Simple admin check simulation
                      <DropdownMenuItem asChild>
                        <Link href="/admin">Dashboard</Link>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()} className="text-destructive">
                      <LogOut className="w-4 h-4 mr-2" /> Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/api/login">
                  <Button size="sm" className="hidden md:flex">Book Demo</Button>
                </Link>
              )}

              {/* Mobile Menu Toggle */}
              <button 
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-background p-4 animate-in slide-in-from-top-2">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link 
                  key={item.href} 
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-medium ${
                    location === item.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {!user && (
                <Link href="/api/login" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button className="w-full mt-4">Login / Sign Up</Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Droplets className="w-6 h-6 text-primary" />
              <span className="font-display font-bold text-xl text-white">AquaShield</span>
            </div>
            <p className="text-sm leading-relaxed">
              Providing pure, healthy water solutions across Delhi NCR. Certified technicians, genuine parts, and same-day service guarantee.
            </p>
          </div>
          
          <div>
            <h3 className="font-display font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-primary transition-colors">Buy RO Purifier</Link></li>
              <li><Link href="/service/delhi" className="hover:text-primary transition-colors">Book Service</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Water Quality Tips</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-4">Services Areas</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/service/south-delhi" className="hover:text-primary transition-colors">South Delhi</Link></li>
              <li><Link href="/service/gurgaon" className="hover:text-primary transition-colors">Gurgaon</Link></li>
              <li><Link href="/service/noida" className="hover:text-primary transition-colors">Noida</Link></li>
              <li><Link href="/service/ghaziabad" className="hover:text-primary transition-colors">Ghaziabad</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-bold text-white mb-4">Contact Us</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><Phone className="w-4 h-4" /> +91 87007 62477</li>
              <li className="flex items-center gap-2">ranjanmanish651@gmail.com</li>
              <li className="mt-4">
                <p className="text-xs text-slate-500">Mon - Sat: 9:00 AM - 8:00 PM</p>
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} AquaShield Solutions. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
