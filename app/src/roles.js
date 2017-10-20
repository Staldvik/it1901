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
  
          case "/manager":
              return rolesForUser.manager == true

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