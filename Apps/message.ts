import {
    ActionRow,
    Interaction,
    Bot,
    ButtonComponent,
    BigString,
    CreateMessage,
    EditMessage,
    InteractionCallbackData,
    FileContent,
    Embed,
    AllowedMentions,
    ApplicationCommandOptionChoice,
    Attachment,
    MessageComponents
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";
import { sendDirectMessage } from "https://deno.land/x/discordeno@18.0.1/plugins/mod.ts";
import { Components } from "./action-row.ts";
import { createButton, ButtonOptions } from "./button.ts";
import { createSelectMenu, createSelectMenuChannels, createSelectMenuRoles, createSelectMenuUsers, createSelectMenuUsersAndRoles, SelectMenuChannelsOptions, SelectMenuOptions, SelectMenuRolesOptions, SelectMenuUsersOptions } from "./select-menu.ts";

export class MessageTools {
    private bot: Bot;
    public components: MessageComponents;
    public content?: string;
    public embeds?: Embed[];
    public file?: (FileContent | FileContent[]) & (FileContent | FileContent[] | null);
    public attachments?: Attachment[];
    public allowedMentions?: AllowedMentions;
    public customId?: string;
    public flags?: number;
    public title?: string;
    public tts?: boolean;
    public choices?: ApplicationCommandOptionChoice[];
    public messageReference?: { messageId?: BigString | undefined; channelId?: BigString | undefined; guildId?: BigString | undefined; failIfNotExists: boolean; };
    public nonce?: string | number;
    public stickerIds?: [bigint] | [bigint, bigint] | [bigint, bigint, bigint];
    constructor(bot: Bot, options?: CreateMessage & EditMessage & InteractionCallbackData) {
        if(!options) options = {};
        if(options.content) this.content = options.content;
        if(options.embeds) this.embeds = options.embeds;
        if(options.file) this.file = options.file;
        if(options.attachments) this.attachments = options.attachments;
        if(options.allowedMentions) this.allowedMentions = options.allowedMentions;
        if(options.customId) this.customId = options.customId;
        if(options.flags) this.flags = options.flags;
        if(options.title) this.title = options.title;
        if(options.tts) this.tts = options.tts;
        if(options.choices) this.choices = options.choices;
        if(options.messageReference) this.messageReference = options.messageReference;
        if(options.nonce) this.nonce = options.nonce;
        if(options.stickerIds) this.stickerIds = options.stickerIds;
        this.components = options.components || [];
        this.bot = bot;
    }
    setComponents(components?: MessageComponents) {
        this.components = components || [];
    }
    setContent(content?: string) {
        this.content = content;
    }
    setFile(file?: (FileContent | FileContent[]) & (FileContent | FileContent[] | null)) {
        this.file = file;
    }
    setEmbeds(embeds?: Embed[]) {
        this.embeds = embeds;
    }
    setAttachments(attachments?: Attachment[]) {
        this.attachments = attachments;
    }
    setAllowedMentions(allowedMentions?: AllowedMentions) {
        this.allowedMentions = allowedMentions;
    }
    setCustomId(customId?: string) {
        this.customId = customId;
    }
    setFlags(flags?: number) {
        this.flags = flags as 4;
    }
    setTitle(title?: string) {
        this.title = title;
    }
    setTts(tts?: boolean) {
        this.tts = tts;
    }
    setChoices(choices?: ApplicationCommandOptionChoice[]) {
        this.choices = choices;
    }
    setMessageReference(messageReference?: { messageId?: BigString | undefined; channelId?: BigString | undefined; guildId?: BigString | undefined; failIfNotExists: boolean; }) {
        this.messageReference = messageReference;
    }
    setNonce(nonce?: string | number) {
        this.nonce = nonce;
    }
    setStickerIds(stickerIds?: [bigint] | [bigint, bigint] | [bigint, bigint, bigint]) {
        this.stickerIds = stickerIds;
    }
    createActionRow(components?: Components) {
        const actionRow = {type: 1} as ActionRow;
        if(components)
            if(Array.isArray(components)) actionRow.components = components as [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent];
        else actionRow.components = [components];
        this.components.push(actionRow);
        const component = this.components;
        return{
            createButton(options: ButtonOptions) {
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
            },
            createSelectMenuChannels(options: SelectMenuChannelsOptions){
                component[component.length - 1].components = [createSelectMenuChannels(options)];
            },
            createSelectMenuRoles(options: SelectMenuRolesOptions){
                component[component.length - 1].components = [createSelectMenuRoles(options)];
            },
            createSelectMenuUsers(options: SelectMenuUsersOptions){
                component[component.length - 1].components = [createSelectMenuUsers(options)];
            },
            createSelectMenuUsersAndRoles(options: SelectMenuUsersOptions & SelectMenuRolesOptions){
                component[component.length - 1].components = [createSelectMenuUsersAndRoles(options)];
            }
        }
    }
    async sendDirectMessage(userId: BigString, options?: CreateMessage) {
        if(!options) options = {};
        if(!options.components && this.components.length > 0) options.components = this.components;
        if(!options.content && this.content) options.content = this.content;
        if(!options.embeds && this.embeds) options.embeds = this.embeds;
        if(!options.file && this.file) options.file = this.file;
        if(!options.allowedMentions && this.allowedMentions) options.allowedMentions = this.allowedMentions;
        if(!options.tts && this.tts) options.tts = this.tts;
        if(!options.messageReference && this.messageReference) options.messageReference = this.messageReference;
        if(!options.nonce && this.nonce) options.nonce = this.nonce;
        if(!options.stickerIds && this.stickerIds) options.stickerIds = this.stickerIds;
        return await sendDirectMessage(this.bot, userId, options);
    }
    async sendMessage(channelId: BigString, options?: CreateMessage) {
        if(!options) options = {};
        if(!options.components && this.components.length > 0) options.components = this.components;
        if(!options.content && this.content) options.content = this.content;
        if(!options.embeds && this.embeds) options.embeds = this.embeds;
        if(!options.file && this.file) options.file = this.file;
        if(!options.allowedMentions && this.allowedMentions) options.allowedMentions = this.allowedMentions;
        if(!options.tts && this.tts) options.tts = this.tts;
        if(!options.messageReference && this.messageReference) options.messageReference = this.messageReference;
        if(!options.nonce && this.nonce) options.nonce = this.nonce;
        if(!options.stickerIds && this.stickerIds) options.stickerIds = this.stickerIds;
        return await this.bot.helpers.sendMessage(channelId, options);
    }
    async editMessage(channelId: BigString, messageId: BigString, options?: EditMessage) {
        if(!options) options = {};
        if(!options.components && this.components.length > 0) options.components = this.components;
        if(!options.content && this.content) options.content = this.content;
        if(!options.embeds && this.embeds) options.embeds = this.embeds;
        if(!options.file && this.file) options.file = this.file;
        if(!options.allowedMentions && this.allowedMentions) options.allowedMentions = this.allowedMentions;
        if(!options.flags && this.flags) options.flags = this.flags as 4;
        if(!options.attachments && this.attachments) options.attachments = this.attachments;
        return await this.bot.helpers.editMessage(channelId, messageId, options);
    }
    async sendInteraction(interaction: Interaction, options?: InteractionCallbackData) {
        if(!options) options = {};
        if(!options.components && this.components.length > 0) options.components = this.components;
        if(!options.content && this.content) options.content = this.content;
        if(!options.embeds && this.embeds) options.embeds = this.embeds;
        if(!options.file && this.file) options.file = this.file;
        if(!options.allowedMentions && this.allowedMentions) options.allowedMentions = this.allowedMentions;
        if(!options.tts && this.tts) options.tts = this.tts;
        if(!options.choices && this.choices) options.choices = this.choices;
        if(!options.customId && this.customId) options.customId = this.customId;
        if(!options.flags && this.flags) options.flags = this.flags;
        if(!options.title && this.title) options.title = this.title;
        await this.bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {type: 4, data: options});
    }
    async editInteraction(interaction: Interaction, options?: InteractionCallbackData) {
        if(!options) options = {};
        if(!options.components && this.components.length > 0) options.components = this.components;
        if(!options.content && this.content) options.content = this.content;
        if(!options.embeds && this.embeds) options.embeds = this.embeds;
        if(!options.file && this.file) options.file = this.file;
        if(!options.allowedMentions && this.allowedMentions) options.allowedMentions = this.allowedMentions;
        if(!options.tts && this.tts) options.tts = this.tts;
        if(!options.choices && this.choices) options.choices = this.choices;
        if(!options.customId && this.customId) options.customId = this.customId;
        if(!options.flags && this.flags) options.flags = this.flags;
        if(!options.title && this.title) options.title = this.title;
        await this.bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {type: 7, data: options});
    }
    async deferredSendInteraction(interaction: Interaction, options?: InteractionCallbackData) {
        if(!options) options = {};
        if(!options.components && this.components.length > 0) options.components = this.components;
        if(!options.content && this.content) options.content = this.content;
        if(!options.embeds && this.embeds) options.embeds = this.embeds;
        if(!options.file && this.file) options.file = this.file;
        if(!options.allowedMentions && this.allowedMentions) options.allowedMentions = this.allowedMentions;
        if(!options.tts && this.tts) options.tts = this.tts;
        if(!options.choices && this.choices) options.choices = this.choices;
        if(!options.customId && this.customId) options.customId = this.customId;
        if(!options.flags && this.flags) options.flags = this.flags;
        if(!options.title && this.title) options.title = this.title;
        await this.bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {type: 5, data: options});
    }
    async deferredUpdateInteraction(interaction: Interaction, options?: InteractionCallbackData) {
        if(!options) options = {};
        if(!options.components && this.components.length > 0) options.components = this.components;
        if(!options.content && this.content) options.content = this.content;
        if(!options.embeds && this.embeds) options.embeds = this.embeds;
        if(!options.file && this.file) options.file = this.file;
        if(!options.allowedMentions && this.allowedMentions) options.allowedMentions = this.allowedMentions;
        if(!options.tts && this.tts) options.tts = this.tts;
        if(!options.choices && this.choices) options.choices = this.choices;
        if(!options.customId && this.customId) options.customId = this.customId;
        if(!options.flags && this.flags) options.flags = this.flags;
        if(!options.title && this.title) options.title = this.title;
        await this.bot.helpers.sendInteractionResponse(interaction.id, interaction.token, {type: 6, data: options});
    }
    async editOriginalInteraction(interaction: Interaction, options: InteractionCallbackData) {
        if(!options) options = {};
        if(!options.components && this.components.length > 0) options.components = this.components;
        if(!options.content && this.content) options.content = this.content;
        if(!options.embeds && this.embeds) options.embeds = this.embeds;
        if(!options.file && this.file) options.file = this.file;
        if(!options.allowedMentions && this.allowedMentions) options.allowedMentions = this.allowedMentions;
        if(!options.tts && this.tts) options.tts = this.tts;
        if(!options.choices && this.choices) options.choices = this.choices;
        if(!options.customId && this.customId) options.customId = this.customId;
        if(!options.flags && this.flags) options.flags = this.flags;
        if(!options.title && this.title) options.title = this.title;
        return await this.bot.helpers.editOriginalInteractionResponse(interaction.token, options);
    }
    clear() {
        this.components = [];
        this.content = undefined;
        this.embeds = undefined;
        this.file = undefined;
        this.attachments = undefined;
        this.allowedMentions = undefined;
        this.customId = undefined;
        this.flags = undefined;
        this.title = undefined;
        this.tts = undefined;
        this.choices = undefined;
        this.messageReference = undefined;
        this.nonce = undefined;
        this.stickerIds = undefined;
    }
}