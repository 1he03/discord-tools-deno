import {ButtonComponent} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

export function createButton(options: ButtonOptions): ButtonComponent {
    const button = {type: 2} as ButtonComponent;
    if(options.label) button.label = options.label;
    if(options.disabled) button.disabled = options.disabled;
    if(options.emoji) button.emoji = options.emoji;
    if(options.style == "Link"){
        button.style = 5;
        button.url = options.url;
    }
    else{
        button.style = options.style == "Primary" ? 1 : options.style == "Secondary" ? 2 : options.style == "Success" ? 3 : 4;
        button.customId = options.customId; 
    }
    return button;
}


export interface ButtonOptions{
    customId?: string, 
    url?: string, 
    label?: string, 
    emoji?: {id?: bigint, name?: string, animated?: boolean}, 
    style: "Primary" | "Secondary" | "Success" | "Danger" | "Link",
    disabled?: boolean
}

