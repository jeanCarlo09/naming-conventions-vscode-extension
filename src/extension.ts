// VSCode
import * as vscode from "vscode";
// Enums
import { NamingConvention } from "./enums/naming-convention.enum";

// Valid scenaries
// - No active text editor
// - No text selected
// - Selection must be single line
// hola mundo
// holaMundo
// HolaMundo
// HOLA_MUNDO
// hola_mundo
// hola-mundo
// hola.mundo
// Hola.Mundo
// HOLA.MUNDO

// Priorize separations characters
// (white space) - _ . ...el _ si es el primer character no tomarlo en cuenta, el orden se basa en este orden
// Si se encuentra otro characters que no sea letra, número o separador, remplace por un vacío
const getSelectionStatement = (): vscode.Selection | null => {
  const editor = vscode.window.activeTextEditor;

  if (!editor) {
    vscode.window.showErrorMessage("No active text editor");
    return null;
  }

  const selection = editor.selection;

  if (selection.isEmpty) {
    vscode.window.showErrorMessage("No text selected");
    return null;
  }

  if (!selection.isSingleLine) {
    vscode.window.showErrorMessage("Selection must be single line");
    return null;
  }

  return selection;
};

const getWords = (text: string): string[] => {
  if (!text) {
    return [];
  }

  const formattedText = text.trim().replace(/[^\w .-]/g, "");

  if (formattedText.includes(" ")) {
    return formattedText.split(" ");
  }

  if (formattedText.includes("_") && formattedText.lastIndexOf("_")) {
    return formattedText.split("_");
  }

  if (formattedText.includes("-")) {
    return formattedText.split("-");
  }

  if (formattedText.includes(".")) {
    return formattedText.split(".");
  }

  if (/^[A-Z]+$/.test(formattedText)) {
    return [formattedText];
  }

  return formattedText.split(/(?=[A-Z])/);
};

const transformToConvention = ({
  text,
  separator = "",
  wordTransformer,
  replace,
}: {
  text: string;
  wordTransformer: (word: string, index: number) => string;
  separator: string;
  replace: RegExp | string;
}): string => {
  const words = getWords(text);

  if (!words.length) {
    return "";
  }

  return words.map(wordTransformer).join(separator).replace(replace, "");
};

const transformToCamelCase = (text: string): string => {
  const callback = (word: string, index: number) => {
    if (index === 0) {
      return word.toLowerCase();
    }

    const firstCharacter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toLowerCase();

    return `${firstCharacter}${restOfWord}`;
  };

  return transformToConvention({
    text,
    separator: "",
    wordTransformer: callback,
    replace: /(?!^)_|[^a-zA-Z0-9]/g,
  });
};

const transformToPascalCase = (text: string): string => {
  const callback = (word: string, index: number) => {
    if (!index) {
      return word.toUpperCase();
    }

    const firstCharacter = word.charAt(0).toUpperCase();
    const restOfWord = word.slice(1).toUpperCase();

    return `${firstCharacter}${restOfWord}`;
  };

  return transformToConvention({
    text,
    separator: "",
    wordTransformer: callback,
    replace: /(?!^)_|[^a-zA-Z0-9]/g,
  });
};

const transformToSnakeCase = (text: string): string => {
  const callback = (word: string) => word.toLowerCase();

  return transformToConvention({
    text,
    separator: "_",
    wordTransformer: callback,
    replace: /[^a-zA-Z0-9_]/g,
  });
};

const transformToScreamingSnakeCase = (text: string): string => {
  const callback = (word: string) => word.toUpperCase();

  return transformToConvention({
    text,
    separator: "_",
    wordTransformer: callback,
    replace: /[^a-zA-Z0-9_]/g,
  });
};

const transformToKebabCase = (text: string): string => {
  const callback = (word: string) => word.toLowerCase();

  return transformToConvention({
    text,
    separator: "-",
    wordTransformer: callback,
    replace: /[^a-zA-Z0-9]/g,
  });
};

const mapHandlerConvention: Readonly<
  Record<NamingConvention, (value: string) => string>
> = {
  [NamingConvention.CAMEL_CASE]: transformToCamelCase,
  [NamingConvention.PASCAL_CASE]: transformToPascalCase,
  [NamingConvention.SNAKE_CASE]: transformToSnakeCase,
  [NamingConvention.SCREAMING_SNAKE_CASE]: transformToScreamingSnakeCase,
  [NamingConvention.KEBAB_CASE]: transformToKebabCase,
};

const handleTextTransformation = (convention: NamingConvention) => {
  const selection = getSelectionStatement();

  if (!selection) {
    return;
  }

  const selectionText =
    vscode.window.activeTextEditor?.document.getText(selection);

  if (!selectionText) {
    return;
  }

  const handler = mapHandlerConvention[convention];

  if (!handler) {
    vscode.window.showErrorMessage("Transformation not supported");
    return;
  }

  const transformedText = handler(selectionText);

  vscode.window.activeTextEditor?.edit((editBuilder) => {
    editBuilder.replace(selection, transformedText);
  });
};

export function activate(context: vscode.ExtensionContext) {
  const transformToCamelCaseCommand = vscode.commands.registerCommand(
    "naming-conventions.camelCase",
    () => handleTextTransformation(NamingConvention.CAMEL_CASE)
  );

  const transformToPascalCaseCommand = vscode.commands.registerCommand(
    "naming-conventions.pascalCase",
    () => handleTextTransformation(NamingConvention.PASCAL_CASE)
  );

  const transformToSnakeCaseCommand = vscode.commands.registerCommand(
    "naming-conventions.snakeCase",
    () => handleTextTransformation(NamingConvention.SNAKE_CASE)
  );

  const transformToScreamingSnakeCaseCommand = vscode.commands.registerCommand(
    "naming-conventions.screamingSnakeCase",
    () => handleTextTransformation(NamingConvention.SCREAMING_SNAKE_CASE)
  );

  const transformToKebabCaseCommand = vscode.commands.registerCommand(
    "naming-conventions.kebabCase",
    () => handleTextTransformation(NamingConvention.KEBAB_CASE)
  );

  context.subscriptions.push(
    transformToCamelCaseCommand,
    transformToPascalCaseCommand,
    transformToSnakeCaseCommand,
    transformToScreamingSnakeCaseCommand,
    transformToKebabCaseCommand
  );
}
