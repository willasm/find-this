const vscode = require("vscode");

module.exports = {
    activate,
    deactivate,
};

let myContext;

//  ╭──────────────────────────────────────────────────────────────────────────────╮
//  │                            ● Function Activate ●                             │
//  ╰──────────────────────────────────────────────────────────────────────────────╯
async function activate(context) {

    // Activate - Initialize Extension 
    //---------------------------------------------------------------------------------------------------------
    myContext = context;                    // Save context

    // Activate - Register Extension Commands 
    vscode.commands.registerCommand('find-this.searchForThis', searchForThis);
    vscode.commands.registerCommand('find-this.searchForThisInput', searchForThisInput);

    // Activate - Push Subscriptions 
    context.subscriptions.push(searchForThis);
    context.subscriptions.push(searchForThisInput);

};

//  ╭──────────────────────────────────────────────────────────────────────────────╮
//  │                          ● Function searchForThis ●                          │
//  │                                                                              │
//  │    • Perform the Search on Currently Selected Text or Word Under Cursor •    │
//  ╰──────────────────────────────────────────────────────────────────────────────╯
async function searchForThis() {

  let searchEngines;
  let searchEngineNames = [];
  let searchEnginePaths = [];
  let searchEngineDefaults = [];
  let enableOnLanguageKeywords = false;
  let showSearchPrompt = true;
  let onLanguageKeywords = [];
  let onLanguageIDs = [];
  let pickItems = [];
  let pickSearchEngines = [];

  // searchForThis - Get Extensions Settings 
  let settings = vscode.workspace.getConfiguration("find-this");

  // searchForThis - Get search engines 
  searchEngines = settings.get("searchEngines");
  for ( var property in searchEngines ) {
    searchEngineNames.push(property);
    searchEnginePaths.push(searchEngines[property]);
  }

  // searchForThis - Get Search Engines Defaulted to Selected 
  searchEngineDefaults = settings.get("searchEnginesDefaultToSelectedAtPrompt");

  // searchForThis - Get Enabled on Language ID Flag 
  enableOnLanguageKeywords = settings.get("enableOnLanguageKeywords");

  // searchForThis - Get Show Search Prompt Flag 
  showSearchPrompt = settings.get("showSearchPrompt");

  // searchForThis - Get Language ID Keywords 
  onLanguage = settings.get("onLanguageKeywordsList");
  for ( var property in onLanguage ) {
    let keywordsList = property;
    let keywordsTrimSpaces = keywordsList.replace(/\s{2,}/g, ' ').trim();
    let keywordsItemAddPlus = keywordsTrimSpaces.replace(/\s/g, '+');
    onLanguageKeywords.push(keywordsItemAddPlus);
    onLanguageIDs.push(onLanguage[property]);
  };

  // searchForThis - Get Selected Text or Word Under Cursor 
  let selectedText = getSelectedText();

  // searchForThis - Define Quickpick 
  let options = {
    placeHolder: 'Select the search engines you wish to use...',
    title: `---=== Find This ===---`,
    canPickMany: true
  };
  let pick;

  // searchForThis - Add Enable Language Keywords to Pick List 
  if (onLanguageIDs.length > 0) {
    if (enableOnLanguageKeywords) {
      pickItems = [{label: 'Enable language ID keywords', picked: true}];
    } else {
      pickItems = [{label: 'Enable language ID keywords', picked: false}];
    };
  };

  // searchForThis - Add Search Engines to Pick List 
  searchEngineNames.forEach(element => {
    if (searchEngineDefaults.includes(element)) {
      pickItems.push({label: `${element}`, picked: true});
    } else {
      pickItems.push({label: `${element}`, picked: false});
    };
  });
  
  // searchForThis - Skip the Quickpick if Set in Settings 
  if (!showSearchPrompt) {
    console.log('bbbb');

    // searchForThis - Get Language ID and Apply Associated Keywords to Search Query 
    let editor = vscode.window.activeTextEditor;
    let langID = editor.document.languageId;
    if (enableOnLanguageKeywords) {
      if (onLanguageIDs.length > 0) {
        let langIndex = onLanguageIDs.indexOf(langID);
        if (langIndex != -1) {
          let textNew = onLanguageKeywords[langIndex]+'+'+selectedText;
          selectedText = textNew;
        }
      };
    };

    // searchForThis - Get Default Search Engines 
    let searchIndex = 0;
    let defaultsIndex = 0;
    let loopIndex = searchEngineDefaults.length-1;
    while (loopIndex <= searchEngineDefaults.length) {
      while (searchIndex < searchEngineNames.length) {
        if (searchEngineNames[searchIndex] == searchEngineDefaults[defaultsIndex]) {
          pickSearchEngines.push(searchEnginePaths[searchIndex]);
        };
        searchIndex++;
      };
      searchIndex = 0;
      loopIndex ++;
      defaultsIndex ++;
    };

    // searchForThis - Perform Search Query 
    let uriText = encodeURI(selectedText);
    let search;
    let query;
    for (let i = 0; i < pickSearchEngines.length; i++) {
      search = pickSearchEngines[i];
      query = search.replace("%SELECTION%", uriText);
      vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(query));
    };
    return;
  };

  // searchForThis - Show the Quickpick 
  pick = await vscode.window.showQuickPick(pickItems, options);

  // searchForThis - User Canceled 
  if (!pick || pick.length == 0) {
    return;
  };

  // searchForThis - Get Language ID and Apply Associated Keywords to Search Query 
  if (pick[0].label == 'Enable language ID keywords') {
    let editor = vscode.window.activeTextEditor;
    let langID = editor.document.languageId;
    if (enableOnLanguageKeywords) {
      if (onLanguageIDs.length > 0) {
        let langIndex = onLanguageIDs.indexOf(langID);
        if (langIndex != -1) {
          let textNew = onLanguageKeywords[langIndex]+'+'+selectedText;
          selectedText = textNew;
        }
      };
    };
  };

  // searchForThis - Get Selected Search Engines 
  let pickIndex = 0;
  let searchIndex = 0;
  let loopIndex = searchEngineNames.length-1;
  if (pick[0].label == 'Enable language ID keywords') {
    pickIndex++
  };
  while (pickIndex < pick.length) {
    while (searchIndex <= loopIndex) {
      if (pick[pickIndex].label == searchEngineNames[searchIndex]) {
        pickSearchEngines.push(searchEnginePaths[searchIndex]);
      };
      searchIndex++;
    };
    searchIndex = 0;
    loopIndex = searchEngineNames.length-1;
    pickIndex++;
  };

  // searchForThis - Perform Search Query 
  let uriText = encodeURI(selectedText);
  let search;
  let query;
  for (let i = 0; i < pickSearchEngines.length; i++) {
    search = pickSearchEngines[i];
    query = search.replace("%SELECTION%", uriText);
    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(query));
  };

};

