
# CoolTech Credential Repositoy

A credential repository for Cooltech


## Installation

Install cooltech with npm

```bash
  npm install
```

 Start the Express Server:

```bash
  npm start
```

cd into the frontend directory and install npm:

```bash
  npm install
  
```
 Start React:

```bash
  npm start
```

## About

A demo project for a tech company that has expanded and needs an access controlled
repository to store credentials for various servers and websites.

Access to different functions is controlled by JWTs.

Users can have the below roles:

normal - can read the credential repository, and add new credentials in.  
manager - users can do the above plus update credentials.  
admin - can do the above plus they can assign and unassign users
from divisions and OUs. They can also change the user role of any user.  

There are a number or organisational units and divisions that a user can have access to. 
They can only make changes to the credentials that are part of their OU - division.
