import dotenv from 'dotenv'
dotenv.config()

import { makeAccessTokenFactory, Scope } from '@chatdaddy/service-auth-client'

import { ChatsApi, Configuration, MessageComposeStatusEnum, MessagesApi } from '../src'

/**
 * Example
 * 
 * Forwards a message sent in one chat to another
 */

const run = async() => {
	const { REFRESH_TOKEN, TEAM_ID } = process.env
	if(!REFRESH_TOKEN || !TEAM_ID) {
		throw new Error('refresh token or team id not specified')
	}

	const getAccessToken = makeAccessTokenFactory({
		request: {
			refreshToken: REFRESH_TOKEN,
			// get access to send messages, and read chats
			scopes: [Scope.MessagesSendToAll, Scope.ChatsAccessAll]
		}
	})

	const { token: accessToken } = await getAccessToken(TEAM_ID)
	
	const messagesApi = new MessagesApi(new Configuration({ accessToken }))
	const chatsApi = new ChatsApi(new Configuration({ accessToken }))
    
	// find the 2 most recent chats in the account
	const { data } = await chatsApi.chatsGet(2)
    
	const firstChat = data.chats[0]
	const secondChat = data.chats[0]
	// throw error if no chat available
	if(!firstChat || !secondChat) {
		throw new Error('no chats available')
	}

	console.log(`got first chat with name: "${firstChat.contact?.name || 'unknown'}" and ID: "${firstChat.id}"`)
	console.log(`got second chat with name: "${secondChat.contact?.name || 'unknown'}" and ID: "${secondChat.id}"`)
    
    
	// send a text message to the first chat
	const { data: messages } = await messagesApi.messagesPost('random', firstChat.id, {
		text: 'Hello from API',
		// mark it as a pending message
		// if you want to keep it as a "note", use the status "Note"
		status: MessageComposeStatusEnum.Pending,
		// will send the message in one minute (60_000ms in the future)
		timestamp: new Date(Date.now() + 60_000).toJSON()
	})
    
	const message = messages[0]
    
	// forward the message to the second chat
	const { data: forwardedMessages } = messagesApi.messagesForward(firstChat!.accountId!, firstChat!.id!, message.id, secondChat.id)

	console.log(`forwarded message with ID: "${forwardedMessages[0].id}" to "${forwardedMessages[0].chatId}" on ${forwardedMessages[0].timestamp}`)
}

run()
