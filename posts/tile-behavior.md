# Tile Behavior

### State matrix (effective renderHint)

  

| Tile state on canvas | `forceFullFidelity` | `previewTier` | `simplify` | `disableImageReveal` | `showActions` | Notes |

| --- | --- | --- | --- | --- | --- | --- |

| Idle (not hovered/selected/focused/dragging) | `false` | zoom-based | `isCanvasMoving` | `isCanvasMoving` | `!isCanvasMoving` | Tiles can drop to `high/medium` while zoomed out. When panning, visuals/actions may simplify. |

| Hovered | `true` | `original` | `false` | `false` | `true` | Hover forces highest fidelity for that tile. |

| Focused | `true` | `original` | `false` | `false` | `true` | Keyboard focus is treated like hover/selection for fidelity. |

| Selected | `true` | `original` | `false` | `false` | `true` | Selection forces full fidelity for that tile. |

| Dragging (tile itself) | `true` | `original` | `false` | `false` | `true` | Dragged tiles are full fidelity while you move them. |

| Canvas moving (panning) + non-interacted tiles | `false` | zoom-based | `true` | `true` | `false` | This is the “performance while moving” state. |

  

---

  

## Where “appearance changes” come from

  

This is the short list of things that commonly change across states:

- **Image source swaps** (`previewTier`): `original` ↔ `high/medium`

- **Reveal animation** (`disableImageReveal`)

- **Actions/toolbar visibility** (`showActions`, `showToolbar`)

- **CSS hover/selected styles** via `card--hovered` / `card--selected`

- **Scene surface / far LOD** (when enabled): may render tiles into a canvas-like surface and use preview color blocks

  

If something looks like an *aspect ratio* change, it is usually one of:

- Tile `width/height` being updated after image load (tile’s stored dimensions were wrong initially)

- A CSS rule forcing `height: 100%` or `object-fit: cover` in one state but not another

- A preview variant decoded with wrong EXIF orientation (JPEG)

  

---

  

## Tile Types: State Notes (Canvas + Grid)

  

This table is meant to capture “what changes” per tile component.

Edit/extend freely as you normalize behaviors.

  

| Tile component | Type ID(s) / kind | Image/preview tier? | Common state-driven changes | Notes / gotchas |

| --- | --- | --- | --- | --- |

| `LinkTile` (`renderer/src/components/tiles/LinkTile.jsx`) | `link` + image/video/music/sticker modes | **Yes** (`useTilePreviewSource`) | Preview tier swaps; actions may hide while canvas moving; hovered/selected forces `original` | Image tiles use “raw/natural” rendering; link previews may crop (`object-fit`) depending on wrapper classes. |

| `AmazonProductTile` | `amazon-product` | Yes (preview image) | Similar tier changes if it uses preview src | Verify object-fit rules; product cards often want consistent aspect. |

| `FileTile` | `file` | No | Mostly CSS hover/selected styling | Should not have preview tier effects. |

| `NoteTile` | `note` | No (unless it embeds media) | Hover/selected/focused visuals | Any changes here should be CSS-only. |

| `TextBoxTile` | `text-box` | No | Editing/focus styling; toolbar visibility | Should remain stable across canvas moving (except toolbar/actions). |

| `CanvasTextTile` | `canvas-text` | No | May re-measure height on edit; focus state | Height measurement can cause layout shifts in grid mode. |

| `ChecklistTile` | `checklist` | No | Selection/focus visuals | No preview tier. |

| `TableTile` | `table` | No | Selection/focus visuals; scrollbars | No preview tier. |

| `CodeSnippetTile` | `code` | No | Selection/focus visuals | No preview tier. |

| `CounterTile` | `counter` | No | Selection/focus visuals | No preview tier. |

| `ProgressTile` | `progress` | No | Selection/focus visuals | No preview tier. |

| `DeadlineTile` | `deadline` | No | Selection/focus visuals | No preview tier. |

| `CalendarTile` | `calendar` | No | Selection/focus visuals | No preview tier. |

| `RackTile` | `rack` | Depends (contains other tiles) | Perspective/hover transforms | Rack-attached tiles have special transforms and can look “different” on hover by design. |

  

---

  

## Grid view: what’s different

  

Grid mode (`GridWorkspaceView`) is a masonry layout:

- It positions tiles in columns and measures DOM heights to compute layout.

- Tile “surface height” is estimated from the tile’s stored `width/height`.

  

If the stored `width/height` for an image tile is wrong initially, the grid will “normalize” tile sizes until the image loads and the app updates the stored size, which can look like a hover-state bug.

  

---

  

## TODO (fill in / normalize)

  

Use this as a checklist for tightening behaviour:

- Decide which tiles should **never** crop (`object-fit: contain`) vs which should crop (`cover`).

- Decide whether image tiles should **ever** swap preview tiers (or always use `original`) on canvas.

- Ensure imported images always have correct stored `width/height` at creation time (no “snap after load”).

- Ensure optimized tiers preserve correct orientation for JPEGs (EXIF orientation).


#AirPaste 