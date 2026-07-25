import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  Settings, 
  BarChart3, 
  LogOut,
  Menu,
  X,
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Loader2,
  ShieldAlert
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAdminAuth } from "@/hooks/useAdminAuth";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");
  const { user, isAdmin, isLoading, logout } = useAdminAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!isLoading && !user) {
      navigate("/login");
    }
  }, [isLoading, user, navigate]);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "customers", label: "Customers", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const stats = [
    { label: "Total Products", value: "2,847", change: "+12%", color: "text-primary" },
    { label: "Total Orders", value: "1,234", change: "+8%", color: "text-accent" },
    { label: "Revenue", value: "$89,432", change: "+23%", color: "text-green-500" },
    { label: "Customers", value: "567", change: "+5%", color: "text-blue-500" },
  ];

  const recentOrders = [
    { id: "#ORD-001", customer: "ABC Manufacturing", items: 5, total: "$1,234.00", status: "Delivered" },
    { id: "#ORD-002", customer: "XYZ Industries", items: 12, total: "$3,456.00", status: "Pending" },
    { id: "#ORD-003", customer: "Quick Parts Ltd", items: 3, total: "$567.00", status: "Processing" },
    { id: "#ORD-004", customer: "Metro Works", items: 8, total: "$2,345.00", status: "Shipped" },
    { id: "#ORD-005", customer: "Prime Industrial", items: 15, total: "$4,567.00", status: "Delivered" },
  ];

  const products = [
    { id: 1, name: "V-Belt A68", category: "Belts", stock: 245, price: "$24.99" },
    { id: 2, name: "SKF Bearing 6205", category: "Bearings", stock: 128, price: "$18.50" },
    { id: 3, name: "Rubber Sheet 5mm", category: "Sheets", stock: 67, price: "$55.00" },
    { id: 4, name: "WD-40 400ml", category: "Tools", stock: 312, price: "$8.99" },
    { id: 5, name: "Timing Belt HTD", category: "Belts", stock: 89, price: "$34.99" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Delivered": return "bg-green-500/20 text-green-400";
      case "Pending": return "bg-yellow-500/20 text-yellow-400";
      case "Processing": return "bg-blue-500/20 text-blue-400";
      case "Shipped": return "bg-purple-500/20 text-purple-400";
      default: return "bg-muted text-muted-foreground";
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Verifying access...</p>
        </div>
      </div>
    );
  }

  // Show access denied if not admin
  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-10 h-10 text-destructive" />
          </div>
          <h1 className="font-display text-3xl text-foreground mb-4">ACCESS DENIED</h1>
          <p className="text-muted-foreground mb-8">
            You don't have permission to access the admin portal. Please contact an administrator if you believe this is an error.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/">
              <Button variant="outline">Back to Store</Button>
            </Link>
            <Button variant="hero" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-card border-r border-border transition-all duration-300 flex flex-col`}>
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-4 border-b border-border">
          {sidebarOpen && (
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-hero rounded-lg flex items-center justify-center">
                <span className="font-display text-lg text-primary-foreground">AB</span>
              </div>
              <span className="font-display text-lg text-foreground">ADMIN</span>
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Menu */}
        <nav className="flex-1 py-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors ${
                activeTab === item.id 
                  ? 'bg-primary/10 text-primary border-r-2 border-primary' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {sidebarOpen && <span>{item.label}</span>}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-border">
          <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground" onClick={logout}>
            <LogOut className="w-5 h-5" />
            {sidebarOpen && <span>Sign Out</span>}
          </Button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {/* Header */}
        <header className="h-20 bg-card border-b border-border flex items-center justify-between px-6">
          <div>
            <h1 className="font-display text-2xl text-foreground">
              {menuItems.find(m => m.id === activeTab)?.label.toUpperCase()}
            </h1>
            <p className="text-sm text-muted-foreground">Manage your industrial hardware store</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-64 h-10 pl-10 pr-4 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
              />
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="font-semibold text-primary-foreground">A</span>
              </div>
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium text-foreground">Admin</p>
                <p className="text-xs text-muted-foreground">{user?.email}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          {activeTab === "dashboard" && (
            <>
              {/* Stats grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="p-6 rounded-xl bg-card border border-border">
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                    <p className={`font-display text-4xl mt-2 ${stat.color}`}>{stat.value}</p>
                    <p className="text-sm text-green-400 mt-2">{stat.change} from last month</p>
                  </div>
                ))}
              </div>

              {/* Recent orders */}
              <div className="rounded-xl bg-card border border-border overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h2 className="font-display text-xl text-foreground">RECENT ORDERS</h2>
                  <Button variant="outline" size="sm">View All</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-muted-foreground font-medium">Order ID</th>
                        <th className="text-left p-4 text-muted-foreground font-medium">Customer</th>
                        <th className="text-left p-4 text-muted-foreground font-medium">Items</th>
                        <th className="text-left p-4 text-muted-foreground font-medium">Total</th>
                        <th className="text-left p-4 text-muted-foreground font-medium">Status</th>
                        <th className="text-left p-4 text-muted-foreground font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border hover:bg-muted/50">
                          <td className="p-4 text-foreground font-medium">{order.id}</td>
                          <td className="p-4 text-foreground">{order.customer}</td>
                          <td className="p-4 text-muted-foreground">{order.items}</td>
                          <td className="p-4 text-foreground font-medium">{order.total}</td>
                          <td className="p-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                              {order.status}
                            </span>
                          </td>
                          <td className="p-4">
                            <Button variant="ghost" size="icon">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {activeTab === "products" && (
            <div className="rounded-xl bg-card border border-border overflow-hidden">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="font-display text-xl text-foreground">PRODUCT INVENTORY</h2>
                <Button variant="hero" size="sm" onClick={() => toast.info("Add product form would open here")}>
                  <Plus className="w-4 h-4" />
                  Add Product
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-4 text-muted-foreground font-medium">ID</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Product Name</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Category</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Stock</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Price</th>
                      <th className="text-left p-4 text-muted-foreground font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-border hover:bg-muted/50">
                        <td className="p-4 text-muted-foreground">#{product.id}</td>
                        <td className="p-4 text-foreground font-medium">{product.name}</td>
                        <td className="p-4 text-muted-foreground">{product.category}</td>
                        <td className="p-4">
                          <span className={product.stock < 100 ? "text-yellow-400" : "text-foreground"}>
                            {product.stock}
                          </span>
                        </td>
                        <td className="p-4 text-foreground">{product.price}</td>
                        <td className="p-4 flex gap-2">
                          <Button variant="ghost" size="icon" onClick={() => toast.info("Edit product")}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => toast.error("Delete product?")}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="text-center py-12">
              <ShoppingCart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-2xl text-foreground">ORDER MANAGEMENT</h3>
              <p className="text-muted-foreground mt-2">Connect to backend to manage orders</p>
            </div>
          )}

          {activeTab === "customers" && (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-2xl text-foreground">CUSTOMER MANAGEMENT</h3>
              <p className="text-muted-foreground mt-2">Connect to backend to manage customers</p>
            </div>
          )}

          {activeTab === "analytics" && (
            <div className="text-center py-12">
              <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-2xl text-foreground">ANALYTICS</h3>
              <p className="text-muted-foreground mt-2">Connect to backend to view analytics</p>
            </div>
          )}

          {activeTab === "settings" && (
            <div className="text-center py-12">
              <Settings className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-display text-2xl text-foreground">SETTINGS</h3>
              <p className="text-muted-foreground mt-2">Connect to backend to configure settings</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
