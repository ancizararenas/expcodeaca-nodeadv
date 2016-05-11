# MODULE 3 - TASK BREAKDOWN

Last week we began trying to correctly structure our application and began to introduce
our own logger middleware, which we will begin to use in our application, and
started to separate our core server logic from our application logic. The tasks
outlined in this session will help continue in these efforts  

### TASK ONE - 5 mins

For this simple task we want to use our newly customised middleware logger that we created
and start to log the following into our process.stdout stream

1. We want to log when we are about to connect to our DB

2. We want to log when server has started and print out which port we
   are listening on.

### TASK TWO - 10 mins

For this second task, still simple with just a little more complexity, we want to improve upon
the logging from the previous task by carrying out the following tasks :

1. We want to log when we successfully make a connection to the DB on application startup

2. We want to log when we encounter an error connecting to our DB when starting our server

### TASK THREE - 15 mins

For this task, we want to be a bit more protective of our application. We want to configure our server in such a way that will allow us to not allow the server to start if a DB connection error fails.

### TASK FOUR - 15 mins

For this task, we want to be a bit more protective of our application. We want to configure our server in such a way that will allow us to not allow the server to start if a DB connection error fails.

### HOMEWORK EXPLANATION

In continuation to our work to date in our attempt of beginning to configure our application to be correctly structured and modularized, now that we have configured our application to use express correctly, we want to begging to create our routes.

Your homework is to attempt to inject our application routes into our server, by injecting the file we created ./lib/routes.js and implement logging throughout our routes so that we can trace in our logs when requests are made to those endpoints.

Each of you must create a pull request against the dev branch by saving your changes and adding all of your files to the git VCS by using the following commands :

    git add .   // add and mark all modified/newly created files to be be tracked by git

    git status    // make sure all your modifications made are present

    git checkout -b <yourname>-modulethree origin/dev   // this will pull all your local changes to your new feature branch    

    git commit -a -m "<yourname> - <commit message goes here>"    // should see something like  3 files changed, 56 insertions(+), 11 deletions(-)

    git push origin <your branch name> e.g : git push origin anci-modulethree   // should see something like  * [new branch]      anci-modulethree -> anci-modulethree


    go to https://github.com/ancizararenas/expcodeaca-nodeadv

    you should see your branch in the recently pushed branches section like below :

    ![image](courseMaterial/img/gitNewBranch.png?raw=true "Git New Branch Image")
