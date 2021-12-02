# ChatDaddy Instant Messaging Service Client

Typescript client for interacting with ChatDaddy IM Client. 
You can use this client to send & receive messages, update chats, create groups & everything you expect from an instant messaging API.

## API Docs

You can find the full API docs for the service [here](https://chatdaddy.stoplight.io/docs/openapi/YXBpOjMwMzA3ODYy-instant-messaging-service)

## Installing the Client

Using NPM:
```
npm i git+https://github.com/chatdaddy/service-im-client
```

Using yarn:
```
yarn add git+https://github.com/chatdaddy/service-im-client
```

You can then import in your code like:
``` ts
import { MessagesApi } from '@chatdaddy/service-im-client'
```

## Examples

The library has a list of examples of how to use this client, you can find them [here](/examples).

### Running the examples

1. Clone this repository
2. Run `yarn` or `npm i` (whichever package you prefer)
3. Create a `.env` file in the repository folder with the following params:
	```
	REFRESH_TOKEN=<chatdaddy refresh token>
	TEAM_ID=<chatdaddy team id>
	```

	You can get this information from the [API page](https://app.chatdaddy.tech/settings/api) on ChatDaddy.
	More info on authentication & the auth client [here](https://github.com/chatdaddy/service-auth-client).
3. Run example scripts using `yarn ts-node examples/{example-script}`
	- Eg. `yarn ts-node examples/send-message`