# VS Code Extensions for Next.js Project

# Recommended Base Extensions

- [getting-started-with-github-copilot](https://docs.github.com/en/copilot/using-github-copilot/getting-started-with-github-copilot?tool=vscode)

```sh
code --uninstall-extension vscodevim.vim

code --install-extension github.copilot-chat
code --install-extension github.copilot
code --install-extension pkief.material-icon-theme
code --install-extension eamodio.gitlens
code --install-extension mikestead.dotenv
code --install-extension editorconfig.editorconfig
code --install-extension christian-kohler.path-intellisense
code --install-extension jock.svg
```

# Docker && File System Extensions

```sh
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode-remote.remote-containers
code --uninstall-extension ms-vscode-remote.remote-wsl
code --uninstall-extension ms-vscode.live-server
```

# Node.js && Typescript Extensions

```sh
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension christian-kohler.npm-intellisense
code --install-extension faissaloux.package-manager-intellisense
code --install-extension dbaeumer.vscode-eslint
code --install-extension esbenp.prettier-vscode
code --install-extension yoavbls.pretty-ts-errors
```

# Next.js Extensions

```sh
code --install-extension bradlc.vscode-tailwindcss
code --install-extension imgildev.vscode-nextjs-generator
```

# API Extensions

```sh
code --install-extension prisma.prisma
```

# VS Code settings.json Example

- [FiraCode Nerd Font Preview](https://www.programmingfonts.org/#firacode)
- [Nerdfonts downloads](https://www.nerdfonts.com/font-downloads)

```json
{
  "editor.fontFamily": "'FiraCode Nerd Font', Consolas, 'Courier New', monospace",
  "window.zoomLevel": -1,
  "editor.formatOnPaste": true,
  "git.autofetch": true,
  "[markdown]": {
    "editor.wordWrap": "on"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[jsonc]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "workbench.iconTheme": "material-icon-theme",
  "workbench.colorTheme": "Visual Studio Dark"
}
```

# VS Code others settings.json Example

```json
{
  "explorer.confirmDragAndDrop": false,
  "security.allowedUNCHosts": ["Server01"],
  "github.copilot.editor.enableAutoCompletions": true
}
```
