import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/components/auth/AuthProvider";

import { Layout } from "@/components/Layout";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

import Contact from "@/pages/Contact";

import Home from "@/pages/Home";
import ProductList from "@/pages/ProductList";
import ProductDetail from "@/pages/ProductDetail";
import CityService from "@/pages/CityService";
import Blog from "@/pages/Blog";
import BlogDetail from "@/pages/BlogDetail";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/products" component={ProductList} />
        <Route path="/products/:slug" component={ProductDetail} />
        <Route path="/ro-repair-saket" component={() => <CityService />} />
        <Route path="/ro-repair-malviya-nagar" component={() => <CityService />} />
        <Route path="/ro-repair-hauz-khas" component={() => <CityService />} />
        <Route path="/ro-repair-green-park" component={() => <CityService />} />
        <Route path="/ro-repair-greater-kailash" component={() => <CityService />} />
        <Route path="/ro-repair-lajpat-nagar" component={() => <CityService />} />
        <Route path="/ro-repair-kalkaji" component={() => <CityService />} />
        <Route path="/ro-repair-nehru-place" component={() => <CityService />} />
        <Route path="/ro-repair-chhatarpur" component={() => <CityService />} />
        <Route path="/ro-repair-mehrauli" component={() => <CityService />} />
        <Route path="/ro-repair-vasant-kunj" component={() => <CityService />} />
        <Route path="/ro-repair-vasant-vihar" component={() => <CityService />} />
        <Route path="/ro-repair-sarojini-nagar" component={() => <CityService />} />
        <Route path="/ro-repair-defence-colony" component={() => <CityService />} />
        <Route path="/ro-repair-south-extension" component={() => <CityService />} />
        <Route path="/ro-repair-govindpuri" component={() => <CityService />} />
        <Route path="/ro-repair-cr-park" component={() => <CityService />} />
        <Route path="/ro-repair-okhla" component={() => <CityService />} />
        <Route path="/ro-repair-jamia-nagar" component={() => <CityService />} />
        <Route path="/ro-repair-safdarjung-enclave" component={() => <CityService />} />
        <Route path="/service/:city" component={CityService} />
        <Route path="/jar-water-vs-ro" component={Home} />
        <Route path="/ro-on-rent" component={Home} />
        <Route path="/free-water-test" component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={BlogDetail} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Router />
          <WhatsAppFloat />
          <Toaster />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
