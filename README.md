![](https://img.shields.io/visual-studio-marketplace/v/willasm.find-this)
![](https://img.shields.io/visual-studio-marketplace/d/willasm.find-this)
![](https://img.shields.io/visual-studio-marketplace/r/willasm.find-this)
![](https://img.shields.io/visual-studio-marketplace/release-date/willasm.find-this)
![](https://img.shields.io/visual-studio-marketplace/last-updated/willasm.find-this)

# Find This
A better way to search the web from Visual Studio Code.

## Features
- Includes the search engines `Bing`, `DuckDuckGo`, `Github`, `Github Gist`, `Google`, `Stackoverflow`, and `Youtube`
  - You can add more search engines in the settings
- Search multiple search engines simultaneously
  - Perform search on one or more search engine up to all seven included search engines if you wish
- Include language specific keywords to add to search query
  - Eg. If current document is Main.js (Language ID `javascript`)
  - and you have assigned the word `Javascript` to the list of keywords for the language ID `javascript`
  - the search query will resolve to `Javascript+%SELECTION%` (%SELECTION% will be replaced with text selection in the editor)
- Search text does not need to be selected first
  - Will search the currently selected text
  - With no text selected it will search for the word at the current cursor position
  - If no word is found at the current cursor position it will search the contents of the current line
- You can input your own search string, no need to use text from the current document
- You can disable the search prompt in the extensions settings if you wish (Will perform the search with the default settings)
- You can run the command `Search for this...` from the command palette or the right click context menu
- You can run the command `Search for this - Input text...` from the command palette

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

Search result, Stackoverflow...

![Search result Stackoverflow](/images/SearchResultsStackoverflow.jpg)

Settings 1...

![Settings 1](/images/Settings1.jpg)

Settings 2...

![Settings 2](/images/Settings2.jpg)

## Settings
- `Search Engines` - You can add more search engines here if you wish
- `Search Engines Default To Selected At Prompt` - These search engines will by default be selected at the prompt
- `Enable On Language Keywords` - When enabled the language ID associated keywords will be added to your search query
- `On Language Keywords List` - This is where you can define your language ID associated keywords
- `Show Search Prompt` - Shows the search engine pick list (When disabled the search will be performed with your default settings)
- Note: The settings have very detailed descriptions to assist you

## Commands
The following commands are available from the command palette: (Windows: CTRL+Shift+P or F1) (Mac: CMD+Shift+P)
- `Find this...` - Will perform a search on the selected text or the word at the current cursor position (Also available in the editors right click menu)
  - Default hotkey (ctrl+f6)
- `Find this - Input text...` - Will perform a search on the text you enter into the input box
  - Default hotkey (ctrl+shift+f6)

## Adding on language keywords
If you wish to automatically add certain keywords to your searches based on the language ID of the currently loaded file in the editor you will need to define them in the settings `On Language Keywords List`. The settings description has a clear explanation of what you need to enter. See the [list](#the-following-table-lists-all-visual-studio-code-known-language-identifiers) of known language identifiers to find the one you require.

## Adding your own search engine
If you wish to add another search engine to the list you will need to find its search query format. Do so by performing a search and make a note the path in the address bar.

Eg. For Google the search query is... `https://www.bing.com/search?q=` with your query text appended after the equals sign

Once you have your new search engines query format you can add it in the settings. You will need to append the string `%SELECTION%` after the query. This will be replaced with the text you wish to search for. Have a look at the default ones to see examples. Note that if the search path contains invalid characters they will need to be replaced with the ascii equivalent (See the default path for Github as an example of this)

Your final search path should look like this, `https://www.google.com/search?q=%SELECTION%`

## Special Notes
Visual Studio Code treats any `object` configuration setting in the `package.json` file as read only which means you can not edit the included search engines in the settings. If you attempt to edit them VSCode will just create a copy of the original. However this does not apply to any new entries that you add yourself. What this means is that if one of the search engines changes its search query format, an update to the extension will be required. If that does happen and you can not wait for an update, you could always just directly edit the `Package.json` file for this extension.

## The following table lists all Visual Studio Code known language identifiers
If you have a language installed not in this list, Visual Studio Code actually displays the language on the statusbar. If you click on that you will get a complete list of all installed languages. For every language listed, to the right of it in parenthesis is the languages ID.

| Language            | Identifier                                                 |
|---------------------|------------------------------------------------------------|
| ABAP                | abap                                                       |
| Windows Bat         | bat                                                        |
| BibTeX              | bibtex                                                     |
| Clojure             | clojure                                                    |
| Coffeescript        | coffeescript                                               |
| C                   | c                                                          |
| C++                 | cpp                                                        |
| C#                  | csharp                                                     |
| Compose             | dockercompose                                              |
| CSS                 | css                                                        |
| CUDA C++            | cuda-cpp                                                   |
| Diff                | diff                                                       |
| Dockerfile          | dockerfile                                                 |
| F#                  | fsharp                                                     |
| Git                 | git-commit and git-rebase                                  |
| Go                  | go                                                         |
| Groovy              | groovy                                                     |
| Handlebars          | handlebars                                                 |
| Haml                | haml                                                       |
| HTML                | html                                                       |
| Ini                 | ini                                                        |
| Java                | java                                                       |
| JavaScript          | javascript                                                 |
| JavaScript JSX      | javascriptreact                                            |
| JSON                | json                                                       |
| JSON with Comments  | jsonc                                                      |
| Julia               | julia                                                      |
| LaTeX               | latex                                                      |
| Less                | less                                                       |
| Lua                 | lua                                                        |
| Makefile            | makefile                                                   |
| Markdown            | markdown                                                   |
| Objective-C         | objective-c                                                |
| Objective-C++       | objective-cpp                                              |
| Perl                | perl and perl6                                             |
| PHP                 | php                                                        |
| Plain Text          | plaintext                                                  |
| PowerShell          | powershell                                                 |
| Pug                 | jade, pug                                                  |
| Python              | python                                                     |
| R                   | r                                                          |
| Razor (cshtml)      | razor                                                      |
| Ruby                | ruby                                                       |
| Rust                | rust                                                       |
| SCSS                | scss (syntax using curly brackets), sass (indented syntax) |
| ShaderLab           | shaderlab                                                  |
| Shell Script (Bash) | shellscript                                                |
| Slim                | slim                                                       |
| SQL                 | sql                                                        |
| Stylus              | stylus                                                     |
| Swift               | swift                                                      |
| TypeScript          | typescript                                                 |
| TypeScript JSX      | typescriptreact                                            |
| TeX                 | tex                                                        |
| Visual Basic        | vb                                                         |
| Vue                 | vue                                                        |
| Vue HTML            | vue-html                                                   |
| XML                 | xml                                                        |
| XSL                 | xsl                                                        |
| YAML                | yaml                                                       |

## Release Notes
See the [Release Notes](RELEASE.md) for details.

