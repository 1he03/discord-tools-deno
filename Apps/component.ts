import {ActionRow,  Interaction, Bot, ButtonComponent, BigString, CreateMessage, EditMessage, InteractionCallbackData} from "https://deno.land/x/discordeno@18.0.1/mod.ts";
import {Components} from "./action-row.ts";
import {createButton, ButtonOptions} from "./button.ts";
import {createSelectMenu, SelectMenuOptions} from "./select-menu.ts";

export function createComponent(components?: ActionRow | ActionRow[]) {
    let setComponent = [] as ActionRow[];
    if(components){
        if(Array.isArray(components)) setComponent = components;
        else setComponent = [components];
    }
    return{
        components: setComponent,
        createActionRow(components?: Components){
            const actionRow = {type: 1} as ActionRow;
            if(components)
            if(Array.isArray(components)) actionRow.components = components as [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent];
            else actionRow.components = [components];
            this.components.push(actionRow);
            const component = this.components;
            return{
                createButton(options: ButtonOptions){
                    if(!component[component.length - 1].components) component[component.length - 1].components = [createButton(options)];
                    else component[component.length - 1].components.push(createButton(options));
                    return { 
                        createButton(options: ButtonOptions) { 
                            component[component.length - 1].components.push(createButton(options))
                            return this;
                        } 
                    }
                },
                createSelectMenu(options: SelectMenuOptions){
                    component[component.length - 1].components = [createSelectMenu(options)];
                }
            }
        },
        async sendMessage(bot: Bot, channelId: BigString, options?: CreateMessage){
            if(!options) options = {components: this.components};
            else options.components = this.components;
            return await bot.helpers.sendMessage(channelId, options);
        },
        async editMessage(bot: Bot, channelId: BigString, messageId: BigString, options?: EditMessage){
            if(!options) options = {components: this.components};
            else options.components = this.components;
            return await bot.helpers.editMessage(channelId, messageId, options);
        },
        async sendInteraction(bot: Bot, interaction: Interaction, options?: InteractionCallbackData){
            if(!options) options = {components: this.components};
            else options.components = this.components;
            await bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {type: 4, data: options});
        },
        async editInteraction(bot: Bot, interaction: Interaction, options?: InteractionCallbackData){
            if(!options) options = {components: this.components};
            else options.components = this.components;
            await bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {type: 7, data: options});
        },
        clear(){
            this.components = [];
        }
    }
}
