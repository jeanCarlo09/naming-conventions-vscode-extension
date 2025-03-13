// VSCode
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

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

// TODO refactor, and improve documentation

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

  return formattedText.split(/(?=[A-Z])/);
};

const transformToCamelCase = (text: string): string => {
  const words = getWords(text);

  if (!words.length) {
    return "";
  }

  return words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }

      const firstCharacter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1).toLowerCase();

      return `${firstCharacter}${restOfWord}`;
    })
    .join("")
    .replace(/(?!^)_|[^a-zA-Z0-9]/g, "");
};

const transformToPascalCase = (text: string): string => {
  const words = getWords(text);

  if (!words.length) {
    return "";
  }

  return words
    .map((word, index) => {
      if (index === 0) {
        return word.toUpperCase();
      }

      const firstCharacter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1).toUpperCase();

      return `${firstCharacter}${restOfWord}`;
    })
    .join("")
    .replace(/(?!^)_|[^a-zA-Z0-9]/g, "");
};

const transformToSnakeCase = (text: string): string => {
  const words = getWords(text);

  if (!words.length) {
    return "";
  }

  return words
    .map((word) => {
      return word.toLowerCase();
    })
    .join("_")
    .replace(/[^a-zA-Z0-9]/g, "");
};

const transformToScreamingSnakeCase = (text: string): string => {
  const words = getWords(text);

  if (!words.length) {
    return "";
  }

  return words
    .map((word) => {
      return word.toUpperCase();
    })
    .join("_")
    .replace(/[^a-zA-Z0-9]/g, "");
};

const transformToKebabCase = (text: string): string => {
  const words = getWords(text);

  if (!words.length) {
    return "";
  }

  return words
    .map((word) => {
      return word.toLowerCase();
    })
    .join("-")
    .replace(/[^a-zA-Z0-9]/g, "");
};

export function activate(context: vscode.ExtensionContext) {
  const transformToCamelCaseCommand = vscode.commands.registerCommand(
    "naming-conventions.camelCase",
    () => {
      vscode.window.showInformationMessage("Transform to camelCase");

      const selection = getSelectionStatement();

      if (!selection) {
        return;
      }

      const selectionText =
        vscode.window.activeTextEditor?.document.getText(selection);

      if (!selectionText) {
        return;
      }

      const transformedText = transformToCamelCase(selectionText);

      vscode.window.activeTextEditor?.edit((editBuilder) => {
        editBuilder.replace(selection, transformedText);
      });
    }
  );

  const transformToPascalCaseCommand = vscode.commands.registerCommand(
    "naming-conventions.pascalCase",
    () => {
      vscode.window.showInformationMessage("Transform to pascalCase");

      const selection = getSelectionStatement();

      if (!selection) {
        return;
      }

      const selectionText =
        vscode.window.activeTextEditor?.document.getText(selection);

      if (!selectionText) {
        return;
      }

      const transformedText = transformToPascalCase(selectionText);

      vscode.window.activeTextEditor?.edit((editBuilder) => {
        editBuilder.replace(selection, transformedText);
      });
    }
  );

  const transformToSnakeCaseCommand = vscode.commands.registerCommand(
    "naming-conventions.snakeCase",
    () => {
      vscode.window.showInformationMessage("Transform to snakeCase");

      const selection = getSelectionStatement();

      if (!selection) {
        return;
      }

      const selectionText =
        vscode.window.activeTextEditor?.document.getText(selection);

      if (!selectionText) {
        return;
      }

      const transformedText = transformToSnakeCase(selectionText);

      vscode.window.activeTextEditor?.edit((editBuilder) => {
        editBuilder.replace(selection, transformedText);
      });
    }
  );

  const transformToScreamingSnakeCaseCommand = vscode.commands.registerCommand(
    "naming-conventions.screamingSnakeCase",
    () => {
      vscode.window.showInformationMessage("Transform to SCREAMING_SNAKE_CASE");

      const selection = getSelectionStatement();

      if (!selection) {
        return;
      }

      const selectionText =
        vscode.window.activeTextEditor?.document.getText(selection);

      if (!selectionText) {
        return;
      }

      const transformedText = transformToScreamingSnakeCase(selectionText);

      vscode.window.activeTextEditor?.edit((editBuilder) => {
        editBuilder.replace(selection, transformedText);
      });
    }
  );

  const transformToKebabCaseCommand = vscode.commands.registerCommand(
    "naming-conventions.kebabCase",
    () => {
      vscode.window.showInformationMessage("Transform to kebabCase");

      const selection = getSelectionStatement();

      if (!selection) {
        return;
      }

      const selectionText =
        vscode.window.activeTextEditor?.document.getText(selection);

      if (!selectionText) {
        return;
      }

      const transformedText = transformToKebabCase(selectionText);

      vscode.window.activeTextEditor?.edit((editBuilder) => {
        editBuilder.replace(selection, transformedText);
      });
    }
  );

  //   const transformToDotCaseCommand = vscode.commands.registerCommand(
  //     "naming-conventions.dotCase",
  //     () => {
  //       vscode.window.showInformationMessage("Transform to dotCase");

  //       const selection = getSelectionStatement();

  //       if (!selection) {
  //         return;
  //       }

  //       console.log({ selection });
  //     }
  //   );

  //   const transformToTrainCaseCommand = vscode.commands.registerCommand(
  //     "naming-conventions.trainCase",
  //     () => {
  //       vscode.window.showInformationMessage("Transform to trainCase");

  //       const selection = getSelectionStatement();

  //       if (!selection) {
  //         return;
  //       }

  //       console.log({ selection });
  //     }
  //   );

  context.subscriptions.push(
    transformToCamelCaseCommand,
    transformToPascalCaseCommand,
    transformToSnakeCaseCommand,
    transformToScreamingSnakeCaseCommand,
    transformToKebabCaseCommand
    // transformToDotCaseCommand,
    // transformToTrainCaseCommand
  );
}
