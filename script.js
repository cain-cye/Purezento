const fallbackData = {
  recipientName: "Aking Tinatangi",
  letterTitle: "To the One Who Holds My Heart",
  letterParagraphs: [
    "to my dearest leandro, i wanted to write you another message here—a quiet place where you can always return whenever you need a reminder of how deeply you are loved.",
    "looking back at everything we've built, my heart feels so full and grounded. loving you has been the easiest, most natural thing i have ever done. you came into my life like a soft breath of fresh air, turning my quiet, uncertain world into somewhere warm, vibrant, and completely safe.",
    "i love the way you exist in this world—your gentleness, your humor, and even the little quirks that make you so uniquely you. with you, i’ve learned that love isn't about being perfect; it's about finding peace in someone who accepts all of your light and all of your shadows without hesitation.",
    "i want you to know, today and every day after, that you never have to carry anything alone. i love you in your brightest moments, and i love you just as fiercely in your quietest, heaviest ones. you don't have to be perfect for me—you just have to be you. i'm staying right here, holding your hand through every high, low, and everything in between.",
    "thank you for being my home, my favorite human, and the sweetest plot twist in my life. (though i'm pretty sure God created you specifically to balance me out mwehehe)",
    "no matter where life takes us or how chaotic things might get outside, i hope you always feel chosen, valued, and deeply cherished when you're with me. i'm so excited for every tomorrow, every inside joke we haven't made yet, and every quiet moment we get to share.",
    "thank you for loving me, for letting me love you, and for making every single day feel like a gift. here's to us, my love—to more shared laughs, late-night talks, and a lifetime of soft, beautiful memories together. i love you more than words could ever quite reach. happy caiunne dayyy!! mwa mwa mwa :333"
],
  songs: [
    { title: "Sweetest Scarlet", artist: "Nerissa Ravencroft", audioSrc: "songs/Sweetest Scarlet.mp3", note: "Thank you for finding me, filling my heart, and keeping a smile by my side every single day." },
    { title: "Dumaloy", artist: "SUD", audioSrc: "songs/Dumaloy.mp3", note: "I was afraid before, but having you here made all my fears vanish." },
    { title: "The Only Exception", artist: "Paramore", audioSrc: "songs/The Only Exception.mp3", note: "You tore down every wall I built and taught me how to trust in love again." },
    { title: "Strawberries & Cigarettes", artist: "Troye Sivan", audioSrc: "songs/Strawberries & Cigarettes.mp3", note: "Every time I taste strawberries or see a cloud of smoke, it instantly reminds me of us and our moments." },
    { title: "Always", artist: "Daniel Caesar", audioSrc: "songs/Always.mp3", note: "Always and forever, through every season." },
    { title: "Labyrinth", artist: "Taylor Swift", audioSrc: "songs/Labyrinth.mp3", note: "Whenever life feels like it's spiraling, you always know how to turn everything right around and make me feel safe." },
    { title: "Pahintulot", artist: "Shirebound & Busking", audioSrc: "songs/Pahintulot.mp3", note: "1st chorus hit the spot :3" },
    { title: "double take", artist: "dhruv", audioSrc: "songs/double take.mp3", note: "Even in a crowded room full of people, my eyes will always find you first." },
    { title: "I Love You 3000", artist: "Stephanie Poetri", audioSrc: "songs/I Love You 3000.mp3", note: "No words can measure how deeply I care for you." },
    { title: "Bawat Daan", artist: "Ebe Dancel", audioSrc: "songs/Bawat Daan.mp3", note: "Bawat daan ay patungo at pabalik sa 'yo, mahal ko." },
    { title: "Into You", artist: "Ariana Grande", audioSrc: "songs/Into You.mp3", note: "Falling in deep with you was the easiest and best thing I've ever done :3" },
    { title: "I Like Me Better", artist: "Lauv", audioSrc: "songs/I Like Me Better.mp3", note: "I like me better when I'm with you." },
    { title: "You'll Be Safe Here", artist: "Rico Blanco", audioSrc: "songs/You'll Be Safe Here.mp3", note: "I will always be your solace and safe space to rest." }
  ]
};

let songData = [];

function loadAppData(data) {
  document.getElementById('recipientHeader').innerText = data.recipientName + " 𖹭";
  document.getElementById('letterTitle').innerText = data.letterTitle;

  const letterContainer = document.getElementById('letterParagraphs');
  letterContainer.innerHTML = '';
  data.letterParagraphs.forEach(pText => {
    const p = document.createElement('p');
    p.innerText = pText;
    letterContainer.appendChild(p);
  });

  songData = data.songs;
  renderPlaylist();
  
  if (songData.length > 0) {
    selectSong(0, false);
  }
}

function renderPlaylist() {
  const container = document.getElementById('playlistContainer');
  container.innerHTML = '';

  songData.forEach((song, index) => {
    const item = document.createElement('div');
    item.className = 'playlist-item';
    item.id = `song-item-${index}`;
    item.onclick = () => selectSong(index, true);

    item.innerHTML = `
      <div>
        <div class="title">${song.title}</div>
        <div class="artist">${song.artist}</div>
      </div>
      <span class="play-btn">▶</span>
    `;
    container.appendChild(item);
  });
}

function selectSong(index, autoplay) {
  const song = songData[index];
  if (!song) return;

  document.getElementById('songTitle').innerText = song.title;
  document.getElementById('songArtist').innerText = song.artist;
  document.getElementById('songNote').innerText = `"${song.note}"`;

  const player = document.getElementById('audioPlayer');
  const source = document.getElementById('audioSource');

  source.src = song.audioSrc;
  player.load();

  if (autoplay) {
    player.play().catch(e => console.log("Autoplay prevented:", e));
  }

  document.querySelectorAll('.playlist-item').forEach((el, i) => {
    if (i === index) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const player = document.getElementById('audioPlayer');
  const wave = document.getElementById('soundWave');

  player.onplay = () => wave.classList.add('playing');
  player.onpause = () => wave.classList.remove('playing');
  player.onended = () => wave.classList.remove('playing');

  fetch('data.json')
    .then(response => {
      if (!response.ok) throw new Error("HTTP error");
      return response.json();
    })
    .then(data => loadAppData(data))
    .catch(() => loadAppData(fallbackData));
});