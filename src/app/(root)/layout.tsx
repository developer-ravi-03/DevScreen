import StreamClientProvider from "@/components/providers/StreamClientProviders";

function Layout({ children }: { children: React.ReactNode }) {
  return <StreamClientProvider>{children}</StreamClientProvider>;
}
export default Layout;
