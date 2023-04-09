const itemShouldBeHidden = (item: Item, spoilerSettings: SpoilerSettings): boolean => {
    return !(
        Number.parseInt(item.group, 10) <= spoilerSettings.items.prosperity ||
        spoilerSettings.items.itemGroups.map((itemGroup: ItemGroup) => itemGroup.name).includes(item.group)
    );
};

export { itemShouldBeHidden };
