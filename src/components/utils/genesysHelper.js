export const executeGenesysCommand = (...args) => {
    const waitForGenesys = setInterval(() => {
      if (window.Genesys) {
        clearInterval(waitForGenesys);
        try {
          window.Genesys(...args);
          console.log("Genesys command executed:", args);
        } catch (error) {
          console.error("Error executing Genesys command:", error);
        }
      } else {
        console.warn("Genesys is not available. Command not executed:", args);
      }
    }, 100);
  };