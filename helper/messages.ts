import {
    BigString,
    CreateMessage,
    Message,
    DiscordMessage,
    MessageComponentTypes,
    Bot,
    ButtonComponent,
    InputTextComponent,
    SelectMenuChannelsComponent,
    SelectMenuComponent,
    SelectMenuRolesComponent,
    SelectMenuUsersAndRolesComponent,
    SelectMenuUsersComponent,
    ChannelTypes,
    Attachment,
    EditMessage
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";
import { subTransformComponentToDiscordComponent } from "./responses.ts";

export async function subSendMessage(bot: Bot, channelId: BigString, options: SubCreateMessage): Promise<Message> {
    const result = await bot.rest.runMethod<DiscordMessage>(
      bot.rest,
      "POST",
      bot.constants.routes.CHANNEL_MESSAGES(channelId),
      {
        attachments: options.attachments?.map((attachment) => bot.transformers.reverse.attachment(bot, attachment)),
        content: options.content,
        nonce: options.nonce,
        tts: options.tts,
        embeds: options.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
        allowed_mentions: options.allowedMentions
          ? {
            parse: options.allowedMentions?.parse,
            roles: options.allowedMentions?.roles?.map((id) => id.toString()),
            users: options.allowedMentions?.users?.map((id) => id.toString()),
            replied_user: options.allowedMentions?.repliedUser,
          }
          : undefined,
        file: options.file,
        components: options.components?.map((component) => ({
          type: component.type,
          components: component.components.map((subComponent) => {
            if (subComponent.type === MessageComponentTypes.InputText) {
              return {
                type: subComponent.type,
                style: subComponent.style,
                custom_id: subComponent.customId,
                label: subComponent.label,
                placeholder: subComponent.placeholder,
                min_length: subComponent.minLength ?? subComponent.required === false ? 0 : subComponent.minLength,
                max_length: subComponent.maxLength,
              };
            }
  
            if (subComponent.type === MessageComponentTypes.SelectMenu) {
              return {
                type: subComponent.type,
                custom_id: subComponent.customId,
                placeholder: subComponent.placeholder,
                min_values: subComponent.minValues,
                max_values: subComponent.maxValues,
                disabled: "disabled" in subComponent ? subComponent.disabled : undefined,
                options: subComponent.options.map((option) => ({
                  label: option.label,
                  value: option.value,
                  description: option.description,
                  emoji: option.emoji
                    ? {
                      id: option.emoji.id?.toString(),
                      name: option.emoji.name,
                      animated: option.emoji.animated,
                    }
                    : undefined,
                  default: option.default,
                })),
              };
            }

            if (subComponent.type === MessageComponentTypes.SelectMenuChannels) {
                return {
                    type: subComponent.type,
                    custom_id: subComponent.customId,
                    placeholder: subComponent.placeholder,
                    min_values: subComponent.minValues,
                    max_values: subComponent.maxValues,
                    disabled: "disabled" in subComponent ? subComponent.disabled : undefined,
                    channel_types: subComponent.channelTypes,
                    default_values: subComponent.defaultValues?.map(value => ({id: value.id.toString(), type: value.type}))
                }
            }
  
            if (
              subComponent.type === MessageComponentTypes.SelectMenuRoles ||
              subComponent.type === MessageComponentTypes.SelectMenuUsers ||
              subComponent.type === MessageComponentTypes.SelectMenuUsersAndRoles
            ) {
              return {
                type: subComponent.type,
                custom_id: subComponent.customId,
                placeholder: subComponent.placeholder,
                min_values: subComponent.minValues,
                max_values: subComponent.maxValues,
                disabled: "disabled" in subComponent ? subComponent.disabled : undefined,
                default_values: subComponent.defaultValues?.map(value => ({id: value.id.toString(), type: value.type}))
              };
            }
  
            return {
              type: subComponent.type,
              custom_id: subComponent.customId,
              label: subComponent.label,
              style: subComponent.style,
              emoji: "emoji" in subComponent && subComponent.emoji
                ? {
                  id: subComponent.emoji.id?.toString(),
                  name: subComponent.emoji.name,
                  animated: subComponent.emoji.animated,
                }
                : undefined,
              url: "url" in subComponent ? subComponent.url : undefined,
              disabled: "disabled" in subComponent ? subComponent.disabled : undefined,
            };
          }),
        })),
        ...(options.messageReference?.messageId
          ? {
            message_reference: {
              message_id: options.messageReference.messageId.toString(),
              channel_id: options.messageReference.channelId?.toString(),
              guild_id: options.messageReference.guildId?.toString(),
              fail_if_not_exists: options.messageReference.failIfNotExists === true,
            },
          }
          : {}),
        sticker_ids: options.stickerIds?.map((sticker) => sticker.toString()),
      },
    );
  
    return bot.transformers.message(bot, result);
}

export async function subEditMessage(bot: Bot, channelId: BigString, messageId: BigString, options: SubEditMessage): Promise<Message> {
    const result = await bot.rest.runMethod<DiscordMessage>(
      bot.rest,
      "PATCH",
      bot.constants.routes.CHANNEL_MESSAGE(channelId, messageId),
      {
        content: options.content,
        embeds: options.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
        allowed_mentions: options.allowedMentions
          ? bot.transformers.reverse.allowedMentions(bot, options.allowedMentions)
          : undefined,
        attachments: options.attachments?.map((attachment) => bot.transformers.reverse.attachment(bot, attachment)),
        file: options.file,
        components: options.components?.map((component) => subTransformComponentToDiscordComponent(bot, component)),
      },
    );
    return bot.transformers.message(bot, result);
}


export interface SubSelectMenuChannelsComponent extends SelectMenuChannelsComponent {
    channelTypes?: ChannelTypes[]
    defaultValues?: {
        id: bigint
        type: "user" | "role" | "channel"
    }[]
}

export interface SubSelectMenuRolesComponent extends SelectMenuRolesComponent {
    defaultValues?: {
        id: bigint
        type: "user" | "role" | "channel"
    }[]
}

export interface SubSelectMenuUsersComponent extends SelectMenuUsersComponent {
    defaultValues?: {
        id: bigint
        type: "user" | "role" | "channel"
    }[]
}

export interface SubSelectMenuUsersAndRolesComponent extends SelectMenuUsersAndRolesComponent {
    defaultValues?: {
        id: bigint
        type: "user" | "role" | "channel"
    }[]
}

export interface SubActionRow {
  /** Action rows are a group of buttons. */
  type: MessageComponentTypes.ActionRow;
  /** The components in this row */
  components:
    | [
      | ButtonComponent
      | InputTextComponent
      | SelectMenuComponent
      | SubSelectMenuChannelsComponent
      | SubSelectMenuRolesComponent
      | SubSelectMenuUsersComponent
      | SubSelectMenuUsersAndRolesComponent
    ]
    | [ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent]
    | [ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent, ButtonComponent];
}

export type SubMessageComponents = SubActionRow[];

export interface SubCreateMessage extends CreateMessage {
    components?: SubMessageComponents
    attachments?: Attachment[]
}

export interface SubEditMessage extends EditMessage {
    components?: SubMessageComponents
}