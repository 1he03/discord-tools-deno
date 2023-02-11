import {
    ActionRow,
    ButtonComponent,
    InputTextComponent,
    SelectMenuComponent,
    SelectMenuChannelsComponent,
    SelectMenuRolesComponent,
    SelectMenuUsersComponent,
    SelectMenuUsersAndRolesComponent
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";


export function createActionRow(components: Components) : ActionRow
{
    const actionRow = {type: 1} as ActionRow;
    if(Array.isArray(components)) actionRow.components = components as [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent];
    else actionRow.components = [components];
    return actionRow;
}

export type Components = 
| [
    | ButtonComponent
    | InputTextComponent
    | SelectMenuComponent
    | SelectMenuChannelsComponent
    | SelectMenuRolesComponent
    | SelectMenuUsersComponent
    | SelectMenuUsersAndRolesComponent
  ]
| [ButtonComponent, ButtonComponent]
| [ButtonComponent, ButtonComponent, ButtonComponent]
| [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent]
| [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent]
| ButtonComponent
| InputTextComponent
| SelectMenuComponent
| SelectMenuChannelsComponent
| SelectMenuRolesComponent
| SelectMenuUsersComponent
| SelectMenuUsersAndRolesComponent
| ButtonComponent[]
