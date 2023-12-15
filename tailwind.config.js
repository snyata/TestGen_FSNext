// investigate plugins when functional

module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      // Add other paths here if you have more directories where you use Tailwind classes
    ],
    darkMode: 'class', // or 'media' based on your preference
    theme: {
      extend: {
        // Add your customizations here
        colors: {
          'dark-background': '#000',
          'text-white': '#fff',
          'moderate-green': 'mediumseagreen',
          'bright-color': 'yellow', // replace with your preferred bright color
        },
        fontFamily: {
          'sans': ['Poppins', 'sans-serif'],
        },
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
  