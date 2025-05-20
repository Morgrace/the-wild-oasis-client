/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      new URL(
        "https://pzfhvgjpfvmjuyvisdsb.supabase.co/storage/v1/object/public/cabin-images/**",
      ),
      new URL("https://lh3.googleusercontent.com/**"),
      new URL("https://authjs.dev/img/providers/**"),
    ],
  },
};

export default nextConfig;
