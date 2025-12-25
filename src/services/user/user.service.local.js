import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { demoLikedSongs } from '../../assets/data/demo-likedSongs.js'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
}
_createLoggedinUser()


async function getUsers() {
    const users = await storageService.query('user')
    return users.map(user => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    return await storageService.get('user', userId)
}

function remove(userId) {
    return storageService.remove('user', userId)
}

async function update(user) {
    const savedUser = await storageService.put('user', user)

    const loggedinUser = getLoggedinUser()
    if (loggedinUser?._id === user._id) saveLoggedinUser(savedUser)

    return savedUser
}

async function login(userCred) {
    const users = await storageService.query('user')
    const user = users.find(user => user.username === userCred.username)

    if (user) return saveLoggedinUser(user)
    else return false
}

async function signup(userCred) {
    const user = {
        fullname: userCred.fullname,
        username: userCred.username,
        password: userCred.password,
       likedSongs: userCred.likedSongs || [], 
        stationsId: userCred.stationsId || []
    }
    const newUser = await storageService.post('user', user)
    return saveLoggedinUser(newUser)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
    user = {
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        password: user.password,
        likedSongs: user.likedSongs || [],
        userStationsIds: user.userStationsIds || []
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

// To quickly create an admin user, uncomment the next line
async function _createLoggedinUser() {
    const users = localStorage.getItem('user')
    console.log(users)

    // const user = users.find(user => user.username === 'admin')
    // console.log(user)

    if (!users) {
        const user = {
            username: 'admin',
            password: 'admin',
           fullname: 'Adminsky',
            likedSongs: demoLikedSongs || []
        }

        signup(user)
    } else login({
        username: 'admin',
        password: 'admin'
    })

}