import React from 'react'

//Firebase
import database, {firebaseApp} from './database';

// Denne filen hjelper react router samt forskjellige sider
// med hvem som er innlogget


const auth = {
    user: null,
    authenticate(callback) {
      firebaseApp.auth().onAuthStateChanged(user => {
          roles.fetchRoles();
          if (user) {
            //TODO check if correct role
            this.user = user
            callback(user);
          } else {

            this.user = null
            callback();
          }
        })
    },

    isCorrectRole(path) {
      if (this.user === null) {return false}

      var rolesForUser = roles.roleMap.get(this.user.uid)

      if (rolesForUser === undefined) {return false}
  
      // Admin har tilgang til alt
      console.log(rolesForUser)
      if (rolesForUser.admin === true) {return true}
      switch(path) {
  
        case "/bandbooking":
            return rolesForUser.booking == true

        case "/previousbands":
            return rolesForUser.booking == true

        case "/banddatabase":
            return rolesForUser.booking == true

        case "/pricecalculator":
            return rolesForUser.booking == true

        case "/calendar":
            return rolesForUser.booking == true

        case "/concerts":
            return rolesForUser.technician == true || rolesForUser.booking == true

        case "/artists":
            return rolesForUser.booking == true

        case "/search":
            return rolesForUser.booking == true

        case "/manager":
            return rolesForUser.manager == true
            
        default:
            return false

      }
    }
  }
  
  
  // Tanken er user som key og roles som value
  const roles = {
      roleMap: new Map(),
      fetchRoles(callback) {
          database.ref('users').once("value", users => {
              users.forEach(user => {
                  console.log(user.val().displayName)
                  this.roleMap.set(user.key, user.val().roles)
              })
          }).then(() => {
              //callback()
          })
      }
  }

export {auth, roles}