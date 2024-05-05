import {
    BigString,
    InteractionResponse,
    Bot,
    DiscordInteractionResponse,
    Component,
    DiscordComponent,
    ChannelTypes,
    Attachment,
    InteractionCallbackData,
    DiscordInteractionCallbackData,
    Message,
    DiscordMessage,
    InteractionResponseTypes,
    DiscordAttachment
} from "https://deno.land/x/discordeno@18.0.1/mod.ts";

export async function sendInteractionResponse(bot: Bot, interactionId: BigString, token: string, options: SubInteractionResponse): Promise<void> {
    return await bot.rest.sendRequest<void>(bot.rest, {
      url: bot.constants.routes.INTERACTION_ID_TOKEN(interactionId, token),
      method: "POST",
      payload: bot.rest.createRequestBody(bot.rest, {
        method: "POST",
        body: {
          ...transformInteractionResponseToDiscordInteractionResponse(bot, options),
          file: options.data?.file,
        },
        // Remove authorization header
        headers: { Authorization: "" },
      }),
    });
}

export async function sendFollowupMessage(bot: Bot, token: string, options: SubInteractionResponse): Promise<Message> {
    const result = await bot.rest.sendRequest<DiscordMessage>(bot.rest, {
      url: bot.constants.routes.WEBHOOK(bot.applicationId, token),
      method: "POST",
      payload: bot.rest.createRequestBody(bot.rest, {
        method: "POST",
        body: {
          ...transformInteractionResponseToDiscordInteractionResponse(bot, options).data,
          file: options.data?.file,
        },
        // remove authorization header
        headers: { Authorization: "" },
      }),
    });
    
    return bot.transformers.message(bot, result);
}

export async function editFollowupMessage(bot: Bot, token: string, messageId: BigString, options: SubInteractionCallbackData): Promise<Message> {
    const result = await bot.rest.runMethod<DiscordMessage>(
        bot.rest,
        "PATCH",
        bot.constants.routes.WEBHOOK_MESSAGE(bot.applicationId, token, messageId),
        {
            messageId: messageId.toString(),
            ...transformInteractionResponseToDiscordInteractionResponse(bot, {
            type: InteractionResponseTypes.UpdateMessage,
            data: options,
            }).data,
            file: options.file,
        }
    );
    
    return bot.transformers.message(bot, result);
  }

export async function editOriginalInteractionResponse(bot: Bot, token: string, options: SubInteractionCallbackData): Promise<Message | undefined> {
    const result = await bot.rest.runMethod<DiscordMessage>(
        bot.rest,
        "PATCH",
        bot.constants.routes.INTERACTION_ORIGINAL_ID_TOKEN(bot.applicationId, token),
        {
        ...transformInteractionResponseToDiscordInteractionResponse(bot, {
            type: InteractionResponseTypes.UpdateMessage,
            data: options,
        }).data,
        file: options.file,
        },
    );
    
    return bot.transformers.message(bot, result);
}

export function transformInteractionResponseToDiscordInteractionResponse(bot: Bot, payload: SubInteractionResponse): SubDiscordInteractionResponse {
  // If no mentions are provided, force disable mentions
  if (payload.data && !payload.data?.allowedMentions) {
    payload.data.allowedMentions = { parse: [] };
  }

  return {
    type: payload.type,
    data: payload.data
      ? {
        tts: payload.data.tts,
        title: payload.data.title,
        flags: payload.data.flags,
        content: payload.data.content,
        choices: payload.data.choices?.map((choice) =>
          bot.transformers.reverse.applicationCommandOptionChoice(bot, choice)
        ),
        custom_id: payload.data.customId,
        embeds: payload.data.embeds?.map((embed) => bot.transformers.reverse.embed(bot, embed)),
        allowed_mentions: bot.transformers.reverse.allowedMentions(bot, payload.data.allowedMentions!),
        attachments: payload.data.attachments?.map((attachment) => bot.transformers.reverse.attachment(bot, attachment)),
        components: payload.data.components?.map((component) => transformComponentToDiscordComponent(bot, component)),
      }
      : undefined,
  };
}

export function transformComponentToDiscordComponent(bot: Bot, payload: SubComponent): SubDiscordComponent {
    return {
      type: payload.type,
      custom_id: payload.customId,
      disabled: payload.disabled,
      required: payload.required,
      style: payload.style,
      label: payload.label,
      emoji: payload.emoji
        ? {
            id: payload.emoji.id?.toString(),
            name: payload.emoji.name,
            animated: payload.emoji.animated,
        }
        : undefined,
      url: payload.url,
      options: payload.options?.map((option) => ({
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
        placeholder: payload.placeholder,
        min_values: payload.minValues,
        max_values: payload.maxValues,
        min_length: payload.minLength,
        max_length: payload.maxLength,
        value: payload.value,
        channel_types: payload.channelTypes,
        default_values: payload.defaultValues?.map(value => ({id: value.id.toString(), type: value.type})),
        components: payload.components?.map(component => transformComponentToDiscordComponent(bot, component)),
    };
}

export interface SubDiscordInteractionResponse extends DiscordInteractionResponse {
    data?: DiscordInteractionCallbackData & {
        attachments?: DiscordAttachment[]
    }
}

export interface SubInteractionCallbackData extends InteractionCallbackData {
    attachments?: Attachment[]
}

export interface SubInteractionResponse extends InteractionResponse {
    data?: SubInteractionCallbackData
}


export interface SubDiscordComponent extends DiscordComponent {
    channel_types?: ChannelTypes[]
    default_values?: {
        id: string
        type: "user" | "role" | "channel"
    }[]
}

export interface SubComponent extends Component {
    components?: SubComponent[]
    defaultValues?: {
        id: bigint
        type: "user" | "role" | "channel"
    }[]
    channelTypes?: ChannelTypes[]
}