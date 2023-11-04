// bot.js
/**
 * This script implements a Telegram Bot for managing a subscription service.
 * Upon joining the channel, users can interact with various services offered.
 */

const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();

// replace 'YOUR_TELEGRAM_BOT_TOKEN' with the token you get from @BotFather
const token = 'YOUR_TELEGRAM_BOT_TOKEN'; 
const bot = new TelegramBot(token, { polling: true });


// This object represents the main menu presented to the user in the Telegram bot interface.
// It defines a set of inline keyboard buttons that users can interact with.
const mainMenu = {
    // The 'reply_markup' property is used by the Telegram API to describe the options presented to the user.
    reply_markup: {
      // 'inline_keyboard' specifies that the buttons are inline with the chat (as opposed to a standard keyboard).
      inline_keyboard: [
        // This row contains buttons for 'Instructions' and 'App Download' which lead to different menus.
        [
          { text: 'Instructions', callback_data: 'menu1' }, // 'menu1' will trigger the bot to show the instructions menu.
          { text: 'App Download', callback_data: 'downloadMenu' } // 'downloadMenu' takes the user to the app download options.
        ],
        // A single button on this row for the 'Price List' that shows the latest prices to the user.
        [{ text: 'Price List', callback_data: 'Prices'}],
        // A button for users to initiate an 'Order' which triggers the order process within the bot.
        [{ text: 'Order', callback_data: 'orderService' }],
        // Final row of buttons linking to external resources: Support Account and Official Channel.
        [
          { text: 'Support', url: 'Support Account URL' }, // Direct URL to the support account.
          { text: 'Channel', url: 'Official Channel URL' } // Direct URL to the official Telegram channel.
        ],
      ],
    },
  };
  
  // Note: Replace 'Support Account URL' and 'Official Channel URL' with actual URLs before deployment.
  

// This object defines the keyboard layout for choosing the service type within the Telegram bot interface.
const serviceTypeKeyboard = {
    // 'reply_markup' property is used to add interactive components to messages.
    reply_markup: {
      // An 'inline_keyboard' indicates that buttons are displayed in-line with the message.
      inline_keyboard: [
        // This button allows the user to select a VIP service.
        [{ text: 'VIP Service', callback_data: 'vipService' }],  // When pressed, triggers the bot to show VIP service options.
        
        // This button is for selecting a normal service.
        [{ text: 'Normal Service', callback_data: 'normalService' }],  // Triggers the display of normal service options.
        
        // A return button that takes the user back to the main menu.
        [{ text: 'Return', callback_data: 'backToMain' }],  // When pressed, it triggers a callback to go back to the main menu.
      ],
    },
  };
  
  // Note: Each 'callback_data' value is a unique identifier used to handle button presses.
  

// This object constructs the inline keyboard for selecting the duration of the normal service.
const normalDurationKeyboard = {
    // The 'reply_markup' field is used to send interactive components in Telegram messages.
    reply_markup: {
      // 'inline_keyboard' specifies that the buttons are displayed within the message.
      inline_keyboard: [
        // This button allows the user to choose a one-month normal service.
        [{ text: 'One Month', callback_data: '1month' }],  // The 'callback_data' is used to handle the button press.
        
        // This button offers the user a two-month normal service option.
        [{ text: 'Two Months', callback_data: '2months' }],
        
        // This button provides the option for a three-month normal service.
        [{ text: 'Three Months', callback_data: '3months' }],
        
        // This button is for navigation: it allows the user to go back to the previous menu.
        [{ text: 'Back to Previous Menu ⬅️', callback_data: 'orderService' }],  // Triggers the bot to show the previous menu options.
      ],
    },
  };
  
  // The callback_data identifiers will correspond to handlers that define the bot's response when a user presses a button.
  

