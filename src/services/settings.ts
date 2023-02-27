const itemGroupIsActive = (itemGroup: ItemGroup, appSettings: AppSettings) => {
    return appSettings.spoilerSettings.items.itemGroups.some((group) => group.id === itemGroup.id);
};

export { itemGroupIsActive };
