export const executeAcCommand = (command, ...args) => {
    if (window.ac) {
      window.ac(command, ...args);
      console.log(`AC command executed: ${command}`, args);
    } else {
      console.warn("AC is not available. Ensure the Journey SDK script is loaded.");
    }
  };