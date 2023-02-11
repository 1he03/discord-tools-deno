# Getting Started
Here is a minimal example to create and show modal:
```typescript
import { createModal } from "https://deno.land/x/discord_tools@v1.0.4/mod.ts";

const modal = createModal("title", "customId");
modal.createTextInput({label:"label", customId:"customId", style:"Short"});
modal.createTextInput({label:"label2", customId:"customId2", style:"Paragraph", placeholder:"Enter here:", required: true});
modal.show(bot, Interaction);
```
Here is create component and send message:
```typescript
import { createModal } from "https://deno.land/x/discord_tools@v1.0.4/mod.ts";

const component = createComponent();
component.createActionRow()
.createButton({style: "Primary", customId:"customId", "label": "label"})
.createButton({style: "Link", url:"https://www.google.com", "label": "label"});

component.sendMessage(bot, "channelId");
component.sendMessage(bot, "channelId",{content:"content"}); // or send with options
```
Also can edit message, send interaction or edit interaction:
```typescript
const component = createComponent();
component.createActionRow()
.createSelectMenu({customId:"customId", arrOptions:[{label:"label", value:"value"}]});

component.editMessage(bot, "channelId", "messageId");
component.editMessage(bot, "channelId", "messageId", {content:"content"});
```
```typescript
component.sendInteraction(bot, interaction);
component.sendInteraction(bot, interaction, {content:"content"});
```
```typescript
component.editInteraction(bot, interaction);
component.editInteraction(bot, interaction, {content:"content"});
```
Here can clear and add new component:
```typescript
const component = createComponent();
component.createActionRow()
.createButton({style: "Primary", customId:"customId", "label": "label"})
.createButton({style: "Link", url:"https://www.google.com", "label": "label"});

component.clear();

component.createActionRow()
.createSelectMenu({customId:"customId", arrOptions:[{label:"label", value:"value"}]});
```