// This object creates the inline keyboard for choosing the duration of the VIP service.
const vipDurationKeyboard = {
    // The 'reply_markup' parameter enables the use of interactive elements in Telegram messages.
    reply_markup: {
      // 'inline_keyboard' means the buttons will be displayed within the message itself.
      inline_keyboard: [
        // This button allows users to select a one-month VIP service.
        [{ text: '⭐VIP⭐ One Month', callback_data: 'vip1month' }],  // 'callback_data' is the data received in callback queries when this button is pressed.
  
        // This button allows users to select a two-month VIP service.
        [{ text: '⭐VIP⭐ Two Months', callback_data: 'vip2months' }],
        
        // This button allows users to select a three-month VIP service.
        [{ text: '⭐VIP⭐ Three Months', callback_data: 'vip3months' }],
        
        // This button lets the user return to the previous menu.
        [{ text: 'Back to Previous Menu ⬅️', callback_data: 'orderService' }],  // Used for navigating back to the service type selection.
      ],
    },
  };
  
  // The callback_data provided for each button will be matched with the appropriate function to execute when the button is clicked.
  


// This object creates the inline keyboard for selecting plans for the normal one-month duration.
const normalOneMonthPlansKeyboard = {
    reply_markup: {
      inline_keyboard: [
        // Each row is an array representing a line of buttons in the Telegram interface.
        
        // This button represents the plan with 15 GB for two users.
        [{ text: '15 GB for 2 Users', callback_data: 'plan1' }],  // 'callback_data' is used to handle button presses.
        
        // This button represents the plan with 30 GB for two users.
        [{ text: '30 GB for 2 Users', callback_data: 'plan2' }],
        
        // This button represents the plan with 50 GB for two users.
        [{ text: '50 GB for 2 Users', callback_data: 'plan3' }],
        
        // This button represents the plan with 75 GB for two users.
        [{ text: '75 GB for 2 Users', callback_data: 'plan4' }],
        
        // This button lets the user go back to the previous menu, to select a different duration.
        [{ text: 'Back to Previous Menu ⬅️', callback_data: 'normalService' }],  // Takes the user back to the normal service duration options.
      ],
    },
  };
  
  // The callback_data values should match your switch case or if-else logic that handles these responses.
  

// Inline keyboard configuration for VIP one-month plan options.
const vipOneMonthPlansKeyboard = {
    reply_markup: {
      inline_keyboard: [
        // Row for 30 GB plan for two users under the VIP category.
        [{ text: '30 GB for 2 Users', callback_data: 'vipPlan1' }],
  
        // Row for 50 GB plan for two users under the VIP category.
        [{ text: '50 GB for 2 Users', callback_data: 'vipPlan2' }],
  
        // Row for 75 GB plan for two users under the VIP category.
        [{ text: '75 GB for 2 Users', callback_data: 'vipPlan3' }],
  
        // Row for the unlimited plan for two users under the VIP category.
        [{ text: 'Unlimited for 2 Users', callback_data: 'vipPlan4' }],
  
        // Row for going back to the previous menu, allowing users to select a different VIP service duration.
        [{ text: 'Back to Previous Menu ⬅️', callback_data: 'vipService' }],  // Navigates back to the VIP service duration selection.
      ],
    },
  };
  
  // Remember to handle the callback_data in your bot's logic to match the functionality described by each button.
  

// Inline keyboard configuration for normal two-month plan options.
const normalTwoMonthPlansKeyboard = {
    reply_markup: {
      inline_keyboard: [
        // Row for 30 GB plan for two users under the normal category for two months.
        [{ text: '30 GB for 2 Users', callback_data: 'plan5' }],
  
        // Row for 60 GB plan for two users under the normal category for two months.
        [{ text: '60 GB for 2 Users', callback_data: 'plan6' }],
  
        // Row for 100 GB plan for two users under the normal category for two months.
        [{ text: '100 GB for 2 Users', callback_data: 'plan7' }],
  
        // Row for 150 GB plan for two users under the normal category for two months.
        [{ text: '150 GB for 2 Users', callback_data: 'plan8' }],
  
        // Row for going back to the previous menu, allowing users to select a different normal service duration.
        [{ text: 'Back to Previous Menu ⬅️', callback_data: 'normalService' }], // Navigates back to the normal service duration selection.
      ],
    },
  };
  
  // Ensure that the callback_data is handled in the bot's logic to provide the correct service plan to the user.
  

