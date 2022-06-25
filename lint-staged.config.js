module.exports = {
    "*.(js|jsx|ts|tsx)": ["xo --fix", "prettier --write"],
    "*.(md|json|yml)": "prettier --write",
    "src/__tests__/**/*.(ts|tsx)": "jest -b",
    "src/**/*.(ts|tsx)": () => "tsc",
    "cypress/**/*": () => "tsc --project cypress/tsconfig.json",
};
