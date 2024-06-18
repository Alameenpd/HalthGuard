/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import 'server-only'

import {
  createAI,
  createStreamableUI,
  getMutableAIState,
  getAIState,
  createStreamableValue
} from 'ai/rsc'

import { BotCard, BotMessage } from '@/components/stocks'

import { nanoid, sleep } from '@/lib/utils'
import { saveChat } from '@/app/actions'
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'
import { Chat } from '../types'
import { auth } from '@/auth'
import { FlightStatus } from '@/components/flights/flight-status'
import { SelectSeats } from '@/components/flights/select-seats'
import { ListFlights } from '@/components/flights/list-flights'
import { BoardingPass } from '@/components/flights/boarding-pass'
import { PurchaseTickets } from '@/components/flights/purchase-ticket'
import { CheckIcon, SpinnerIcon } from '@/components/ui/icons'
import { format } from 'date-fns'
import { experimental_streamText } from 'ai'
import { google } from 'ai/google'
import { GoogleGenerativeAI } from '@google/generative-ai'
import { z } from 'zod'
import { ListHotels } from '@/components/hotels/list-hotels'
import { Destinations } from '@/components/flights/destinations'
import { Video } from '@/components/media/video'
import { rateLimit } from './ratelimit'

const genAI = new GoogleGenerativeAI(
  process.env.GOOGLE_GENERATIVE_AI_API_KEY || ''
)

async function describeImage(imageBase64) {
  'use server'

  await rateLimit()

  const aiState = getMutableAIState()
  const spinnerStream = createStreamableUI(null)
  const messageStream = createStreamableUI(null)
  const uiStream = createStreamableUI()

  uiStream.update(
    <BotCard>
      <Video isLoading />
    </BotCard>
  )
  ;(async () => {
    try {
      let text = ''

      if (imageBase64 === '') {
        await new Promise(resolve => setTimeout(resolve, 5000))

        text = `
      The books in this image are:

      1. The Little Prince by Antoine de Saint-Exupéry
      2. The Prophet by Kahlil Gibran
      3. Man's Search for Meaning by Viktor Frankl
      4. The Alchemist by Paulo Coelho
      5. The Kite Runner by Khaled Hosseini
      6. To Kill a Mockingbird by Harper Lee
      7. The Catcher in the Rye by J.D. Salinger
      8. The Great Gatsby by F. Scott Fitzgerald
      9. 1984 by George Orwell
      10. Animal Farm by George Orwell
      `
      } else {
        const imageData = imageBase64.split(',')[1]

        const model = genAI.getGenerativeModel({ model: 'gemini-pro-vision' })
        const prompt = 'List the books in this image.'
        const image = {
          inlineData: {
            data: imageData,
            mimeType: 'image/png'
          }
        }

        const result = await model.generateContent([prompt, image])
        text = result.response.text()
        console.log(text)
      }

      spinnerStream.done(null)
      messageStream.done(null)

      uiStream.done(
        <BotCard>
          <Video />
        </BotCard>
      )

      aiState.done({
        ...aiState.get(),
        interactions: [text]
      })
    } catch (e) {
      console.error(e)

      const error = new Error(
        'The AI got rate limited, please try again later.'
      )
      uiStream.error(error)
      spinnerStream.error(error)
      messageStream.error(error)
      aiState.done()
    }
  })()

  return {
    id: nanoid(),
    attachments: uiStream.value,
    spinner: spinnerStream.value,
    display: messageStream.value
  }
}