// Inline keyboard configuration for VIP two-month plan options.
const vipTwoMonthPlansKeyboard = {
    reply_markup: {
      inline_keyboard: [
        // Row for 60 GB plan for two users under the VIP category for two months.
        [{ text: '60 GB for 2 Users - VIP', callback_data: 'vipPlan5' }],
  
        // Row for 100 GB plan for two users under the VIP category for two months.
        [{ text: '100 GB for 2 Users - VIP', callback_data: 'vipPlan6' }],
  
        // Row for 150 GB plan for two users under the VIP category for two months.
        [{ text: '150 GB for 2 Users - VIP', callback_data: 'vipPlan7' }],
  
        // Row for Unlimited plan for two users under the VIP category for two months.
        [{ text: 'Unlimited for 2 Users - VIP', callback_data: 'vipPlan8' }],
  
        // Row for going back to the previous menu, allowing users to select a different VIP service duration.
        [{ text: 'Back to Previous Menu ⬅️', callback_data: 'vipService' }], // Navigates back to the VIP service duration selection.
      ],
    },
  };
  
  // Ensure that the callback_data is correctly mapped in the bot's logic to handle user selections.
  

// Inline keyboard configuration for normal three-month plan options.
const normalThreeMonthPlansKeyboard = {
    reply_markup: {
      inline_keyboard: [
        // Row for 45 GB plan for two users under the normal category for three months.
        [{ text: '45 GB for 2 Users', callback_data: 'plan9' }],
  
        // Row for 90 GB plan for two users under the normal category for three months.
        [{ text: '90 GB for 2 Users', callback_data: 'plan10' }],
  
        // Row for 150 GB plan for two users under the normal category for three months.
        [{ text: '150 GB for 2 Users', callback_data: 'plan11' }],
  
        // Row for going back to the previous menu, allowing users to select a different normal service duration.
        [{ text: 'Back to Previous Menu ⬅️', callback_data: 'normalService' }], // Navigates back to the normal service duration selection.
      ],
    },
  };
  
  // It's important that the callback_data values correspond to the correct handling logic within the bot's code.
  

// Inline keyboard configuration for VIP three-month plan options.
const vipThreeMonthPlansKeyboard = {
    reply_markup: {
      inline_keyboard: [
        // Row for 90 GB plan for two users under the VIP category for three months.
        [{ text: '90 GB for 2 Users', callback_data: 'vipPlan9' }],
  
        // Row for 150 GB plan for two users under the VIP category for three months.
        [{ text: '150 GB for 2 Users', callback_data: 'vipPlan10' }],
  
        // Row for an Unlimited plan for two users under the VIP category for three months.
        [{ text: 'Unlimited for 2 Users', callback_data: 'vipPlan11' }],
  
        // Row for going back to the previous menu, allowing users to select a different VIP service duration.
        [{ text: 'Back to Previous Menu ⬅️', callback_data: 'vipService' }], // Navigates back to the VIP service duration selection.
      ],
    },
  };
  
  // Ensure that the callback_data values correspond to the appropriate handling functions within the bot's logic.
  

// Inline keyboard configuration for downloading apps for various platforms.
const downloadMenuKeyboard = {
    reply_markup: {
      inline_keyboard: [
        // Row for iPhone apps, which will trigger a sub-menu or action for iPhone apps.
        [{ text: 'iPhone Apps', callback_data: 'submenuButton3' }],
  
        // Row for Android apps, which will forward the user to the Android app selection or download.
        [{ text: 'Android App', callback_data: 'forwardSubMenu8' }],
  
        // Row for Windows applications, which will forward the user to the Windows app selection or download.
        [{ text: 'Windows App', callback_data: 'forwardSubMenu9' }],
  
        // Row for Mac applications, which will forward the user to the Mac app selection or download.
        [{ text: 'Mac App', callback_data: 'forwardSubMenu10' }],
  
        // Row for going back to the main menu.
        [{ text: 'Back to Main Menu ⬅️', callback_data: 'backToMain' }], // Navigates back to the main menu.
      ],
    },
  };
  
  // Ensure that the callback_data values are managed properly in the bot's command handling to present users with the correct responses or files.
  

