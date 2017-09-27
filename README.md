To the reviewer:
Once again thank you taking the time to review my project.
Last reviewer found (much to my embarassment) two errors.

1. After adding a new deck the edit field of 
   the view for adding a new deck left the 
   edit field disabled.   It was set to disabled
   so the keyboard would stay hidden on transition.
   This has been corrected.

2. After adding a new error my reducer did not correctly
   check if a collection of decks existed.  This caused the app
   to crash.  Both fixes can be found in github.

All changes are in version control on github.

One thing to Note: Expo 21 just came out and when I started 
up the simulator my app would not run. 
I have updated my package.json and app.json
to work with Expo 21.

In order to review my project please follow the instructions
below from the original read me file.

I look forward to your help and thank you for taking 
the time to do the review.
Bret

Getting started:

Thank you for taking the time to review my project.

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

I believe all aspects of the rubric have been covered but
I am looking forward to the pointing out of any ommissions
or errors and any improvements I could make.

Except for the quiz widget I tried to use state values as 
minimally as possible and rely on the redux store.

In order to help with the review, if you get my project running
on the deck list screen there is an option to:

  Add Demo Decks

This will help you get up and running quickly for review by adding workable decks.
Of course you can go and create a deck as specified by the rubric.

If you select a deck I have given you an option to delete them 
to ensure the application is robust.

New decks are sorted (case insensitive) so if you add a new deck it may be at the end of the list.

In my preparation for shipping phase I used the pngs from the lesson 5
preparing app for store app.json.  If a big deal I can create new pngs for you.
Unfortunately I am defintely not a designer, just a coder.

This project was a lot of fun to build and watching it run on 
  iPhone X simulator
  iPhone 6s Plus 
  and an old Samsung G386T was really cool.

I see easily if I add a CRUD backend app that I have a foundation for a fun
educational app.  But I am happy with project because it reenforced my
understanding of redux and made me very comfortable with the reducer and actions.
I am very thankful for that.

All stages of the project are in git and you can see the evolution of my work

To get started please clone the follow repository:
    git clone https://github.com/netlogic/UdaciCards.git
    cd Udacicards

Then add the npm packages needed 
execute the following command (it may take a minute to finish:

    yarn install

Then to run on your machine:
    yarn start

If fingers crossed no errors came up, please follow the prompts on the screen to run.


Final Notes:
The code for local notify was taken from Lesson 5, section, native functions.

// code example for notify 
build via udacity example in section 4 on native functions
https://github.com/udacity/reactnd-UdaciFitness-complete/tree/63778456f674355e40044c673f4b966ebd446866

BUT there was one issue:
For Lesson 5 section 4 (Local Notifications) the code checked in online on the udacity site is using 
scheduleLocalNotificationsAsync, for expo 20 it should be singular scheduleLocalNotificationAsync

If you got this far thank you for following!