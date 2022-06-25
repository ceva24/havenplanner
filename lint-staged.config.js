module.exports = {
    "*.(js|jsx|ts|tsx)": ["xo --fix", "prettier --write"],
    "*.(md|json|yml)": "prettier --write",
    "src/**/*.(ts|tsx)": () => "jest --onlyChanged --bail",
    "src/**/*.(ts|tsx|noop)": () => "tsc",
    "cypress/**/*": () => "tsc --project cypress/tsconfig.json",
};