async function submitUserMessage(content) {
  'use server'

  await rateLimit()

  const aiState = getMutableAIState()

  aiState.update({
    ...aiState.get(),
    messages: [
      ...aiState.get().messages,
      {
        id: nanoid(),
        role: 'user',
        content: `${aiState.get().interactions.join('\n\n')}\n\n${content}`
      }
    ]
  })

  const history = aiState.get().messages.map(message => ({
    role: message.role,
    content: message.content
  }))

  const textStream = createStreamableValue('')
  const spinnerStream = createStreamableUI(<SpinnerMessage />)
  const messageStream = createStreamableUI(null)
  const uiStream = createStreamableUI()

  ;(async () => {
    try {
      const result = await experimental_streamText({
        model: google.generativeAI('models/gemini-1.5-flash'),
        temperature: 0,
        tools: {
          showFlights: {
            description:
              "List available flights in the UI. List 3 that match user's query.",
            parameters: z.object({
              departingCity: z.string(),
              arrivalCity: z.string(),
              departingAirport: z.string().describe('Departing airport code'),
              arrivalAirport: z.string().describe('Arrival airport code'),
              date: z
                .string()
                .describe(
                  "Date of the user's flight, example format: 6 April, 1998"
                )
            })
          },
          listDestinations: {
            description: 'List destinations to travel cities, max 5.',
            parameters: z.object({
              destinations: z.array(
                z
                  .string()
                  .describe(
                    'List of destination cities. Include rome as one of the cities.'
                  )
              )
            })
          },
          showSeatPicker: {
            description:
              'Show the UI to choose or change seat for the selected flight.',
            parameters: z.object({
              departingCity: z.string(),
              arrivalCity: z.string(),
              flightCode: z.string(),
              date: z.string()
            })
          },
          showHotels: {
            description: 'Show the UI to choose a hotel for the trip.',
            parameters: z.object({})
          },
          checkoutBooking: {
            description:
              'Show the UI to purchase/checkout a flight and hotel booking.',
            parameters: z.object({})
          },
          showBoardingPass: {
            description: "Show user's imaginary boarding pass.",
            parameters: z.object({
              airline: z.string(),
              arrival: z.string(),
              departure: z.string(),
              departureTime: z.string(),
              arrivalTime: z.string(),
              price: z.number(),
              seat: z.string(),
              date: z
                .string()
                .describe('Date of the flight, example format: 6 April, 1998'),
              gate: z.string()
            })
          },
          showFlightStatus: {
            description:
              'Get the current status of imaginary flight by flight number and date.',
            parameters: z.object({
              flightCode: z.string(),
              date: z.string(),
              departingCity: z.string(),
              departingAirport: z.string(),
              departingAirportCode: z.string(),
              departingTime: z.string(),
              arrivalCity: z.string(),
              arrivalAirport: z.string(),
              arrivalAirportCode: z.string(),
              arrivalTime: z.string()
            })
          }
        },
        system: `\
      You are a friendly assistant that helps the user with booking flights to destinations that are based on a list of books. You can you give travel recommendations based on the books, and will continue to help the user book a flight to their destination.
  
      The date today is ${format(new Date(), 'd LLLL, yyyy')}. 
      The user's current location is San Francisco, CA, so the departure city will be San Francisco and airport will be San Francisco International Airport (SFO). The user would like to book the flight out on May 12, 2024.

      List United Airlines flights only.
      
      Here's the flow: 
        1. List holiday destinations based on a collection of books.
        2. List flights to destination.
        3. Choose a flight.
        4. Choose a seat.
        5. Choose hotel
        6. Purchase booking.
        7. Show boarding pass.
      `,
        messages: [...history]
      })

      let textContent = ''
      spinnerStream.done(null)

      for await (const delta of result.fullStream) {
        const { type } = delta

        if (type === 'text-delta') {
          const { textDelta } = delta

          textContent += textDelta
          messageStream.update(<BotMessage content={textContent} />)

          aiState.update({
            ...aiState.get(),
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: textContent
              }
            ]
          })
        } else if (type === 'tool-call') {
          const { toolName, args } = delta

          if (toolName === 'listDestinations') {
            const { destinations } = args

            uiStream.update(
              <BotCard>
                <Destinations destinations={destinations} />
              </BotCard>
            )

            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content: textContent
                }
              ]
            })
          } else if (toolName === 'showFlights') {
            const {
              departingCity,
              arrivalCity,
              departingAirport,
              arrivalAirport,
              date
            } = args

            uiStream.update(
              <BotCard>
                <ListFlights
                  departingCity={departingCity}
                  arrivalCity={arrivalCity}
                  departingAirport={departingAirport}
                  arrivalAirport={arrivalAirport}
                  date={date}
                />
              </BotCard>
            )

            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content: textContent
                }
              ]
            })
          } else if (toolName === 'showSeatPicker') {
            const { departingCity, arrivalCity, flightCode, date } = args

            uiStream.update(
              <BotCard>
                <SelectSeats
                  departingCity={departingCity}
                  arrivalCity={arrivalCity}
                  flightCode={flightCode}
                  date={date}
                />
              </BotCard>
            )

            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content: textContent
                }
              ]
            })
          } else if (toolName === 'showHotels') {
            uiStream.update(
              <BotCard>
                <ListHotels />
              </BotCard>
            )

            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content: textContent
                }
              ]
            })
          } else if (toolName === 'checkoutBooking') {
            uiStream.update(
              <BotCard>
                <PurchaseTickets />
              </BotCard>
            )

            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content: textContent
                }
              ]
            })
          } else if (toolName === 'showBoardingPass') {
            const {
              airline,
              arrival,
              departure,
              departureTime,
              arrivalTime,
              price,
              seat,
              date,
              gate
            } = args

            uiStream.update(
              <BotCard>
                <BoardingPass
                  airline={airline}
                  arrival={arrival}
                  departure={departure}
                  departureTime={departureTime}
                  arrivalTime={arrivalTime}
                  price={price}
                  seat={seat}
                  date={date}
                  gate={gate}
                />
              </BotCard>
            )

            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content: textContent
                }
              ]
            })
          } else if (toolName === 'showFlightStatus') {
            const {
              flightCode,
              date,
              departingCity,
              departingAirport,
              departingAirportCode,
              departingTime,
              arrivalCity,
              arrivalAirport,
              arrivalAirportCode,
              arrivalTime
            } = args

            uiStream.update(
              <BotCard>
                <FlightStatus
                  flightCode={flightCode}
                  date={date}
                  departingCity={departingCity}
                  departingAirport={departingAirport}
                  departingAirportCode={departingAirportCode}
                  departingTime={departingTime}
                  arrivalCity={arrivalCity}
                  arrivalAirport={arrivalAirport}
                  arrivalAirportCode={arrivalAirportCode}
                  arrivalTime={arrivalTime}
                />
              </BotCard>
            )

            aiState.done({
              ...aiState.get(),
              interactions: [],
              messages: [
                ...aiState.get().messages,
                {
                  id: nanoid(),
                  role: 'assistant',
                  content: textContent
                }
              ]
            })
          }
        } else if (type === 'done') {
          messageStream.done(null)

          aiState.done({
            ...aiState.get(),
            interactions: [],
            messages: [
              ...aiState.get().messages,
              {
                id: nanoid(),
                role: 'assistant',
                content: textContent
              }
            ]
          })
        }
      }
    } catch (error) {
      console.error(error)

      uiStream.error(error)
      spinnerStream.error(error)
      messageStream.error(error)
      aiState.done()
    }
  })()

  return {
    id: nanoid(),
    attachments: uiStream.value,
    spinner: spinnerStream.value,
    display: messageStream.value
  }
}

export const {
  AIProvider,
  useAI,
  useAIState,
  useAIInput,
  AIInput,
  AIReset
} = createAI({
  initialInput: '',
  initialMessages: [],
  functions: {
    describeImage,
    submitUserMessage
  },
  experimental_streamText
})

export { createAIHandler } from 'ai/rsc'
