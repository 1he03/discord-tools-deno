import {
    SelectMenuComponent,
    SelectOption,
    MessageComponentTypes,
    SelectMenuChannelsComponent,
    SelectMenuRolesComponent,
    SelectMenuUsersComponent,
    SelectMenuUsersAndRolesComponent,
    ChannelTypes
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

export function createSelectMenu(options: SelectMenuOptions) : SelectMenuComponent {
    const selectMenu = {type: MessageComponentTypes.SelectMenu} as SelectMenuComponent;
    Object.assign(selectMenu, options);
    return selectMenu;
}

export function createSelectMenuChannels(options: SelectMenuChannelsOptions) : SelectMenuChannelsComponent {
    const selectMenu = {type: MessageComponentTypes.SelectMenuChannels } as SelectMenuChannelsComponent;
    Object.assign(selectMenu, options);
    return selectMenu;
}


export function createSelectMenuRoles(options: SelectMenuRolesOptions) : SelectMenuRolesComponent {
    const selectMenu = {type: MessageComponentTypes.SelectMenuRoles } as SelectMenuRolesComponent;
    Object.assign(selectMenu, options);
    return selectMenu;
}


export function createSelectMenuUsers(options: SelectMenuUsersOptions) : SelectMenuUsersComponent {
    const selectMenu = {type: MessageComponentTypes.SelectMenuUsers } as SelectMenuUsersComponent;
    Object.assign(selectMenu, options);
    return selectMenu;
}

export function createSelectMenuUsersAndRoles(options: SelectMenuUsersOptions & SelectMenuRolesOptions) : SelectMenuUsersAndRolesComponent {
    const selectMenu = {type: MessageComponentTypes.SelectMenuUsersAndRoles } as SelectMenuUsersAndRolesComponent;
    Object.assign(selectMenu, options);
    return selectMenu;
}

export interface SelectMenuOptions {
    options: SelectOption[]
    customId: string
    disabled?: boolean
    placeholder?: string
    minValues?: number
    maxValues?: number
}

export interface SelectMenuRolesOptions {
    customId: string
    disabled?: boolean
    placeholder?: string
    minValues?: number
    maxValues?: number
    defaultValues?: {
        id: bigint
        type: "user" | "role" | "channel"
    }[]
}

export interface SelectMenuUsersOptions extends SelectMenuRolesOptions {}


export interface SelectMenuChannelsOptions extends SelectMenuRolesOptions {
    channelTypes?: ChannelTypes[]
}
