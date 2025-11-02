export default function Socials() {
  const socials = [
    { name: "YouTube", url: "https://youtube.com/yourchannel", icon: "🎥" },
    { name: "Twitch", url: "https://twitch.tv/yourchannel", icon: "🎮" },
    { name: "Twitter / X", url: "https://twitter.com/yourhandle", icon: "🐦" },
    { name: "Discord", url: "https://discord.gg/yourinvite", icon: "💬" },
    { name: "GitHub", url: "https://github.com/yourusername", icon: "💻" },
  ];

  return (
    <section
      id="socials"
      className="bg-gray-900 text-white py-16 flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold mb-8">Find Me Online 🌐</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {socials.map((social) => (
          <a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gray-800 hover:bg-blue-600 px-6 py-3 rounded-xl transition"
          >
            <span className="text-2xl">{social.icon}</span>
            <span className="font-semibold">{social.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
}