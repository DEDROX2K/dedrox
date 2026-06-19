# Dwell
# App names
### 🏛️ The "Personal Space" Angle

These names emphasize the spatial, home-screen feel of having a dedicated, private room for your reading.

- **Atrium:** Suggests a bright, open, and organized central space for your library.
    
- **The Study:** A classic, cozy nod to a quiet room dedicated purely to reading and thought.
    
- **Loft:** Evokes a modern, private, and comfortable space you retreat to.
    
- **Pagescape:** Combines the act of reading with a spatial, environmental feel.
    

### 🪨 The "Solid & Local" Angle (The Obsidian Vibe)

If you want to subtly nod to the user-controlled, local-storage philosophy of apps like Obsidian, these names feel grounded and permanent.

- **Basalt:** A volcanic rock (just like Obsidian), giving a clever, subtle nod to your storage inspiration while sounding strong and grounded.
    
- **Index:** Minimalist and highly functional; implies you have total control over organizing your files.
    
- **Vault:** Suggests your books are safe, offline, and entirely yours.
    
- **Quarry:** A place where raw materials (your files) are stored and extracted.
    

### 🕯️ The "Atmosphere & Light" Angle

These lean heavily into the immersive reading modes and the cozy, late-night reading aesthetic.

- **Lantern:** Evokes a warm, cozy light guiding you through a story.
    
- **Ember:** Suggests the lingering warmth of a good book and the "session restore" feature keeping your place warm.
    
- **Prism:** Reflects the idea of shifting themes and colors in your immersive reading mode.
    
- **Dusk:** The perfect time of day to settle into a cozy, immersive reading session.
    

### 📚 The "Modern Bibliophile" Angle

Short, sleek names that sound like top-tier macOS or Windows productivity tools.

- **Vellum:** A high-quality parchment; sounds premium, tactile, and literary.
    
- **Margin:** A clean, typographical name that honors the reading experience.
    
- **Spine:** The backbone of a book, just like your app is the backbone of their library.
    
- **Prose:** Direct, elegant, and focused purely on the text.
---

# App idea
## Product definition

This is a **local-first desktop EPUB reader** with:

- a **cozy spatial home screen**
- **drag-and-drop library management**
- a **standard powerful reading mode**
- an **immersive themed reading mode**
- **session restore**
- **user-accessible storage**, like Obsidian
---

The app is an EXE where you can drop books into it and it store in a folder (Which anyone can access it easily (same philosophy as obsidian) )

- The app opens in cosy home - a wall like background - People can select multiple places in the house (On piano, above TV, above a music player...)
- They add books by dragging and dropping them - It stacks then they would click on it to see more options (Read, preview, remove, move)
- When they read it - It takes them to the read view screen
- It will be a typical white screen with loads of options on reading it with pen and things to add notes and things like that
- Then there is this immersive option - which takes them to scenes (Reading while going on a camel with book and dust / On a train but there are people in front looking at her suspiciously / Cyberpunk world / CRT monitor effect) similar to how we can do it in Opera gaming browser with themes
- They will have widgets with timer or sticky notes that they can stick on the page - with ASMR widgets that play any music they select
- They can exit and upon reopening they come back to the same session.
---

# User Flow
## Flow 1 — first-time use
1. User opens EXE
2. Game like splash screen of a house in 3D that they can move around and rotate # model-viewer - They click on the house > Then enter in
3. Cosy room wall appears with a stack of racks and tables
4. Add books button
5. User drops EPUB
6. App copies EPUB into local `Books/` folder
7. Metadata extracted
8. Cover created/extracted
9. Book appears in room with drop animation
10. User clicks book
11. User chooses Read

---

## Flow 2 — move books
1. User clicks or drags a book
2. Highlight valid room zones
3. User drops book on piano / shelf / TV area (One scene (They can change scene in later on in the app, which changes the entire background and stack))
4. Book snaps and settles into stack
5. Layout persists

---

## Flow 3 — standard reading
1. User clicks Read
2. Transition into reader
3. Reader opens at last saved position
4. Pageless view or book view
5. User annotates, highlights, writes stickey notes that stay on a page area
6. Session auto-saves

---

## Flow 4 — immersive reading
1. User opens book
2. Clicks Immersive Mode
3. Chooses scene
4. Reader remains functional
5. Ambient visuals/audio activate
6. Session state is saved

---

## Flow 5 — app reopen
1. User reopens app
2. Last home layout restored
3. Last open book/session optionally restored
4. Widgets/audio/theme restored


---


