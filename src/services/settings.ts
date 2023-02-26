const itemGroupIsActive = (itemGroup: ItemGroup, appSettings: AppSettings) => {
    return appSettings.spoilerSettings.itemGroups.some((group) => group.id === itemGroup.id);
};

export { itemGroupIsActive };
