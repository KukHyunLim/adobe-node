import { newAdobeApp, AdobeAppName, AdobeAppEvent, AdobeApp, BroadcastMessage } from "../dist/index";

const sleep = (duration: number) => new Promise(resolve => { setTimeout(resolve, duration) });

const main = async () => {
  const option = {
    app: {
      name: AdobeAppName.InDesign,
      path: '/Applications/Adobe InDesign 2020/Adobe InDesign 2020.app/Contents/MacOS/Adobe InDesign 2020',
      adobeScriptsPath: './scripts/indesign'
    },
    host: 'localhost',
    port: 5000
  };
  const app: AdobeApp = newAdobeApp(option);

  app.on(AdobeAppEvent.OpenApp, () => {
    console.log(`The Adobe App is open`);
  })
    .on(AdobeAppEvent.NewDocument, () => {
      console.log(`The document has been created`);
    })
    .on(AdobeAppEvent.OpenDocument, (data: any) => {
      console.log(`The document has been opened`);
    })
    .on(AdobeAppEvent.CloseDocument, () => {
      console.log(`The document has been closed`);
    })
    .on(AdobeAppEvent.CloseApp, () => {
      console.log(`The Adobe App has been closed`);
    })
    .on("test_script", (message: BroadcastMessage) => {
      console.log(`Testing custom script - ${message}`);
    });


  app.init();

  await app.open();
  await app.openDocument('/test1.indd');
  await sleep(2000);
  await app.closeDocument('/test1.indd');
  await sleep(2000);
  await app.close();
  app.dispose();
}

main();