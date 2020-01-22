# scan_agent

## Introduction
- This is a QRCode Scanner that will submit scanning result to web-hooks of your choice.
- You can pre-define many different scan-actions so that scan results will be submitted to different web-hooks.

## Requirements
- The app using WebRTC protocol to invoke camera/webcam so the app must be run with https support
- Due to technical limit, it could not be run on iPhone or iPad.
- This an WPA app that could run on a Chrome browser on Windows or Android Phone

## Usage
- This app supports a pre-defined list of scanning actions, so you can quickly switch between actions.
- With the pre-defined actions, you can use the app for warehouse management, for events with multiple activities like entrance checkin, lunch checkin, exit-checkin..., or you can design games with many activity checking.  

### Step 1: Prepare
- First you need to prepare a **web-hook url**.
- The url must be https supported.
  Example: "https://192.168.x.y/path/?key=%scanValue%&activityName=checkin&key1=val1&key2=val2"
- The url is anything of your choice, the scanAgent will do replace **%scanValue%** with the ScanContent.
- The system behind the web-hook will receive the ScanContent as you want.  

### Step 2: Add a Scan Action

![alt text](https://raw.githubusercontent.com/vantt/vueScanAgent/master/document/images/screen_settings.png)
- Click on the SETTINGS tab (1)
- then Click on ADD new setting (2)

![alt text](https://raw.githubusercontent.com/vantt/vueScanAgent/master/document/images/screen_edit.png)
- **Activity Code**: the unique code for this scanning action.  
- **Label**: the human readable label for this scanning action. 
- **Link**: the web-hook's url will be submitted data to.

### Step 3: Add as many actions as you wish
- You can repeat the Step1,2 to add as many actions as you want
- At the Step1, you can choose to edit an action.
- You have to define the *same-configuration* for all scanning devices. This version does not support transferring configuration between scanning devices.
- Todo: you can implement the settings-transferring using https://js.ipfs.com

### Step 4: Scanning
![alt text](https://raw.githubusercontent.com/vantt/vueScanAgent/master/document/images/screen_dashboard.png)
- Click on the SCAN tab.
- All pre-defined scanning actions will be listed here.
- To start a SCANNING, just click on the appropriate SCAN button.
- All scanning content will be submitted to correspondent web-hook.
- You can review the scanning history through HISTORY tab.

## Project development setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

The final build artifacts will be put in folder **./dist**.
You can copy artifacts in this folder on to your deployment environment.

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Build & Deploy to github page
```
./deploy.sh
```

## Development References
### Customize Vuejs configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Deploy to github page
https://cli.vuejs.org/guide/deployment.html#github-pages

### Data transfer
Todo: configuration transferring between devices
- https://js.ipfs.com
- https://github.com/ipfs/js-ipfs
- https://www.vuemastery.com/courses/real-world-vue-js/vue-cli/

  Transfer data using Animated QRCode
- https://github.com/maxg0/displaysocket.js
