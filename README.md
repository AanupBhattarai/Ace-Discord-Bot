# Ace-Discord-Bot

A discord bot created mainly for personal usages. This discord can be edited freely as per the personal usage of the person.

## Features

- Boosting Detection
- Message Edited and Deleted Logger
- Member Join and Leave Logger
- Complete Suggest System
- Complete Give Away System
- Complete Music System
- AFK System (W.I.P)
- Ticket System (W.I.P)
- Database (Mongo DB)

## Run Locally

Clone the project

```bash
  git-clone https://github.com/AanupBhattarai/Ace-Discord-Bot
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run test
```

Create a **config.json** inside the folder **Structures** before you run it.

#### Sample of config.json

```md
{
"prefix": "!",
"token": "Your discord bot token",
"Database": "Mongo DB connection string",
"weatherApi": "Openweathermap API",
"MemberRole": "Member Role ID of your guild ",
"GuildCacheID": "Guild ID",
"WelcomerID": "",
"WelcomerToken": "",
"LeftLoggerID": "",
"LeftLoggerToken": "",
"MessageLoggerURL": ""
}
```

WelcomerID, WelcomerToken, LeftLoggerID, LeftLoogerToken and MessageLoggerURL are WebHooks. To create and do this you can watch these YouTube Video

- https://www.youtube.com/watch?v=R9T6BKh8h6A
- https://www.youtube.com/watch?v=rVof0MMlIo0

**Note : All of the commands are either slash commands or context menu interaction!**
