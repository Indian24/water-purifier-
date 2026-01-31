import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { CartProvider } from "@/hooks/use-cart";

import { Layout } from "@/components/Layout";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

import Home from "@/pages/Home";
import ProductList from "@/pages/ProductList";
import ProductDetail from "@/pages/ProductDetail";
import CartPage from "@/pages/CartPage";
import CityService from "@/pages/CityService";
import NotFound from "@/pages/not-found";

// Placeholder for missing pages to ensure compile
const BlogList = () => <div className="p-20 text-center">Blog Coming Soon</div>;
const Contact = () => <div className="p-20 text-center">Contact Page Coming Soon</div>;

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={ProductList} />
        <Route path="/products/:slug" component={ProductDetail} />
        <Route path="/cart" component={CartPage} />
        <Route path="/service/:city" component={CityService} />
        <Route path="/blog" component={BlogList} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Router />
          <WhatsAppFloat />
          <Toaster />
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