// Inline keyboard configuration for the submenu offering direct links to iOS apps.
const submenuButton3Keyboard = {
    reply_markup: {
      inline_keyboard: [
        // Row for the First app with a direct link to the App Store listing.
        [{ text: 'App1', url: 'https://apps.apple.com/' }],
  
        // Row for the second app with a direct link to the App Store listing.
        [{ text: 'App2', url: 'https://apps.apple.com/' }],
  
        // Row for the third app with a direct link to the App Store listing.
        [{ text: 'App3', url: 'https://apps.apple.com/' }],
  
        // Row for navigating back to the previous download menu.
        [{ text: 'Back to Download Menu ⬅️', callback_data: 'backToDownloadMenu' }], // Navigates back to the download options menu.
      ],
    },
  };
  
  // Ensure the URLs are correct and the callback_data 'backToDownloadMenu' is handled in your bot code to take the user back to the previous menu.
  


// Inline keyboard configuration for Menu 1, providing options based on the user's operating system.
const menu1Keyboard = {
    reply_markup: {
      inline_keyboard: [
        // Row with buttons for iOS and Android
        [{ text: 'iPhone (iOS)', callback_data: 'menuIos' }, { text: 'Android', callback_data: 'forwardSubMenu1' }],
        
        // Row with buttons for Windows and Mac OS
        [{ text: 'Windows', callback_data: 'forwardSubMenu2' }, { text: 'Mac (Mac OS)', callback_data: 'forwardSubMenu3' }],
        
        // Row for navigating back to the previous main menu.
        [{ text: 'Back to Main Menu ⬅️', callback_data: 'backToMain' }], // Navigates back to the main menu.
      ],
    },
  };
  
  // Ensure the callback_data like 'menuIos', 'forwardSubMenu1', 'forwardSubMenu2', and 'forwardSubMenu3'
  // are correctly handled in your bot code to navigate to the respective submenus.
  

// Inline keyboard configuration for a submenu showing different application options for iOS.
const menuIosKeyboard = {
    reply_markup: {
      inline_keyboard: [
        // Row with a button for the app1.
        [{ text: 'App1', callback_data: 'forwardSubMenu4' }],
        
        // Row with a button for the app2.
        [{ text: 'App2', callback_data: 'forwardSubMenu5' }],
        
        // Row with a button for the app2.
        [{ text: 'App3', callback_data: 'forwardSubMenu6' }],
        
        // Row for navigating back to the previous menu (iOS/Android/Windows/Mac menu).
        [{ text: 'Back to Previous Menu ⬅️', callback_data: 'backToMenu1' }],
      ],
    },
  };
  
  // Make sure that callback_data such as 'forwardSubMenu4', 'forwardSubMenu5', and 'forwardSubMenu6' 
  // are handled in your bot's logic to forward users to the correct app or information.

  
