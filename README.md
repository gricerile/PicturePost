Read Me for the code Structure

All pages are orgnized in their own folders inside the pages folder, except for home which is in the folder above pages. Each file will always communicate with any of the service files to communicate to external things such as the firebase, one exception is in the home page where it does use the post service but has some commnuication with the firebase server.

To run properly, 'ionic cordova emulate browser' must be run instead of 'ionic serve', this is because laptops and computers do not have web browsers with cordova in them, but mobile phone web browsers do. Cordova is used to access the camera and take a picture. 
'ionic serve'  will allow the app to have most of the functionality but not the camera access which is critical.