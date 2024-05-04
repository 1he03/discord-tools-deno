# Getting Started
Here is a minimal example to create and show modal:
```typescript
import { createModal } from "https://deno.land/x/discord_tools@v1.1.1/mod.ts";

const modal = createModal("title", "customId");
modal.createTextInput({label:"label", customId:"customId", style:"Short"});
modal.createTextInput({label:"label2", customId:"customId2", style:"Paragraph", placeholder:"Enter here:", required: true});
modal.show(bot, Interaction);
```

MessageTools is easy tools for control send or edit message:

```typescript
import { MessageTools } from "https://deno.land/x/discord_tools@v1.1.1/mod.ts";

const messageTools = new MessageTools(bot);
messageTools.createActionRow()
    .createButton({style: "Primary", customId:"customId", "label": "label"})
    .createButton({style: "Link", url:"https://www.google.com", "label": "label"});
messageTools.createActionRow()
    .createSelectMenu({customId:"customId", options:[{label:"label", value:"value"}]});

// you can explore more feature for MessagesTools

await messageTools.sendMessage("channelId");
await messageTools.sendMessage("channelId",{content:"content"}); // or send with options

messageTools.clear(); // reset all options data

messageTools.createActionRow().createSelectMenuChannels({customId:"customId"});
messageTools.createActionRow().createSelectMenuRoles({customId:"customId"});
messageTools.createActionRow().createSelectMenuUsers({customId:"customId"});
messageTools.createActionRow().createSelectMenuUsersAndRoles({customId:"customId"});

await messageTools.setContent("Text");

await messageTools.editMessage("channelId", "messageId");
```
```typescript
await messageTools.sendMessage("channelId");
await messageTools.editMessage("channelId", "messageId");
await messageTools.sendDirectMessage("userId");
await messageTools.sendInteraction(interaction);
await messageTools.editInteraction(interaction);
```