// Function to check if a user is a member of our Telegram channel.
async function isUserMemberOfChannel(chatId, userId) {
    try {
      // Retrieve the user's membership status in the channel.
      const chatMember = await bot.getChatMember(chatId, userId);
      // Check if the user is a member of the channel.
      return chatMember.status === 'member' || chatMember.status === 'administrator' || chatMember.status === 'creator';
    } catch (error) {
      // If there's an error (usually user not found), return false.
      return false;
    }
  }
  
  // Event listener for any incoming messages.
  bot.on('message', async (msg) => {
    const chatId = msg.chat.id; // The chat ID from the incoming message.
    const userId = msg.from.id; // The user ID from the incoming message.
  
    // If the incoming message is the start command.
    if (msg.text === '/start') {
      const channelChatId = 'ChannelID'; // Channel ID to check for membership.
  
      // Prepare user information who pushed start to be sent to an admin chat.
      const userInfo = `
        User Info:
        - ID: ${msg.from.id}
        - First Name: ${msg.from.first_name}
        ${msg.from.last_name ? `- Last Name: ${msg.from.last_name}` : ""}
        ${msg.from.username ? `- Username: @${msg.from.username}` : ""}
        ${msg.from.language_code ? `- Language: ${msg.from.language_code}` : ""}
      `;
      const adminChatId = 'ID of admin for user info to be sent';  // Replace with your admin chat ID.
      // Send user info to the admin.
      bot.sendMessage(adminChatId, userInfo);
  
      // Check if the user is a member of the channel.
      if (await isUserMemberOfChannel(channelChatId, userId)) {
        // Send a welcome message if the user is already a member.
        bot.sendMessage(chatId, 'Welcome to the Bot 👋🎉', mainMenu);
      } else {
        // If not a member, send a message with a button to join the channel.
        const joinChannelButton = {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Join Our Channel 👇', // Translated text to join the channel
                  url: 'Channel URL', // Channel URL
                },
              ],
              [
                {
                  text: 'I Joined 😎', // Translated text to confirm membership
                  callback_data: 'checkMembership', // Data to be sent in callback query on button press
                },
              ],
            ],
          },
        };
  
        // Send a message prompting to join the channel.
        bot.sendMessage(
          chatId,
          'To use this bot, please join our channel.',
          joinChannelButton
        );
      }
    }
  });
  
  // Please make sure you define 'mainMenu' somewhere in your code to use it in the welcome message.
  

// Event listener for 'callback_query' events.
bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id; // Chat ID from the callback query's message.
    const messageId = query.message.message_id; // Message ID from the callback query's message.
    const data = query.data; // Data received in the callback query.
    const userId = query.from.id; // User ID who sent the callback query.
    const channelChatId = 'Channel ID'; // ID of the channel to check for membership.
  
    // Check if the callback data is to check membership.
    if (data === 'checkMembership') {
      // Check if the user is a member of the channel.
      if (await isUserMemberOfChannel(channelChatId, userId)) {
        // If a member, send a welcome message with the main menu.
        bot.sendMessage(chatId, 'Welcome to the Bot 👋🎉', mainMenu);
      } else {
        // If not a member, send an alert to the user.
        bot.answerCallbackQuery(query.id, 'You are not yet a member of the channel. 🧐 Please join the channel.');
        return; // Stop further execution if the user is not a member.
      }
    }
  
    // Additional code to handle other callback queries...
  });
  

  // Object to store various prompts for different stages in the bot's conversation flow
const headings = {
    // Prompt to choose the type of subscription service
    'orderService': 'Choose the type of subscription service 👇',
  
    // Prompts for VIP service subscription duration
    'vipService': 'Select the duration of the subscription 👇',
    
    // Prompt for normal service subscription duration
    'normalService': 'Select the duration of the subscription 👇',
  
    // Prompts to select the data volume for various VIP subscription durations
    'vip1month': 'Choose the data volume for the subscription 👇',
    'vip2months': 'Choose the data volume for the subscription 👇',
    'vip3months': 'Choose the data volume for the subscription 👇',
  
    // Prompts to select the data volume for various normal subscription durations
    '1month': 'Choose the data volume for the subscription 👇',
    '2months': 'Choose the data volume for the subscription 👇',
    '3months': 'Choose the data volume for the subscription 👇',
    
    // Prompt to select the operating system in the download menu
    'downloadMenu': 'Select the operating system 👇',
    
    // Prompt to select an application in a submenu
    'submenuButton3': 'Choose the application you want 👇',
    
    // Prompt to go back to the operating system selection in the download menu
    'backToDownloadMenu': 'Select the operating system 👇',
    
    // Prompt for selecting an operating system in menu 1
    'menu1': 'Choose the operating system you want 👇',
    
    // Prompt for returning to the main page to select a request
    'backToMain': 'Main Page - Choose the request you want 👇',
    
    // Prompt to navigate back to the operating system selection in menu 1
    'backToMenu1': 'Choose the operating system you want 👇',
    
    // Prompt to choose an application for iOS in the 'Meno' menu
    'meno': 'Choose the application you want 👇',
  };
  

  // Menu and Submenu Logic
