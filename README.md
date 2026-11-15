# Unique Browser

A Windows desktop browser built with Electron/Chromium. Early development version **0.1.0**.

## Features in this build
- Chromium-based web rendering with multiple tabs, address bar, Google search, navigation and keyboard shortcuts.
- Persistent bookmarks, local history, download progress, session restore (inactive restored tabs load on selection).
- Lightweight host-based blocking of common advertising/analytics domains, toggleable in the sidebar.
- Per-site permission prompts for geolocation, microphone, camera and notifications.
- Performance inspector with process memory snapshots and DevTools access.
- Context isolation, sandboxing, disabled Node integration for web pages and restricted URL schemes.

## Windows install
1. Open the **Actions** tab in this GitHub repository.
2. Select **Build Windows Browser**, then the latest successful run.
3. Download **Unique-Browser-Windows** under Artifacts, extract the ZIP, then run the NSIS installer or portable EXE.
4. Windows SmartScreen may warn because development builds are not code-signed. Only run binaries you trust.

## Local development
Install Node.js 22+, then run:
```sh
npm install
npm run check
npm start
```
To build Windows binaries on Windows: `npm run pack`.

## Keyboard shortcuts
- Ctrl+L: focus address bar
- Ctrl+T: new tab
- Ctrl+W: close current tab
- Ctrl+R: reload
- Alt+Left / Alt+Right: history navigation

## Known gaps and roadmap
This is a functional **first prototype**, not yet a browser proven faster than Edge or Brave.
- **Experimental unpacked Chromium extensions** can be imported through the sidebar. Electron only supports a subset of Chrome extension APIs; direct Chrome Web Store installation and full compatibility remain unavailable. Never import untrusted extensions.
- Built-in blocking uses a small host list, not EasyList-compatible filtering.
- Inactive tabs are lazy-loaded on startup. Background tabs can now be suspended manually and older background tabs are automatically suspended when more than four are active. Suspension reloads pages on activation and may lose unsaved form state. Automatic memory-pressure-based suspension is not yet implemented.
- There is no installer code signing, automated browser regression suite, profile management or performance benchmark against other browsers.
- Baseline comparison harness: set EDGE_EXE and BRAVE_EXE to local browser executable paths and run npm run benchmark. This measures comparable page navigation timings for those browsers only; Unique Browser performance comparison is not yet automated. No faster-than-Edge/Brave claim has been demonstrated.
- Never use this experimental browser for sensitive accounts until its security and update process have been independently tested.

## License
No license selected yet.