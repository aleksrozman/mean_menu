MEAN Menu :pencil:
=========

Using the [https://github.com/linnovate/mean](MEAN stack), this is a simple website to collect food orders from a list of users per gathering/event. Inspired by a stupid Excel spreadsheet, this app just serves as a foundation (i.e. it lacks some error handling) for collecting orders from a group.

See it in action: :point_right: http://mean-menu.herokuapp.com

Some restaurants dont have online ordering, or it is hard to collect orders from people who all have different schedules, so this app was created to grab a user order before a deadline and have it ready to be placed by some other person. There is a way to import a menu through JSON (has to be formatted correctly), or just to manually add items to the list by creating restaurants, gatherings, or users.

##How to use
- See [https://github.com/linnovate/mean](MEAN stack) for the basics
- Add users, then restaurants, and finally a gathering (using their respective URLs like /users)
- Invite your users to the main site, where they pick the gathering and then fill out an order
- When ready, visit the /orders part and get a list of what the users ordered for that gathering

###What it is
Simple

###What it is not
Actually places orders online

#Improvments
- [ ] Add customization outside of modify button
- [ ] User login rather than type name (AD hookup would be awesome)
- [ ] Eaiser UI (actually get affix to work right)
- [ ] Import via file rather than current hack (requires restarting server and manually updating import.json)