switch (data) {
    // Cases for various subscription options or menu selections
    case 'orderService':
    case 'vipService':
    case 'normalService':
    case 'vip1month':
    case 'vip2months':
    case 'vip3months':
    case '1month':
    case '2months':
    case '3months':
    case 'downloadMenu':
    case 'submenuButton3':
    case 'backToDownloadMenu':
    case 'menu1':
    case 'backToMain':
    case 'backToMenu1':
    case 'meno':
      // Fetch the appropriate heading based on user selection
      const heading = headings[data];
      // Use a function to get the appropriate keyboard layout for the current selection
      const replyMarkup = getReplyMarkupForData(data);
      // Edit the message text with the new heading and attach the custom keyboard
      bot.editMessageText(heading, {
        chat_id: chatId,
        message_id: messageId,
        reply_markup: replyMarkup.reply_markup
      });
      break;
    // Cases for forwarding messages related to different submenu options
    case 'forwardSubMenu1':
      forwardMessages(chatId, '28', '29', '30', '31', '32', '33');
      break;
    case 'forwardSubMenu2':
      forwardMessages(chatId, '13', '15');
      break;
    case 'forwardSubMenu3':
      forwardMessages(chatId, '5', '14');
      break;
    case 'forwardSubMenu4':
      forwardMessages(chatId, '51', '52', '53', '54', '55', '56');
      break;
    case 'forwardSubMenu5':
      forwardMessages(chatId, '43', '44', '45', '46', '47', '48', '49');
      break;
    case 'forwardSubMenu6':
      forwardMessages(chatId, '36', '37', '38', '39', '40', '41');
      break;
    case 'Prices':
      forwardMessages(chatId, '59', '60');
      break;
    case 'forwardSubMenu8':
      forwardMessages(chatId, '63');
      break;
    case 'forwardSubMenu9':
      forwardMessages(chatId, '64');
      break;
    case 'forwardSubMenu10':
      forwardMessages(chatId, '65');
      break;
    // Cases for forwarding messages that show different plans
    case 'plan1':
      forwardMessages(chatId, '66');
      break;
    case 'plan2':
      forwardMessages(chatId, '67');
      break;
    case 'plan3':
      forwardMessages(chatId, '68');
      break;
    case 'plan4':
      forwardMessages(chatId, '69');
      break;
    case 'plan5':
      forwardMessages(chatId, '70');
      break;
    case 'plan6':
      forwardMessages(chatId, '71');
      break;
    case 'plan7':
      forwardMessages(chatId, '72');
      break;
    case 'plan8':
      forwardMessages(chatId, '73');
      break;
    case 'plan9':
      forwardMessages(chatId, '74');
      break;
    case 'plan10':
      forwardMessages(chatId, '75');
      break;
    case 'plan11':
      forwardMessages(chatId, '76');
      break;
    // Cases for forwarding messages that show different VIP plans
    case 'vipPlan1':
      forwardMessages(chatId, '78');
      break;
    case 'vipPlan2':
      forwardMessages(chatId, '79');
      break;
    case 'vipPlan3':
      forwardMessages(chatId, '80');
      break;
    case 'vipPlan4':
      forwardMessages(chatId, '81');
      break;
    case 'vipPlan5':
      forwardMessages(chatId, '82');
      break;
    case 'vipPlan6':
      forwardMessages(chatId, '83');
      break;
    case 'vipPlan7':
      forwardMessages(chatId, '84');
      break;
    case 'vipPlan8':
      forwardMessages(chatId, '85');
      break;
    case 'vipPlan9':
      forwardMessages(chatId, '86');
      break;
    case 'vipPlan10':
      forwardMessages(chatId, '87');
      break;
    case 'vipPlan11':
      forwardMessages(chatId, '88');
      break;
  }
  
    // Respond to the callback query which is usually a loading indication for the user after they press a button
