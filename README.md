# scan_agent

## Introduction
- This is a QRCode Scanner that will submit scanning result to web-hooks of your choice.
- You can pre-define many different scan-actions so that scan results will be submitted to different web-hooks.

## Requirements
- The app using WebRTC protocol to invoke camera/webcam so the app must be run with https support
- Due to technical limit, it could not be run on iPhone or iPad.
- This an WPA app that could run on a Chrome browser on Windows or Android Phone

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

## Usage

### Step1: Prepare
- First you need to prepare a **web-hook url**.
- The url must be https supported.
  Example: "https://192.168.x.y/path/?key=%scanValue%&activityName=checkin&key1=val1&key2=val2"
- The url is anything of your choice, the scanAgent will do replace **%scanValue%** with the ScanContent.
- The system behind the web-hook will receive the ScanContent as you want.  

### Step2: Add a Scan Action
![alt text](https://raw.githubusercontent.com/vantt/vueScanAgent/master/document/images/screen_settings.png)
![alt text](https://raw.githubusercontent.com/vantt/vueScanAgent/master/document/images/screen_edit.png)

## References
### Customize Vuejs configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### Deploy to github page
https://cli.vuejs.org/guide/deployment.html#github-pages


### Data transfer
Todo: configuration transferring between devices
- https://js.ipfs.com
- https://github.com/ipfs/js-ipfs
- https://www.vuemastery.com/courses/real-world-vue-js/vue-cli/
