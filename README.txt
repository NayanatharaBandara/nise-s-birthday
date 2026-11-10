NISEE - BIRTHDAY WEBSITE UPDATE

This update adds:
- A more realistic burgundy wax seal with a raised, stamped N effect.
- Automatic photo carousels for both the memories and Nisee galleries.
- A different sweet caption for every photo.
- Previous/next arrows, dot navigation, swipe support, and click-to-enlarge photos.
- A pause while hovering or using the carousel, and while the browser tab is hidden.
- Elegant bookmark-style Previous / Turn the page navigation with changing labels.

HOW TO UPDATE
1. Extract this ZIP.
2. Copy index.html, style.css and script.js into your existing nisee folder.
3. Choose Replace when VS Code / Windows asks.
4. KEEP your existing images and audio folders. Do not delete or rename your photos.
5. Open index.html with Live Server and refresh the browser.

IMAGE FILES EXPECTED IN images/
background.jpeg
memory1.jpeg to memory8.jpeg, memory10.jpeg, memory11.jpeg, memory12.jpeg
nise1.jpeg to nise5.jpeg

MUSIC
The page currently expects audio/birthday-music.mp3. If your song has a different filename or extension, update the audio src in index.html to match it.

Note: This ZIP contains the updated website code only. Your personal photos and song remain in your existing folders.


LATEST UPDATE:
- Both photo carousels auto-advance every 1.8 seconds. They pause only while hovered or when the browser tab is hidden.
- Captions appear beside the photo on desktop and directly below it on small screens.
- The three little notes are now photo-backed interactive cards using images/memory2.jpeg, images/nise2.jpeg, and images/memory5.jpeg. Keep those image files in your images folder.


PHOTO NOTE UPDATE:
The three interactive message cards now use images/memory1.jpeg, images/memory6.jpeg, and images/memory10.jpeg as their backgrounds. Keep these files in your existing images folder.


PHOTO DISPLAY FIX:
The three message cards now insert real img elements (not CSS-only background URLs), using images/memory1.jpeg, images/memory6.jpeg, and images/memory10.jpeg. Keep those exact files in the images folder. If an image path is wrong, that card falls back to a burgundy background.


HEADER LOGO UPDATE:
The single N logo has been replaced with the birthday wish 'Happy birthday, Nisee ♡'.

FOOTER UPDATE:
The remaining N. monogram at the bottom has also been replaced with 'Happy birthday, Nisee ♡'.