bot.answerCallbackQuery(query.id);

// Define a function to get the reply markup (keyboard options) based on the user's selection (data)
function getReplyMarkupForData(data) {
    // Switch statement to determine which keyboard to show based on the context
    switch(data) {
        // Return keyboards for different services and durations based on the user's selection
        case 'orderService': return serviceTypeKeyboard; // Keyboard for selecting the type of order service
        case 'vipService': return vipDurationKeyboard; // Keyboard for selecting the duration of VIP service
        case 'normalService': return normalDurationKeyboard; // Keyboard for selecting the duration of normal service
        case 'vip1month': return vipOneMonthPlansKeyboard; // Keyboard for VIP plans for 1 month
        case 'vip2months': return vipTwoMonthPlansKeyboard; // Keyboard for VIP plans for 2 months
        case 'vip3months': return vipThreeMonthPlansKeyboard; // Keyboard for VIP plans for 3 months
        case '1month': return normalOneMonthPlansKeyboard; // Keyboard for normal plans for 1 month
        case '2months': return normalTwoMonthPlansKeyboard; // Keyboard for normal plans for 2 months
        case '3months': return normalThreeMonthPlansKeyboard; // Keyboard for normal plans for 3 months
        // Return the main menu keyboard for various plan selections
        case 'plan1': 
        case 'plan2': 
        case 'plan3': 
        case 'plan4': 
        case 'plan5': 
        case 'plan6': 
        case 'plan7': 
        case 'plan8': 
        case 'plan9': 
        case 'plan10': 
        case 'plan11': 
        case 'vipPlan1': 
        case 'vipPlan2': 
        case 'vipPlan3': 
        case 'vipPlan4': 
        case 'vipPlan5': 
        case 'vipPlan6': 
        case 'vipPlan7': 
        case 'vipPlan8': 
        case 'vipPlan9': 
        case 'vipPlan10': 
        case 'vipPlan11': 
            return mainMenu; // These selections all lead back to the main menu
        // Return specific keyboards based on user interaction
        case 'downloadMenu': return downloadMenuKeyboard; // Keyboard for the download menu options
        case 'submenuButton3': return submenuButton3Keyboard; // Keyboard for submenu button 3 options
        case 'backToDownloadMenu': return downloadMenuKeyboard; // Keyboard to navigate back to the download menu
        case 'menu1': return menu1Keyboard; // Keyboard for menu 1 options
        case 'backToMain': return mainMenu; // Keyboard to navigate back to the main menu
        case 'backToMenu1': return menu1Keyboard; // Keyboard to navigate back to menu 1
        case 'meno': return menoKeyboard; // Keyboard for the 'meno' option
    }
}


 // Define an asynchronous function to forward multiple messages
async function forwardMessages(chatId, ...messageIds) {
    // Define the original chat ID where the messages will be forwarded from
    const channelChatId = 'Chat ID';
  
    // Loop through each messageId provided in the spread parameter
    for (const messageId of messageIds) {
      // Use the bot to forward the message from the channelChatId to the chatId
      await bot.forwardMessage(chatId, channelChatId, messageId);
      // Wait for a second (1000 milliseconds) to avoid hitting the rate limit and sending the images in order
      await delay(1000);
    }
    // After forwarding all messages, send a message with the main menu to the user
    bot.sendMessage(chatId, 'Main Menu - Please select an option', mainMenu);
  }
  
  // Define a function that returns a promise that resolves after a given number of milliseconds
  // This function can be used to pause or delay execution
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
