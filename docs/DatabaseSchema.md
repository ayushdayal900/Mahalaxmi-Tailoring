# Database Schema Documentation

## 1. Users (`/models/User.js`)
-   `name` (String)
-   `email` (String, Unique)
-   `password` (String, Hashed)
-   `role` (Enum: 'customer', 'admin')
-   `measurements` (Embedded Object: { blouse: {...}, saree: {...} })

## 2. Products (`/models/Product.js`)
-   `name`, `description` (String)
-   `price` (Number)
-   `category` (String, Indexed)
-   `images` (Array of Strings)
-   `baseFabric` (String)

## 3. Orders (`/models/Order.js`)
-   `customer` (Ref: User, Indexed)
-   `orderItems` (Array: Product Ref, Quantity, Customizations)
-   `totalAmount` (Number)
-   `status` (Enum: 'pending', 'in_stitching', 'completed', etc., Indexed)
-   `paymentStatus` (Enum: 'paid', 'pending')
-   `transactionId` (String, Razorpay Order ID)

## 4. Payments (`/models/Payment.js`)
-   `order` (Ref: Order)
-   `razorpay_payment_id` (String)
-   `amount` (Number)
-   `status` (Enum: 'created', 'captured', 'failed')
