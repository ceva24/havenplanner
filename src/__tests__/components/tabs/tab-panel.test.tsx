import { render, screen } from "@testing-library/react";
import { Button, Tab } from "@mui/material";
import TabPanel from "@/components/tabs/tab-panel";

describe("tab panel", () => {
    it("renders", () => {
        render(
            <>
                <Tab label="Profile" id="profile-tab" aria-controls="profile-tabpanel" />
                <TabPanel currentTabIndex={0} index={0} id="profile-tabpanel" ariaLabelledBy="profile-tab" />
            </>
        );

        const profileTab = screen.getByRole("tabpanel", { name: "Profile" });

        expect(profileTab).toBeInTheDocument();
    });

    it("renders the children when this tab panel's index matches the currently active tab index", () => {
        render(
            <TabPanel currentTabIndex={0} index={0} id="profile-tabpanel" ariaLabelledBy="profile-tab">
                <Button>Click me</Button>
            </TabPanel>
        );

        const children = screen.getByRole("button", { name: "Click me" });

        expect(children).toBeInTheDocument();
    });

    it("does not render the children when this tab panel's index does not match the currently active tab index", () => {
        render(
            <TabPanel currentTabIndex={0} index={1} id="profile-tabpanel" ariaLabelledBy="profile-tab">
                <Button>Click me</Button>
            </TabPanel>
        );

        const children = screen.queryByRole("button", { name: "Click me" });

        expect(children).not.toBeInTheDocument();
    });
});
