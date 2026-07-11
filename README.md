![](https://vsmarketplacebadges.dev/version-short/willasm.find-this.png)
![](https://vsmarketplacebadges.dev/installs-short/willasm.find-this.png)
![](https://vsmarketplacebadges.dev/downloads/willasm.find-this.png)
![](https://vsmarketplacebadges.dev/rating-star/willasm.find-this.png)

# Find This
A better way to search the web from Visual Studio Code.

## Features
- Includes the search engines `Bing`, `DuckDuckGo`, `Github`, `Github Gist`, `Google`, `Stackoverflow`, and `Youtube`
  - You can add more search engines in the settings
- Search multiple search engines simultaneously
  - Perform search on one or more search engine up to all seven included search engines if you wish
- Include language specific keywords to add to search query
  - Eg. If current document is Main.js (Language ID `javascript`)
  - and you have assigned the words `js Javascript` to the list of keywords for the language ID `javascript`
  - the search query will resolve to `Javascript+%SELECTION%` (%SELECTION% will be replaced with text selection in the editor)
- Search text does not need to be selected first
  - Will search the currently selected text
  - With no text selected it will search for the word at the current cursor position
  - If no word is found at the current cursor position it will search the contents of the current line
- You can modify the search query before searching
- You can input your own search query without using text from the current document
- You can disable the search prompt in the extensions settings if you wish (Will perform the search with your default settings)
- You can run the command `Search for this...` from the command palette or the right click context menu
- You can run the command `Find this input text query...` from the command palette

## Screenshots
Run from command palette...

![Command Palette](/images/CommandPalette.jpg)

Run from right click context menu...

![Coontext Menu](/images/ContextMenu.jpg)

The search prompt...

![Search Prompt](/images/SearchPrompt.jpg)

Search result, DuckDuckGo...

![Search result DuckDuckGo](/images/SearchResultsDuck.jpg)

Search result, Google...

![Search result Google](/images/SearchResultsGoogle.jpg)

Search result, Stackoverflow... (Note: Stackoverflow will prompt with captcha)

![Search result Stackoverflow](/images/SearchResultsStackoverflow.jpg)

Settings 1...

![Settings 1](/images/Settings1.jpg)

Settings 2...

![Settings 2](/images/Settings2.jpg)

Settings 3...

![Settings 3](/images/Settings3.jpg)

## Settings
- `Search Engines` - You can add or remove search engines here if you wish
- `Search Engines Default To Selected At Prompt` - These search engines will by default be selected at the prompt
  - `Google` is selected by default
- `Enable Edit Search Query` - When enabled you will be prompted to edit the search query keywords before searching
  - You will be prompted with an input box allowing you to edit the current search query
  - Note: The entire current search query is selected so typing anything will replace it
  - Just hit enter to use current search query without any change
  - To only edit a portion of the query, mouse click in the input box or use an arrow movement key first, this will prevent removing the current search query
- `Enable On Language Keywords` - When enabled the language ID associated keywords will be added to your search query
- `On Language Keywords List` - This is where you can define your language ID associated keywords
- `Show Search Prompt` - Shows the search engine pick list (When disabled the search will be performed with your default settings)
- Note: The settings have very detailed descriptions to assist you

## Commands
The following commands are available from the command palette: (Windows: CTRL+Shift+P or F1) (Mac: CMD+Shift+P)
- `Find this...` - Will perform a search on the selected text or the word at the current cursor position (Also available from the editors right click menu)
  - Default hotkey (ctrl+f6)
- `Find this input text query...` - Will perform a search on the text you enter into the input box
  - Default hotkey (ctrl+shift+f6)

## Adding on language keywords
If you wish to automatically add certain keywords to your searches based on the language ID of the currently loaded file in the editor you will need to define them in the settings `On Language Keywords List`. The settings description has a clear explanation of what you need to enter. See the [list](#the-following-table-lists-all-visual-studio-code-known-language-identifiers) of known language identifiers to find the one you require.

## Adding your own search engine
If you wish to add another search engine to the list you will need to find its search query format. Do so by performing a search and make a note the path in the address bar.

Eg. For Google the search query is... `https://www.bing.com/search?q=` with your query text appended after the equals sign

Once you have your new search engines query format you can add it in the settings. You will need to append the string `%SELECTION%` after the query. This will be replaced with the text you wish to search for. Have a look at the default ones to see examples. Note that if the search path contains invalid characters they will need to be replaced with the ascii equivalent (See the default path for Github as an example of this)

Your final search path should look like this, `https://www.google.com/search?q=%SELECTION%`

## The following table lists all Visual Studio Code known language identifiers
If you have a language installed not in this list, Visual Studio Code actually displays the language on the statusbar. If you click on that you will get a complete list of all installed languages (includes language extensions you have installed). For every language listed, to the right of it in parenthesis is the languages ID. You can also view [the most up to date list here](https://code.visualstudio.com/docs/languages/identifiers) of supported languages built into Visual Studio Code.

| Language                | Identifier       |
| ----------------------- | ---------------- |
| Agent                   | chatagent        |
| Batch                   | bat              |
| BibTeX                  | bibtex           |
| Binary                  | code-text-binary |
| C                       | c                |
| C#                      | csharp           |
| C++                     | cpp              |
| Clojure                 | clojure          |
| Code Snippets           | snippets         |
| CoffeeScript            | coffeescript     |
| Compose                 | dockercompose    |
| CSS                     | css              |
| CUDA C++                | cuda-cpp         |
| Dart                    | dart             |
| Diff                    | diff             |
| Docker                  | dockerfile       |
| Dotenv                  | dotenv           |
| F#                      | fsharp           |
| Git Commit Message      | git-commit       |
| Git Rebase Message      | git-rebase       |
| Go                      | go               |
| Groovy                  | groovy           |
| Handlebars              | handlebars       |
| HLSL                    | hlsl             |
| HTML                    | html             |
| Ignore                  | ignore           |
| Ini                     | ini              |
| Instructions            | instructions     |
| Java                    | java             |
| JavaScript              | javascript       |
| JavaScript JSX          | javascriptreact  |
| JSON                    | json             |
| JSON Lines              | jsonl            |
| JSON with Comments      | jsonc            |
| Julia                   | julia            |
| Julia Markdown          | juliamarkdown    |
| LaTeX                   | latex            |
| Less                    | less             |
| Log                     | log              |
| Lua                     | lua              |
| Makefile                | makefile         |
| Markdown                | markdown         |
| MS SQL                  | sql              |
| Objective-C             | objective-c      |
| Objective-C++           | objective-cpp    |
| Perl                    | perl             |
| PHP                     | php              |
| Plain Text              | plaintext        |
| PowerShell              | powershell       |
| Prompt                  | prompt           |
| Properties              | properties       |
| Pug                     | jade             |
| Python                  | python           |
| R                       | r                |
| Raku                    | raku             |
| Razor                   | razor            |
| reStructuredText        | restructuredtext |
| Ruby                    | ruby             |
| Rust                    | rust             |
| SCSS                    | scss             |
| Search Result           | search-result    |
| ShaderLab               | shaderlab        |
| Shell Script            | shellscript      |
| Skill                   | skill            |
| Swift                   | swift            |
| TeX                     | tex              |
| TypeScript              | typescript       |
| TypeScript JSX          | typescriptreact  |
| Visual Basic            | vb               |
| WebAssembly Text Format | wat              |
| XML                     | xml              |
| XSL                     | xsl              |
| YAML                    | yaml             |

## Release Notes
See the [Release Notes](RELEASE.md) for details.

