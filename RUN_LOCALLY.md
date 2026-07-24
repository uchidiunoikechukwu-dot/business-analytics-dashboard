# Run Locally / Terminal Troubleshooting

If the terminal in your editor is not working, use this checklist.

## 1. Do not use the Arena path on your computer

This path only exists inside the Arena workspace:

```bash
/home/user/business-analytics-dashboard
```

On your computer, first unzip the project, then open the unzipped folder in your editor.

## 2. Open the correct folder

In VS Code:

```txt
File → Open Folder → business-analytics-dashboard
```

Then open:

```txt
Terminal → New Terminal
```

The terminal should already be inside the project folder.

## 3. Install Node.js if npm is not recognized

Run:

```bash
node -v
npm -v
```

If either command fails, install Node.js LTS from:

```txt
https://nodejs.org
```

Then close and reopen your editor.

## 4. Start the project

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal, usually:

```txt
http://localhost:5173
```

## 5. Windows PowerShell script error

If you see something like:

```txt
running scripts is disabled on this system
```

Use Command Prompt instead of PowerShell, or run PowerShell as your user and execute:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

Then try again:

```bash
npm install
npm run dev
```

## 6. If VS Code terminal itself will not open

Use your system terminal instead:

### Windows

Open Command Prompt, then run:

```cmd
cd path\to\business-analytics-dashboard
npm install
npm run dev
```

### macOS / Linux

Open Terminal, then run:

```bash
cd path/to/business-analytics-dashboard
npm install
npm run dev
```

## 7. No-terminal preview option

The zip includes a built `dist` folder. If your terminal is unavailable, install the VS Code extension **Live Server**, then:

```txt
Right-click dist/index.html → Open with Live Server
```

Note: this previews the latest built version. If you edit source files, you still need `npm run build` to update `dist`.