//  ╭──────────────────────────────────────────────────────────────────────────────╮
//  │                       ● Function searchForThisInput ●                        │
//  │                                                                              │
//  │                   • Perform a Search on User Input Text •                    │
//  ╰──────────────────────────────────────────────────────────────────────────────╯
async function searchForThisInput() {

  let searchEngines;
  let searchEngineNames = [];
  let searchEnginePaths = [];
  let searchEngineDefaults = [];
  let enableOnLanguageKeywords = false;
  let showSearchPrompt = true;
  let onLanguageKeywords = [];
  let onLanguageIDs = [];
  let pickItems = [];
  let pickSearchEngines = [];

  // searchForThisInput - Get Extensions Settings 
  let settings = vscode.workspace.getConfiguration("find-this");

  // searchForThisInput - Get search engines 
  searchEngines = settings.get("searchEngines");
  for ( var property in searchEngines ) {
    searchEngineNames.push(property);
    searchEnginePaths.push(searchEngines[property]);
  }

  // searchForThisInput - Get Search Engines Defaulted to Selected 
  searchEngineDefaults = settings.get("searchEnginesDefaultToSelectedAtPrompt");

  // searchForThisInput - Get Enabled on Language ID Flag 
  enableOnLanguageKeywords = settings.get("enableOnLanguageKeywords");

  // searchForThisInput - Get Show Search Prompt Flag 
  showSearchPrompt = settings.get("showSearchPrompt");

  // searchForThisInput - Get Language ID Keywords 
  onLanguage = settings.get("onLanguageKeywordsList");
  for ( var property in onLanguage ) {
    let keywordsList = property;
    let keywordsTrimSpaces = keywordsList.replace(/\s{2,}/g, ' ').trim();
    let keywordsItemAddPlus = keywordsTrimSpaces.replace(/\s/g, '+');
    onLanguageKeywords.push(keywordsItemAddPlus);
    onLanguageIDs.push(onLanguage[property]);
  };

  // searchForThisInput - Define Input 
  let optionsInput = {
    placeHolder: 'Enter your search query...',
    title: `---=== Find This ===---`
  };

  // searchForThisInput - Show the Input Box 
  selectedText = await vscode.window.showInputBox(optionsInput);

  // searchForThisInput - User Canceled or No Text Input 
  if (selectedText == undefined || selectedText == '') {
    return;
  };

  // searchForThisInput - Define Quickpick 
  let options = {
    placeHolder: 'Select the search engines you wish to use...',
    title: `---=== Find This ===---`,
    canPickMany: true
  };
  let pick;

  // searchForThisInput - Add Enable Language Keywords to Pick List 
  if (onLanguageIDs.length > 0) {
    if (enableOnLanguageKeywords) {
      pickItems = [{label: 'Enable language ID keywords', picked: true}];
    } else {
      pickItems = [{label: 'Enable language ID keywords', picked: false}];
    };
  };

  // searchForThisInput - Add Search Engines to Pick List 
  searchEngineNames.forEach(element => {
    if (searchEngineDefaults.includes(element)) {
      pickItems.push({label: `${element}`, picked: true});
    } else {
      pickItems.push({label: `${element}`, picked: false});
    };
  });

  // searchForThisInput - Skip the Quickpick if Set in Settings 
  if (!showSearchPrompt) {

    // searchForThisInput - Get Language ID and Apply Associated Keywords to Search Query 
    let editor = vscode.window.activeTextEditor;
    let langID = editor.document.languageId;
    if (enableOnLanguageKeywords) {
      if (onLanguageIDs.length > 0) {
        let langIndex = onLanguageIDs.indexOf(langID);
        if (langIndex != -1) {
          let textNew = onLanguageKeywords[langIndex]+'+'+selectedText;
          selectedText = textNew;
        }
      };
    };

    // searchForThisInput - Get Default Search Engines 
    let searchIndex = 0;
    let defaultsIndex = 0;
    let loopIndex = searchEngineDefaults.length-1;
    while (loopIndex <= searchEngineDefaults.length) {
      while (searchIndex < searchEngineNames.length) {
        if (searchEngineNames[searchIndex] == searchEngineDefaults[defaultsIndex]) {
          pickSearchEngines.push(searchEnginePaths[searchIndex]);
        };
        searchIndex++;
      };
      searchIndex = 0;
      loopIndex ++;
      defaultsIndex ++;
    };

    // searchForThisInput - Perform Search Query 
    let uriText = encodeURI(selectedText);
    let search;
    let query;
    for (let i = 0; i < pickSearchEngines.length; i++) {
      search = pickSearchEngines[i];
      query = search.replace("%SELECTION%", uriText);
      vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(query));
    };
    return;
  };

  // searchForThisInput - Show the Quickpick 
  pick = await vscode.window.showQuickPick(pickItems, options);

  // searchForThisInput - User Canceled 
  if (!pick || pick.length == 0) {
    return;
  };

  // searchForThisInput - Get Language ID and Apply Associated Keywords to Search Query 
  if (pick[0].label == 'Enable language ID keywords') {
    let editor = vscode.window.activeTextEditor;
    let langID = editor.document.languageId;
    if (enableOnLanguageKeywords) {
      if (onLanguageIDs.length > 0) {
        let langIndex = onLanguageIDs.indexOf(langID);
        if (langIndex != -1) {
          let textNew = onLanguageKeywords[langIndex]+'+'+selectedText;
          selectedText = textNew;
        }
      };
    };
  };

  // searchForThisInput - Get Selected Search Engines 
  let pickIndex = 0;
  let searchIndex = 0;
  let loopIndex = searchEngineNames.length-1;
  if (pick[0].label == 'Enable language ID keywords') {
    pickIndex++
  };
  while (pickIndex < pick.length) {
    while (searchIndex <= loopIndex) {
      if (pick[pickIndex].label == searchEngineNames[searchIndex]) {
        pickSearchEngines.push(searchEnginePaths[searchIndex]);
      };
      searchIndex++;
    };
    searchIndex = 0;
    loopIndex = searchEngineNames.length-1;
    pickIndex++;
  };

  // searchForThisInput - Perform Search Query 
  let uriText = encodeURI(selectedText);
  let search;
  let query;
  for (let i = 0; i < pickSearchEngines.length; i++) {
    search = pickSearchEngines[i];
    query = search.replace("%SELECTION%", uriText);
    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(query));
  };

};


