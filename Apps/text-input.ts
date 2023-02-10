import {InputTextComponent} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

export function createTextInput(options: TextInputOptions) : InputTextComponent
{
    if(!options.style) options.style = "Short";
    const input = {type: 4} as InputTextComponent;
    input.customId = options.customId;
    input.label = options.label;
    input.maxLength = options.maxLength;
    input.minLength = options.minLength;
    input.placeholder = options.placeholder;
    input.required = options.required;
    input.value = options.value;
    input.style = options.style == "Paragraph"? 2 : 1
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