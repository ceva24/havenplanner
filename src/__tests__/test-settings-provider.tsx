import { type ReactNode } from "react";
import SettingsProvider from "@/client/hooks/use-settings";
import { createTestSettings } from "@/test/create-test-fixtures";

interface TestSettingsProviderProperties {
    readonly settings?: Settings;
    readonly children: ReactNode;
}

const TestSettingsProvider = ({ settings, children }: TestSettingsProviderProperties) => {
    return (
        <SettingsProvider settings={settings ?? createTestSettings()} setSettings={jest.fn()}>
            {children}
        </SettingsProvider>
    );
};

export { TestSettingsProvider };
