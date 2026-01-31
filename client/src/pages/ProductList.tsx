import { useState } from "react";
import { Helmet } from "react-helmet";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@shared/schema";

export default function ProductList() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState("newest");

  // Debounce could be added here for search
  const { data: products, isLoading } = useProducts({ 
    search: search || undefined,
    category: category === "all" ? undefined : category,
    sort 
  });

  return (
    <>
      <Helmet>
        <title>Shop Water Purifiers | AquaShield</title>
      </Helmet>

      <div className="bg-slate-50 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display font-bold mb-4">Our Products</h1>
          <p className="text-muted-foreground">Find the perfect water purification solution for your home or office.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center bg-white p-4 rounded-xl shadow-sm border border-border">
          <div className="relative flex-grow w-full md:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Search products..." 
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4 w-full md:w-auto">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" />
                  <SelectValue placeholder="Category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {CATEGORIES.map(c => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sort} onValueChange={setSort}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price_asc">Price: Low to High</SelectItem>
                <SelectItem value="price_desc">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : products?.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No products found matching your criteria.</p>
            <Button variant="link" onClick={() => { setSearch(""); setCategory("all"); }}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
