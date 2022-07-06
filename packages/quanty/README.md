<!-- markdownlint-disable -->
<div align="center">

# @Quanty/framework - The best bot framework.

</div>
<!-- markdownlint-restore -->

## About

This framework is a powerful tool for initializing your Discord Bot.

## Features

- Written in typescript with the help of decorators
- Command/Feature handlers
- Powerful command configurations

### Extra Features

- Music Manager for your private servers

### Future Features

- Advanced plugin system for slash commands
- Minimal set-up, easy plug and play
- Configurable preset commands (help, plugins, .etc)

## Installation

**Node.js 16.6.0 or newer is required.**

`@quanty/framework` needs only 1 dependency!

Install the package using the following command or use a package manager of your choice.

```sh
yarn add @quanty/framework discord.js
```

---

### Example usage

```typescript
import QuantyClient from '@quanty/framework'

export const client: QuantyClient = new QuantyClient(
  {
    token: 'INSERT_TOKEN_HERE',
    commandDir: 'commands/',
    eventDir: 'events/',
    owner: 'INSERT_OWNER_ID_HERE',
    baseDir: 'test/',
    outDir: 'dist/',
    defaults: true,
    logLevel: 'DEBUG',
    devGuilds: '871581301713555526',
  },
  {
    intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_PRESENCES'],
    presence: {
      activities: [
        {
          name: 'quanty.xyz',
          type: 'PLAYING',
          url: 'https://www.quanty.xyz/',
        },
      ],
    },
  },
)

void client.start()
```

More details and information about how to use this framework will come later in documentation.

## Links

If you need help with anything feel free to join the Quantum Realm and ask me personally or join some helpful discords below.

- [Quanty Github](https://github.com/slashtp3/quanty)
- [Discord.js Docs](https://discord.js.org/#/docs)
- [Discord.js Discord server](https://discord.gg/djs)

### Contributing

Before creating an issue, just double check if it already isn't reported/solved. Other than that, if you'd like to submit a PR, go for it

If you also find an issue, please feel free to open an issue.
