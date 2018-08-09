# Welcome to Pinkbike Mobile.

This project was slapped together using React Native and Expo over the course of a few days out of sheer boredom. To run this project on your Android or iOS device, you will need: 
- Expo downloaded on your mobile device
- Yarn installed on your PC or Mac

After that, follow these instructions to run the app...

1. Clone this repository into your favourite directory.
2. First and foremost, the issue of React Native Typescript needs to be adressed. The Expo app will not compile unless React Native has access to a type declaration file for all of its dependencies. The only package that causes this issue is "react-native-rss-parser". So, what you need to do to run the app is: 
 - Navigate to node_modules/@types
 - Create a new folder called "react-native-rss-parser"
 - In said folder, create a file called `index.d.ts`
 - In said file, paste the following line and save it: `declare module "react-native-rss-parser";`
After that, typescript shouldn't yell at you when you go to compile the app.
3. In a new command window, navigate to the folder created when you cloned the app and run `yarn run buildAndStart`.
4. Wait for Expo to spit out a QR code in the command line. 
 - If you have an Android device, scan that using the Expo app on your phone. The app will open.
 - If you have an iOS device, look for the address where the app is being hosted. It will look something like "exp://192.168.XX.XXX:19000". Paste this address in a new Safari window. As long as you have the Expo app installed on your iOS device, it should prompt you to "Open with Expo". The app will open.

This app is a work in progress! If you want to make any changes, PRs are welcome!
For any questions about the app send me an email at samwarren4@gmail.com.
