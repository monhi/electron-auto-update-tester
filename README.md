# electron-auto-update-tester

This repository tests the electron-builder package which has the auto-update feature. 

when we tag new releases, installed software will detect it and updates itself to the latest version.

# Testing

First download the repo by using git clone,

Then run `npm run build-win` or `npm run build-mac` based on your operating system.

The setup package will be in `./dist` folder.

Then you can install it manually. 

To deply the project to your GitHub repo, you need to run `npm run deploy-win` or `npm run deploy-mac`.

but as you could not deploy on my repo ( you do not have access to it), you are supposed to change the `url` of `pacakge.json` file to point to your repository.

```
  "repository": {
    "type" : "git",
    "url" : "https://github.com/monhi/electron-auto-update-tester.git"
  }  
```

Also after changing the `version` in package.json file and deploying, a new draft release will be in your reposity which you are supposed to publish it. 

# electron-builder.yml

This file keeps the key info to access to your repository.

As the file is in my .gitignore list you could not see the contents of it.

But you are supposed to create a file with following contents and fill the token based on your repository.

Following link gives you enough information to create a token for your repository.

<a href=""https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token#:~:text=been%20verified%20yet.-,In%20the%20upper%2Dright%20corner%20of%20any%20page%2C%20click%20your,Generate%20new%20token%20(classic)."">
How to create a token for github repository
</a>




```
appId: com.action-tester.ElectronAutoUpdate
publish:
  provider: github
  token: "github_pat_XXXXXXXXXXXXXXXXXXXXXX_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```