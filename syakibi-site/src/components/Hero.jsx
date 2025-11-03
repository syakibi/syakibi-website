export default function Hero() {
  return (
    <section
      id="home"
      className="hero">
      <h1 className="text-5xl font-bold mb-4">Hi, I’m Syakibi 👋</h1>
      <p className="text-lg text-gray-300 max-w-xl mb-6">
        I’m a developer passionate about creating clean, interactive, and accessible web experiences.
      </p>
      <a
        href="#projects"
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full transition"
      >
        View My Work
      </a>
    </section>
  );
}