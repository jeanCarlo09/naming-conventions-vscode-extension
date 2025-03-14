# Naming Conventions

A simple VSCode extension that transforms text into various naming conventions commonly used in programming.

## Features

- Transform selected text to different naming conventions:
  - **camelCase**: `camelCase`
  - **PascalCase**: `PascalCase`
  - **snake_case**: `snake_case`
  - **SCREAMING_SNAKE_CASE**: `SCREAMING_SNAKE_CASE`
  - **kebab-case**: `kebab-case`

- Quick transformation via context menu or command palette
- Preserves alphanumeric characters while removing special characters
- Works on variables, file names, and any selected text

## Usage

1. Select text in the editor
2. Right-click and choose from the available transformations in the context menu
3. Alternatively, open the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`) and type "Transform to" to see available options

## Commands

- `naming-conventions.camelCase`: Transform to camelCase
- `naming-conventions.pascalCase`: Transform to PascalCase
- `naming-conventions.snakeCase`: Transform to snake_case
- `naming-conventions.screamingSnakeCase`: Transform to SCREAMING_SNAKE_CASE
- `naming-conventions.kebabCase`: Transform to kebab-case

## Installation

Since this extension is currently for personal use only:

1. Package the extension: `vsce package --no-yarn`
2. Install from VSIX in VSCode:
   - Open Extensions view (`Ctrl+Shift+X` or `Cmd+Shift+X`)
   - Click on "..." in the top-right corner
   - Select "Install from VSIX..."
   - Choose the generated .vsix file

## Development

- Clone the repository
- Run `npm install`
- Press `F5` to launch a new window with the extension loaded
- Make changes and reload (`Ctrl+R` or `Cmd+R`)

## Known Issues

- None at this time

## Future Improvements

- Add custom keybindings for each transformation
- Support for batch file renaming
- Configuration options for preserving certain special characters
