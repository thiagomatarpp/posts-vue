import {defineStore} from "pinia";
import {NewUser} from "../users.ts";

export const  useUsers = defineStore("users", {
    actions: {
        createUser(newUser: NewUser) {
            const body = JSON.stringify(newUser)
            return fetch("http://localhost:7600/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body

            })
        }
    }
})