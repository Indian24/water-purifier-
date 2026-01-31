import type { Express } from "express";
import type { Server } from "http";
import { setupAuth, registerAuthRoutes } from "./replit_integrations/auth";
import { storage } from "./storage";
import { api, errorSchemas } from "@shared/routes";
import { z } from "zod";
import { insertOrderSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // --- Auth Setup ---
  if (!process.env.DISABLE_REPLIT_AUTH) { await setupAuth(app); }
  registerAuthRoutes(app);

  // --- Products ---
  app.get(api.products.list.path, async (req, res) => {
    const filters = {
      category: req.query.category as string,
      search: req.query.search as string,
      sort: req.query.sort as string,
    };
    const products = await storage.getProducts(filters);
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(req.params.slug);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  app.get(api.products.getById.path, async (req, res) => {
    const product = await storage.getProductById(Number(req.params.id));
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  app.post(api.products.create.path, async (req, res) => {
    // Basic auth check (should be admin in real app)
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    try {
      const input = api.products.create.input.parse(req.body);
      const product = await storage.createProduct(input);
      res.status(201).json(product);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ message: err.errors[0].message });
      }
      res.sendStatus(500);
    }
  });

  // --- Orders ---
  app.post(api.orders.create.path, async (req, res) => {
    try {
      const input = api.orders.create.input.parse(req.body);
      
      // Calculate totals (server-side validation recommended)
      let subtotal = 0;
      for (const item of input.cartItems) {
         const product = await storage.getProductById(item.productId);
         if (product) subtotal += product.salePrice * item.qty;
      }
      
      const shipping = subtotal > 500 ? 0 : 50;
      const tax = subtotal * 0.18; // 18% GST
      const totalAmount = subtotal + tax + shipping;

      const orderData = {
        ...input,
        orderNumber: `ORD-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        items: input.cartItems, // Cast to any as simple JSON
        subtotal,
        tax,
        shipping,
        totalAmount,
        paymentStatus: "pending",
        orderStatus: "placed"
      };

      // @ts-ignore - Ignoring strict type check for JSON items for speed
      const order = await storage.createOrder(orderData);
      res.status(201).json(order);
    } catch (err) {
      if (err instanceof z.ZodError) {
         return res.status(400).json({ message: err.errors[0].message });
      }
      console.error(err);
      res.sendStatus(500);
    }
  });

  app.get(api.orders.get.path, async (req, res) => {
    const order = await storage.getOrder(req.params.orderNumber);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  });

  // --- Leads ---
  app.post(api.leads.create.path, async (req, res) => {
    try {
      const input = api.leads.create.input.parse(req.body);
      const lead = await storage.createLead(input);
      res.status(201).json(lead);
    } catch (err) {
      res.sendStatus(400);
    }
  });

  // --- Technicians ---
  app.get(api.technicians.list.path, async (req, res) => {
    const city = req.query.city as string;
    const techs = await storage.getTechnicians(city);
    res.json(techs);
  });

  // --- Blog ---
  app.get(api.blog.list.path, async (req, res) => {
    const posts = await storage.getBlogPosts();
    res.json(posts);
  });

  app.get(api.blog.get.path, async (req, res) => {
    const post = await storage.getBlogPost(req.params.slug);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.json(post);
  });

  // --- Seed Data ---
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProducts = await storage.getProducts();
  if (existingProducts.length === 0) {
    console.log("Seeding database...");
    
    // Seed Products
    await storage.createProduct({
      slug: "aqua-grand-plus-8500",
      name: "Aqua Grand+ 8500",
      brand: "AquaShield",
      model: "AG-8500",
      category: "RO",
      shortDescription: "Aqua Grand+ 8500 is our best and most sold water purifier, offering advanced multi-stage filtration, high TDS removal, and safe drinking water for families.",
      longDescription: "<p>Aqua Grand+ 8500 is our best and most sold water purifier, offering advanced multi-stage filtration, high TDS removal, and safe drinking water for families.</p>",
      price: 18500,
      salePrice: 15500,
      stock: 50,
      images: ["https://images.unsplash.com/photo-1585671720899-73d82729938b?auto=format&fit=crop&q=80&w=500"],
      specs: { "Capacity": "15L", "Installation": "Wall Mount", "Warranty": "1 Year", "TDS Removal": "Up to 2000 ppm" },
      tags: ["bestseller", "home", "featured"]
    });

    await storage.createProduct({
      slug: "aquashield-industrial-50lph",
      name: "Industrial RO Plant 50LPH",
      brand: "AquaShield",
      model: "Ind-50",
      category: "Industrial",
      shortDescription: "Heavy duty RO plant for offices and factories.",
      price: 45000,
      salePrice: 38000,
      stock: 10,
      images: ["https://images.unsplash.com/photo-1622646399691-e8d0e70f6125?auto=format&fit=crop&q=80&w=500"],
      specs: { "Capacity": "50 LPH", "Material": "Stainless Steel" },
      tags: ["office", "industrial"]
    });

    await storage.createProduct({
      slug: "alkaline-filter-cartridge",
      name: "Alkaline Filter Cartridge",
      brand: "AquaShield",
      model: "Alk-101",
      category: "Filter",
      shortDescription: "Replacement alkaline filter for all RO models.",
      price: 1500,
      salePrice: 999,
      stock: 100,
      images: ["https://images.unsplash.com/photo-1521665792476-791176b976c6?auto=format&fit=crop&q=80&w=500"],
      tags: ["spare", "filter"]
    });
    
    // Seed Technicians
    await storage.createTechnician({
      name: "Rajesh Kumar",
      phone: "9876543210",
      email: "rajesh@aquashield.com",
      city: "Delhi",
      areas: ["South Delhi", "West Delhi"],
      rating: 4.8
    });
    
    await storage.createTechnician({
      name: "Amit Singh",
      phone: "9876543211",
      email: "amit@aquashield.com",
      city: "Noida",
      areas: ["Sector 18", "Sector 62"],
      rating: 4.5
    });

    // Seed Blog
    await storage.createBlogPost({
      slug: "best-ro-purifier-2026",
      title: "Best RO Purifiers in Delhi (2026 Guide)",
      excerpt: "Top 5 things to check before buying a water purifier.",
      content: "<p>Water quality in Delhi varies by location. Here is why you need a custom RO solution...</p>",
      published: true,
      author: "Dr. H2O",
      coverImage: "https://images.unsplash.com/photo-1546554137-f86b9593a222?auto=format&fit=crop&q=80&w=500"
    });
    
    console.log("Seeding complete.");
  }
}
