import {
  CardElement,
  Elements,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

import { useCreateSubscriptionMutation } from '../graphql/generated/schema'
import { useAuth } from '../hooks'
import { BaseLayout } from '../layouts'
import { CurrentCustomer } from '../utils/types'

const stripePromise = loadStripe(
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#ffffff',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#e9e9e9',
      },
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a',
    },
  },
}

const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState<string>('')

  const { user } = useAuth()

  const router = useRouter()

  const { cost, currency } = router.query

  const [customer, setCustomer] = useState<CurrentCustomer | null | undefined>(
    null,
  )

  // useGetCustomerQuery({
  //   onCompleted: ({ me }) => setCustomer(me?.customer),
  // })

  const [createSubscription] = useCreateSubscriptionMutation({
    variables: {
      newSubscriptionParams: {
        userId: user?.id || '',
        priceId: 'price_1LA16RJhkOELoRhmyHcona4g',
        guildId: '871581301713555526',
      },
    },
    onCompleted: data => {
      console.log('COMPLETED', data)
      setClientSecret(data.createSubscription.clientSecret)
    },
    onError: error => {
      console.log('ERROR', error)
    },
  })

  useEffect(() => {
    createSubscription()
  }, [])

  return (
    <BaseLayout>
      <div className="mx-auto max-w-6xl">
        <Elements stripe={stripePromise}>
          <PaymentForm clientSecret={clientSecret} />
        </Elements>
      </div>
    </BaseLayout>
  )
}

const CardSection = () => {
  return (
    <label>
      Card Details
      <CardElement options={CARD_ELEMENT_OPTIONS} />
    </label>
  )
}

const PaymentForm = ({ clientSecret }: { clientSecret: string }) => {
  const stripe = useStripe()
  const elements = useElements()

  const { user } = useAuth()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as never,
        billing_details: {
          email: user?.email ?? '',
        },
        metadata: {
          discordId: user?.id as never,
        },
      },
      receipt_email: user?.email ?? '',
    })

    if (result.error) {
      // Show error to your customer (for example, insufficient funds)
      console.log(result.error.message)
    } else {
      // The payment has been processed!
      if (result.paymentIntent.status === 'succeeded') {
        // Show a success message to your customer
        // There's a risk of the customer closing the window before callback
        // execution. Set up a webhook or plugin to listen for the
        // payment_intent.succeeded event that handles any business critical
        // post-payment actions.
      }
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <CardSection />
      <button disabled={!stripe}>Confirm order</button>
    </form>
  )
}

export default PaymentPage
