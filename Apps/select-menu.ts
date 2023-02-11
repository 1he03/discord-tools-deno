import {SelectMenuComponent, SelectOption} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

export function createSelectMenu(options: SelectMenuOptions) : SelectMenuComponent
{
    const selectMenu = {type: 3} as SelectMenuComponent;
    Object.assign(selectMenu, options);
    return selectMenu;
}

export interface SelectMenuOptions{
    customId: string,
    arrOptions: [SelectOption],
    disabled?: boolean,
    placeholder?: string,
    minValues?: number,
    maxValues?: number
}
