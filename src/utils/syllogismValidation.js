export const validateSyllogism = (statementType, figure) => {
  // Valid syllogism forms
  const validForms = {
    "EAE-1": true, // Celarent
    "AAA-1": true, // Barbara
    "AII-1": true, // Darii
    "EIO-1": true, // Ferio
    "EAE-2": true, // Cesare
    "AEE-2": true, // Camestres
    "EIO-2": true, // Festino
    "AOO-2": true, // Baroco
    "IAI-3": true, // Darapti
    "AII-3": true, // Datisi
    "OAO-3": true, // Bocardo
    "EIO-3": true, // Ferison
    "AAI-4": true, // Bramantip
    "AEE-4": true, // Camenes
    "IAI-4": true, // Dimaris
    "EAO-4": true, // Fesapo
    "EIO-4": true, // Fresison
  };

  const form = `${statementType}-${figure}`;
  return validForms[form] || false;
};

export const getSyllogismName = (statementType, figure) => {
  const names = {
    "EAE-1": "Celarent",
    "AAA-1": "Barbara",
    "AII-1": "Darii",
    "EIO-1": "Ferio",
    "EAE-2": "Cesare",
    "AEE-2": "Camestres",
    "EIO-2": "Festino",
    "AOO-2": "Baroco",
    "IAI-3": "Darapti",
    "AII-3": "Datisi",
    "OAO-3": "Bocardo",
    "EIO-3": "Ferison",
    "AAI-4": "Bramantip",
    "AEE-4": "Camenes",
    "IAI-4": "Dimaris",
    "EAO-4": "Fesapo",
    "EIO-4": "Fresison",
  };

  const form = `${statementType}-${figure}`;
  return names[form] || "Unknown";
};
