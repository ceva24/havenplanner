import { type ReactNode } from "react";
import SettingsProvider from "@/client/hooks/use-settings";
import { createTestSettings } from "@/test/create-test-fixtures";

interface TestSettingsProviderProps {
    settings?: Settings;
    children: ReactNode;
}

const TestSettingsProvider = ({ settings, children }: TestSettingsProviderProps) => {
    return (
        <SettingsProvider settings={settings ?? createTestSettings()} setSettings={jest.fn()}>
            {children}
        </SettingsProvider>
    );
};

export { TestSettingsProvider };
