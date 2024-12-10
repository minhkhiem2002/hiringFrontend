/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com','youtu.be','i.ytimg.com'],
      },
      eslint: {
        ignoreDuringBuilds: true, // Tắt ESLint khi build
      },
      typescript: {
        ignoreBuildErrors: true, // Tắt kiểm tra TypeScript khi build
      },
};

export default nextConfig;
