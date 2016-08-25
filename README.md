# Convert Properties files to JSON
I was working on an app for a client in [NativeScript](https://www.nativescript.org/) that was a conversion from iOS. This application required 35 language translations in which they had all the translations in iOS' `.properties` files. I recieved both zipped and unzipped variations from them. In stead of converting these over to JSON's manually, I created this NODE task to do it for me.

### Assumption
This task is assume that your properties files will be named similarly to mine (`{{string}}_{{locale}}.properties` or `{{string}}_{{locale}}.properties.zip`). I will split the name of the file on `_` and grab the second part for the new file name which will be placed into a json folder.
FYI - I am also running the whole object through a sanitizer to remove double escaping that happens in the buffer stream.

### How to use
- Download the repo
- Run `npm install`
- Place your files into the `strings` folder
- run `node convert.js`

### Contributing
If you have ideas, feel free to get in touch and let me know. Or if you want to suggest something, feel free to create a pull request with your ideas.