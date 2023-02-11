import {ActionRow, Interaction, Bot} from "https://deno.land/x/discordeno@18.0.1/mod.ts";
import {createActionRow} from "./action-row.ts";
import {createTextInput, TextInputOptions} from "./text-input.ts";


export function createModal(title: string, customId: string, components?: ActionRow | ActionRow[]): modalReturn {
    let modalComponent = [] as ActionRow[];
    if(components){
        if(Array.isArray(components)) modalComponent = components;
        else modalComponent = [components];
    }
    return {
        components: modalComponent, 
        title, 
        customId,
        createTextInput(options){
            this.components.push(createActionRow(createTextInput(options)))
            return this;
        },
        show(bot, interaction){
            return bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {data:{title: this.title, customId: this.customId, components:this.components}, type: 9});
        }
    }
}


export interface modalReturn{
    components: ActionRow[], 
    title: string, 
    customId: string,
    createTextInput(options: TextInputOptions): this,
    show(bot: Bot, interaction: Interaction): Promise<void>
}