//  ╭──────────────────────────────────────────────────────────────────────────────╮
//  │                         ● Function getSelectedText ●                         │
//  │                                                                              │
//  │                • Return Selected Text or Word Under Cursor •                 │
//  ╰──────────────────────────────────────────────────────────────────────────────╯
function getSelectedText() {
  const documentText = vscode.window.activeTextEditor.document.getText();
  if (!documentText) {
    return "";
  };
  const activeSelection = vscode.window.activeTextEditor.selection;
  if (activeSelection.isEmpty) {
    let wordRange;
    let editor = vscode.window.activeTextEditor;
    wordRange = editor.document.getWordRangeAtPosition(editor.selection.start);
    if (wordRange == undefined) {
      wordRange = editor.document.getWordRangeAtPosition(editor.selection.start,/^.+$/);
    };
    let wordText = editor.document.getText(wordRange);
    return wordText;
  };
  const selStartoffset = vscode.window.activeTextEditor.document.offsetAt(
    activeSelection.start
  );
  const selEndOffset = vscode.window.activeTextEditor.document.offsetAt(
    activeSelection.end
  );

  let selectedText = documentText.slice(selStartoffset, selEndOffset).trim();
  return selectedText.replace(/\s{2,}/g, " ").trim();

};


//  ╭──────────────────────────────────────────────────────────────────────────────╮
//  │                           ● Function deactivate ●                            │
//  │                                                                              │
//  │                       • Deactivate Extension Cleanup •                       │
//  ╰──────────────────────────────────────────────────────────────────────────────╯
function deactivate() {}