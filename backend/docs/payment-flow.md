sequenceDiagram
    autonumber
    actor User as 🛒 Customer
    participant FE as 💻 Frontend UI
    participant BE as ⚙️ Backend API
    participant DB as 🗄️ Database
    participant Stripe as 💳 Stripe API

    Note over User, FE: Step 1: Selection & Checkout Initiation
    User->>FE: Select items & click "Checkout"
    Note over FE: (Product 1, Product 2, Product 3, Product 4)
    FE->>BE: POST /api/checkout (Item IDs & Quantities)

    Note over BE, DB: Step 2: Server-Side Validation
    activate BE
    BE->>DB: Fetch official prices for the 4 items
    DB-->>BE: Return active pricing data
    Note over BE: Calculate secure total amount<br/>(Never trust frontend calculations!)

    Note over BE, Stripe: Step 3: Intent Creation
    BE->>Stripe: stripe.paymentIntents.create({amount, currency, metadata})
    Stripe-->>BE: Return PaymentIntent object (contains client_secret)
    BE->>DB: Save Order as "Pending" (linked to PaymentIntent ID)
    BE-->>FE: Send client_secret & Order ID
    deactivate BE

    Note over FE, Stripe: Step 4: Secure Payment Collection
    activate FE
    FE->>FE: Initialize Stripe Elements with client_secret
    FE->>User: Display secure credit card form
    User->>FE: Input card details & click "Pay Now"
    FE->>Stripe: confirmPayment() via Stripe.js (Bypasses your server)
    Stripe-->>FE: Return initial payment status
    FE->>User: Show "Processing / Success" UI placeholder
    deactivate FE

    Note over Stripe, BE: Step 5: Asynchronous Webhook Fulfillment
    Stripe->>BE: POST /api/webhooks (payment_intent.succeeded)
    activate BE
    BE->>Stripe: Verify webhook signature key
    BE->>DB: Update Order status to "Paid"
    BE->>DB: Deduct inventory / Trigger item provisioning
    BE-->>Stripe: 200 OK Response
    deactivate BE

    Note over FE, BE: Step 6: Final Confirmation Polling
    FE->>BE: GET /api/orders/{id}/status
    BE-->>FE: Return verified status ("Paid")
    FE->>User: Display final Order Success & Receipt Page

