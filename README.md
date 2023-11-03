# My Shop's Telegram Bot

## Description

This bot automates customer interaction for my personal shop on Telegram. It streamlines the shopping experience by providing instant access to prices, installation files, usage instructions, and customer support channels.

## Features

- **Price Forwarding**: Automatically forwards the latest prices from a designated chat to users.
- **Installation Files Forwarding**: Forwards the necessary app installation files for iOS, Android, Windows, and Mac from a specified conversation upon request.
- **App Store Navigation**: Offers clickable links for iOS users to navigate directly to the App Store for app downloads.
- **Instructional Guidance**: Sends images illustrating how to use the products directly to the user.
- **Navigation Buttons**: Quick access buttons for users to navigate to our official Telegram channel and support.
- **Subscription Verification**: Checks if a user has joined the official channel before they can access the bot's features.
- **User Start Alert**: Notifies the shop owner with the user's information when they start interacting with the bot.
- **Cross-Platform Support**: Seamlessly provides support and resources for users across all major platforms.

## Setup

1. Downlooad the JavaScript file.
2. Run `npm install` to install dependencies.
3. Create a `.env` file in the root directory with your `TELEGRAM_BOT_TOKEN`.
4. Configure the bot with the specific conversation IDs and message IDs for the price and installation files.
5. Start the bot using `node bot.js`.

## Usage

Upon starting a chat with the bot using the `/start` command, users will be greeted with an interactive experience, guided by a series of intuitive navigation buttons. Below is a detailed guide on using the bot's features:

- **Price Inquiry**: Users can request current pricing, and the bot will forward the latest price list from the specified channel.
- **App Installation**: Depending on the user's platform, the bot provides installation files for iOS, Android, Windows, and Mac.
  - iOS users will receive a clickable App Store link.
  - Android, Windows, and Mac users will get the respective installation files forwarded from the shop's private channel.
- **Usage Instructions**: The bot sends step-by-step image guides on how to use the products or services offered by the shop.
- **Navigation**: Users can utilize quick access buttons to move through various menus and services.
- **Subscription Check**: Before accessing certain features, the bot verifies if users are members of the official Telegram channel.
- **User Start Notification**: Alerts the shop owner with the user's details when they first interact with the bot.
- **Customer Support**: If users need assistance, they can use the navigation buttons to reach out for help or join the support channel.
- **Multiple Subscription Plans**: Users can browse through different subscription plans, including VIP and normal services, each offering various durations and benefits.
- **Easy Navigation to Main Menu**: At any point, users can navigate back to the main menu to explore other options.
- **Downloadable Content**: The bot provides a specific menu for users to access downloadable content, including apps and software.

To interact with the bot's features, users can click on the inline buttons provided in the chat. Each button is associated with a specific action or command that the bot will respond to accordingly.

For example, to receive installation files for an iOS device, the user would click on the corresponding button, and the bot will respond with the App Store link or forward the message containing the installation file from the designated chat.

## Contributing

If you'd like to contribute to the development of this bot, please fork the repository and submit a pull request with your proposed changes.

