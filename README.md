# crud_app


@ signup to the app 
   1) got to route "/register"
   2) enter below details in body to signup
       1) name: string
       2) email :string
       3) age:string
       4) password:string
       
       
@ signin to the app
   1) go to route "/login"
   2) enter below details in body to sign in 
        1) email
        2) password
   3) You will get two tokens access Token and refresh token  ===> these are used to get the data of users from route "/posts"
        1) access token (this will expires in 60s)
        2) refresh token (this will use to create access token)
        
        
@ seeing the details of the user
   1) go to route "/posts"
   2) give the access token as bearer then you will get the user data but you need to give the accesstoken before it's expired
   
  
@ generating access tokens using refresh tokens
   1) if the access token is expired you can generate new access token using refresh token
   2) go to route "/token"
   3) send refreshToken in body "token" as key 
   
   
@ you can change the password if you don't have idea 
   1) go to route "/forgetpassword"
   2) then send email of your account in body as email as key
   3) after that you will get a token you can reset the password by got to route "/reset"
   4) send below details in body
         1) email : enter your email
         2) password : enter new password
         3) token : enter the token you got from route forgetpassword
   here your password is updated you can check by loggin with new password
   
#thank you
