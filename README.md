# ProducTVD
## By Ritik Sinha and Mihir Mirchandani
---

## Inspiration
As college students who often struggle to be productive, but find productivity apps to be too strict, we decided on a productivity app that's more accommodating. Furthermore, both of us are taking a data science class at Berkeley, where we learned about total variation distance (TVD), which allows for distributions to be easily compared. We thought that using total variation distance to calculate productivity would be better than traditional methods because it could allow users' productivity to be ranked based on the proportion of the day they spend on certain activities, rather than the absolute time.

## What it does
This app asks users to enter the activities and the amount of time they plan to spend on them each day. These are their goals. Throughout the day, the user can input how much time they've spent on the activities they listed so far. From there, our app calculates the proportion of time they've spent on each activity compared to the proportion they had hoped for when they entered in their goals. This utilizes total variation distance. Finally, this information is relayed to the user in a tab, where they can keep track of how they're doing, and also see their total points (a rewards system for users, where they get more points with a lower total variation distance). Each day this repeats, and hopefully, the user will be able to better allocate their time during the day!

## How we built it
We used React for the frontend and Flask for the backend.

##Challenges we ran into
Because both of us don't have a lot of experience building full-stack web apps, it was a bit difficult to connect our backend and frontend seamlessly.

## Accomplishments that we're proud of
We're proud that we have a functional demo that has our main features working!

## What we learned
We learned a lot more about full-stack development, and also learned the importance of time management!

## What's next for ProducTVD
- Better design
- Ability to spend points on in-app items
- Stopwatch ability on the app
- Using more metrics in calculating productivity

## Built With
1. Flask
2. React.js
3. JSON
