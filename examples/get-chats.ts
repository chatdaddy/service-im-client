import dotenv from 'dotenv'
dotenv.config()

import { makeAccessTokenFactory, Scope } from '@chatdaddy/service-auth-client'
import { ChatsApi, Configuration } from '../src'

/**
 * Example
 * 
 * fetch chats with different filters
 */

const run = async() => {
	const { REFRESH_TOKEN, TEAM_ID } = process.env
	if(!REFRESH_TOKEN || !TEAM_ID) {
		throw new Error('refresh token or team id not specified')
	}

	const getAccessToken = makeAccessTokenFactory({
		request: {
			refreshToken: REFRESH_TOKEN,
			// get access to read chats
			scopes: [ Scope.ChatsAccessAll]
		}
	})

	const { token: accessToken } = await getAccessToken(TEAM_ID)
	
	const chatsApi = new ChatsApi(new Configuration({ accessToken }))

	const { data: { chats } } = await chatsApi.chatsGet(
		20 || undefined, // Count, Limit of chats to get eg. 10
		'2', // Page count eg. 2,
		true, // Filter archieved or unarchived chats eg. false
		false, //Filter only uread messages eg. true
		true, // Filter Chats that have pending messages eg. true
		'asd-3e44o', // Search for user Id mentioned in chat
		false, // Filter chats that have any unsolved notes
		true, // Filter chats where last message was from me
		['chatdaddy'], // Filter contacts who fall in either of these tags
		['1234@s.whatsapp.net'], // Filter these specific contact ids
		'example@chatdaddy.com', // Search string for contact name/phone number/email
		undefined, // Filter contacts assigned to the specified users
		undefined, // Filter contacts only belonging to this account
		'group', // Filter chat type "group" | "individual"
		true, // request to return count oof unread chats 
		{
			responseType: 'json'
		} // other AxiosRequestConfig options
	)

	console.log(`got ${chats.length} chats`)

	return chats

}

run()
