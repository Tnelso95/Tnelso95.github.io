# Tnelso95 Portfolio Website

A modern single-page portfolio website with an interactive record player, built for EDU-241 coursework.

## 🎵 Features

- **Single-Page Application**: Seamless navigation without page reloads
- **Interactive Record Player**: Play music while browsing the site
- **Cross-Page Audio**: Music continues playing when navigating between pages
- **Multiple Albums**: Support for MP3 and MP4 audio files
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional design with smooth animations

## 🎧 Music Collection

The record player includes three albums:

1. **Aja** by Steely Dan (7 tracks)
2. **Doo-Wops & Hooligans** by Bruno Mars (1 track)
3. **Silk Degrees** by Boz Scaggs (10 tracks)

## 🚀 Getting Started

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/Tnelso95/Tnelso95.github.io.git
   cd Tnelso95.github.io
   ```

2. **Start a local server**
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000/app.html
   ```

### GitHub Pages Deployment

The site is automatically deployed to GitHub Pages at:
```
https://tnelso95.github.io/
```

## 📁 Project Structure

```
├── app.html                 # Main single-page application
├── assets/
│   ├── albums/             # Album cover images
│   │   ├── Aja.png
│   │   ├── Doo_Wops_And_Hooligans.jpg
│   │   └── Silk_Degrees.png
│   ├── audio/              # Audio files organized by album
│   │   ├── Aja/
│   │   ├── Doo_Wops_And_Hooligans/
│   │   └── Silk_Degrees/
│   ├── infographic.png     # Project images
│   ├── meme.png
│   └── profile.png
└── README.md
```

## 🛠️ Technical Details

- **Frontend**: Pure HTML, CSS, JavaScript
- **Audio**: Web Audio API with HTML5 Audio fallback
- **Navigation**: JavaScript-based single-page routing
- **Styling**: Modern CSS with gradients, animations, and responsive design
- **Browser Support**: Chrome, Firefox, Safari, Edge

## 🎯 Usage

1. **Navigate**: Use the header navigation to switch between pages
2. **Play Music**: Go to "Drop a Record" and click an album cover
3. **Cross-Page Audio**: Music continues playing when you navigate to other pages
4. **Browse Projects**: View EDU-241 coursework in the Projects section

## 📝 Development Notes

- Audio files must be served via HTTP (not file://) due to CORS restrictions
- The site uses a global AudioManager to maintain audio state across page navigation
- Album data is defined in JavaScript and can be easily extended
- All styling is contained within the single HTML file for simplicity

## 🔧 Customization

To add new albums:

1. Add album cover to `assets/albums/`
2. Add audio files to `assets/audio/[AlbumName]/`
3. Update the `albumData` object in `app.html`
4. Add album cover to the album grid HTML

## 📄 License

This project is part of EDU-241 coursework and is for educational purposes.