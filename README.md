# SwiftStaff
An app to help restaurants and cafés find temporary workers.
Summer project for Designing for Real People course at Imperial College London.

## Getting Started

### Prerequisites

* [React Native CLI](https://reactnative.dev/docs/environment-setup) - React-native CLI environment.

### Installing

Once repository is cloned run:

```
npm install
```

Usually you have to run this twice. To get a list of peer dependencies that need to be installed. Install peer dependencies using:   

```
npm install --save [peer_dependency] 
```
To locate the Android SKD either add ANDROID_SDK to your path or create
 a file in SwiftStaff/Android and put in the path to the sdk dir, eg:

```
sdk.dir=/home/USER/Android/Sdk
```

You can run the code on an android device using:

```
npx react-native run-android
```

Make sure you have ADB setup from the react native setup.
You can also run on an IOS emulator on Mac.

## Running the tests

Use npm test
Tests in __tests\_\_ directory. 

## Deployment

This project isset up to continuously deploy with Travis-CI.
Currently, deploys to dropbox. [Link](https://www.youtube.com/watch?v=dQw4w9WgXcQ)

## Built With

* [React Native](https://reactnative.dev/) - Web framework used
* [Gradle](https://gradle.org/) - Android build system management
* [NPM](https://www.npmjs.com/) - Dependency management
* [React Navigation](https://reactnavigation.org/) - Navigation management for React native app
* [React Native Paper](https://callstack.github.io/react-native-paper/) - Open source React Native Components following Google [Material Design](https://material.io/design/)
* [Firebase](https://firebase.google.com/) - Notification management
* [Dropbox](https://www.dropbox.com) - To store deployed Android APKs


## Authors

* **Terence Hernandez**
* **Suchismata Paul**
* **Raghav Khanna**
* **Alex Cummins**

## Acknowledgments

* Terence is a pretty great dude
