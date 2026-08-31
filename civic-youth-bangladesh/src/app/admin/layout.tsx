"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Heart,
  Handshake,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Shield,
  Loader2,
} from "lucide-react";
import { adminMe, adminLogout } from "@/lib/admin-api";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/memberships", label: "Memberships", icon: Users },
  { href: "/admin/volunteers", label: "Volunteers", icon: Heart },
  { href: "/admin/partnerships", label: "Partnerships", icon: Handshake },
  { href: "/admin/contacts", label: "Contacts", icon: MessageSquare },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [admin, setAdmin] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setLoading(false);
      return;
    }

    adminMe()
      .then((res) => setAdmin(res.data))
      .catch(() => {
        router.push("/admin/login");
      })
      .finally(() => setLoading(false));
  }, [pathname, router]);

  const handleLogout = async () => {
    try {
      await adminLogout();
    } catch {
      // ignore
    }
    router.push("/admin/login");
  };

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7F6]">
        <Loader2 className="w-8 h-8 animate-spin text-[#138A36]" />
      </div>
    );
  }

  if (!admin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E5E7EB] transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#138A36] flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-[family-name:var(--font-heading)] font-bold text-[#222222]">
                  CYB Admin
                </h2>
                <p className="text-xs text-[#6B7280]">Dashboard</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="absolute top-6 right-4 lg:hidden text-[#6B7280] hover:text-[#222222]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#138A36]/10 text-[#138A36]"
                      : "text-[#6B7280] hover:bg-[#F5F7F6] hover:text-[#222222]"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-[#E5E7EB]">
            <div className="px-4 py-2 mb-2">
              <p className="text-sm font-medium text-[#222222] truncate">
                {admin.name}
              </p>
              <p className="text-xs text-[#6B7280] truncate">{admin.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-[#6B7280] hover:bg-[#FDF2F4] hover:text-[#C8102E] transition-all"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-white border-b border-[#E5E7EB] px-4 py-3 flex items-center gap-4 lg:px-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden text-[#6B7280] hover:text-[#222222]"
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex-1" />
          <Link
            href="/"
            className="text-sm text-[#6B7280] hover:text-[#138A36] transition-colors"
          >
            View Site &rarr;
          </Link>
        </header>

        <main className="flex-1 p-4 lg:p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
