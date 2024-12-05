export const executeAcCommand = (...args) => {
  if (window.ac) {
    try {
      window.ac(...args);
      console.log("AC command executed:", args);
    } catch (error) {
      console.error("Error executing AC command:", error);
    }
  } else {
    console.warn("AC is not available. Command not executed:", args);
  }
};