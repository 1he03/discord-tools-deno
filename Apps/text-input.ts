import {InputTextComponent} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

export function createTextInput(options: TextInputOptions) : InputTextComponent
{
    if(!options.style) options.style = "Short";
    const input = {type: 4} as InputTextComponent;
    input.customId = options.customId;
    input.label = options.label;
    input.style = options.style == "Paragraph"? 2 : 1;
    if(options.maxLength) input.maxLength = options.maxLength;
    if(options.minLength) input.minLength = options.minLength;
    if(options.placeholder) input.placeholder = options.placeholder;
    if(options.required) input.required = options.required;
    else input.required = false;
    if(options.value) input.value = options.value;
    return input;
}

export interface TextInputOptions{
    customId: string,
    label: string, 
    maxLength?: number, 
    minLength?: number, 
    value?: string, 
    placeholder?: string,
    style: "Short" | "Paragraph", 
    required?: boolean
}
